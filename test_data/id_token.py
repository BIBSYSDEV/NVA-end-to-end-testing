import boto3
import uuid
import sys

ssm = boto3.client('ssm')
USER_POOL_ID = ssm.get_parameter(Name='/CognitoUserPoolId',
                                 WithDecryption=False)['Parameter']['Value']
CLIENT_ID = ssm.get_parameter(Name='/CognitoUserPoolAppClientId',
                              WithDecryption=False)['Parameter']['Value']


def get_id_token(username, client):

    password = 'P%-' + str(uuid.uuid4())
    try:
        response = client.admin_set_user_password(
            Password=password,
            UserPoolId=USER_POOL_ID,
            Username=username,
            Permanent=True,
        )
    except:
        print('User: {}'.format(username))
        print('Error setting password', sys.exc_info()[0])

    response = client.admin_initiate_auth(UserPoolId=USER_POOL_ID,
                                          ClientId=CLIENT_ID,
                                          AuthFlow='ADMIN_USER_PASSWORD_AUTH',
                                          AuthParameters={
                                              'USERNAME': username,
                                              'PASSWORD': password
                                          })
    return response['AuthenticationResult']['IdToken']
