import { userProjectWizard } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
// Feature: User edits Project

const projectFields = {
  'Title': dataTestId.registrationWizard.description.projectForm.titleField,
  'Coordinating Institution': dataTestId.registrationWizard.description.projectForm.coordinatingInstitutionField,
  'Start date': dataTestId.registrationWizard.description.projectForm.startDateField,
  'End date': dataTestId.registrationWizard.description.projectForm.endDateField,
  'Project category': dataTestId.registrationWizard.description.projectForm.projectCategoryField,
  'Scientific summary - Norwegian':
    dataTestId.registrationWizard.description.projectForm.scentificSummaryNorwegianField,
  'Popular science summary - Norwegian':
    dataTestId.registrationWizard.description.projectForm.popularScienceSummaryNorwegianField,
  'Scientific summary - English': dataTestId.registrationWizard.description.projectForm.scentificSummaryEnglishField,
  'Popular science summary - English':
    dataTestId.registrationWizard.description.projectForm.popularScienceSummaryEnglishField,
  'Keywords': dataTestId.registrationWizard.description.projectForm.keywordsField,
};

const projectSearchFields = {
  'Participants': dataTestId.registrationWizard.description.projectForm.addParticipantButton,
  'Financing': dataTestId.registrationWizard.description.addFundingButton,
  'Associated Projects': dataTestId.registrationWizard.description.projectForm.relatedProjectsSearchField,
};

// Background:
Given('A User is logged in', () => { });
And('the User got one of the following roles:', () => {
  cy.login(userProjectWizard);
});
// | Registrator           |
// | Curator               |
// | Project Owner         |
// | Project Manager       |
// | Local Project Manager |

// Scenario: User opens the Project Wizard to register a new Project
When('the User selects Create new Project', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
});
Then('they see the Project Wizard start page', () => {
  cy.get('[role=dialog').within(() => {
    cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startCreateProjectButton);
  });
});
And('they can select:', (options) => {
  const optionList = {
    'Search for Financing': dataTestId.registrationWizard.description.nfrProjectSearchField,
    'Empty registration': dataTestId.registrationWizard.description.projectForm.startWithEmptyProjectButton,
  };
  cy.testDataTestidList(options, optionList);
});
// | Search for Financing |
// #| REK Approval         |
// | Empty registration   |
And('they see a Close option', () => {
  cy.get('[role=dialog').within(() => {
    cy.contains('Cancel');
  });
});

// Scenario: User starts to register a Project with a suggested Financing from NFR
Given('User opens the Project Wizard to register a new Project', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
});
When('they activate the search field, a list of Financings where the user has a role is presented', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.nfrProjectSearchField).type('test');
});
Then('they selects a Financing', () => {
  cy.contains('testdata').click();
});
And('the Project Wizard opens pre-filled with metadata', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startCreateProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.titleField).should('not.be.empty');
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startDateField).should('not.have.value', '');
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.endDateField).should('not.have.value', '');
});

// Scenario: User starts to register a Project with a located Financing from NFR
Given('User opens the Project Wizard to register a new Project', () => { });
When('they activate the search field, a list of Financings where the user has a role is presented', () => { });
And('they execute a search', () => { });
Then('they selects a Financing', () => { });
And('the Project Wizard opens pre-filled with metadata', () => { });

// Scenario: User inspects the search result from information
Given('User opens the Project Wizard to register a new Project', () => { });
When('the user inspects the suggested or located Financing from NFR', () => { });
Then('the number of existing projects using the Financing is visible', () => { });
And('the User may inspect witch projects is connected to this Financing', () => { });

