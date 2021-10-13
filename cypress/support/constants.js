export const ORCID_BASE_URL = Cypress.env('REACT_APP_ORCID_BASE_URL');
export const ORCID_USER_INFO_URL = `${ORCID_BASE_URL}/oauth/userinfo`;
const ORCID_CLIENT_ID = Cypress.env('REACT_APP_ORCID_CLIENT_ID');
export const ORCID_SIGN_IN_URL = `${ORCID_BASE_URL}/signin?oauth&client_id=${ORCID_CLIENT_ID}&response_type=token&scope=openid&redirect_uri=${process.env.REACT_APP_ORCID_REDIRECT_URI}`;
export const FEIDE_IDENTITY_PROVIDER = 'FeideIdentityProvider';

export const FEIDE_ID_QUALIFIER = 'feideid';

export const API_URL = Cypress.env('REACT_APP_API_URL');

export const StatusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
};

export const AuthorityPaths = {
  PERSON: '/person',
};

export const USER_NO_ARP = 'test-user-no-arp@test.no';
export const USER_NAME_IN_ARP = 'test-user-name-in-arp@test.no';
export const USER_NO_NAME_IN_ARP = 'test-user-no-name-in-arp@test.no';
export const USER_CONNECT_ARP = 'test-user-connect-arp@test.no';
export const USER_NO_ORCID = 'test-user-no-orcid@test.no';
export const USER_CONNECT_ORCID = 'test-user-connect-orcid@test.no';
export const USER_CONNECT_AUTHOR = 'test-user-connect-author@test.no';
export const USER_WITH_AUTHOR = 'test-user-with-author@test.no';
export const USER_SAVE_REGISTRATION = 'test-user-save-registration@test.no';
export const USER_ADD_INSTITUTION = 'test-user-add-institution@test.no';
export const USER_CHANGE_INSTITUTION = 'test-user-change-institution@test.no';
export const USER_INSTITUTION_SUBUNIT = 'test-user-subunit@test.no';
export const USER_INSTITUTION_SUBSUBUNIT = 'test-user-subsubunit@test.no';
export const USER_INSTITUTION_SUBSUBSUBUNIT = 'test-user-subsubsubunit@test.no';
export const USER_WITH_INSTITUTION_REMOVE_INSTITUTION = 'test-user-with-institution-remove-institution@test.no';
export const USER_CURATOR_WITH_AUTHOR = 'test-user-curator@test.no';
export const USER_INST_ADMIN_WITH_AUTHOR = 'test-user-first-inst-admin@test.no';
export const USER_SECOND_INST_ADMIN_WITH_AUTHOR = 'test-user-second-inst-admin-1@test.no';
export const ADMIN_USER = 'test-user-app-admin@test.no';
export const TEST_USER = 'test-user-login@test.no';
export const USER_NO_ROLE = 'test-user-with-no-role@test.no';
export const USER_REMOVE_ORCID = 'test-user-remove-existing-orcid@test.no';
export const USER_NON_CUSTOMER = 'test-user-not-customer@test.no';
export const USER_DRAFT_DOI = 'test-user-draft-doi@test.no';
export const USER_RESOURCE_TYPE = 'test-user-resource-type@test.no';
export const USER_VIEW_REGISTRATION = 'test-user-view-registration@test.no';

const userData = {
  name: '',
  orgunitids: ['https://api.cristin.no/v2/institutions/1111111111'],
  feideid: true,
  orcid: true,
  inArp: true,
};

export const user = {
  [USER_NO_ARP]: { ...userData, name: 'TestUser, No ARP', feideid: false, orcid: false },
  [USER_NAME_IN_ARP]: { ...userData, name: 'TestUser, Name in ARP', feideid: false, orcid: false },
  [USER_NO_NAME_IN_ARP]: { ...userData, name: '', orgunitids: [], feideid: false, orcid: false, inArp: false },
  [USER_CONNECT_ARP]: { ...userData, name: 'TestUser, Connect ARP', feideid: false, orcid: false },
  [USER_NO_ORCID]: { ...userData, name: 'TestUser, No ORCID', orcid: false },
  [USER_CONNECT_AUTHOR]: {
    ...userData,
    name: 'TestUser, Connect Author',
    orgunitids: [],
    feideid: false,
    orcid: false,
    inArp: false,
  },
  [USER_CONNECT_ORCID]: { ...userData, name: 'TestUser, Connect ORCID', feideid: false, orcid: false },
  [USER_WITH_AUTHOR]: { ...userData, name: 'TestUser, Withauthor' },
  [USER_SAVE_REGISTRATION]: { ...userData, name: 'TestUser, Save Registration' },
  [USER_ADD_INSTITUTION]: { ...userData, name: 'TestUser, Add institution' },
  [USER_CHANGE_INSTITUTION]: { ...userData, name: 'TestUser, Change institution' },
  [USER_INSTITUTION_SUBUNIT]: { ...userData, name: 'TestUser, Subunit' },
  [USER_INSTITUTION_SUBSUBUNIT]: { ...userData, name: 'TestUser, Subsubunit' },
  [USER_INSTITUTION_SUBSUBSUBUNIT]: { ...userData, name: 'TestUser, Subsubsubunit' },
  [USER_WITH_INSTITUTION_REMOVE_INSTITUTION]: {
    ...userData,
    name: 'TestUser, Remove institution',
  },
  [USER_CURATOR_WITH_AUTHOR]: { ...userData, name: 'TestUser, Curator' },
  [USER_INST_ADMIN_WITH_AUTHOR]: { ...userData, name: 'TestUser, Institution-admin' },
  [USER_SECOND_INST_ADMIN_WITH_AUTHOR]: { ...userData, name: 'TestUser, Second Institution-admin-1' },
  [ADMIN_USER]: { ...userData, name: 'TestUser, App-admin' },
  [USER_NO_ROLE]: { ...userData, name: 'TestUser, No role' },
  [USER_REMOVE_ORCID]: { ...userData, name: 'TestUser, Remove orcid' },
  [USER_NON_CUSTOMER]: { ...userData, name: 'TestUser, Not customer' },
  [USER_DRAFT_DOI]: { ...userData, name: 'TestUser, Draft DOI' },
  [USER_RESOURCE_TYPE]: { ...userData, name: 'TestUser, Resource type' },
  [USER_VIEW_REGISTRATION]: { ...userData, name: 'TestUser, View registration' },
};
