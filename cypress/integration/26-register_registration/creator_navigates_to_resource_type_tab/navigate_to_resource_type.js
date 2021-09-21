import { USER_WITH_AUTHOR } from '../../../support/constants';
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {
  JOURNAL_SUBTYPES,
  JOURNAL_FIELDS,
  BOOK_SUBTYPES,
  BOOK_FIELDS,
  REPORT_SUBTYPES,
  REPORT_FIELDS,
  CHAPTER_SUBTYPES,
  CHAPTER_FIELDS,
  STUDENT_THESIS_SUBTYPES,
  STUDENT_THESIS_FIELDS,
  RESOURCE_TYPES,
  RESOURCE_TYPE_FIELDS,
} from '../../../support/data_testid_constants';

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';
const filename = 'example.txt';

// Feature: Creator navigates to Resource Type tab

// Common steps
Given('Creator begins registering a Registration in the Wizard with a File', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startWizardWithFile(filename);
});
When('they navigate to the Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type').click({ force: true });
  cy.wrap(RESOURCE_TYPE_FIELDS).as('fields');
});
// end common steps

//   @453
//   Scenario: Creator navigates to Resource Type tab
Then('they see the field for Type', () => {
  cy.get('[data-testid=publication-context-type]').should('be.visible');
});
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.enabled');
});
And('they see the tab Resource Type is selected', () => {
  cy.get('[data-testid=nav-tabpanel-description]').get('[tabindex=0]');
});
And('they see the tab Contributors is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').should('be.visible');
});
And('they see the tab Files and License is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license]').should('be.visible');
});
And('they see Previous is enabled', () => {
  cy.get('[data-testid=button-previous-tab]').should('be.enabled');
});
And('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration').should('be.enabled');
});

//   Scenario: Creator sees that fields are validated on Resource Type tab

And ('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
})
Then ('they can see "Mandatory" error messages for fields:', (dataTable) => {
  
})
  // | Type |
