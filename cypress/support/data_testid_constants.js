import { dataTestId } from './dataTestIds';

export const mainButtons = {
  'New Registration': dataTestId.header.newRegistrationLink,
  'My Registrations': dataTestId.header.myRegistrationsLink,
  'My Messages': dataTestId.header.messagesLink,
};

export const userMenu = {
  'My user profile': dataTestId.header.myProfileLink,
  'Log out': dataTestId.header.logOutLink,
};

export const myRegistrationsTabs = {
  'Draft': 'unpublished-button',
  'Published': 'published-button',
};

export const creatorMenu = {
  ...userMenu,
};

export const curatorMenu = {
  ...userMenu,
  'My worklist': dataTestId.header.worklistLink,
};

export const instAdminMenu = {
  ...userMenu,
  'Users': dataTestId.header.adminUsersLink,
  'My institution': dataTestId.header.adminInstitutionLink,
};

export const adminMenu = {
  ...userMenu,
  'Institutions': dataTestId.header.adminInstitutionsLink,
};

export const profilePageFields = {
  'Real name': 'user-name',
  'Feide ID': 'user-id',
  'Email': 'user-id',
  'ORCID': 'orcid-line',
  'Roles': 'user-role-creator',
  'Organizations': 'institution-presentation',
  'Language': 'language-button',
};

export const userAdministrationPagination = {
  'Administrator': 'Institution-admin',
  'Curator': 'Curator',
  'Editor': 'Editor',
};

export const userAdministrationSections = {
  'Administrators': dataTestId.myInstitutionUsersPage.usersAdministrators,
  'Curators': dataTestId.myInstitutionUsersPage.usersCurators,
  'Editors': dataTestId.myInstitutionUsersPage.usersEditors,
};

export const userAdministrationButtons = {
  'Add Administrator': 'button-add-institution-admin',
  'Add Curator': 'button-add-curator',
  'Add Editor': 'button-add-editor',
};

export const userAdministrationAddRoleButtons = {
  'Add Administrator': 'button-add-role-Institution-admin',
  'Add Curator': 'button-add-role-Curator',
  'Add Editor': 'button-add-role-Editor',
};

export const userAdministrationRemoveRoleButtons = {
  'Administrator': 'button-remove-role-Institution-admin',
  'Curator': 'button-remove-role-Curator',
  'Editor': 'button-remove-role-Editor',
};

export const myInstitutionFields = {
  'Name in organization registry': dataTestId.organization.searchField,
  'Display name': dataTestId.institutionAdmin.displayNameField,
  'Short display name': dataTestId.institutionAdmin.shortNameField,
  'Archive name': dataTestId.institutionAdmin.archiveNameField,
};

export const myinstitutionfieldsTestvalue = {
  'Display name': 'Testinstitusjon',
  'Short display name': 'Testinst',
  'Archive name': 'Testarchive',
};

export const institutionFields = {
  ...myInstitutionFields,
  'Feide Organization ID': dataTestId.institutionAdmin.feideField,
};

export const resourceTypes = {
  'Contribution to journal': 'publication-context-type-Journal',
  'Journal': 'publication-context-type-Journal',
  'Book': 'publication-context-type-Book',
  'Report': 'publication-context-type-Report',
  'Student thesis': 'publication-context-type-Degree',
  'Degree': 'publication-context-type-Degree',
  'Chapter': 'publication-context-type-Chapter',
  'Part of book or report': 'publication-context-type-Chapter',
  'Part of book/report': 'publication-context-type-Chapter',
  'Presentation': 'publication-context-type-Event',
  'Artistic': 'publication-context-type-Artistic',
};

export const journalSubtypes = {
  'Journal article': 'publication-instance-type-JournalArticle',
  'Short communication': 'publication-instance-type-JournalShortCommunication',
  'Feature article': 'publication-instance-type-FeatureArticle',
  'Letter to the Editor': 'publication-instance-type-JournalLetter',
  'Book review': 'publication-instance-type-JournalReview',
  'Leader': 'publication-instance-type-JournalLeader',
  'Corrigendum': 'publication-instance-type-JournalCorrigendum',
};

export const journalFields = {
  'Journal': dataTestId.registrationWizard.resourceType.journalField,
  'Search-box for Journal': dataTestId.registrationWizard.resourceType.journalField,
  'Search box for Journal': dataTestId.registrationWizard.resourceType.journalField,
  'Search box for "Journal article"': dataTestId.registrationWizard.resourceType.corrigendumForField,
  'DOI': 'doi-field',
  'Volume': 'volume-field',
  'Issue': 'issue-field',
  'Search box for published books': '',
  'Pages from': dataTestId.registrationWizard.resourceType.pagesFromField,
  'Pages to': dataTestId.registrationWizard.resourceType.pagesToField,
  'Article number': 'article-number-field',
  'Peer reviewed': 'peer_review-true',
};

export const bookSubtypes = {
  'Monograph': 'publication-instance-type-BookMonograph',
  'Anthology': 'publication-instance-type-BookAnthology',
};

export const bookFields = {
  'Publisher': dataTestId.registrationWizard.resourceType.publisherField,
  'ISBN': dataTestId.registrationWizard.resourceType.isbnField,
  'Total number of pages': dataTestId.registrationWizard.resourceType.pagesField,
  'NPI discipline': dataTestId.registrationWizard.resourceType.scientificSubjectField,
  'Series title': dataTestId.registrationWizard.resourceType.seriesField,
  'Series number': dataTestId.registrationWizard.resourceType.seriesNumber,
};

