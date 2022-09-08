import json
import requests
import boto3
import common
import time
import sys

apiUrl = 'https://api.dev.nva.aws.unit.no/'
USER_POOL_ID = 'eu-west-1_nLV9i5X5D'
USERS_ROLES_TABLE_NAME = 'nva-users-and-roles-master-pipelines-NvaIdentityService-WLJCBMUDMRYZ-nva-identity-service'

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
            print(payload)
            print(response.text)
        cristinPersonId = response.json()['id'].replace('https://api.dev.nva.aws.unit.no/cristin/person/', '')
        print(cristinPersonId)
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
        "roles": roles,
        "feideId": username
    }
    headers = createHeaders(accessToken=accessToken)
    response = requests.post(url=url, json=payload, headers=headers)
    if not response.status_code == 200:
        print(payload)
        print(response.json())

    secretsManager = boto3.client('secretsmanager')
    password = secretsManager.get_secret_value(SecretId='E2ETestUserPassword')['SecretString']
    tempPassword = 'P%temp123'

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
                },
                {
                    'Name': 'custom:feideId',
                    'Value': username
                }
            ],
            MessageAction='SUPPRESS'
        )
        client.admin_set_user_password(
            UserPoolId=USER_POOL_ID,
            Username=username,
            Password=tempPassword
        )


def importUsers(test_users_file_name):
    print('Importing users...')
    accessToken = common.getBackendAccessToken()

    customersScan = common.scan_customers()
    customers = {}
    cristinOrgId = ''
    for customer in customersScan:
        if not customer['cristinId']['S'] == '':
            cristinOrgId = customer['cristinId']['S'].replace('https://api.dev.nva.aws.unit.no/cristin/organization/', '').replace('.0.0.0', '')
            customers[cristinOrgId] = f'https://api.dev.nva.aws.unit.no/customer/{customer["identifier"]["S"]}'

    with open(test_users_file_name) as test_users_file:

        test_users = json.load(test_users_file)
        for test_user in test_users:
            firstName = test_user['firstName']
            lastName = test_user['lastName']
            nin = test_user['nin']
            roles = test_user['role']
            if not test_user['cristinId'] == '':
                cristinOrgId = test_user['cristinId']
            if not test_user['orgNumber'] == '':
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

def deleteUsers(admin):
    print('deleting from Cognito...')
    client = boto3.client('cognito-idp')
    paginator = client.get_paginator('list_users')
    operation_parameters = {
        'UserPoolId': USER_POOL_ID
    }
    users = []
    for response in paginator.paginate(**operation_parameters):
        users.append(response['Users'])

    for userlist in users:
        for user in userlist:
            if 'test-user-' in user['Username']:
                print(f'Found {user["Username"]}')
                client.admin_delete_user(
                    Username=user['Username'],
                    UserPoolId=USER_POOL_ID
                )

    print('deleting from DynamoDb...')
    client = boto3.client('dynamodb')
    users = client.scan(TableName=USERS_ROLES_TABLE_NAME)['Items']
    for user in users:
        if 'familyName' in user:
            familyName = user['familyName']['S']
            givenName = user['givenName']['S']
            if not admin and givenName == 'Create testdata':
                print(f'Not deleting {givenName} {familyName}')
            else:
              if 'TestUser' in familyName:
                print(f'deleting {givenName} {familyName}')
                response = client.delete_item(
                    TableName=USERS_ROLES_TABLE_NAME,
                    Key={'PrimaryKeyHashKey': {
                            'S': user['PrimaryKeyHashKey']['S']
                        },
                        'PrimaryKeyRangeKey': {
                            'S': user['PrimaryKeyRangeKey']['S']
                        }
                    })

def run(user_file, admin):
    deleteUsers(admin=admin)
    importUsers(test_users_file_name=user_file)

if __name__ == '__main__':
    admin = False
    if len(sys.argv) > 1:
        test_users_file_name = sys.argv[1]
        if len(sys.argv) > 2:
            admin = sys.argv[2]
    else:
        test_users_file_name = './users/test_users_new.json'
    run(test_users_file_name, admin)