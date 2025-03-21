import boto3
import os
from botocore.exceptions import ClientError
import logging
from pathlib import Path
import glob

def upload_dir(localDir, awsInitDir, bucketName, tag, prefix='/'):
    """
    from current working directory, upload a 'localDir' with all its subcontents (files and subdirectories...)
    to a aws bucket
    Parameters
    ----------
    localDir :   localDirectory to be uploaded, with respect to current working directory
    awsInitDir : prefix 'directory' in aws
    bucketName : bucket in aws
    tag :        tag to select files, like *png
                 NOTE: if you use tag it must be given like --tag '*txt', in some quotation marks... for argparse
    prefix :     to remove initial '/' from file names

    Returns
    -------
    None
    """
    s3_client = boto3.client('s3')
    cwd = str(Path.cwd())
    p = Path(os.path.join(Path.cwd(), localDir))
    mydirs = list(p.glob('**'))
    print(mydirs)
    for mydir in mydirs:
        fileNames = glob.glob(os.path.join(mydir, tag))
        fileNames = [f for f in fileNames if not Path(f).is_dir()]
        rows = len(fileNames)
        for i, fileName in enumerate(fileNames):
            fileName = str(fileName).replace(cwd, '')
            fileName = fileName.replace('\\', '/')
            if fileName.startswith(prefix):  # only modify the text if it starts with the prefix
                fileName = fileName.replace(prefix, "", 1) # remove one instance of prefix
            print(f"fileName {fileName}")

            awsPath = os.path.join(awsInitDir, str(fileName))
            awsPath = str(awsPath).replace(localDir + '/', '')
            s3_client.upload_file(fileName, bucketName, awsPath)

def generate_test_files():
    print('Generating test files')
    # les template
    # les liste med forfatter, tittel (og kategori?)
    # generer filer fra liste


def upload_test_files():
    print('Uploading test files')

def run():
    print('running')
    bucketName = 'brage-migration-input-files-282305091481'
    upload_dir('external_import_files', '', bucketName=bucketName, tag='*')

if __name__ == '__main__':
    run()
