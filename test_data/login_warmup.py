import boto3
import uuid
import sys

ssm = boto3.client('ssm')
USER_POOL_ID = ssm.get_parameter(Name='/CognitoUserPoolId',
                                 WithDecryption=False)['Parameter']['Value']
CLIENT_ID = ssm.get_parameter(Name='/CognitoUserPoolAppClientId',
                              WithDecryption=False)['Parameter']['Value']
username = 'Dataporten_c924937b-f153-4836-bb7a-401893b27ba8'

def login_warmup():
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
            print(response.status_code)
            print(response.json())
            count+=1
            if count == 3: trying = False
    return ''


if __name__ == '__main__':
    token = login_warmup()
    sys.stdout.write(token)
    sys.stdout.flush()
    sys.exit(0)