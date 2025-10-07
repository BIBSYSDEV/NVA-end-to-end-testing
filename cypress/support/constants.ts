export const orcidBaseUrl = Cypress.env('REACT_APP_ORCID_BASE_URL');
export const orcidUserInfoUrl = `${orcidBaseUrl}/oauth/userinfo`;
const orcidClientId = Cypress.env('REACT_APP_ORCID_CLIENT_ID');
// export const orcidSignInUrl = `${orcidBaseUrl}/signin?oauth&client_id=${orcidClientId}&response_type=token&scope=openid&redirect_uri=${process.env.REACT_APP_ORCID_REDIRECT_URI}`;
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

export enum FileVersions {
  ACCEPTED,
  PUBLISHED,
  NOT_SET,
}

export const userUnitWithAuthor = 'test-user-with-author@test.no';
export const userUnitWithAuthor1 = 'test-user-with-author-1@test.no';
export const userUnitWithAuthor2 = 'test-user-with-author-2@test.no';
export const userUnitWithAuthor3 = 'test-user-with-author-3@test.no';
export const userUnitWithAuthor4 = 'test-user-with-author-4@test.no';
export const userUnitWithAuthor5 = 'test-user-with-author-5@test.no';
export const userUnitWithAuthor6 = 'test-user-with-author-6@test.no';
export const userUnitWithAuthor7 = 'test-user-with-author-7@test.no';
export const userUnitWithAuthor8 = 'test-user-with-author-8@test.no';
export const userUnitSaveRegistration = 'test-user-save-registration@test.no';
export const userUnitAddInstitution = 'test-user-add-institution@test.no';
export const userUnitChangeInstitution = 'test-user-change-institution@test.no';
export const userUnitWithInstitutionRemoveInstitution = 'test-user-with-institution-remove-institution@test.no';
export const userUnitCurator = 'test-user-curator@test.no';
export const userUnitInstAdmin = 'test-user-first-inst-admin@test.no';
export const adminUserUnit = 'test-user-app-admin@test.no';
export const adminUserUnit1 = 'test-user-app-admin-1@test.no';
export const userUnitNoRole = 'test-user-with-no-role@test.no';
export const userUnitRemoveOrcid = 'test-user-remove-existing-orcid@test.no';
export const userUnitDraftDoi = 'test-user-draft-doi@test.no';
export const userUnitDraftDoi2 = 'test-user-draft-doi-2@test.no';
export const userUnitCuratorDraftDoi = 'test-user-curator-draft-doi@test.no';
export const userUnitResourceTypeBook = 'test-user-resource-type-book@test.no';
export const userUnitResourceTypeChapter = 'test-user-resource-type-chapter@test.no';
export const userUnitResourceTypeJournal = 'test-user-resource-type-journal@test.no';
export const userUnitResourceTypeDegree = 'test-user-resource-type-degree@test.no';
export const userUnitResourceTypeMedia = 'test-user-resource-type-media@test.no';
export const userUnitResourceTypePresentation = 'test-user-resource-type-presentation@test.no';
export const userUnitResourceTypeReport = 'test-user-resource-type-report@test.no';
export const userUnitResourceTypeArchitecture = 'test-user-resource-type-architecture@test.no';
export const userUnitViewRegistration = 'test-user-view-registration@test.no';
export const userUnitEditor = 'test-user-editor@test.no';
export const userUnitEditor1 = 'test-user-editor-1@test.no';
export const userUnitEditor2 = 'test-user-editor-2@test.no';
export const userUnitEditor3 = 'test-user-editor-3@test.no';
export const userUnitEditor4 = 'test-user-editor-4@test.no';
export const userUnitEditor5 = 'test-user-editor-5@test.no';
export const userUnitMyRegistrations = 'test-user-my-registrations@test.no';
export const userUnitFetchDoi = 'test-user-doi-fetch@test.no';
export const userUnitFilm = 'test-user-film@test.no';
export const userUnitArtistic = 'test-user-artistic@test.no';
export const userUnitDesign = 'test-user-design@test.no';
export const userUnitMusic = 'test-user-music@test.no';
export const userUnitPerformingArts = 'test-user-performing-arts@test.no';
export const userUnitLiteraryArts = 'test-user-literary-arts@test.no';
export const userUnitLogout = 'test-user-logout@test.no';
export const userUnitRequestSupport = 'test-user-open-request-support@test.no';
export const userUnitOpenMyRegistrations = 'test-user-open-my-registrations@test.no';
export const userUnitResearchDataDmp = 'test-user-dmp@test.no';
export const userUnitPublishedRegistration = 'test-user-published-registration@test.no';
export const userUnitFilesAndLicense = 'test-user-files-and-license@test.no';
export const userUnitSaveJournal = 'test-user-save-journal@test.no';
export const userUnitSaveBook = 'test-user-save-book@test.no';
export const userUnitSaveReport = 'test-user-save-report@test.no';
export const userUnitSaveThesis = 'test-user-save-thesis@test.no';
export const userUnitSavePartOfBook = 'test-user-save-part-of-book@test.no';
export const userUnitSavePresentation = 'test-user-save-presentation@test.no';
export const userUnitSaveArtisticResult = 'test-user-save-artistic-result@test.no';
export const userUnitSaveMediaContribution = 'test-user-save-media-contribution@test.no';
export const userUnitSaveResearchData = 'test-user-save-research-data@test.no';
export const userUnitSaveExhibition = 'test-user-save-exhibition@test.no';
export const userUnitResearchDataset = 'test-user-research-dataset@test.no';
export const userUnitContributors = 'test-user-contributors@test.no';
export const userUnitProjectManager = 'test-user-project-manager@test.no';
export const userUnitCancelDelete = 'test-user-cancel-delete@test.no';
export const userUnitTestMenu = 'test-user-menu@test.no';
export const userUnitEditRegistration = 'test-user-edit-registration@test.no';
export const userUnitVisualArts = 'test-user-visual-arts@test.no';
export const userUnitFavorite1 = 'test-user-favorite@test.no';
export const userUnitFavorite2 = 'test-user-second-favorite@test.no';
export const userUnitFavorite3 = 'test-user-third-favorite@test.no';
export const userUnitDeleteRegistrations = 'test-user-delete-registrations@test.no';
export const userUnitCuratorDegree = 'test-user-access-curator-degree@test.no';
export const userUnitEditorDelete = 'test-user-access-editor-delete@test.no';
export const userUnitCuratorResourceOwner = 'test-user-access-curator-resourceowner@test.no';
export const userUnitCuratorInstitution = 'test-user-access-curator-institution@test.no';
export const userUnitResourceOwner = 'test-user-access-resource-owner@test.no';
export const userUnitAdminRRS = 'test-user-admin-rrs@test.no';
export const userUnitAuthorRRS = 'test-user-author-rrs@test.no';
export const userUnitEmbargo = 'test-user-author-embargo@test.no';

