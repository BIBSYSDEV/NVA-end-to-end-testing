import boto3
import uuid
import requests

ssm = boto3.client('ssm')
USER_POOL_ID = ssm.get_parameter(Name='/CognitoUserPoolId',
                                 WithDecryption=False)['Parameter']['Value']
CLIENT_ID = ssm.get_parameter(Name='/CognitoUserPoolAppClientId',
                              WithDecryption=False)['Parameter']['Value']
customer_tablename = ssm.get_parameter(Name='/test/CustomerTable',
                                       WithDecryption=False)['Parameter']['Value']
username = 'test-user-with-author@test.no'

clientId = '1nbiuinkdappc61f8igc82mie8'
secret = '10lcd99qlhu86qfkbicci0gtoit0fqmai40r7dnrm1nm04d8m9v7'

def login(username):
    client = boto3.client('cognito-idp')
    password = f'P_{str(uuid.uuid4())}'
    client.admin_set_user_password(
        Password=password,
        UserPoolId=USER_POOL_ID,
        Username=username,
        Permanent=True,
    )
    trying = True
    count = 0
    while trying:
        try:
            response = client.initiate_auth(
                AuthFlow='USER_PASSWORD_AUTH',
                ClientId=CLIENT_ID,
                AuthParameters={
                    'USERNAME': username,
                    'PASSWORD': password
                }
            )
            return response['AuthenticationResult']['AccessToken']
        except:
            count+=1
            if count == 3: trying = False
    return ''

def scan_customers():
    client = boto3.client('dynamodb')
    response = client.scan(TableName=customer_tablename)

    return response['Items']

def getBackendAccessToken():
    url = "https://nva-e2e.auth.eu-west-1.amazoncognito.com/oauth2/token"

    payload='grant_type=client_credentials'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.post(url, headers=headers, data=payload, auth=(clientId, secret))

    return response.json()['access_token']