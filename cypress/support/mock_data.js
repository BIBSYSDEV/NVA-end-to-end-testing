import { user } from './constants';

const stage = Cypress.env('STAGE');

export const PERSON_API_PATH = `https://api.${stage}.nva.aws.unit.no/person`;
export const PROJECT_API_PATH = `https://api.${stage}.nva.aws.unit.no/project`;

export const PROJECT_SEARCH_MOCK_FILE = 'mock_project_search.json';
export const JOURNAL_SEARCH_MOCK_FILE = 'mock_journals.json';

export const MOCK_CRISTINID = ['1111111111', '2222222222', '3333333333'];
export const MOCK_INSTITUTION = ['Mock institution 1', 'Mock institution 2', 'Mock institution 3'];
export const MOCK_DEPARTMENT = ['Mock department 1', 'Mock department 2', 'Mock department 3'];

const mockPersonData = {
  'id': `https://api.${stage}.nva.aws.unit.no/person/1234567890`,
  'name': '',
  'feideids': [],
  'orcids': [],
  'orgunitids': ['https://api.cristin.no/v2/institutions/1111111111'],
  'birthDate': '',
  'handles': ['http://hdl.handle.net/11250.1/1234567890'],
};

export const mockPersonFeideIdSearch = (userId) => {
  return user[userId].feideid ? mockPersonNameSearch(userId) : [];
};

export const mockPersonNameSearch = (userId) => {
  return user[userId].inArp ? [mockPerson(userId)] : [];
};

export const mockPerson = (userId) => {
  return {
    ...mockPersonData,
    name: user[userId].name,
    feideids: user[userId].feideid ? [userId] : [],
    orcids: user[userId].orcid ? [userId] : [],
    orgunitids: user[userId].orgunitids,
  };
};

export const doiFetchResponse = {};
