import { userViewRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('that a Creator views a Registration', () => {
  cy.login(userViewRegistration);
  cy.openMyRegistrations();
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});
Given('they navigate to the Files and License tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click({ force: true });
});
When('they click Save and Present', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click({ force: true });
});
Then('they see the Landing Page for the Registration', () => {
  cy.location('pathname').should('contain', 'registration');
});
