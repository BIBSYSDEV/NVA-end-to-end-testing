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
  id: `https://api.${stage}.nva.aws.unit.no/person/1234567890`,
  name: '',
  feideids: [],
  orcids: [],
  orgunitids: ['https://api.cristin.no/v2/institutions/1111111111'],
  birthDate: '',
  handles: ['http://hdl.handle.net/11250.1/1234567890'],
};

export const mockPersonFeideIdSearch = (userId) => {
  return user[userId].feideid ? mockPerson(userId) : [];
};

export const mockPersonNameSearch = (userId) => {
  return user[userId].inArp ? mockPersonSearch(userId) : [];
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

export const mockPersonSearch = (userId) => {
  const firstName = user[userId].name.split(', ')[1];
  const lastName = user[userId].name.split(', ')[0];

  return {
    id: 'https://api.dev.nva.aws.unit.no/cristin/person?name=TestUser&page=1&results=1',
    processingTime: 10,
    size: 2,
    hits: [
      {
        id: 'https://api.dev.nva.aws.unit.no/cristin/person/1',
        identifiers: [
          {
            type: 'CristinIdentifier',
            value: '1',
          },
        ],
        names: [
          {
            type: 'LastName',
            value: lastName,
          },
          {
            type: 'FirstName',
            value: firstName,
          },
        ],
        affiliations: [
          {
            'type': 'Affiliation',
            'organization': 'https://api.dev.nva.aws.unit.no/cristin/organization/20202.0.0.0',
            'active': true,
            'role': {
              'type': 'Role',
              'id': 'https://example.org/link/to/ontology#1026',
              'labels': {
                'en': 'Research fellow',
                'nb': 'Stipendiat',
              },
            },
          },
        ],
      },
    ],
  };
};

export const doiFetchResponse = {};