export const userSiktInstAdmin = 'test-user-second-inst-admin@test.no';
export const userSiktThirdEditor = 'test-user-third-editor@test.no';

export const userNonCustomer = 'test-user-not-customer@test.no';

export const userBIBSYSSecondEditor = 'test-user-second-editor@test.no';
export const userBIBSYSPublishNoRights = 'test-user-publish-no-rights@test.no';
export const userBIBSYSCurator = 'test-user-second-inst-curator-5@test.no';
export const userBIBSYSCurator2 = 'test-user-second-inst-curator-4@test.no';
export const userBIBSYSProjectWizard = 'test-user-project-wizard@test.no';
export const userBIBSYSPublishRegistration = 'test-user-publish-registration@test.no';
export const userBIBSYSMessages = 'test-user-messages@test.no';
export const userBIBSYSUnreadMessages = 'test-user-unread-messages@test.no';
export const userBIBSYSPublishingCurator = 'test-user-publishing-cur@test.no';
export const userBIBSYSSupportCurator = 'test-user-support-cur@test.no';
export const userBIBSYSDoiCurator = 'test-user-doi-cur@test.no';
export const uploaderBIBSYS = 'test-user-colaboration-BIBSYS@test.no';
export const userBIBSYSCollaborationCurator = 'test-user-colaboration-curator-BIBSYS@test.no';
export const userBIBSYSNviInstitution = 'test-user-NVI-B@test.no';
export const userBIBSYSNviCuratorInstitution = 'test-user-curator-NVI-BB@test.no';
export const userBIBSYSChangeNviInstitution = 'test-user-change-NVI-B@test.no';

export const userNtnuNviCurator = 'test-user-nvi@test.no';
export const userNtnuNviCurator2 = 'test-user-nvi-2@test.no';
export const userNtnuVerifiedContributor = 'test-user-access-verified-contributors@test.no';

