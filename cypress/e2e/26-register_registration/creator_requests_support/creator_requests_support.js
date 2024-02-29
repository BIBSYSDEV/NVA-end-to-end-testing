import { userRequestSupport } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

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
And('they see field for Message', () => {
  cy.getDataTestId('message-field').should('exist');
});
And('they see a "Send Request" button', () => {
  cy.getDataTestId('SendIcon').should('exist');
});
