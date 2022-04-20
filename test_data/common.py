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

def login(username):
    client = boto3.client('cognito-idp')
    password = 'P%' + str(uuid.uuid4())
    response = client.admin_set_user_password(
        Password=password,
        UserPoolId=USER_POOL_ID,
        Username=username,
        Permanent=True,
    )
    response = requests.post(
        url='https://nva-dev.auth.eu-west-1.amazoncognito.com/login?client_id=406g9cf6bk5a17u96n93vb8k9m&response_type=code&scope=aws.cognito.signin.user.admin+email+https%3A%2F%2Fapi.nva.unit.no%2Fscopes%2Ffrontend+openid+phone&redirect_uri=https%3A%2F%2Flocalhost%3A3000',
        json={
            'username': username,
            'password': password
        }
    )

    print(response)

    # response = client.admin_initiate_auth(
    #     UserPoolId=USER_POOL_ID,
    #     ClientId=CLIENT_ID,
    #     AuthFlow='ADMIN_USER_PASSWORD_AUTH',
    #     AuthParameters={
    #         'USERNAME': username,
    #         'PASSWORD': password
    #     })
    return response['AuthenticationResult']['IdToken']

def scan_customers():
    client = boto3.client('dynamodb')
    response = client.scan(TableName=customer_tablename)

    return response['Items']
