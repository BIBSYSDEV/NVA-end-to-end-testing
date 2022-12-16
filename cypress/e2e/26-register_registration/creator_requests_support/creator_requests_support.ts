import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userRequestSupport } from '../../../support/constants';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userRequestSupport);
  cy.startWizardWithEmptyRegistration();
});
When('they click the "Request support" button', () => {
  cy.get('[data-testid=open-support-button]').click({ force: true });
});
Then('the "Request support" dialog is opened', () => {
  cy.get('[data-testid=support-modal]').should('be.visible');
});
Then('they see field for Message', () => {
  cy.get('[data-testid=message-field]').should('be.visible');
});
Then('they see a "Send Request" button', () => {
  cy.get('[data-testid=send-button]').should('be.visible');
});
