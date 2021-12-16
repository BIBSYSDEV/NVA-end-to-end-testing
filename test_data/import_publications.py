import boto3
import json
import copy
import requests
import os
import common
import time

dynamodb_client = boto3.client('dynamodb')
s3_client = boto3.client('s3')
ssm = boto3.client('ssm')
publications_tablename = ssm.get_parameter(Name='/test/ResourceTable',
                                           WithDecryption=False)['Parameter']['Value']
s3_bucket_name = ssm.get_parameter(Name='/test/ResourceS3Bucket',
                                   WithDecryption=False)['Parameter']['Value']
STAGE = ssm.get_parameter(Name='/test/Stage',
                          WithDecryption=False)['Parameter']['Value']
user_tablename = ssm.get_parameter(Name='/test/UserTable',
                                   WithDecryption=False)['Parameter']['Value']
USER_POOL_ID = ssm.get_parameter(Name='/CognitoUserPoolId',
                                 WithDecryption=False)['Parameter']['Value']
CLIENT_ID = ssm.get_parameter(Name='/CognitoUserPoolAppClientId',
                              WithDecryption=False)['Parameter']['Value']
publication_template_file_name = './publications/new_test_registration.json'
test_publications_file_name = './publications/test_publications.json'
person_query = 'https://api.{}.nva.aws.unit.no/person/?name={} {}'
user_endpoint = 'https://api.{}.nva.aws.unit.no/users-roles/users/{}'
upload_endpoint = 'https://api.{}.nva.aws.unit.no/upload/{}'
publication_endpoint = f'https://api.{STAGE}.nva.aws.unit.no/publication'
publish_endpoint = 'https://api.{}.nva.aws.unit.no/publication/{}/publish'
request_doi_endpoint = f'https://api.{STAGE}.nva.aws.unit.no/publication/doirequest'
approve_doi_endpoint = f'https://api.{STAGE}.nva.aws.unit.no/publication/update-doi-request'
upload_create = upload_endpoint.format(STAGE, 'create')
upload_prepare = upload_endpoint.format(STAGE, 'prepare')
upload_complete = upload_endpoint.format(STAGE, 'complete')
username = 'test-data-user@test.no'
username_curator = 'test-user-curator@test.no'
test_file_name = 'test_file.pdf'
test_file_path = f'publications/files/{test_file_name}'
test_file_size = os.stat(test_file_path).st_size
test_file_modified = os.stat(test_file_path).st_mtime
test_file = open(test_file_path, 'rb').read()

arp_dict = {}
file_dict = {}
bearer_tokens = {}
headers = {
    'Authorization': '',
    'accept': 'application/json'
}


STRING = 'S'
MAP = 'M'


def map_user_to_arp():
    with open('./users/test_users.json') as user_file:
        users = json.load(user_file)
        for user in users:
            arp_dict[user['username']] = {
                'familyName': user['familyName'],
                'givenName': user['givenName']
            }
            if (user['author']):
                query_response = requests.get(
                    person_query.format(STAGE, user['givenName'],
                                        user['familyName']))
                if query_response.status_code != 200:
                    print(f'GET /person/ {query_response.status_code}')
                if query_response.json() != []:
                    arp_dict[user['username']]['scn'] = query_response.json(
                    )[0]['id']


def upload_file(bearer_token):
    print('upload file...')
    headers['Authorization'] = f'Bearer {bearer_token}'
    # create
    print('create...')
    response = requests.post(
        upload_create,
        json={
            'filename': 'test_file.pdf',
            'size': test_file_size,
            'lastmodified': test_file_modified,
            'mimetype': 'application/pdf'
        },
        headers=headers)
    uploadId = response.json()['uploadId']
    key = response.json()['key']
    # prepare
    print('prepare...')
    response = requests.post(
        upload_prepare,
        json={
            'number': 1,
            'uploadId': uploadId,
            'body': str(test_file),
            'key': key
        },
        headers=headers)
    print('upload...')
    presignedUrl = response.json()['url']
    # upload
    response = requests.put(presignedUrl, headers={
                            'Accept': 'appliation/pdf'}, data=test_file)
    ETag = response.headers['ETag']
    # complete
    print('complete...')
    payload = {
        'uploadId': uploadId,
        'key': key,
        'parts': [
            {
                'partNumber': 1,
                'ETag': ETag
            }
        ]
    }
    response = requests.post(
        upload_complete,
        json=payload,
        headers=headers)
    return response.json()['location']


def scan_resources():
    print('scanning resources')
    response = dynamodb_client.scan(TableName=publications_tablename,
                                    FilterExpression='contains(#PK0, :val)',
                                    ExpressionAttributeNames={'#PK0': 'PK0'},
                                    ExpressionAttributeValues={':val': {STRING: 'test.no'}})
    scanned_publications = response['Items']
    more_items = 'LastEvaluatedKey' in response
    while more_items:
        start_key = response['LastEvaluatedKey']
        response = dynamodb_client.scan(TableName=publications_tablename,
                                        FilterExpression='contains(#PK0, :val)',
                                        ExpressionAttributeNames={
                                            '#PK0': 'PK0'},
                                        ExpressionAttributeValues={
                                            ':val': {STRING: 'test.no'}},
                                        ExclusiveStartKey=start_key)
        scanned_publications.extend(response['Items'])
        more_items = 'LastEvaluatedKey' in response
    return scanned_publications


