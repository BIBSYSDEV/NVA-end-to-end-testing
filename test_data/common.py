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

def getBackendAccessToken():
    url = "https://nva-e2e.auth.eu-west-1.amazoncognito.com/oauth2/token"

    payload='grant_type=client_credentials'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.post(url, headers=headers, data=payload, auth=(BACKEND_CLIENT_ID, CLIENT_SECRET))

    return response.json()['access_token']