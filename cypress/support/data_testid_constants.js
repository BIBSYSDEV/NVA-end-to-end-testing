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
  'Institutions': 'menu-admin-institution-button',
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
  'Institution Administrators': 'Administrators',
  'Curators': 'Curators',
  'Editors': 'Editor',
};

export const USER_ADMINISTRAION_BUTTONS = {
  'Administrator': 'button-add-institution-admin',
  'Curator': 'button-add-curator',
  'Editor': 'button-add-editor',
};

export const USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS = {
  'Institution Administrators': 'button-remove-role-Institution-admin',
  'Curators': 'button-remove-role-Curator',
  'Editors': 'button-remove-role-Editor',
};

export const JOURNAL_SUBTYPES = {
  'Short communication': 'publication-instance-type-JournalShortCommunication',
  'Editorial': 'publication-instance-type-JournalLeader',
  'Letter to the editor': 'publication-instance-type-JournalLetter',
  'Book review': 'publication-instance-type-JournalReview',
};

export const REPORT_SUBTYPES = {
  'Research report': 'publication-instance-type-ReportResearch',
  'Policy report': 'publication-instance-type-ReportPolicy',
  'Working paper': 'publication-instance-type-ReportWorkingPaper',
  'Other type of report': 'publication-instance-type-ReportBasic',
};

export const STUDENT_THESIS_SUBTYPES = {
  'Bachelor thesis': 'publication-instance-type-DegreeBachelor',
  'Master thesis': 'publication-instance-type-DegreeMaster',
  'Doctoral thesis': 'publication-instance-type-DegreePhd',
  'Other student thesis': 'publication-instance-type-OtherStudentWork',
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
