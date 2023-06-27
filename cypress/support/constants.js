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
export const userWithAuthor1 = 'test-user-with-author-1@test.no';
export const userWithAuthor2 = 'test-user-with-author-2@test.no';
export const userWithAuthor3 = 'test-user-with-author-3@test.no';
export const userWithAuthor4 = 'test-user-with-author-4@test.no';
export const userWithAuthor5 = 'test-user-with-author-5@test.no';
export const userWithAuthor6 = 'test-user-with-author-6@test.no';
export const userWithAuthor7 = 'test-user-with-author-7@test.no';
export const userWithAuthor8 = 'test-user-with-author-8@test.no';
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
export const userDraftDoi2 = 'test-user-draft-doi-2@test.no';
export const userCuratorDraftDoi = 'test-user-curator-draft-doi@test.no';
export const userResourceTypeBook = 'test-user-resource-type-book@test.no';
export const userResourceTypeChapter = 'test-user-resource-type-chapter@test.no';
export const userResourceTypeJournal = 'test-user-resource-type-journal@test.no';
export const userResourceTypeDegree = 'test-user-resource-type-degree@test.no';
export const userResourceTypeMedia = 'test-user-resource-type-media@test.no';
export const userResourceTypePresentation = 'test-user-resource-type-presentation@test.no';
export const userResourceTypeReport = 'test-user-resource-type-report@test.no';
export const userResourceTypeArchitecture = 'test-user-resource-type-architecture@test.no';
export const userViewRegistration = 'test-user-view-registration@test.no';
export const userEditor = 'test-user-editor@test.no';
export const userMyRegistrations = 'test-user-my-registrations@test.no';
export const userFetchDoi = 'test-user-doi-fetch@test.no';
export const userContributor = 'test-user-contributor@test.no';
export const userFilm = 'test-user-film@test.no';
export const userArtistic = 'test-user-artistic@test.no';
export const userDesign = 'test-user-design@test.no';
export const userMusic = 'test-user-music@test.no';
export const userLogout = 'test-user-logout@test.no';
export const userPerformingArts = 'test-user-performing-arts@test.no';
export const userRequestSupport = 'test-user-open-request-support@test.no';
export const userOpenMyRegistrations = 'test-user-open-my-registrations@test.no';
export const userResearchDataDmp = 'test-user-research-data-dmp@test.no';
export const userPublishedRegistration = 'test-user-published-registration@test.no';
export const userLiteraryArts = 'test-user-literary-arts@test.no';
export const userFilesAndLicense = 'test-user-files-and-license@test.no';
export const userSaveJournal = 'test-user-save-journal@test.no';
export const userSaveBook = 'test-user-save-book@test.no';
export const userSaveReport = 'test-user-save-report@test.no';
export const userSaveThesis = 'test-user-save-thesis@test.no';
export const userSavePartOfBook = 'test-user-save-part-of-book@test.no';
export const userSavePresentation = 'test-user-save-presentation@test.no';
export const userSaveArtisticResult = 'test-user-save-artistic-result@test.no';
export const userSaveMediaContribution = 'test-user-save-media-contribution@test.no';
export const userSaveResearchData = 'test-user-save-research-data@test.no';
export const userSaveExhibition = 'test-user-save-exhibition@test.no';
export const userPublishNoRights = 'test-user-publish-no-rights@test.no';
export const userCurator = 'test-user-second-inst-curator-5@test.no';
export const userPublishRegistration = 'test-user-publish-registration@test.no';
export const userResearchDataset = 'test-user-research-dataset@test.no';
export const userSecondEditor = 'test-user-second-editor@test.no';
export const userContributors = 'test-user-contributors@test.no';
export const userProjectManager = 'test-user-project-manager@test.no';
export const userMessages = 'test-user-messages@test.no';
export const userCancelDelete = 'test-user-cancel-delete@test.no';

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
  [userWithAuthor1]: { ...userData, name: 'TestUser, Withauthor 1' },
  [userWithAuthor2]: { ...userData, name: 'TestUser, Withauthor 2' },
  [userWithAuthor3]: { ...userData, name: 'TestUser, Withauthor 3' },
  [userWithAuthor4]: { ...userData, name: 'TestUser, Withauthor 4' },
  [userWithAuthor5]: { ...userData, name: 'TestUser, Withauthor 5' },
  [userWithAuthor6]: { ...userData, name: 'TestUser, Withauthor 6' },
  [userWithAuthor5]: { ...userData, name: 'TestUser, Withauthor 7' },
  [userWithAuthor6]: { ...userData, name: 'TestUser, Withauthor 8' },
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
  [userDraftDoi2]: { ...userData, name: 'TestUser, Draft DOI 2' },
  [userCuratorDraftDoi]: { ...userData, name: 'TestUser, Curator Draft DOI' },
  [userResourceTypeBook]: { ...userData, name: 'TestUser, Resource type book' },
  [userResourceTypeChapter]: { ...userData, name: 'TestUser, Resource type chapter' },
  [userResourceTypeJournal]: { ...userData, name: 'TestUser, Resource type journal' },
  [userResourceTypeDegree]: { ...userData, name: 'TestUser, Resource type degree' },
  [userResourceTypeMedia]: { ...userData, name: 'TestUser, Resource type media' },
  [userResourceTypePresentation]: { ...userData, name: 'TestUser, Resource type presentation' },
  [userResourceTypeReport]: { ...userData, name: 'TestUser, Resource type report' },
  [userResourceTypeArchitecture]: { ...userData, name: 'TestUser, Resource type architecture' },
  [userViewRegistration]: { ...userData, name: 'TestUser, View registration' },
  [userEditor]: { ...userData, name: 'TestUser, Editor' },
  [userMyRegistrations]: { ...userData, name: 'TestUser, MyRegistrations' },
  [userFetchDoi]: { ...userData, name: 'TestUser, Fetch Doi' },
  [userContributor]: { ...userData, name: 'TestUser, Contributor' },
  [userFilm]: { ...userData, name: 'TestUser, Film' },
  [userArtistic]: { ...userData, name: 'TestUser, Artistic' },
  [userDesign]: { ...userData, name: 'TestUser, Design' },
  [userMusic]: { ...userData, name: 'TestUser, Music' },
  [userLogout]: { ...userData, name: 'TestUser, Log out' },
  [userPerformingArts]: { ...userData, name: 'TestUser, Performing arts' },
  [userRequestSupport]: { ...userData, name: 'TestUser, Request support' },
  [userOpenMyRegistrations]: { ...userData, name: 'TestUser, Open my registrations' },
  [userResearchDataDmp]: { ...userData, name: 'TestUser, Research data dmp' },
  [userPublishedRegistration]: { ...userData, name: 'TestUser, Published registration' },
  [userLiteraryArts]: { ...userData, name: 'TestUser, Literary arts' },
  [userFilesAndLicense]: { ...userData, name: 'TestUser, Files and license' },
  [userSaveJournal]: { ...userData, name: 'TestUser, Save journal' },
  [userSaveBook]: { ...userData, name: 'TestUser, Save book' },
  [userSaveReport]: { ...userData, name: 'TestUser, Save report' },
  [userSaveThesis]: { ...userData, name: 'TestUser, Save thesis' },
  [userSavePartOfBook]: { ...userData, name: 'TestUser, Save part of book' },
  [userSavePresentation]: { ...userData, name: 'TestUser, Save presentation' },
  [userSaveArtisticResult]: { ...userData, name: 'TestUser, Save artistic result' },
  [userSaveMediaContribution]: { ...userData, name: 'TestUser, Save media presentation' },
  [userSaveResearchData]: { ...userData, name: 'TestUser, Save research data' },
  [userSaveExhibition]: { ...userData, name: 'TestUser, Save exhibition' },
  [userPublishNoRights]: { ...userData, name: 'TestUser, Publish registration no rights' },
  [userCurator]: { ...userData, name: 'TestUser, Curator 1' },
  [userPublishRegistration]: { ...userData, name: 'TestUser, Publish registration' },
  [userResearchDataset]: { ...userData, name: 'TestUser, Research dataset' },
  [userSecondEditor]: { ...userData, name: 'TestUser, Second Institution-Editor' },
  [userContributors]: { ...userData, name: 'TestUser, Contributors' },
  [userProjectManager]: { ...userData, name: 'TestUser, Project manager' },
  [userMessages]: { ...userData, name: 'TestUser, Messages' },
  [userCancelDelete]: { ...userData, name: 'TestUser, Cancel delete' },
};
