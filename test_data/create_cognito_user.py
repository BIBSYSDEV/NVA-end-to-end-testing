import boto3
import json
import uuid
import sys
import common

ssm = boto3.client('ssm')
client = boto3.client('cognito-idp')
USER_POOL_ID = ssm.get_parameter(Name='/CognitoUserPoolId',
                                 WithDecryption=False)['Parameter']['Value']
CLIENT_ID = ssm.get_parameter(Name='/CognitoUserPoolAppClientId',
                              WithDecryption=False)['Parameter']['Value']
secretsmanager = boto3.client('secretsmanager')
# PASSWORD = json.loads(secretsmanager.get_secret_value(SecretId='apiTestUserPassword')['SecretString'])['password']
COGNITO_USER_FILE_NAME = 'cognito_user.json'


def find_user(client, username):
    user_exist = False
    try:
        client.admin_get_user(
            UserPoolId=USER_POOL_ID,
            Username=username
        )
        user_exist = True
    except:
        user_exist = False
    return user_exist


def create_user(client):
    with open(COGNITO_USER_FILE_NAME) as cognito_user_file:
        cognito_user = json.load(cognito_user_file)
        for attribute in cognito_user:
            if attribute['Name'] == 'custom:feideId':
                username = attribute['Value']
                break
        user_exist = find_user(client=client, username=username)
        if not user_exist:
            try:
                print('Creating user...')
                client.admin_create_user(
                    UserPoolId=USER_POOL_ID,
                    Username=username,
                    UserAttributes=cognito_user,
                    MessageAction='SUPPRESS'
                )
                client.admin_set_user_password(
                    # Password='P_' + str(uuid.uuid4()),
                    Password='P_1234_abcd',
                    UserPoolId=USER_POOL_ID,
                    Username=username,
                    Permanent=True,
                )
            except:
                print('Error creating user', sys.exc_info()[0])
        else:
            print('User already exists...')


def run():
    create_user(client=client)


if __name__ == '__main__':
    run()
    common.login('test-data-user@test.no')
