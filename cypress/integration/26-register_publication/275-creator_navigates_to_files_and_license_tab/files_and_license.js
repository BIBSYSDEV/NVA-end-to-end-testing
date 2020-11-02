import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';
import 'cypress-file-upload';

const testFile = 'example.txt';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR, cy.startRegistrationWithFile, testFile).then((idToken) => {
    cy.wrap(idToken).as('idToken');
  });
});
When('they navigate to the Files and License tab', () => {
  cy.get('[data-testid=publication-file-start-button]').click({ force: true });
  cy.get('[data-testid=nav-tabpanel-files-and-license').click({ force: true });
});
And('they see the File upload widget', () => {
  cy.contains('Drag files here');
});
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.visible');
});
And('they see the tab Reference is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-reference]').should('be.visible');
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
And('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-publication]').should('be.enabled');
});
