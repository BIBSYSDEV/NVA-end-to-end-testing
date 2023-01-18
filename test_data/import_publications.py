import boto3
import json
import copy
import requests
import os
import common
import time
from datetime import date, timedelta

dynamodb_client = boto3.client('dynamodb')
s3_client = boto3.client('s3')
ssm = boto3.client('ssm')
cognito_client = boto3.client('cognito-idp')
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
person_query = 'https://api.{}.nva.aws.unit.no/cristin/person/identityNumber'
user_endpoint = 'https://api.{}.nva.aws.unit.no/users-roles/users/{}'
upload_endpoint = 'https://api.{}.nva.aws.unit.no/upload/{}'
publication_endpoint = f'https://api.{STAGE}.nva.aws.unit.no/publication'
publish_endpoint = 'https://api.{}.nva.aws.unit.no/publication/{}/ticket'
request_doi_endpoint = 'https://api.{}.nva.aws.unit.no/publication/{}/ticket'
approve_doi_endpoint = 'https://api.{}.nva.aws.unit.no/publication/{}/ticket/{}'
tickets_endpoint = 'https://api.{}.nva.aws.unit.no/publication/{}/tickets'
upload_create = upload_endpoint.format(STAGE, 'create')
upload_prepare = upload_endpoint.format(STAGE, 'prepare')
upload_complete = upload_endpoint.format(STAGE, 'complete')
username = 'admin-user-testdata@test.no'
username_curator = 'test-user-curator-draft-doi@test.no'

