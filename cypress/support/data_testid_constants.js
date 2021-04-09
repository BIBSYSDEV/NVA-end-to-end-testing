export const MAIN_BUTTONS = {
  'New Registration': 'new-registration',
  'My Registrations': 'my-registrations',
  'My Messages': 'my-messages',
};

export const USER_MENU = {
  'My user profile': 'menu-user-profile-button',
  'Log out': 'menu-logout-button',
};

export const CREATOR_MENU = {
  ...USER_MENU,
};

export const CURATOR_MENU = {
  ...USER_MENU,
  'My worklist': 'menu-my-worklist-button',
};

export const INST_ADMIN_MENU = {
  ...USER_MENU,
  'Users': 'menu-admin-institution-users-button',
  'My institution': 'menu-admin-institution-button',
};

export const ADMIN_MENU = {
  ...USER_MENU,
  'Institutions': 'menu-admin-institutions-button',
};

export const NEW_REGISTRATION_BUTTONS = {
  'Link to registration': 'new-registration-link',
  'Upload file': 'new-registration-file',
};

export const NEW_REGISTRATION_START_BUTTONS = {
  'Link to registration': 'registration-link-next-button',
  'Upload file': 'registration-file-start-button',
};

export const PROFILE_PAGE_FIELDS = {
  'Real name': 'user-name',
  'Feide ID': 'user-id',
  'Email': 'user-id',
  'ORCID': 'button-create-connect-orcid',
  'Roles': 'user-role-creator',
  'Organizations': 'institution-presentation',
  'Language': 'language-selector',
};

export const USER_ADMINISTRATION_HEADINGS = {
  'Administrator': 'Administrators',
  'Curator': 'Curators',
  'Editor': 'Editor',
};

export const USER_ADMINISTRATION_BUTTONS = {
  'Add Administrator': 'button-add-institution-admin',
  'Add Curator': 'button-add-curator',
  'Add Editor': 'button-add-editor',
};

export const USER_ADMINISTRATION_ADD_ROLE_BUTTONS = {
  'Add Administrator': 'button-add-role-Institution-admin',
  'Add Curator': 'button-add-role-Curator',
  'Add Editor': 'button-add-role-Editor',
};

export const USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS = {
  'Administrator': 'button-remove-role-Institution-admin',
  'Curator': 'button-remove-role-Curator',
  'Editor': 'button-remove-role-Editor',
};

export const MY_INSTITUTION_FIELDS = {
  'Name in organization registry': 'autocomplete-institution',
  'Display name': 'customer-institution-display-name-input',
  'Short display name': 'customer-institution-short-name-input',
  'Archive name': 'customer-institution-archive-name-input',
};

export const MY_INSTITUTION_FIELDS_TESTVALUE = {
  'Display name': 'Testinstitusjon',
  'Short display name': 'Testinst',
  'Archive name': 'Testarchive',
};

export const JOURNAL_SUBTYPES = {
  'Journal article': 'publication-instance-type-JournalArticle',
  'Short communication': 'publication-instance-type-JournalShortCommunication',
  'Feature article': 'publication-instance-type-FeatureArticle',
  'Letter to the Editor': 'publication-instance-type-JournalLetter',
  'Book review': 'publication-instance-type-JournalReview',
  'Editorial': 'publication-instance-type-JournalLeader',
  'Corrigendum': 'publication-instance-type-JournalCorrigendum',
};

export const JOURNAL_FIELDS = {
  'Journal': 'journal-search-field',
  'Search-box for Journal': 'journal-search-field',
  'Search box for Journal': 'journal-search-field',
  'Search box for "Journal article"': 'article-search-field',
  'DOI': 'doi-field',
  'Volume': 'volume-field',
  'Issue': 'issue-field',
  'Search box for published books': '',
  'Pages from': 'pages-from-field',
  'Pages to': 'pages-to-field',
  'Article number': 'article-number-field',
  'Peer reviewed': 'peer_review-true',
};

export const BOOK_FIELDS = {
  'ISBN': 'isbn-field',
  'Total number of pages': 'pages-field',
  'NPI discipline': 'search_npi',
};

export const REPORT_SUBTYPES = {
  'Research report': 'publication-instance-type-ReportResearch',
  'Policy report': 'publication-instance-type-ReportPolicy',
  'Working paper': 'publication-instance-type-ReportWorkingPaper',
  'Other type of report': 'publication-instance-type-ReportBasic',
};

export const REPORT_FIELDS = {
  'Search box for Publisher': 'publisher-search-input',
  'ISBN': 'isbn-input',
  'Total number of pages': 'pages-input',
  'Search box for Series': 'series-search-input',
};

export const STUDENT_THESIS_SUBTYPES = {
  'Bachelor thesis': 'publication-instance-type-DegreeBachelor',
  'Master thesis': 'publication-instance-type-DegreeMaster',
  'Doctoral thesis': 'publication-instance-type-DegreePhd',
  'Other student thesis': 'publication-instance-type-OtherStudentWork',
};

export const STUDENT_THESIS_FIELDS = {
  'Search box for Publisher': 'publisher-search-field',
  'DOI': 'doi-field',
  'Search box for Series': 'series-search-field',
};

export const CHAPTER_SUBTYPES = {
  'Chapter in anthology': 'publication-instance-type-ChapterArticle',
};

export const CHAPTER_FIELDS = {
  'DOI': 'doi-field',
  'Search box for published books': 'anthology-info',
  'Pages from': 'chapter-pages-from',
  'Pages to': 'chapter-pages-to',
  'Peer reviewed': 'peer_review-true',
};

export const OTHER_SUBTYPES = {
  'Feature article': 'publication-instance-type-FeatureArticle',
  'Map': 'publication-instance-type-Map',
  'Musical notation': 'publication-instance-type-MusicalNotation',
  'Other publication': 'publication-instance-type-OtherPublication',
};

export const DESCRIPTION_FIELDS = {
  'Title': 'registration-title-field',
  'Abstract': 'registration-abstract-field',
  'Description': 'registration-description-field',
  'Date published': 'date-published-field',
  'NPI disciplines': 'search_npi',
  'Keywords': 'registration-tag-field',
  'Primary language for content': 'registration-language-field',
  'Project association': 'project-search-input',
};

export const RESOURCE_TYPE_FIELDS = {
  'Type': 'publication-context-type',
};

export const RESOURCE_TYPES = {
  'Contribution to journal': 'publication-context-type-Journal',
  'Book': 'publication-context-type-Book',
  'Report': 'publication-context-type-Report',
  'Student thesis': 'publication-context-type-Degree',
  'Part of book/report': 'publication-context-type-Chapter',
};

export const CONTRIBUTOR_CREATE_FIELDS = {
  'First name': 'create-contributor-first-name',
  'Last name': 'create-contributor-last-name',
};