export const userNmbuCollaborationCurator = 'test-user-colaboration-curator-NMBU@test.no';
export const userNmbuNvaInstitution = 'test-user-NVA-C@test.no';
export const userNmbuChangeNvaInstitution = 'test-user-change-NVA-C@test.no';
export const uploaderNMBU = 'test-user-colaboration-NMBU@test.no';

export const userUSNCollaborationCurator = 'test-user-colaboration-curator-USN@test.no';
export const userUSNNviInstitution = 'test-user-NVI-A@test.no';
export const userUSNNviCuratorInstitution = 'test-user-curator-NVI-A@test.no';
export const userUSNChangeNviInstitution = 'test-user-change-NVI-A@test.no';
export const userUSNChangeNviCuratorInstitution = 'test-user-change-cur-NVI-A@test.no';
export const uploaderUSN = 'test-user-colaboration-USN@test.no';

export const userSintefSupportMessages = 'test-user-support-messages-sintef@test.no';
export const userSintefPublicationCuratorMessages = 'test-user-publication-curator-messages-sintef@test.no';
export const userSintefDOICuratorMessages = 'test-user-doicurator-messages-sintef@test.no';
export const userSintefSupportCuratorMessages = 'test-user-support-curator-messages-sintef@test.no';
export const userSintefPublicationMessages = 'test-user-publication-messages-sintef@test.no';
export const userSintefDOIMessages = 'test-user-doi-messages-sintef@test.no';
export const userSintefEditor = 'test-user-editor-sintef@test.no';
export const userSintefRegistrator = 'test-user-registrator-sintef@test.no';
export const userSintefPublicationCurator = 'test-user-publication-curator-messages-sintef@test.no';
export const userSintefDOICurator = 'test-user-doicurator-messages-sintef@test.no';
export const userSintefSupportCurator = 'test-user-support-curator-messages-sintef@test.no';
export const userSintefDOI = 'test-user-doi-messages-sintef@test.no';

const userData = {
  name: '',
  orgunitids: ['https://api.cristin.no/v2/institutions/1111111111'],
  feideid: true,
  orcid: true,
  inArp: true,
};

