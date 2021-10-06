import boto3
import json
import sys
import copy
import common

ROLE_TABLENAME = 'nva-users-and-roles-nva-identity-service-nva-identity-service'
CUSTOMER_TABLENAME = 'nva_customers'

ssm = boto3.client('ssm')
USER_POOL_ID = ssm.get_parameter(Name='/CognitoUserPoolId',
                                 WithDecryption=False)['Parameter']['Value']
CLIENT_ID = ssm.get_parameter(Name='/CognitoUserPoolAppClientId',
                              WithDecryption=False)['Parameter']['Value']
STAGE = ssm.get_parameter(Name='/test/STAGE',
                          WithDecryption=False)['Parameter']['Value']
CUSTOMER_ID = ssm.get_parameter(Name='/test/TEST_CUSTOMER',
                                WithDecryption=False)['Parameter']['Value']

ROLE_TEMPLATE_FILE_NAME = './users/role.json'
ROLES_FILE = './users/roles.json'
DB_CLIENT = boto3.client('dynamodb')


def findCustomer(org_number):
    try:
        response = DB_CLIENT.query(
            ExpressionAttributeValues={':v1': {
                'S': org_number
            }},
            KeyConditionExpression="feideOrganizationId = :v1",
            ProjectionExpression="identifier",
            TableName=common.customer_tablename,
            IndexName='byOrgNumber')
        return response['Items'][0]['identifier']['S']
    except:
        print(f'Customer not found: {org_number}')
        pass


def createRole(test_user):

    with open(ROLE_TEMPLATE_FILE_NAME) as role_template_file:
        role_template = json.load(role_template_file)

        roles = json.load(open(ROLES_FILE))

        given_name = test_user['givenName']
        family_name = test_user['familyName']
        username = test_user['username']
        role = test_user['role']
        org_number = test_user['orgNumber']
        customer_iri = f'https://api.{STAGE}.nva.aws.unit.no/customer/{findCustomer(org_number)}'

        new_role = copy.deepcopy(role_template)
        new_role['familyName']['S'] = family_name
        new_role['givenName']['S'] = given_name
        new_role['institution']['S'] = customer_iri
        new_role['PrimaryKeyHashKey']['S'] = f'USER#{username}'
        new_role['PrimaryKeyRangeKey']['S'] = f'USER#{username}'
        new_role['SecondaryIndex1HashKey']['S'] = customer_iri
        new_role['SecondaryIndex1RangeKey']['S'] = username
        for user_role in role:
            new_role['roles']['L'].append(roles[user_role])
        new_role['username']['S'] = username
        try:
            response = DB_CLIENT.put_item(TableName=ROLE_TABLENAME, Item=new_role)
        except:
            print(sys.exc_info()[0])
            pass

def deleteRole(username):
    try:
        response = DB_CLIENT.delete_item(TableName=ROLE_TABLENAME,
                                     Key={
                                         'PrimaryKeyHashKey': {
                                             'S': f'USER#{username}'
                                         },
                                         'PrimaryKeyRangeKey': {
                                             'S': f'USER#{username}'
                                         }
                                     })
    except:
        print(sys.exc_info()[0])
        pass

def run():
    print('users...')
    if not USER_POOL_ID:
        quit(
            'Set environment variable AWS_USER_POOL_ID to correct User Pool Id'
        )

    user_attribute_file_name = './users/user.json'
    test_users_file_name = './users/test_users.json'

    with open(user_attribute_file_name) as json_file:
        user = json.load(json_file)

        cognito_client = boto3.client('cognito-idp')
        cognito_test_users = []
        response = cognito_client.list_users(UserPoolId=USER_POOL_ID)
        for cognito_user in response['Users']:
            for attribute in cognito_user['Attributes']:
                if attribute['Name'] == 'custom:orgLegalName':
                    if attribute['Value'] == 'TestOrg':
                        cognito_test_users.append(cognito_user['Username'])
                    else:
                        username = cognito_user['Username']
                        orgLegalName = attribute['Value']
                        print(f'{username} : {orgLegalName}')
        for cognito_test_username in cognito_test_users:
            try:
                response = cognito_client.admin_delete_user(
                    UserPoolId=USER_POOL_ID, Username=cognito_test_username)
            except:
                print('Error deleting users')
                pass

        with open(test_users_file_name) as test_users_file:

            test_users = json.load(test_users_file)
            for test_user in test_users:

                family_name = test_user['familyName']
                given_name = test_user['givenName']
                username = test_user['username']
                org_number = test_user['orgNumber']
                affiliation = test_user['affiliation']
                cristinId = test_user['cristinId']
                user_attributes = copy.deepcopy(user)

                for attribute in user_attributes:
                    if attribute['Name'] == 'custom:identifiers':
                        attribute['Value'] = f'feide:{username}'
                    if attribute['Name'] == 'custom:feideId' or attribute[
                            'Name'] == 'email' or attribute['Name'] == 'custom:feideTargetedId':
                        attribute['Value'] = username
                    if attribute['Name'] == 'name' or attribute[
                            'Name'] == 'custom:commonName':
                        attribute['Value'] = f'{given_name} {family_name}'
                    if attribute['Name'] == 'given_name':
                        attribute['Value'] = given_name
                    if attribute['Name'] == 'family_name':
                        attribute['Value'] = family_name
                    if attribute['Name'] == 'custom:orgNumber':
                        attribute['Value'] = org_number
                    if attribute['Name'] == 'custom:cristinId':
                        attribute['Value'] = cristinId
                    if attribute['Name'] == 'custom:affiliation':
                        attribute['Value'] = f'feide:{affiliation}'
                    if attribute['Name'] == 'custom:customerId':
                        attribute['Value'] = attribute['Value'].format(
                            STAGE, CUSTOMER_ID)

                try:
                    print(f'Creating {username}')
                    response = cognito_client.admin_create_user(
                        UserPoolId=USER_POOL_ID,
                        Username=username,
                        UserAttributes=user_attributes,
                        MessageAction='SUPPRESS')
                except:
                    print(f'Error creating user {username}', sys.exc_info()[0])
                    pass

                role = test_user['role']
                deleteRole(username)
                createRole(test_user)


if __name__ == '__main__':
    run()
