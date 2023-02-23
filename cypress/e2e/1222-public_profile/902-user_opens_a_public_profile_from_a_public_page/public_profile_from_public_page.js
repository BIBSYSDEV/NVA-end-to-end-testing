import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { mockPerson } from '../../../support/mock_data';

const stage = Cypress.env('STAGE') ?? 'dev';
const fileName = 'example.txt';

Given('the Creator publishes Publication', () => {
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();

  cy.createValidRegistration(fileName);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('not.exist');
});
When('they click a Contributor', () => {
  // cy.intercept('GET', `https://api.${stage}.nva.aws.unit.no/person/1234567890`, mockPerson(userWithAuthor));
  cy.get(`[data-testid^=${dataTestId.registrationLandingPage.authorLink('')}]`)
    .first()
    .click({ force: true });
});
Then("they see the Contributor's public profile page", () => {
  cy.location('pathname').should('equal', '/research-profile');
  cy.contains('Withauthor TestUser');
});
