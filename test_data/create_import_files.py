import copy
import json
from datetime import datetime
import uuid
import os
import shutil

contributor_template = {
        "type":"Contributor",
        "brageRole":"author",
        "role":"Creator",
        "identity":{
            "type":"Identity",
            "name":"",
            "identifier":""
            },
        "sequence":1
    }

def add_contributors(import_publication, import_file):
    print('Creating contributors')
    contributor_count = 0
    for contributor in import_publication['authors']:
        contributor_count += 1
        new_contributor= copy.deepcopy(contributor_template)
        new_contributor['sequence'] = contributor_count
        new_contributor['identity']['name'] = contributor['name']
        if 'identifier' in contributor:
            new_contributor['identity']['identifier'] = contributor['identifier']
        import_file['entityDescription']['contributors'].append(new_contributor)

def add_date(import_file):
    today = datetime.now()
    year = today.strftime('%Y')
    month = today.strftime('%m')
    day = today.strftime('%d')
    brage_date = f'{year}-{month}-{day}'

    import_file['publishedDate']['brage'].append(f'{brage_date}T01:01:01Z')
    import_file['publishedDate']['nva'] = f'{brage_date}T01:01:01Z'
    import_file['entityDescription']['publicationDate']['brage'] = brage_date
    import_file['entityDescription']['publicationDate']['nva']['year'] = year
    import_file['entityDescription']['publicationDate']['nva']['month'] = month
    import_file['entityDescription']['publicationDate']['nva']['day'] = day

def write_files(import_file):
    print('Writing file...')
    metadata_file_name = import_file['id'].split('/')[-1]
    metadata_file_name = f'{metadata_file_name}.json'
    file_name = import_file['recordContent']['contentFiles'][0]['identifier']
    file_path = f'./external_import_files/{import_file["customer"]["name"]}/{import_file["brageLocation"]}'
    print(f'{file_path}/{metadata_file_name}')
    os.makedirs(file_path)
    with open(f'{file_path}/{metadata_file_name}', 'w') as file:
        file.write(json.dumps(import_file, indent=4))
    shutil.copyfile('./external_templates/example.txt', f'{file_path}/{file_name}')

def run():
    print('Creating import files')
    with open('./external_templates/import_file_template.json'
              ) as import_template_file:
        import_template = json.load(import_template_file)
        with open('./external_templates/import_publications.json') as import_publications_file:
            import_publications = json.load(import_publications_file)
            handle_id = 1000
            brage_id = 10
            for import_publication in import_publications:
                handle_id += 1
                brage_id += 1

                import_file = copy.deepcopy(import_template)
                print(f'Creating import file for {import_publication["title"]}')
                handle = f'{import_publication["handle"]}{handle_id}'
                import_file['id'] = handle

                brage_location = f'123456/{brage_id}'
                import_file['brageLocation'] = brage_location

                add_date(import_file)

                import_file['entityDescription']['mainTitle'] = import_publication['title']
                file_id = str(uuid.uuid4())
                import_file['recordContent']['contentFiles'][0]['identifier'] = file_id

                add_contributors(import_publication=import_publication, import_file=import_file)

                write_files(import_file=import_file)

if __name__ == '__main__':
    run()
