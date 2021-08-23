import { USER_WITH_AUTHOR } from './constants';

export const PERSON_API_PATH = '/person';

export const mockPersons = {};
mockPersons[USER_WITH_AUTHOR] = [
  {
    'id': 'https://api.dev.nva.aws.unit.no/person/1234567890',
    'name': 'TestUser, Withauthor(mock)',
    'feideids': ['test-user-with-author@test.no'],
    'orcids': ['test-user-with-author@test.no'],
    'orgunitids': ['https://api.cristin.no/v2/institutions/1111111111'],
    'birthDate': '',
    'handles': ['http://hdl.handle.net/11250.1/1234567890'],
  },
];
