export const MAIN_BUTTONS = {
  'New Registration': 'new-registration',
  'My Registrations': 'my-registrations',
  'My Messages': 'my-messages',
};

export const USER_MENU = {
  'My user profile': 'my-profile-link',
  'Log out': 'log-out-link',
};

export const CREATOR_MENU = {
  ...USER_MENU,
};

export const CURATOR_MENU = {
  ...USER_MENU,
  'My worklist': 'worklist-link',
};

export const INST_ADMIN_MENU = {
  ...USER_MENU,
  'Users': 'admin-users-link',
  'My institution': 'admin-institution-link',
};

export const ADMIN_MENU = {
  ...USER_MENU,
  'Institutions': 'admin-institutions-link',
};

export const NEW_REGISTRATION_BUTTONS = {
  'Link to registration': 'new-registration-link',
  'Upload file': 'new-registration-file',
};

export const NEW_REGISTRATION_START_BUTTONS = {
  'Link to registration': 'registration-start-button',
  'Upload file': 'registration-start-button',
};

export const PROFILE_PAGE_FIELDS = {
  'Real name': 'user-name',
  'Feide ID': 'user-id',
  'Email': 'user-id',
  'ORCID': 'orcid-line',
  'Roles': 'user-role-creator',
  'Organizations': 'institution-presentation',
  'Language': 'language-button',
};

export const USER_ADMINISTRATION_HEADINGS = {
  'Administrator': 'Administrators',
  'Curator': 'Curators',
  'Editor': 'Editor',
};

export const USER_ADMINISTRATION_PAGINATION = {
  'Administrator': 'Institution-admin',
  'Curator': 'Curator',
  'Editor': 'Editor',
};

export const USER_ADMINISTRATION_SECTIONS = {
  'Administrators': 'users-administrators',
  'Curators': 'users-curators',
  'Editors': 'users-editors',
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
  'Display name': 'customer-institution-display-name-field',
  'Short display name': 'customer-institution-short-name-field',
  'Archive name': 'customer-institution-archive-name-field',
};

export const MY_INSTITUTION_FIELDS_TESTVALUE = {
  'Display name': 'Testinstitusjon',
  'Short display name': 'Testinst',
  'Archive name': 'Testarchive',
};

export const INSTITUTION_FIELDS = {
  'Name in organization registry': 'autocomplete-institution',
  'Display name': 'customer-institution-display-name-field',
  'Short display name': 'customer-institution-short-name-field',
  'Archive name': 'customer-institution-archive-name-field',
  'Feide Organization ID': 'customer-institution-feide-organization-id-field',
};

export const RESOURCE_TYPES = {
  'Contribution to journal': 'publication-context-type-Journal',
  'Book': 'publication-context-type-Book',
  'Report': 'publication-context-type-Report',
  'Student thesis': 'publication-context-type-Degree',
  'Part of book/report': 'publication-context-type-Chapter',
};

export const JOURNAL_SUBTYPES = {
  'Journal article': 'publication-instance-type-JournalArticle',
  'Short communication': 'publication-instance-type-JournalShortCommunication',
  'Feature article': 'publication-instance-type-FeatureArticle',
  'Letter to the Editor': 'publication-instance-type-JournalLetter',
  'Book review': 'publication-instance-type-JournalReview',
  'Leader': 'publication-instance-type-JournalLeader',
  'Corrigendum': 'publication-instance-type-JournalCorrigendum',
};

export const JOURNAL_FIELDS = {
  'Journal': 'journal-search-field',
  'Search-box for Journal': 'journal-search-field',
  'Search box for Journal': 'journal-search-field',
  'Search box for "Journal article"': 'corrigendum-for-field',
  'DOI': 'doi-field',
  'Volume': 'volume-field',
  'Issue': 'issue-field',
  'Search box for published books': '',
  'Pages from': 'pages-from-field',
  'Pages to': 'pages-to-field',
  'Article number': 'article-number-field',
  'Peer reviewed': 'peer_review-true',
};

export const BOOK_SUBTYPES = {
  'Monograph': 'publication-instance-type-BookMonograph',
  'Anthology': 'publication-instance-type-BookAnthology',
};

export const BOOK_FIELDS = {
  'Publisher': 'publisher-search-field',
  'ISBN': 'isbn-field',
  'Total number of pages': 'pages-field',
  'NPI discipline': 'scientific-subject-field',
  'Series title': 'series-search-field',
  'Series number': 'series-number-field',
};

export const CONTENT_TYPE = {
  'Academic Monograph': 'content-value-academic-monograph',
  'Non-fiction Monograph': 'content-value-non-fiction-monograph',
  'Popular Science Monograph': 'content-value-popular-science-monograph',
  'Textbook': 'content-value-textbook',
  'Encyclopedia': 'content-value-encyclopedia',
};

export const REPORT_SUBTYPES = {
  'Research report': 'publication-instance-type-ReportResearch',
  'Policy report': 'publication-instance-type-ReportPolicy',
  'Working paper': 'publication-instance-type-ReportWorkingPaper',
  'Other type of report': 'publication-instance-type-ReportBasic',
};

export const REPORT_FIELDS = {
  'Search box for Publisher': 'publisher-search-field',
  'ISBN': 'isbn-field',
  'Total number of pages': 'pages-field',
  'Search box for Series': 'series-search-field',
  'Series number': 'series-number-field',
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
  'Series number': 'series-number-field',
  'Total pages': 'pages-field',
  'ISBN': 'isbn-field',
};

export const CHAPTER_SUBTYPES = {
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

export const OTHER_FIELDS = {};

export const DESCRIPTION_FIELDS = {
  'Title': 'registration-title-field',
  'Abstract': 'registration-abstract-field',
  'Description': 'registration-description-field',
  'Date published': 'date-published-field',
  'Keywords': 'registration-tag-field',
  'Vocabularies': 'add-vocabulary-button',
  'Primary language for content': 'registration-language-field',
  'Project association': 'project-search-field',
};

export const RESOURCE_TYPE_FIELDS = {
  'Type': 'publication-context-type',
};

export const CONTRIBUTOR_CREATE_FIELDS = {
  'First name': 'create-contributor-first-name',
  'Last name': 'create-contributor-last-name',
};

export const LANDING_PAGE_FIELDS = {
  'Title': 'public-registration-title',
  'Abstract': 'abstract-accordion',
  NPI: 'public-registration-npi',
  Keywords: 'public-registration-keywords',
  'Publication date': 'public-registration-publication-date',
  'Primary language': 'public-registration-primary-language',
  Projects: 'projects-accordion',
  'Registration subtype': 'public-registration-registration-subtype',
  'Fields corresponding to subtype': 'public-registration-subtype-fields',
  Contributors: 'public-registration-contributors',
  Files: 'files-accordion',
  'DOI link': 'public-registration-doi-link',
  License: 'public-registration-license',
};

export const LANDING_PAGE_SHARE_BUTTONS = {
  Email: 'email-button',
  Facebook: 'facebook-button',
  LinkedIn: 'linkedin-button',
  Twitter: 'twitter-button',
};