def delete_publications():
    resources = scan_resources()
    for resource in resources:
        publication = resource['data'][MAP]
        primary_partition_key = resource['PK0'][STRING]
        primary_sort_key = resource['SK0'][STRING]
        identifier = publication['identifier'][STRING]
        owner = publication['owner'][STRING]
        if 'test.no' in owner:
            print(
                f'Deleting {identifier} - {owner}')
            response = dynamodb_client.delete_item(
                TableName=publications_tablename,
                Key={
                    'PK0': {
                        STRING: primary_partition_key
                    },
                    'SK0': {
                        STRING: primary_sort_key
                    }
                })
    return


def put_item(new_publication, username):
    trying = True
    count = 0
    while trying:
        bearer_token = common.login(username=username)
        headers['Authorization'] = f'Bearer {bearer_token}'
        response = requests.post(publication_endpoint,
                                 json=new_publication, headers=headers)
        if response.status_code == 201:
            trying = False
        count = count + 1
        if count == 3:
            trying = False
            print(response.json())
            raise RuntimeError('Failed to create Registration')
    return response.json()


def get_customer(username, bearer_token):
    headers['Authorization'] = f'Bearer {bearer_token}'
    response = requests.get(user_endpoint.format(
        STAGE, username), headers=headers)
    return response.json()['institution']


def create_contributor(contributor):
    with open('./publications/contributors.json'
              ) as contributor_template_file:
        contributor_template = json.load(contributor_template_file)

        new_contributor = copy.deepcopy(contributor_template)
        new_contributor['email'] = contributor
        new_contributor['identity']['id'] = arp_dict[contributor]['scn']
        new_contributor['identity']['name'] = f'{arp_dict[contributor]["familyName"]},{arp_dict[contributor]["givenName"]}'
        return new_contributor


def create_publication_data(publication_template, test_publication, location, username, customer, status):
    new_publication = copy.deepcopy(publication_template)
    new_publication['entityDescription']['mainTitle'] = test_publication['title']
    new_publication['entityDescription']['reference']['publicationContext']['type'] = test_publication['publication_context_type']
    new_publication['entityDescription']['reference']['publicationInstance']['type'] = test_publication['publication_instance_type']
    if 'publication_content_type' in test_publication:
        new_publication['entityDescription']['reference']['publicationInstance'][
            'contentType'] = test_publication['publication_content_type']
    new_publication['owner'] = username
    new_publication['publisher']['id'] = customer
    new_publication['status'] = status

    if test_publication['contributor'] != '':
        contributor = test_publication['contributor']
        new_contributor = create_contributor(contributor=contributor)
        new_publication['entityDescription']['contributors'].append(
            new_contributor)

    file = {
        "administrativeAgreement": False,
        "identifier": location,
        "license": {
            "identifier": "CC0",
            "labels": {
                "nb": "CC0"
            },
            "type": "License"
        },
        "mimeType": "application/pdf",
        "name": test_file_name,
        "publisherAuthority": False,
        "size": test_file_size,
        "type": "File"
    }

    new_publication['fileSet']['files'].append(file)

    return new_publication


def create_test_publication(publication_template, test_publication, location, bearer_token):
    customer = get_customer(test_publication['owner'], bearer_token=bearer_token).replace(
        f'https://api.{STAGE}.nva.aws.unit.no/customer/', '')
    username = test_publication['owner']
    status = test_publication['status']

    new_publication = create_publication_data(
        publication_template=publication_template,
        test_publication=test_publication,
        location=location,
        username=username,
        customer=customer,
        status=status
    )

    return new_publication


def create_publications(location):
    with open(publication_template_file_name) as publication_template_file:
        publication_template = json.load(publication_template_file)

    with open(test_publications_file_name) as test_publications_file:

        test_publications = json.load(test_publications_file)
        for test_publication in test_publications:
            username = test_publication['owner']
            bearer_token = ''
            bearer_token = common.login(username=username)
            print(f'Creating {test_publication["title"]}')
            new_publication = create_test_publication(
                publication_template=publication_template,
                test_publication=test_publication,
                location=location,
                bearer_token=bearer_token
            )
            response = put_item(
                new_publication=new_publication, username=username)
            identifier = response['identifier']
            if test_publication['status'] == 'PUBLISHED':
                print(f'publishing...{identifier}')
                response = publish_publication(identifier=identifier,
                                               username=username)
            if 'doi' in test_publication:
                print('requesting doi...')
                request_doi(identifier=identifier, username=username)
                if test_publication['doi'] == 'created':
                    print('approving doi...')
                    time.sleep(30)
                    approve_doi(identifier=identifier)


def publish_publication(identifier, username):
    publish_bearer_token = common.login(username=username)
    headers['Authorization'] = f'Bearer {publish_bearer_token}'
    response = requests.put(publish_endpoint.format(
        STAGE, identifier), headers=headers)
    print(response.json())


def request_doi(identifier, username):
    request_bearer_token = common.login(username=username)
    headers['Authorization'] = f'Bearer {request_bearer_token}'
    doi_request_payload = {
        "identifier": identifier,
        "message": "Test"
    }
    response = requests.post(request_doi_endpoint,
                             json=doi_request_payload, headers=headers)


def approve_doi(identifier):
    request_bearer_token = common.login(username=username_curator)
    headers['Authorization'] = f'Bearer {request_bearer_token}'
    doi_request_payload = {
        "doiRequestStatus": "APPROVED"
    }
    print(f'{approve_doi_endpoint}/{identifier}')
    response = requests.post(f'{approve_doi_endpoint}/{identifier}',
                             json=doi_request_payload, headers=headers)


def run():
    print('publications...')
    map_user_to_arp()
    bearer_token = common.login(username='test-user-with-author@test.no')
    location = upload_file(bearer_token=bearer_token)

    delete_publications()
    create_publications(location=location)


if __name__ == '__main__':
    run()
