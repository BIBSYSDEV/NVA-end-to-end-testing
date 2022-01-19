import { userViewRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('that a Creator views a Registration', () => {
  cy.login(userViewRegistration);
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.myRegistrationsLink}]`).click({ force: true });
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});
And('they navigate to the Files and License tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click({ force: true });
});
When('they click Save and Present', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they see the Landing Page for the Registration', () => {
  cy.location('pathname').should('contain', 'registration').and('contain', 'public');
});
