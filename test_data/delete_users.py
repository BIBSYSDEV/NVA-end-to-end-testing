import boto3
import sys

ssm = boto3.client('ssm')
USERS_ROLES_TABLE_NAME = ssm.get_parameter(Name='/test/UserTable',
                                           WithDecryption=False)['Parameter']['Value']

def deleteUsers(admin):
    print('deleting from DynamoDb...')
    client = boto3.client('dynamodb')
    users = client.scan(TableName=USERS_ROLES_TABLE_NAME)['Items']
    for user in users:
        if 'affiliation' in user:
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

if __name__ == '__main__':
    admin = False
    if len(sys.argv > 0):
      if sys.argv[1].lower() == 'admin':
          admin = True

    deleteUsers(admin)
