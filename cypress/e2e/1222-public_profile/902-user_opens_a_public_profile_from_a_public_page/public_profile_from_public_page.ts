import { userUnitWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';

const fileName = 'example.txt';

Given('the Creator publishes Publication', () => {
  cy.login(userUnitWithAuthor);
  cy.startWizardWithEmptyRegistration();

  cy.createValidRegistration(fileName, `Published registration ${uuid()}`);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('not.exist');
});
When('they click a Contributor', () => {
  cy.get(`[data-testid^=${dataTestId.registrationLandingPage.authorLink('')}]`)
    .first()
    .click({ force: true });
});
Then("they see the Contributor's public profile page", () => {
  cy.location('pathname').should('contain', '/research-profile');
  cy.contains('Withauthor TestUser');
});