export const user = {
  [userUnitWithAuthor]: { ...userData, name: 'TestUser, Withauthor' },
  [userUnitWithAuthor1]: { ...userData, name: 'TestUser, Withauthor 1' },
  [userUnitWithAuthor2]: { ...userData, name: 'TestUser, Withauthor 2' },
  [userUnitWithAuthor3]: { ...userData, name: 'TestUser, Withauthor 3' },
  [userUnitWithAuthor4]: { ...userData, name: 'TestUser, Withauthor 4' },
  [userUnitWithAuthor5]: { ...userData, name: 'TestUser, Withauthor 5' },
  [userUnitWithAuthor6]: { ...userData, name: 'TestUser, Withauthor 6' },
  [userUnitWithAuthor7]: { ...userData, name: 'TestUser, Withauthor 7' },
  [userUnitWithAuthor8]: { ...userData, name: 'TestUser, Withauthor 8' },
  [userUnitSaveRegistration]: { ...userData, name: 'TestUser, Save Registration' },
  [userUnitAddInstitution]: { ...userData, name: 'TestUser, Add institution' },
  [userUnitChangeInstitution]: { ...userData, name: 'TestUser, Change institution' },
  [userUnitWithInstitutionRemoveInstitution]: {
    ...userData,
    name: 'TestUser, Remove institution',
  },
  [userUnitCurator]: { ...userData, name: 'TestUser, Curator' },
  [userUnitInstAdmin]: { ...userData, name: 'TestUser, Institution-admin' },
  [userSiktInstAdmin]: { ...userData, name: 'TestUser, Second Institution-admin-1' },
  [adminUserUnit]: { ...userData, name: 'TestUser, App-admin' },
  [adminUserUnit1]: { ...userData, name: 'TestUser, App-admin 1' },
  [userUnitNoRole]: { ...userData, name: 'TestUser, No role' },
  [userUnitRemoveOrcid]: { ...userData, name: 'TestUser, Remove orcid' },
  [userNonCustomer]: { ...userData, name: 'TestUser, Not customer' },
  [userUnitDraftDoi]: { ...userData, name: 'TestUser, Draft DOI' },
  [userUnitDraftDoi2]: { ...userData, name: 'TestUser, Draft DOI 2' },
  [userUnitCuratorDraftDoi]: { ...userData, name: 'TestUser, Curator Draft DOI' },
  [userUnitResourceTypeBook]: { ...userData, name: 'TestUser, Resource type book' },
  [userUnitResourceTypeChapter]: { ...userData, name: 'TestUser, Resource type chapter' },
  [userUnitResourceTypeJournal]: { ...userData, name: 'TestUser, Resource type journal' },
  [userUnitResourceTypeDegree]: { ...userData, name: 'TestUser, Resource type degree' },
  [userUnitResourceTypeMedia]: { ...userData, name: 'TestUser, Resource type media' },
  [userUnitResourceTypePresentation]: { ...userData, name: 'TestUser, Resource type presentation' },
  [userUnitResourceTypeReport]: { ...userData, name: 'TestUser, Resource type report' },
  [userUnitResourceTypeArchitecture]: { ...userData, name: 'TestUser, Resource type architecture' },
  [userUnitViewRegistration]: { ...userData, name: 'TestUser, View registration' },
  [userUnitEditor]: { ...userData, name: 'TestUser, Editor' },
  [userBIBSYSSecondEditor]: { ...userData, name: 'TestUser, Second Institution-Editor' },
  [userSiktThirdEditor]: { ...userData, name: 'TestUser, Third Editor' },
  [userUnitEditor1]: { ...userData, name: 'TestUser, Editor 1' },
  [userUnitEditor2]: { ...userData, name: 'TestUser, Editor 2' },
  [userUnitEditor3]: { ...userData, name: 'TestUser, Editor 3' },
  [userUnitEditor4]: { ...userData, name: 'TestUser, Editor 4' },
  [userUnitEditor5]: { ...userData, name: 'TestUser, Editor 5' },
  [userUnitMyRegistrations]: { ...userData, name: 'TestUser, MyRegistrations' },
  [userUnitFetchDoi]: { ...userData, name: 'TestUser, Fetch Doi' },
  [userUnitFilm]: { ...userData, name: 'TestUser, Film' },
  [userUnitArtistic]: { ...userData, name: 'TestUser, Artistic' },
  [userUnitDesign]: { ...userData, name: 'TestUser, Design' },
  [userUnitMusic]: { ...userData, name: 'TestUser, Music' },
  [userUnitLogout]: { ...userData, name: 'TestUser, Log out' },
  [userUnitPerformingArts]: { ...userData, name: 'TestUser, Performing arts' },
  [userUnitRequestSupport]: { ...userData, name: 'TestUser, Request support' },
  [userUnitOpenMyRegistrations]: { ...userData, name: 'TestUser, Open my registrations' },
  [userUnitResearchDataDmp]: { ...userData, name: 'TestUser, DMP' },
  [userUnitPublishedRegistration]: { ...userData, name: 'TestUser, Published registration' },
  [userUnitLiteraryArts]: { ...userData, name: 'TestUser, Literary arts' },
  [userUnitFilesAndLicense]: { ...userData, name: 'TestUser, Files and license' },
  [userUnitSaveJournal]: { ...userData, name: 'TestUser, Save journal' },
  [userUnitSaveBook]: { ...userData, name: 'TestUser, Save book' },
  [userUnitSaveReport]: { ...userData, name: 'TestUser, Save report' },
  [userUnitSaveThesis]: { ...userData, name: 'TestUser, Save thesis' },
  [userUnitSavePartOfBook]: { ...userData, name: 'TestUser, Save part of book' },
  [userUnitSavePresentation]: { ...userData, name: 'TestUser, Save presentation' },
  [userUnitSaveArtisticResult]: { ...userData, name: 'TestUser, Save artistic result' },
  [userUnitSaveMediaContribution]: { ...userData, name: 'TestUser, Save media presentation' },
  [userUnitSaveResearchData]: { ...userData, name: 'TestUser, Save research data' },
  [userUnitSaveExhibition]: { ...userData, name: 'TestUser, Save exhibition' },
  [userBIBSYSPublishNoRights]: { ...userData, name: 'TestUser, Publish registration no rights' },
  [userBIBSYSCurator]: { ...userData, name: 'TestUser, Curator 1' },
  [userBIBSYSCurator2]: { ...userData, name: 'TestUser, Curator 2' },
  [userBIBSYSProjectWizard]: { ...userData, name: 'TestUser, Project Wizard' },
  [userBIBSYSPublishRegistration]: { ...userData, name: 'TestUser, Publish registration' },
  [userUnitResearchDataset]: { ...userData, name: 'TestUser, Research dataset' },
  [userUnitProjectManager]: { ...userData, name: 'TestUser, Project manager' },
  [userBIBSYSMessages]: { ...userData, name: 'TestUser, Messages' },
  [userBIBSYSUnreadMessages]: { ...userData, name: 'TestUser, Unread Messages' },
  [userUnitCancelDelete]: { ...userData, name: 'TestUser, Cancel delete' },
  [userUnitTestMenu]: { ...userData, name: 'TestUser, Menu' },
  [userUnitEditRegistration]: { ...userData, name: 'TestUser, Edit registration' },
  [userUnitVisualArts]: { ...userData, name: 'TestUser, Visual arts' },
  [userUnitFavorite1]: { ...userData, name: 'TestUser, Favorite' },
  [userUnitFavorite2]: { ...userData, name: 'TestUser, Second Favorite' },
  [userUnitFavorite3]: { ...userData, name: 'TestUser, Third Favorite' },
  [userUnitDeleteRegistrations]: { ...userData, name: 'TestUser, Delete Registrations' },
  [userNtnuNviCurator]: { ...userData, name: 'TestUser, Nvi-curator' },
  [userNtnuNviCurator2]: { ...userData, name: 'TestUser, Nvi-curator 2' },
  [userBIBSYSDoiCurator]: { ...userData, name: 'TestUser, DOI-curator' },
  [userBIBSYSPublishingCurator]: { ...userData, name: 'TestUser, Publishing-curator' },
  [userBIBSYSSupportCurator]: { ...userData, name: 'TestUser, Support-curator' },
  [userNtnuVerifiedContributor]: { ...userData, name: 'TestUser, Access Verified contributor' },
  [userUnitCuratorInstitution]: { ...userData, name: 'TestUser, Access Curator institution' },
  [userUnitCuratorResourceOwner]: { ...userData, name: 'TestUser, Access Curator resourceowner' },
  [userUnitResourceOwner]: { ...userData, name: 'TestUser, Access Resource owner' },
  [userUnitEditorDelete]: { ...userData, name: 'TestUser, Access Editor delete' },
  [userUnitCuratorDegree]: { ...userData, name: 'TestUser, Access Curator degree' },
  [userUnitAdminRRS]: { ...userData, name: 'TestUser, Admin RRS' },
  [userUnitAuthorRRS]: { ...userData, name: 'TestUser, Author RRS' },
  [userUnitEmbargo]: { ...userData, name: 'TestUser, Author Embargo' },
  [userSintefPublicationCuratorMessages]: { ...userData, name: 'TestUser, PublicationCurator Messages' },
  [userSintefDOICuratorMessages]: { ...userData, name: 'TestUser, DoiCurator Messages' },
  [userSintefSupportCuratorMessages]: { ...userData, name: 'TestUser, SupportCurator Messages' },
  [userSintefPublicationMessages]: { ...userData, name: 'TestUser, Publication Messages' },
  [userSintefDOIMessages]: { ...userData, name: 'TestUser, Doi Messages' },
  [userSintefSupportMessages]: { ...userData, name: 'TestUser, Support Messages' },
  [uploaderBIBSYS]: { ...userData, name: 'TestUser, collaboration A' },
  [uploaderNMBU]: { ...userData, name: 'TestUser, collaboration B' },
  [uploaderUSN]: { ...userData, name: 'TestUser, collaboration C' },
  [userBIBSYSCollaborationCurator]: { ...userData, name: 'TestUser, collaboration Curator A' },
  [userNmbuCollaborationCurator]: { ...userData, name: 'TestUser, collaboration Curator B' },
  [userUSNCollaborationCurator]: { ...userData, name: 'TestUser, collaboration Curator C' },
  [userUSNNviInstitution]: { ...userData, name: 'TestUser, User NVI-institution A' },
  [userBIBSYSNviInstitution]: { ...userData, name: 'TestUser, User NVI-institution B' },
  [userNmbuNvaInstitution]: { ...userData, name: 'TestUser, User NVA-institution C' },
  [userUSNNviCuratorInstitution]: { ...userData, name: 'TestUser, Curator NVI-institution A' },
  [userUSNChangeNviInstitution]: { ...userData, name: 'TestUser, Change User NVI-institution A' },
  [userBIBSYSChangeNviInstitution]: { ...userData, name: 'TestUser, Change User NVI-institution B' },
  [userNmbuChangeNvaInstitution]: { ...userData, name: 'TestUser, Change User NVA-institution C' },
  [userUSNChangeNviCuratorInstitution]: { ...userData, name: 'TestUser, NVI-Curator NVI-inst A' },
};
