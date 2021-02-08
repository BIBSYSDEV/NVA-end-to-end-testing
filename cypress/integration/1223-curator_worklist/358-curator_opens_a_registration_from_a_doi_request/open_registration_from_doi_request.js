import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_CURATOR_WITH_AUTHOR } from '../../../support/constants';

Given('that a Curator views their Worklist', () => {
  cy.login(USER_CURATOR_WITH_AUTHOR);
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-my-worklist-button]').click({ force: true });
});
And('they have selected the DOI Requests tab', () => {
  cy.get('[data-testid=doi-requests-button]').click({ force: true });
});
And('they have expanded an item \\(DOI Request)', () => {
  cy.get('[data-testid^=doi-request-]').first().as('doiRequest');
  cy.get('@doiRequest').click();
});
When('they click "Go to registration"', () => {
  cy.get('@doiRequest').within((doiRequest) => {
    cy.get('[data-testid^=go-to-registration]').first().click({ force: true });
  });
});
Then("they see the Landing Page for the DOI Request's Registration", () => {
  cy.get('[data-testid=public-registration-status]').should('exist');
});
And('the Create DOI button is enabled', () => {
  cy.get('[data-testid=button-create-doi]').should('be.enabled');
});
And('the Decline DOI button is enabled', () => {
  cy.get('[data-testid=button-reject-doi]').should('be.enabled');
});
