import { userRequestSupport } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userRequestSupport);
  cy.startWizardWithEmptyRegistration();
});
When('they click the "Request support" button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.openSupportButton).click();
});
Then('the "Request support" dialog is opened', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.supportModal).should('be.visible');
});
Then('they see field for Message', () => {
  cy.getDataTestId('message-field').should('exist');
});
Then('they see a "Send Request" button', () => {
  // cy.getDataTestId('SendIcon').should('exist');
});
