import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userUnitViewRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';

Given('that a Creator views a Registration', () => {
  cy.login(userUnitViewRegistration);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(null, `View Registration ${uuid()}`);
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
