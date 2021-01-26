import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('that the Creator navigates to the Public Page for Publication', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
  cy.get('[data-testid=published-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
    .contains('Published publication without DOI')
    .parent()
    .parent()
    .within((publicationLine) => {
      cy.wrap(publicationLine).get('[data-testid^=open-registration]').click({ force: true });
    });
});
And('they are the Owner of this Publication', () => {});
And('the Publication has no DOI', () => {
  cy.contains('DOI to resource:').should('not.exist'); // add data-testid to frontend
});
When('they see the Status Bar', () => {
  cy.contains('Status:'); // add data-testid to frontend
});
Then('they see buttons for "Request a DOI" and "Edit Publication"', () => {
  cy.get('[data-testid=button-toggle-request-doi]').should('be.visible');
  cy.get('[data-testid=button-edit-registration]').should('be.visible');
});
