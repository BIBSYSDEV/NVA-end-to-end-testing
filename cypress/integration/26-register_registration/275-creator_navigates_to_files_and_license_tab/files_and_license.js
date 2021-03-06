import { Given, When, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

const testFile = 'example.txt';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startWizardWithFile(testFile);
});
When('they navigate to the Files and License tab', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license').click({ force: true });
});
And('they see the File upload widget', () => {
  // cy.contains('Drag files here');
});
And('they see an Input Field for Linked Resources', () => {});
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.visible');
});
And('they see the tab Resource Type is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').should('be.visible');
});
And('they see the tab Contributors is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').should('be.visible');
});
And('they see the tab Files and License is selected', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license][aria-selected=true]');
});
And('they see the tab Summary is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-submission]').should('be.visible');
});
And('they see Previous is enabled', () => {
  cy.get('[data-testid=button-previous-tab]').should('be.enabled');
});
And('they see Next is enabled', () => {
  // cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});
