import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

const filename = 'example.txt';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(filename);
  cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});
When('they click the "Request support" button', () => {
  cy.get('[data-testid=open-support-button]').click({ force: true });
});
Then('the "Request support" dialog is opened', () => {
  cy.get('[data-testid=support-modal]').should('be.visible');
});
And('they see field for Message', () => {
  cy.get('[data-testid=message-input]').should('be.visible');
});
And('they see a "Send Request" button', () => {
  cy.get('[data-testid=send-button]').should('be.visible');
});
