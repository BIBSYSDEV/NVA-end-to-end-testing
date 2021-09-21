import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { mockPerson } from '../../../support/mock_data';

const testFile = 'example.txt';

Given('the Creator publishes Publication', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startWizardWithFile(testFile);

  cy.createValidRegistration();
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
  cy.get('[data-testid=button-save-registration]').click({ force: true });
  cy.get('[data-testid=button-save-registration]').should('not.exist');
});
When('they click a Contributor', () => {
  cy.intercept('GET', 'https://api.dev.nva.aws.unit.no/person/1234567890', mockPerson(USER_WITH_AUTHOR));
  cy.get('[data-testid^=presentation-author-link]').first().click({ force: true });
});
Then("they see the Contributor's public profile page", () => {
  cy.location('pathname').should('equal', '/user');
  cy.contains('TestUser, Withauthor');
});
