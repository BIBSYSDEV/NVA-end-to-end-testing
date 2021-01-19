import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

const testFile = 'example.txt';

Given('Creator begins registering a Registration', () => {
  cy.login(USER_WITH_AUTHOR).then(() => {
    cy.get('[data-testid=new-registration]').click({ force: true });
  });
});

When('they click Upload file', () => {
  cy.get('[data-testid=new-registration-file]').click({ force: true });
});
And('they upload a file', () => {
  cy.get('input[type=file]').attachFile(testFile);
});
Then('they see the file name', () => {
  cy.contains(testFile);
});
And('they see the file size', () => {
  cy.contains('Uploaded 1 kB');
});
And('they see the Remove button', () => {
  cy.get('[data-testid=button-remove-file]').should('be.visible');
});
And('they see the Start button is enabled', () => {
  cy.get('[data-testid="registration-file-start-button"]').should('be.enabled');
});
