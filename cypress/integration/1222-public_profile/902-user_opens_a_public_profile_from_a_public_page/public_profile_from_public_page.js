import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR, USER_WITH_AUTHOR_NAME } from '../../../support/constants';
import 'cypress-localstorage-commands';

const testFile = 'example.txt';

Given('the Creator publishes Publication', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(testFile);
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
  cy.createValidRegistration();

  cy.get('[data-testid=nav-tabpanel-submission').click({ force: true });

  cy.get('[data-testid=button-publish-registration]').should('be.enabled');
  cy.get('[data-testid=button-publish-registration]').click({ force: true });
  cy.get('[data-testid=button-publish-registration]').should('not.exist');
});
When('they click a Contributor', () => {
  cy.get('[data-testid^=presentation-author-link]').first().click({ force: true });
});
Then("they see the Contributor's public profile page", () => {
  cy.location('pathname').should('equal', '/user');
  cy.contains('TestUser, Withauthor');
});