// Scenario: User opens the Project Wizard and start registering a Project without Financing selected
Given('User opens the Project Wizard to register a new Project', () => { });
When('they open the Project Wizard to register a new Project', () => { });
And('they selects Empty registration', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startWithEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startCreateProjectButton).click();
});
Then('the Project Wizard opens with no metadata pre-filled', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.projectForm.titleField}] > div > input`).should(
    'be.empty'
  );
  cy.get(
    `[data-testid=${dataTestId.registrationWizard.description.projectForm.coordinatingInstitutionField}] > div > input`
  ).should('be.empty');
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.projectForm.startDateField}]`).should('be.empty');
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.projectForm.endDateField}]`).should('be.empty');
});

// Scenario: The User opens the Project Wizard on the Metadata page
When('the Wizard is opened on the Metadata page', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startWithEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startCreateProjectButton).click();
});
Then('the User can fill in fields for:', (fields) => {
  cy.testDataTestidList(fields, projectFields);
});
// | Title                    |
// | Coordinating Institution |
// | Start date               |
// | End date                 |
And('the User can add:', (fields) => {
  cy.testDataTestidList(fields, projectSearchFields);
});
// | Participants             |
// #| Approvals                |
// | Financing                |
And('they have an option to exit the Wizard', () => {
  cy.contains('Cancel');
});
And('they have an option to go to the last page of the Wizard', () => {
  cy.contains('Next');
});

// Scenario: The User open the Project Wizard on the last page
When('the Wizard is opened on the last page', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startWithEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startCreateProjectButton).click();
  cy.contains('Next').click();
});
Then('the User can fill in fields for:', (fields) => {
  cy.testDataTestidList(fields, projectFields);
});
// | Project category                    |
// | Scientific summary - Norwegian      |
// | Popular science summary - Norwegian |
// | Scientific summary - English        |
// | Popular science summary - English   |
// | Keywords                            |
And('the User can add:', (searchFields) => {
  cy.testDataTestidList(searchFields, projectSearchFields);
});
// | Data Management Plan |
// | Results              |
// | Associated Projects  |
And('the User have the option to save the Project', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.saveProjectButton);
});

// Scenario Outline: User views the Projects Participants section
Given('a User with {string}', (role) => { });
When('they views the Participants of a Project', () => { });
Then('they see see an option to add Project Participants', () => { });
// Examples:
//     | Role                  |
//     | Curator               |
//     | Project Owner         |
//     | Project Manager       |
//     | Local Project Manager |

// Scenario: User adds a Project Participant
Given('User views the Projects Participants section', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startWithEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startCreateProjectButton).click();
  cy, getDataTestId(dataTestId.registrationWizard.description.projectForm.addParticipantButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(
    'project manager testuser'
  );
  cy.contains('Project manager TestUser').click();
});
When('the User adds a Projects Participant', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.addParticipantButton).click();
});
And('the User enter a name in a search field', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.contributorsSearchField)
    .last()
    .type('withauthor testuser');
});
And('the User selects a User from the search results', () => {
  cy.contains('Withauthor TestUser').click();
});
And('the User grants this User one of the following roles:', () => { });
// | Local Project Manager |
// | Project Member        |
Then('they see the User listed as a Project Participant with the selected role', () => { });

// Scenario Outline: A User adds a new Project Manager
Given('a User with role {string} in the project', () => { });
When('the User selects a User from a search', () => { });
And('the User grants this User the role:', () => { });
// | Project Manager |
Then('the selected User is listed as Project Manager', () => { });
// Examples:
//     | Role            |
//     | Curator         |
//     | Project Owner   |
//     | Project Manager |

// Scenario Outline: User views Financing tab for Project
When('a User with role {string} on the project view the Financing tab', () => { });
Then('the add new Financing option is {string}', () => { });
// Examples:
// | Role                  | FieldStatus |
// | Curator               | Enabled     |
// | Project Owner         | Enabled     |
// | Project Manager       | Enabled     |
// | Local Project Manager | Disabled    |

// Scenario: User adds a Financing source for Project
Given('User views Financing tab for Project', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startWithEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startCreateProjectButton).click();
});
When('a User adds a new Financing', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.addFundingButton).click();
  cy.wait(2000);
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).click();
});
And('the User is presented a list of Financing sources', () => { });
And('NFR is listed first', () => { });
Then('the User selects a Financing source for Project', () => {
  cy.contains('Research Council of Norway').click();
});
And('the selected Financing source is listed', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.fundingSourceSearchField}] > div > textarea`).should(
    'have.text',
    'Research Council of Norway (RCN)'
  );
});

// Scenario: User selects NFR as Financing source for Project
Given('User adds a Financing source for Project', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startWithEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startCreateProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.addFundingButton).click();
  cy.wait(5000);
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).click();
});
And('the Financing source for Project is NFR', () => {
  cy.contains('Research Council of Norway').click();
});
When('they activate the search field, a list of Financings where the user has a role is presented', () => { });
Then('they selects a Financing', () => { });
And('the selected Financing title and ID is listed', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.fundingIdField}] > div > input`).should('have.value', '285528');
});

// Scenario: User selects a non-NFR as Financing source for Project
Given('User adds a Financing source for Project', () => { });
And('the Financing source for Project is not NFR', () => { });
And('the selected Financing source for Project is presented', () => { });
And('the User is presented following fields:', () => { });
//   | Title |
//   | ID    |
//   | Value |
When('the fieleds are filled in the Financing source ia stored', () => { });
And('the add new Financing source option is activated', () => { });

// Scenario: Curator edit a Project in the Project Wizard
Given("a Curator on the Project's Coordinating Institution", () => { });
When('the Curator opens the Project in the Project Wizard', () => { });
Then('the Curator can manage the Projects data', () => { });
