import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';
import 'cypress-file-upload';

const testFile = 'example.txt';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR).then(() => {
    cy.startRegistrationWithFile(testFile);
  });
});
When('they navigate to the Contributors tab', () => {
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
  cy.get('[data-testid=nav-tabpanel-contributors').click({ force: true });
});
Then('they see Add Author is enabled', () => {
  cy.get('[data-testid=add-contributor]').should('be.enabled');
});
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.visible');
});
And('they see the tab Reference is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-reference]').should('be.visible');
});
And('they see the tab Contributors is selected', () => {
  cy.get('[data-testid=nav-tabpanel-contributors][aria-selected=true]');
});
And('they see the tab Files and License is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license]').should('be.visible');
});
And('they see the tab Summary is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-submission]').should('be.visible');
});
And('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});
