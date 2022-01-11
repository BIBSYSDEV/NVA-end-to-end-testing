import { user } from './constants';

const stage = Cypress.env('STAGE') ?? 'dev';

export const PERSON_API_PATH = `https://api.${stage}.nva.aws.unit.no/person`;
export const projectApiPath = `https://api.${stage}.nva.aws.unit.no/cristin/project`;

export const projectSearchMockFile = 'mock_project_search.json';
export const journalSearchMockFile = 'mock_journals.json';

export const mockCristinid = ['1111111111', '2222222222', '3333333333'];
export const mockInstitution = ['Mock institution 1', 'Mock institution 2', 'Mock institution 3'];
export const mockDepartment = ['Mock department 1', 'Mock department 2', 'Mock department 3'];

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
