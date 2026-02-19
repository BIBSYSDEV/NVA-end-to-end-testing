import boto3
import json
import copy
import requests
import os
import common
import time
from datetime import datetime, date, timedelta
import babel
import sys

dynamodb_client = boto3.client('dynamodb')
s3_client = boto3.client('s3')
ssm = boto3.client('ssm')
cognito_client = boto3.client('cognito-idp')
lambda_client = boto3.client('lambda')

publications_tablename = ssm.get_parameter(Name='/test/ResourceTable',
                                           WithDecryption=False)['Parameter']['Value']
user_tablename = ssm.get_parameter(Name='/test/UserTable',
                                   WithDecryption=False)['Parameter']['Value']
nvi_tablename = ssm.get_parameter(Name='/test/NviTable',
                                   WithDecryption=False)['Parameter']['Value']
favorites_tablename = ssm.get_parameter(Name='/test/FavoritesTable',
                                   WithDecryption=False)['Parameter']['Value']
s3_bucket_name = ssm.get_parameter(Name='/test/ResourceS3Bucket',
                                   WithDecryption=False)['Parameter']['Value']
STAGE = ssm.get_parameter(Name='/test/Stage',
                          WithDecryption=False)['Parameter']['Value']
USER_POOL_ID = ssm.get_parameter(Name='/CognitoUserPoolId',
                                 WithDecryption=False)['Parameter']['Value']
CLIENT_ID = ssm.get_parameter(Name='/CognitoUserPoolAppClientId',
                              WithDecryption=False)['Parameter']['Value']
deleteSearchIndexLambda = 'master-pipelines-NvaSearchApi-DeleteIndicesHandler-EKKiXwO7Iu8y'
searchInitHandlerLambda = 'master-pipelines-NvaSearchApiClientPip-InitHandler-LEwtReql7EUp'
deleteNviIndexLambda = 'master-pipelines-NvaNvi-1-DeleteNviCandidateIndexH-zfxYODFdVnjs'
nviInitHandlerLambda = 'master-pipelines-NvaNvi-1V33HP5I7F42I--InitHandler-IX8ystUbVaIG'

username = 'admin-user-testdata@test.no'

bearer_tokens = {}
headers = {
    'Authorization': 'Bearer',
    'accept': 'application/json'
}

STRING = 'S'
MAP = 'M'

def delete_indices():
    print("Deleting OpenSearch indices...")
    delete_handlers = [deleteNviIndexLambda, deleteSearchIndexLambda]
    for handler in delete_handlers:
        response = lambda_client.invoke(FunctionName=handler, Payload=json.dumps('{"indices": [ "resources", "tickets", "import-candidates" ]}'))
        if response['StatusCode'] != 200:
            print(response)
    time.sleep(30)
    print("Finished deleting OpenSearch indices")

def create_indices():
    print("Creating OpenSearch indices...")
    create_handlers = [nviInitHandlerLambda, searchInitHandlerLambda]
    for handler in create_handlers:
        response = lambda_client.invoke(FunctionName=handler)
        if response['StatusCode'] != 200:
            print(response)
    time.sleep(30)
    print("Finished creating OpenSearch indices")



def scan_resources():
    print('scanning resources')
    paginator = dynamodb_client.get_paginator('scan')
    operation_parameters = {
        'TableName': publications_tablename
    }
    publications = []
    for response in paginator.paginate(**operation_parameters):
        publications.append(response['Items'])

    scanned_publications = []
    for publicationlist in publications:
        for item in publicationlist:
            scanned_publications.append(item)

    return scanned_publications

def scan_candidates():
    print('scanning NVI candidates')
    paginator = dynamodb_client.get_paginator('scan')
    operation_parameters = {
        'TableName': nvi_tablename
    }
    candidates = []
    for response in paginator.paginate(**operation_parameters):
        candidates.append(response['Items'])

    scanned_candidates = []
    for candidatelist in candidates:
        for item in candidatelist:
            scanned_candidates.append(item)

    return scanned_candidates


def delete_publications():
    resources = scan_resources()
    for resource in resources:
        primary_partition_key = resource['PK0'][STRING]
        primary_sort_key = resource['SK0'][STRING]
        print(
            f'Deleting {primary_partition_key}')
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
    candidates = scan_candidates()
    for candidate in candidates:
        primary_partition_key = candidate['PrimaryKeyHashKey'][STRING]
        primary_sort_key = candidate['PrimaryKeyRangeKey'][STRING]
        if primary_partition_key != 'PERIOD':
            print(f'deleting nvi candidate {primary_partition_key}')
            response = dynamodb_client.delete_item(
                TableName=nvi_tablename,
                Key={
                    'PrimaryKeyHashKey': {
                        STRING: primary_partition_key
                    },
                    'PrimaryKeyRangeKey': {
                        STRING: primary_sort_key
                    }
                })
    return


def run():
    print('publications...')
    bearer_token = common.login(username=username)
    headers['Authorization'] = f'Bearer {bearer_token}'
    delete_indices()
    create_indices()
    delete_publications()

if __name__ == '__main__':
    if len(sys.argv) > 1:
        test_publications_file_name = sys.argv[1]

    run()
