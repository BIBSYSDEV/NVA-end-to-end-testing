import boto3
import uuid
import requests

ssm = boto3.client('ssm')
secretsmanager = boto3.client('secretsmanager')
USER_POOL_ID = ssm.get_parameter(Name='/CognitoUserPoolId',
                                 WithDecryption=False)['Parameter']['Value']
CLIENT_ID = ssm.get_parameter(Name='/CognitoUserPoolAppClientId',
                              WithDecryption=False)['Parameter']['Value']
BACKEND_CLIENT_ID = ssm.get_parameter(Name='/NVA/BackendClientId',
                              WithDecryption=False)['Parameter']['Value']
CLIENT_SECRET = secretsmanager.get_secret_value(SecretId='backendClientSecret')['SecretString']
CUSTOMER_TABLENAME = ssm.get_parameter(Name='/test/CustomerTable',
                                       WithDecryption=False)['Parameter']['Value']
API_DOMAIN = ssm.get_parameter(Name='/NVA/ApiDomain',
                               WithDecryption=False)['Parameter']['Value']
API_URL = f'https://{API_DOMAIN}'

terms_conditions = '{"termsConditionsUri":"https://nva.sikt.no/terms/2024-10-01"}'
terms_conditions_endpoint = 'https://api.e2e.nva.aws.unit.no/users-roles/users/mine/accepted-terms'

def login(username):
    USER_PASSWORD = secretsmanager.get_secret_value(SecretId='TestUserPassword')['SecretString']
    client = boto3.client('cognito-idp')
    trying = True
    count = 0
    while trying:
        try:
            response = client.initiate_auth(
                AuthFlow='USER_PASSWORD_AUTH',
                ClientId=CLIENT_ID,
                AuthParameters={
                    'USERNAME': username,
                    'PASSWORD': USER_PASSWORD
                }
            )
            accessToken = response['AuthenticationResult']['AccessToken']
            headers = {
                'Authorization': f'Bearer {accessToken}',
                'Content-type': 'application/json'
            }

            # terms_response = requests.put(terms_conditions_endpoint, headers=headers, data=terms_conditions)
            # print(terms_response.json())
            return accessToken
        except:
            print('failed login...')
            print(response)
            try:
                client.admin_set_user_password(
                    UserPoolId=USER_POOL_ID,
                    Username=username,
                    Password=USER_PASSWORD
                )
            except:
                print('failed setting password')
            count+=1
            if count == 3: trying = False
    return ''

def scan_customers():
    client = boto3.client('dynamodb')
    response = client.scan(TableName=CUSTOMER_TABLENAME)

    return response['Items']

def cristin_organization_uri(cristin_organization):
    return f'{API_URL}/cristin/organization/{cristin_organization}'

# Keyed by the organization identifier alone, since a stored cristinId carries the domain of
# whichever environment the customer was created in, which is not necessarily this one.
def customer_uri_by_cristin_organization():
    customers = {}
    for customer in scan_customers():
        cristinId = customer.get('cristinId', {}).get('S', '')
        if cristinId:
            cristinOrganization = cristinId.rsplit('/', 1)[-1]
            customers[cristinOrganization] = f'{API_URL}/customer/{customer["identifier"]["S"]}'
    return customers

def require_customer_uri(customers, cristin_organization):
    if cristin_organization not in customers:
        raise RuntimeError(f'Found no customer for cristin organization {cristin_organization}')
    return customers[cristin_organization]

def getBackendAccessToken():
    url = "https://nva-e2e.auth.eu-west-1.amazoncognito.com/oauth2/token"

    payload='grant_type=client_credentials'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.post(url, headers=headers, data=payload, auth=(BACKEND_CLIENT_ID, CLIENT_SECRET))

    return response.json()['access_token']