arp_dict = {}
file_dict = {}
bearer_tokens = {}
locations = {
    'pdf': {},
    'image': {},
    'office': {}
}
fileTypes = {
    'pdf': {
        'mimeType': 'application/pdf',
        'fileName': 'test_file.pdf'
    },
    'image': {
        'mimeType': 'image/png',
        'fileName': 'sikt.png'
    },
    'office': {
        'mimeType': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'fileName': 'example.docx'
    }
}
headers = {
    'Authorization': 'Bearer eyJraWQiOiJuSWlWXC9CMml3a0NrZTcxSGNHSjE2VHdJQmo5aG01RzN0WEV3MlwvM2RmRXc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxOGY1ZGZlYS1jOWRjLTRlYTItYTk5Yi05OTAwNTYwYWJiMzkiLCJjb2duaXRvOmdyb3VwcyI6WyJSRUpFQ1RfRE9JX1JFUVVFU1RAaHR0cHM6XC9cL2FwaS5kZXYubnZhLmF3cy51bml0Lm5vXC9jdXN0b21lclwvYmIzZDBjMGMtNTA2NS00NjIzLTliOTgtNTgxMDk4M2MyNDc4IiwiQURNSU5JU1RSQVRFX0FQUExJQ0FUSU9OQGh0dHBzOlwvXC9hcGkuZGV2Lm52YS5hd3MudW5pdC5ub1wvY3VzdG9tZXJcL2JiM2QwYzBjLTUwNjUtNDYyMy05Yjk4LTU4MTA5ODNjMjQ3OCIsIkFQUFJPVkVfUFVCTElTSF9SRVFVRVNUQGh0dHBzOlwvXC9hcGkuZGV2Lm52YS5hd3MudW5pdC5ub1wvY3VzdG9tZXJcL2JiM2QwYzBjLTUwNjUtNDYyMy05Yjk4LTU4MTA5ODNjMjQ3OCIsIkVESVRfT1dOX0lOU1RJVFVUSU9OX1BVQkxJQ0FUSU9OX1dPUktGTE9XQGh0dHBzOlwvXC9hcGkuZGV2Lm52YS5hd3MudW5pdC5ub1wvY3VzdG9tZXJcL2JiM2QwYzBjLTUwNjUtNDYyMy05Yjk4LTU4MTA5ODNjMjQ3OCIsIkVESVRfT1dOX0lOU1RJVFVUSU9OX1BST0pFQ1RTQGh0dHBzOlwvXC9hcGkuZGV2Lm52YS5hd3MudW5pdC5ub1wvY3VzdG9tZXJcL2JiM2QwYzBjLTUwNjUtNDYyMy05Yjk4LTU4MTA5ODNjMjQ3OCIsIkVESVRfT1dOX0lOU1RJVFVUSU9OX1JFU09VUkNFU0BodHRwczpcL1wvYXBpLmRldi5udmEuYXdzLnVuaXQubm9cL2N1c3RvbWVyXC9iYjNkMGMwYy01MDY1LTQ2MjMtOWI5OC01ODEwOTgzYzI0NzgiLCJFRElUX09XTl9JTlNUSVRVVElPTl9VU0VSU0BodHRwczpcL1wvYXBpLmRldi5udmEuYXdzLnVuaXQubm9cL2N1c3RvbWVyXC9iYjNkMGMwYy01MDY1LTQ2MjMtOWI5OC01ODEwOTgzYzI0NzgiLCJBUFBST1ZFX0RPSV9SRVFVRVNUQGh0dHBzOlwvXC9hcGkuZGV2Lm52YS5hd3MudW5pdC5ub1wvY3VzdG9tZXJcL2JiM2QwYzBjLTUwNjUtNDYyMy05Yjk4LTU4MTA5ODNjMjQ3OCIsIlJFQURfRE9JX1JFUVVFU1RAaHR0cHM6XC9cL2FwaS5kZXYubnZhLmF3cy51bml0Lm5vXC9jdXN0b21lclwvYmIzZDBjMGMtNTA2NS00NjIzLTliOTgtNTgxMDk4M2MyNDc4Il0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX25MVjlpNVg1RCIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjNybHM3YWQ1M2xkbWp2ZGJqN3A4ZmlpMThxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgaHR0cHM6XC9cL2FwaS5udmEudW5pdC5ub1wvc2NvcGVzXC9mcm9udGVuZCIsImF1dGhfdGltZSI6MTY2NzIxMzc0MSwiZXhwIjoxNjY3MjE3MzQxLCJpYXQiOjE2NjcyMTM3NDMsImp0aSI6ImI2M2M0NzE1LTIzZmQtNDk2Ni1iMzUyLTg0YjA1YWM4MDNiMiIsInVzZXJuYW1lIjoiRGF0YXBvcnRlbl9jOTI0OTM3Yi1mMTUzLTQ4MzYtYmI3YS00MDE4OTNiMjdiYTgifQ.S4atgti8JUtV6WnRIj-uPTkZp29lWgSJRcL01iVFuf91mKhUftIQvCOummjnAkzY4Yp0EfsUj1XEb4t247d7YG__cP4UReiMYTjhMPGRKx32_szktyENyEmg0uU5hGT22y6L51XoHgeOMLebLailvOnHTmZk2t28acpFbyy64TDKML4A3kZ2v0H86jLtihIeGBywuTtfKHjoLqSRN-eRwftWD6gbXt7znelNF2ZwIWmjYseYuw4zOwjbbBYSeR8tMm3mkBrJ9I0vqL3xKMU02b96mK_Hfl1SYgZD_286VVPo2gC8Dvq48ooSF8clNjm41BdjtP7mdFw1IavAra6xzA',
    'accept': 'application/json'
}


STRING = 'S'
MAP = 'M'


