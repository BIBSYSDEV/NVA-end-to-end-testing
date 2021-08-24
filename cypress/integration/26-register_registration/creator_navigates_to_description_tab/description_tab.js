import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { DESCRIPTION_FIELDS } from '../../../support/data_testid_constants';

const filename = 'example.txt';
const PROJECT_NAME = 'Test mock project';
const INSTITUTION_NAME = 'Test institution';

// Feature: Creator navigates to Description tab
// Common steps
Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startWizardWithFile(filename);
});
When('they navigate to the Description tab', () => {
  cy.get('[data-testid=nav-tabpanel-description]').click({ force: true });
});
Given('Creator begins Wizard registration and navigates to Description tab', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startWizardWithFile(filename);
  cy.get('[data-testid=nav-tabpanel-description]').click({ force: true });
});
// End common steps

// Scenario: Creator begins Wizard registration and navigates to Description tab
Then('they see the Description tab is selected', () => {
  cy.get('[data-testid=nav-tabpanel-description]');
});
And('they see fields:', (fields) => {
  cy.testDataTestidList(fields, DESCRIPTION_FIELDS);
});
// | Title                        |
// | Abstract                     |
// | Description                  |
// | Date published               |
// | Keywords                     |
// | Primary language for content |
// | Project association          |
And('they see the tab Resource Type is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').should('be.enabled');
});
And('they see the tab Contributors is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').should('be.enabled');
});
And('they see the tab Files and License is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license]').should('be.enabled');
});
And('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});

// Scenario: Creator sees that fields are validated on Description tab
And('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${DESCRIPTION_FIELDS[field]}]`).within((descriptionField) => {
      cy.wrap(descriptionField).contains('required');
    });
  });
});
// | Title          |
// | Date published |

// Scenario: Creator searches for Project
And('they see a Search box for Projects', () => {
  cy.get('[data-testid=project-search-field] > div > div > input').should('be.visible');
});
And('they enter search term in the Search box', () => {
  cy.mockProjectSearch(PROJECT_NAME);
  cy.get('[data-testid=project-search-field] > div > div > input').type(PROJECT_NAME);
});
Then('they see list of Projects matching the search term', () => {
  cy.get('[data-testid^=project-option]').should('have.length.above', 0);
});
And('they see title and associated Institutions for each Project', () => {
  cy.get('[data-testid^=project-option]').contains(PROJECT_NAME);
  cy.get('[data-testid^=project-option]').contains(INSTITUTION_NAME);
});

// Scenario: Creator adds a Project
Given('Creator searches for Project', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startWizardWithFile(filename);
  cy.get('[data-testid=nav-tabpanel-description]').click({ force: true });
});
When('they select a Project from the Search results', () => {
  cy.mockProjectSearch(PROJECT_NAME);
  cy.get('[data-testid=project-search-field] > div > div > input').type(PROJECT_NAME);
  cy.get('[data-testid^=project-option]').filter(`:contains(${PROJECT_NAME})`).first().click({ force: true });
});
Then('the selected Project is added to the list of selected Projects', () => {
  cy.get('[data-testid^=project-chip]').should('have.length', 1);
  cy.get('[data-testid^=project-chip]').contains(PROJECT_NAME);
});

// Scenario: Creator removes a Project
Given('Creator adds a Project', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startWizardWithFile(filename);
  cy.get('[data-testid=nav-tabpanel-description]').click({ force: true });
  cy.mockProjectSearch(PROJECT_NAME);
  cy.get('[data-testid=project-search-field] > div > div > input').type(PROJECT_NAME);
  cy.get('[data-testid^=project-option]').filter(`:contains(${PROJECT_NAME})`).first().click({ force: true });
});
When('they click the Remove Project icon', () => {
  cy.get('[data-testid^=project-chip]')
    .filter(`:contains(${PROJECT_NAME})`)
    .within((project) => {
      cy.wrap(project).get('svg').click({ force: true });
    });
});
Then('they see the Project is removed from the list of selected Projects', () => {
  cy.get('[data-testid^=project-chip]').should('not.exist');
});
