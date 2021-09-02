import { USER_WITH_AUTHOR } from './constants';

export const PERSON_API_PATH = '/person';
export const PROJECT_API_PATH = '/project';

export const PROJECT_SEARCH_MOCK_FILE = 'mock_project_search.json';

export const MOCK_CRISTINID = ['1111111111', '2222222222', '3333333333'];
export const MOCK_INSTITUTION = ['Mock institution 1', 'Mock institution 2', 'Mock institution 3'];
export const MOCK_DEPARTMENT = ['Mock department 1', 'Mock department 2', 'Mock department 3'];

export const mockPersons = {};
mockPersons[USER_WITH_AUTHOR] = [
  {
    'id': 'https://api.dev.nva.aws.unit.no/person/1234567890',
    'name': 'TestUser, Withauthor',
    'feideids': ['test-user-with-author@test.no'],
    'orcids': ['test-user-with-author@test.no'],
    'orgunitids': ['https://api.cristin.no/v2/institutions/1111111111'],
    'birthDate': '',
    'handles': ['http://hdl.handle.net/11250.1/1234567890'],
  },
];

export const doiFetchResponse = {};