def map_user_to_arp():
    with open('./users/test_users_new.json') as user_file:
        users = json.load(user_file)
        for user in users:
            arp_dict[user['username']] = {
                'username': ''
            }
            query_response = requests.post(
                person_query.format(STAGE),
                json = {
                   "type": "NationalIdentificationNumber",
                    "value": user['nin']
                },
                headers=headers)
            if query_response.status_code != 200:
                print(f'GET /person/ {query_response.status_code}')
            if query_response.json() != []:
                person = query_response.json()
                cristin_id = person['id']
                user_id = f"{cristin_id.replace('https://api.dev.nva.aws.unit.no/cristin/person/', '')}@{user['orgNumber']}.0.0.0"
                name = f'{person["names"][1]["value"]} {person["names"][0]["value"]}'
                if person["names"][0]["type"] == 'FirstName':
                    name = f'{person["names"][0]["value"]} {person["names"][1]["value"]}'
                arp_dict[user['username']]['username'] = user_id
                arp_dict[user['username']]['cristinid'] = cristin_id
                arp_dict[user['username']]['name'] = name


def upload_file():
    print('upload file...')
    # create
    print('create...')
    for filekey in fileTypes.keys():
        test_file_name = fileTypes[filekey]['fileName']
        test_file_path = f'publications/files/{test_file_name}'
        test_file_size = os.stat(test_file_path).st_size
        test_file_modified = os.stat(test_file_path).st_mtime
        test_file = open(test_file_path, 'rb').read()
        response = requests.post(
            upload_create,
            json={
                'filename': test_file_name,
                'size': test_file_size,
                'lastmodified': test_file_modified,
                'mimetype': fileTypes[filekey]['mimeType']
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
        locations[filekey]['location'] = response.json()['location']
        locations[filekey]['filesize'] = test_file_size

def scan_resources():
    print('scanning resources')
    paginator = dynamodb_client.get_paginator('scan')
    operation_parameters = {
        'TableName':publications_tablename,
        'FilterExpression': 'contains(#PK0, :val)',
        'ExpressionAttributeNames': {'#PK0': 'PK0'},
        'ExpressionAttributeValues':{':val': {STRING: '20202.0.0.0'}}
    }
    publications = []
    for response in paginator.paginate(**operation_parameters):
        publications.append(response['Items'])

    scanned_publications = []
    for publicationlist in publications:
        for item in publicationlist:
            scanned_publications.append(item)


    return scanned_publications


def delete_publications():
    resources = scan_resources()
    for resource in resources:
        publication = resource['data'][MAP]
        primary_partition_key = resource['PK0'][STRING]
        primary_sort_key = resource['SK0'][STRING]
        identifier = publication['identifier'][STRING]
        owner = ''
        if 'resourceOwner' in publication:
            owner = publication['resourceOwner'][MAP]['owner'][STRING]
        if 'owner' in publication:
            owner = publication['owner'][STRING]
        if '20202.0.0.0' in owner:
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
                                 json=new_publication,
                                 headers=headers)
        if response.status_code == 201:
            trying = False
        count = count + 1
        if count == 3:
            trying = False
            print('Too many tries...')
            print(response.json())
            raise RuntimeError('Failed to create Registration')
    return response.json()


def get_customer(username):
    response = requests.get(user_endpoint.format(
        STAGE, arp_dict[username]['username']), headers=headers)
    if response.status_code == 200:
        return response.json()['institution']
    return ''


def create_contributor(contributor):
    with open('./publications/contributors.json'
              ) as contributor_template_file:
        contributor_template = json.load(contributor_template_file)

        new_contributor = copy.deepcopy(contributor_template)
        new_contributor['email'] = contributor
        new_contributor['identity']['id'] = arp_dict[contributor]["cristinid"]
        new_contributor['identity']['name'] = arp_dict[contributor]["name"]
        return new_contributor


def create_publication_data(publication_template, test_publication, username, customer, status, today):
    new_publication = copy.deepcopy(publication_template)
    new_publication['entityDescription']['mainTitle'] = f'{test_publication["title"]} {today}'
    print(new_publication['entityDescription']['mainTitle'])
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
        'administrativeAgreement': False,
        'identifier': 'location',
        'license': {
            'identifier': 'CC0',
            'labels': {
                'nb': 'CC0'
            },
            'type': 'License'
        },
        'mimeType': 'application/pdf',
        'name': 'test_file_name',
        'publisherAuthority': False,
        'size': 'test_file_size',
        'type': 'UnpublishedFile',
        'administrativeAgreement': False
    }
    fileType = 'pdf'
    if 'fileType' in test_publication:
        fileType = test_publication['fileType']
    if 'embargoed' in test_publication:
        embargoDate = date.today() + timedelta(days=2)
        dateString = embargoDate.strftime('%Y-%m-%dT00:00:00Z')
        file['embargoDate'] = dateString

    file['name'] = fileTypes[fileType]['fileName']
    file['mimeType'] = fileTypes[fileType]['mimeType']
    file['identifier'] = locations[fileType]['location']
    file['size'] = locations[fileType]['filesize']

    new_publication['associatedArtifacts'].append(file)
    if 'administrativeAgreement' in test_publication:
        administrative_file = file.copy()
        administrative_file['type'] = 'UnpublishableFile'
        administrative_file['administrativeAgreement'] = test_publication['administrativeAgreement']
        administrative_file['mimeType'] = fileTypes['pdf']['mimeType']
        administrative_file['name'] = fileTypes['pdf']['fileName']
        new_publication['associatedArtifacts'].append(administrative_file)
    return new_publication