export const contentType = {
  'Academic Monograph': dataTestId.registrationWizard.resourceType.contentValue('academic-monograph'),
  'Non-fiction Monograph': dataTestId.registrationWizard.resourceType.contentValue('non-fiction-monograph'),
  'Popular Science Monograph': dataTestId.registrationWizard.resourceType.contentValue('popular-science-monograph'),
  'Textbook': dataTestId.registrationWizard.resourceType.contentValue('textbook'),
  'Encyclopedia': dataTestId.registrationWizard.resourceType.contentValue('encyclopedia'),
};

export const reportSubtypes = {
  'Research report': 'publication-instance-type-ReportResearch',
  'Policy report': 'publication-instance-type-ReportPolicy',
  'Working paper': 'publication-instance-type-ReportWorkingPaper',
  'Other type of report': 'publication-instance-type-ReportBasic',
};

export const reportFields = {
  'Search box for Publisher': dataTestId.registrationWizard.resourceType.publisherField,
  'ISBN': dataTestId.registrationWizard.resourceType.isbnField,
  'Total number of pages': dataTestId.registrationWizard.resourceType.pagesField,
  'Search box for Series': dataTestId.registrationWizard.resourceType.seriesField,
  'Series number': dataTestId.registrationWizard.resourceType.seriesNumber,
};

export const studentThesisSubtypes = {
  'Bachelor thesis': 'publication-instance-type-DegreeBachelor',
  'Master thesis': 'publication-instance-type-DegreeMaster',
  'Doctoral thesis': 'publication-instance-type-DegreePhd',
  'Other student thesis': 'publication-instance-type-OtherStudentWork',
};

export const studentThesisFields = {
  'Search box for Publisher': dataTestId.registrationWizard.resourceType.publisherField,
  'DOI': 'doi-field',
  'Search box for Series': dataTestId.registrationWizard.resourceType.seriesField,
  'Series number': dataTestId.registrationWizard.resourceType.seriesNumber,
  'Total pages': dataTestId.registrationWizard.resourceType.pagesField,
  'ISBN': dataTestId.registrationWizard.resourceType.isbnField,
};

export const chapterSubtypes = {
  'Chapter of Anthology': 'publication-instance-type-ChapterArticle',
};

export const CHAPTER_FIELDS = {
  'DOI': 'doi-field',
  'Search box for published Anthologies': 'info-anthology',
  'Pages from': 'chapter-pages-from',
  'Pages to': 'chapter-pages-to',
  'Peer reviewed': 'peer-review-true',
  'NPI discipline': 'npi-search',
};

export const OTHER_SUBTYPES = {};

export const resourceSubTypes = {
  ...bookSubtypes,
  ...chapterSubtypes,
  ...journalSubtypes,
  ...reportSubtypes,
  ...studentThesisSubtypes,
};

export const OTHER_FIELDS = {};

export const descriptionFields = {
  'Title': 'registration-title-field',
  'Abstract': 'registration-abstract-field',
  'Description': 'registration-description-field',
  'Date published': dataTestId.registrationWizard.description.datePublishedField,
  'Keywords': 'registration-tag-field',
  'Vocabularies': dataTestId.registrationWizard.description.addVocabularyButton,
  'Primary language for content': 'registration-language-field',
  'Project association': 'project-search-field',
};

export const resourceTypeFields = {
  'Type': 'publication-context-type',
};

export const contributorCreateFields = {
  'First name': 'create-contributor-first-name',
  'Last name': 'create-contributor-last-name',
};

export const contributorButtons = {
  'Add Author': 'Creator',
  'Add Contributor': 'OtherContributor',
  'Add Supervisor': 'Supervisor',
  'Add Editor': 'Editor',
};

export const landingPageFields = {
  'Title': dataTestId.registrationLandingPage.title,
  'Abstract': dataTestId.registrationLandingPage.abstractAccordion,
  'NPI': dataTestId.registrationLandingPage.npi,
  'Keywords': dataTestId.registrationLandingPage.keywords,
  'Publication date': dataTestId.registrationLandingPage.publicationDate,
  'Primary language': dataTestId.registrationLandingPage.primaryLanguage,
  'Projects': dataTestId.registrationLandingPage.projectsAccordion,
  'Registration subtype': dataTestId.registrationLandingPage.registrationSubtype,
  'Fields corresponding to subtype': dataTestId.registrationLandingPage.subtypeFields,
  'Contributors': dataTestId.registrationLandingPage.contributors,
  'Files': dataTestId.registrationLandingPage.filesAccordion,
  'DOI link': dataTestId.registrationLandingPage.doiLink,
  'License': dataTestId.registrationLandingPage.license,
};

export const landingPageButtons = {
  'Request a DOI': 'button-toggle-request-doi',
  'Reserve a DOI': 'button-toggle-reserve-doi',
};

export const landingPageShareButtons = {
  Email: dataTestId.registrationLandingPage.emailButton,
  Facebook: dataTestId.registrationLandingPage.facebookButton,
  LinkedIn: dataTestId.registrationLandingPage.linkedInButton,
  Twitter: dataTestId.registrationLandingPage.twitterButton,
};
