import json
import requests
import boto3
import uuid
import common
import time

clientId = '7vt27od1nkei5mepcv3df98c5k'
secret = '3looqcjbolfvue8flaajrjbnqu3l9v6u1sibmp58n8og9v6gers'

apiUrl = 'https://api.dev.nva.aws.unit.no/'
USER_POOL_ID = 'eu-west-1_nLV9i5X5D'

def getBackendAccessToken():
    url = "https://nva-dev.auth.eu-west-1.amazoncognito.com/oauth2/token"

    payload='grant_type=client_credentials'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.post(url, headers=headers, data=payload, auth=(clientId, secret))

    return response.json()['access_token']

def createHeaders(accessToken):
    return {
        'Authorization': f'Bearer {accessToken}',
        'Content-type': 'application/json'
    }

def findCristinPerson(accessToken, nin):
    url = f'{apiUrl}cristin/person/identityNumber'
    headers = createHeaders(accessToken=accessToken)
    payload = {
        'type': 'NationalIdentificationNumber',
        'value': nin
    }
    response = requests.post(url, headers=headers, json=payload)

    return response

def createCristinPayload(nin, firstName, lastName):
    return {
        "identifiers": [
            { "type": "NationalIdentificationNumber","value": nin}
        ],
        "names": [
            { "type": "PreferredFirstName", "value": firstName },
            { "type": "PreferredLastName", "value": lastName },
            { "type": "FirstName", "value": firstName },
            { "type": "LastName","value": lastName}
        ]
    }

def createCristinEmploymentPayload(organization):
    return {
        "endDate": "2030-05-10T09:32:11.598Z",
        "organization": organization ,
        "fullTimeEquivalentPercentage": 100,
        "startDate": "2020-01-01T01:01:01.000Z",
        "type": "https://api.dev.nva.aws.unit.no/position#1087"
    }

def organizationExists(affiliations, organization):
    for affiliation in affiliations:
        if affiliation['organization'] == organization:
            return True
    return False

def createCristinPerson(accessToken, nin, firstName, lastName, cristinOrgId):
    createUrl = f'{apiUrl}cristin/person'
    headers = createHeaders(accessToken=accessToken)
    existingPerson = findCristinPerson(accessToken=accessToken, nin=nin)
    cristinPersonId = ''
    if existingPerson.status_code == 404:
        print('Creating Cristin person...')
        payload = createCristinPayload(nin=nin, firstName=firstName, lastName=lastName)
        response = requests.post(url=createUrl, headers=headers, json=payload)
        if response.status_code != 201:
            print(response.text)
        cristinPersonId = response.json()['id'].replace('https://api.dev.nva.aws.unit.no/cristin/person/', '')
    else:
        print('Updating Cristin person')
        cristinPersonId = existingPerson.json()['id'].replace('https://api.dev.nva.aws.unit.no/cristin/person/', '')
    if not cristinPersonId == '':
        updateAffiliations = True
        if 'affiliations' in existingPerson.json():
            updateAffiliations = not organizationExists(existingPerson.json()['affiliations'], cristinOrgId)
        if updateAffiliations:
            updateUrl = f'{apiUrl}cristin/person/{cristinPersonId}/employment'
            payload = createCristinEmploymentPayload(organization=cristinOrgId)
            response = requests.post(url=updateUrl, json=payload, headers=headers)
    else:
        print('Employment exists...')

    return cristinPersonId

def createNvaUser(accessToken, nin, customer, roles, username):
    print('Creating NVA user...')
    url = f'{apiUrl}users-roles/users/'
    payload = {
        "nationalIdentityNumber": nin,
        "customerId": customer,
        "roles": roles
    }
    headers = createHeaders(accessToken=accessToken)
    response = requests.post(url=url, json=payload, headers=headers)
    if not response.status_code == 200:
        print(response.json())

    # username = response.json()['username']

    client = boto3.client('cognito-idp')

    try:
        response = client.admin_get_user(
            UserPoolId=USER_POOL_ID,
            Username=username,
        )
    except:
        client.admin_create_user(
            UserPoolId=USER_POOL_ID,
            Username=username,
            UserAttributes=[
                {
                    'Name': 'custom:feideIdNin',
                    'Value': nin
                }
            ],
            MessageAction='SUPPRESS'
        )


def login(username):
    client = boto3.client('cognito-idp')
    password = f'P_{str(uuid.uuid4())}'
    client.admin_set_user_password(
        Password=password,
        UserPoolId=USER_POOL_ID,
        Username=username,
        Permanent=True,
    )

    response = client.initiate_auth(
        AuthFlow='USER_PASSWORD_AUTH',
        ClientId='49pjmu0bmfluk4bvcsnljnblub',
        AuthParameters={
            'USERNAME': username,
            'PASSWORD': password
        }
    )
    print(response['AuthenticationResult']['AccessToken'])

def importUsers():
    print('Importing users...')
    accessToken = getBackendAccessToken()

    customersScan = common.scan_customers()
    customers = {}
    for customer in customersScan:
        cristinOrgId = customer['cristinId']['S'].replace('https://api.dev.nva.aws.unit.no/cristin/organization/', '').replace('.0.0.0', '')
        customers[cristinOrgId] = f'https://api.dev.nva.aws.unit.no/customer/{customer["identifier"]["S"]}'

    test_users_file_name = './users/test_users_new.json'
    with open(test_users_file_name) as test_users_file:

        test_users = json.load(test_users_file)
        for test_user in test_users:
            firstName = test_user['firstName']
            lastName = test_user['lastName']
            nin = test_user['nin']
            roles = test_user['role']
            cristinOrgId = test_user['cristinId']
            customer = customers[test_user['orgNumber']]
            username = test_user['username']
            print(f'Creating {firstName} {lastName}')

            createCristinPerson(accessToken=accessToken, nin=nin, firstName=firstName, lastName=lastName, cristinOrgId=cristinOrgId)
            time.sleep(10)
            createNvaUser(accessToken=accessToken, nin=nin, customer=customer, roles=roles, username=username)

def createNin():
    with open('./users/nin.txt') as nin_file:
        for nin in nin_file:
            nin = nin.replace('\n', '')
            print(f'    "nin": "{nin}",')

def deleteUsers():
    client = boto3.client('cognito-idp')
    response = client.list_users(
        UserPoolId=USER_POOL_ID
    )
    for user in response['Users']:
        if 'test-user-' in user['Username']:
            client.admin_delete_user(
                Username=user['Username'],
                UserPoolId=USER_POOL_ID
            )

    client = boto3.client('cognito-idp')
    response = client.list_users(
        UserPoolId=USER_POOL_ID
    )
    for user in response['Users']:
        if not 'test-user-' in user['Username']:
            print(user['Username'])

def run():
    deleteUsers()
    importUsers()

if __name__ == '__main__':
    run()