def create_test_publication(publication_template, test_publication):
    customer = get_customer(test_publication['owner']).replace(
        f'https://api.{STAGE}.nva.aws.unit.no/customer/', '')
    username = arp_dict[test_publication['owner']]['username']
    status = test_publication['status']

    today = date.today().strftime('%Y%m%d')

    new_publication = create_publication_data(
        publication_template=publication_template,
        test_publication=test_publication,
        username=username,
        customer=customer,
        status=status,
        today=today
    )

    return new_publication


def create_publications():
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
                test_publication=test_publication
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
                    approve_doi(identifier=identifier)

def publish_publication(identifier, username):
    publish_bearer_token = common.login(username=username)
    headers['Authorization'] = f'Bearer {publish_bearer_token}'
    payload = {
        'type': 'PublishingRequest'
    }
    response = requests.post(publish_endpoint.format(
        STAGE, identifier), json=payload, headers=headers)
    if response.status_code != 200:
        print(response.status_code)
        print(response.json())

def request_doi(identifier, username):
    request_bearer_token = common.login(username=username)
    headers['Authorization'] = f'Bearer {request_bearer_token}'
    doi_request_payload = {
        'type': 'DoiRequest',
        'message': 'Test'
    }
    response = requests.post(request_doi_endpoint.format(STAGE, identifier),
                             json=doi_request_payload, headers=headers)
    check_response(response, 200)

def approve_doi(identifier):
    time.sleep(5)
    request_bearer_token = common.login(username=username_curator)
    headers['Authorization'] = f'Bearer {request_bearer_token}'
    tickets = requests.get(tickets_endpoint.format(STAGE, identifier), headers=headers).json()
    ticket_id = ''
    for ticket in tickets['tickets']:
        if ticket['type'] == 'DoiRequest':
            ticket_id = ticket['identifier']
    if ticket_id != '':
        doi_request_payload = {
            'type': 'DoiRequest',
            'status': 'Completed',
        }
        response = requests.put(approve_doi_endpoint.format(STAGE, identifier, ticket_id),
                                json=doi_request_payload, headers=headers)
        check_response(response, 202)
    else:
        print('DoiRequest not found in tickets')

def check_response(response, status_code):
    if response.status_code != status_code:
        print(response.status_code)
        print(response.json())

def find_caller_identity():
    client = boto3.client('sts')
    response = client.get_caller_identity()
    print(response)


def run():
    print('publications...')
    bearer_token = common.login(username=username)
    headers['Authorization'] = f'Bearer {bearer_token}'
    map_user_to_arp()
    upload_file()
    delete_publications()
    create_publications()


if __name__ == '__main__':
    run()
