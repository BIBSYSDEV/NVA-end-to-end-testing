export const orcidBaseUrl = Cypress.env('REACT_APP_ORCID_BASE_URL');
export const orcidUserInfoUrl = `${orcidBaseUrl}/oauth/userinfo`;
const orcidClientId = Cypress.env('REACT_APP_ORCID_CLIENT_ID');
export const orcidSignInUrl = `${orcidBaseUrl}/signin?oauth&client_id=${orcidClientId}&response_type=token&scope=openid&redirect_uri=${process.env.REACT_APP_ORCID_REDIRECT_URI}`;
export const feideIdentityProvider = 'FeideIdentityProvider';

export const feideIdQualifier = 'feideid';

export const apiUrl = Cypress.env('REACT_APP_API_URL');

export const StatusCode = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
};

export const AuthorityPaths = {
  person: '/person',
};

export const userNoArp = 'test-user-no-arp@test.no';
export const userNameInArp = 'test-user-name-in-arp@test.no';
export const userNoNameInArp = 'test-user-no-name-in-arp@test.no';
export const userConnectArp = 'test-user-connect-arp@test.no';
export const userNoOrcid = 'test-user-no-orcid@test.no';
export const userConnectOrcid = 'test-user-connect-orcid@test.no';
export const userConnectAuthor = 'test-user-connect-author@test.no';
export const userWithAuthor = 'test-user-with-author@test.no';
export const userSaveRegistration = 'test-user-save-registration@test.no';
export const userAddInstitution = 'test-user-add-institution@test.no';
export const userChangeInstitution = 'test-user-change-institution@test.no';
export const userInstitutionSubunit = 'test-user-subunit@test.no';
export const userInstitutionSubsubunit = 'test-user-subsubunit@test.no';
export const userInstitutionSubsubsubunit = 'test-user-subsubsubunit@test.no';
export const userWithInstitutionRemoveInstitution = 'test-user-with-institution-remove-institution@test.no';
export const userCuratorWithAuthor = 'test-user-curator@test.no';
export const userInstAdminWithAuthor = 'test-user-first-inst-admin@test.no';
export const userSecondInstAdminWithAuthor = 'test-user-second-inst-admin-1@test.no';
export const adminUser = 'test-user-app-admin@test.no';
export const testUser = 'test-user-login@test.no';
export const userNoRole = 'test-user-with-no-role@test.no';
export const userRemoveOrcid = 'test-user-remove-existing-orcid@test.no';
export const userNonCustomer = 'test-user-not-customer@test.no';
export const userDraftDoi = 'test-user-draft-doi@test.no';
export const userCuratorDraftDoi = 'test-user-curator-draft-doi@test.no';
export const userResourceType = 'test-user-resource-type@test.no';
export const userViewRegistration = 'test-user-view-registration@test.no';
export const userEditor = 'test-user-editor@test.no';

const userData = {
  name: '',
  orgunitids: ['https://api.cristin.no/v2/institutions/1111111111'],
  feideid: true,
  orcid: true,
  inArp: true,
};

export const user = {
  [userNoArp]: { ...userData, name: 'TestUser, No ARP', feideid: false, orcid: false },
  [userNameInArp]: { ...userData, name: 'TestUser, Name in ARP', feideid: false, orcid: false },
  [userNoNameInArp]: { ...userData, name: '', orgunitids: [], feideid: false, orcid: false, inArp: false },
  [userConnectArp]: { ...userData, name: 'TestUser, Connect ARP', feideid: false, orcid: false },
  [userNoOrcid]: { ...userData, name: 'TestUser, No ORCID', orcid: false },
  [userConnectAuthor]: {
    ...userData,
    name: 'TestUser, Connect Author',
    orgunitids: [],
    feideid: false,
    orcid: false,
    inArp: false,
  },
  [userConnectOrcid]: { ...userData, name: 'TestUser, Connect ORCID', feideid: false, orcid: false },
  [userWithAuthor]: { ...userData, name: 'TestUser, Withauthor' },
  [userSaveRegistration]: { ...userData, name: 'TestUser, Save Registration' },
  [userAddInstitution]: { ...userData, name: 'TestUser, Add institution' },
  [userChangeInstitution]: { ...userData, name: 'TestUser, Change institution' },
  [userInstitutionSubunit]: { ...userData, name: 'TestUser, Subunit' },
  [userInstitutionSubsubunit]: { ...userData, name: 'TestUser, Subsubunit' },
  [userInstitutionSubsubsubunit]: { ...userData, name: 'TestUser, Subsubsubunit' },
  [userWithInstitutionRemoveInstitution]: {
    ...userData,
    name: 'TestUser, Remove institution',
  },
  [userCuratorWithAuthor]: { ...userData, name: 'TestUser, Curator' },
  [userInstAdminWithAuthor]: { ...userData, name: 'TestUser, Institution-admin' },
  [userSecondInstAdminWithAuthor]: { ...userData, name: 'TestUser, Second Institution-admin-1' },
  [adminUser]: { ...userData, name: 'TestUser, App-admin' },
  [userNoRole]: { ...userData, name: 'TestUser, No role' },
  [userRemoveOrcid]: { ...userData, name: 'TestUser, Remove orcid' },
  [userNonCustomer]: { ...userData, name: 'TestUser, Not customer' },
  [userDraftDoi]: { ...userData, name: 'TestUser, Draft DOI' },
  [userCuratorDraftDoi]: { ...userData, name: 'TestUser, Curator Draft DOI' },
  [userResourceType]: { ...userData, name: 'TestUser, Resource type' },
  [userViewRegistration]: { ...userData, name: 'TestUser, View registration' },
  [userEditor]: { ...userData, name: 'TestUser, Editor' },
};
