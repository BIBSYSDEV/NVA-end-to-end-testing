import boto3
import json
import copy
import uuid
import requests
import common

client = boto3.client('dynamodb')
ssm = boto3.client('ssm')
STAGE = ssm.get_parameter(Name='/test/STAGE',
                          WithDecryption=False)['Parameter']['Value']
customer_template_file_name = './customers/institution.json'
test_customers_file_name = './customers/test_institutions.json'
customer_tablename = 'nva-customers-nva-identity-service-nva-identity-service'
customer_endpoint = f'https://api.{STAGE}.nva.aws.unit.no/customer/'
username = 'test-data-user@test.no'


def scan_customers():
    response = client.scan(TableName=customer_tablename)

    return response['Items']


def delete_customers():
    customers = scan_customers()
    for customer in customers:
        if 'archiveName' in customer:
            archiveName = customer['archiveName']['S']
            if 'test' in archiveName:
                print(f'deleting {archiveName}')
                response = client.delete_item(
                    TableName=customer_tablename,
                    Key={'identifier': {
                        'S': customer['identifier']['S']
                    }})


def create_customers(bearer_token):
    with open(customer_template_file_name) as customer_template_file:
        customer_template = json.load(customer_template_file)

        with open(test_customers_file_name) as test_customers_file:

            test_customers = json.load(test_customers_file)
            for test_customer in test_customers:
                new_customer = copy.deepcopy(customer_template)
                new_customer['feideOrganizationId'] = test_customer[
                    'feideOrganizationId']
                new_customer['cristinId'] = test_customer['cristinId']
                new_customer['displayName'] = test_customer['displayName']
                new_customer['name'] = test_customer['name']
                new_customer['shortName'] = test_customer['shortName']
                new_customer['archiveName'] = test_customer['archiveName']

                print(f'Creating customer: {test_customer["name"]}')
                response = put_item(new_customer=new_customer,
                                    bearer_token=bearer_token)
                
                print(new_customer)
                print(customer_endpoint)
                if response.status_code != 201:
                    print(
                        f'Error creating customer with name {test_customer["name"]}')
                    print(response.__dict__)


def put_item(new_customer, bearer_token):
    headers = {
        'Authorization': f'Bearer {bearer_token}',
        'accept': 'application/json'
    }
    print(headers)
    response = requests.post(
        customer_endpoint, json=new_customer, headers=headers)

    return response


def run():
    print('customers...')
    bearer_token = common.login(username=username)
    delete_customers()
    create_customers(bearer_token)


if __name__ == '__main__':
    run()
