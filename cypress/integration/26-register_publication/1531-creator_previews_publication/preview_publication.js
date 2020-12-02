import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('that a Creator views a Publication', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
  cy.get('[data-testid=published-button').click({ force: true });
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});
And('they navigate to the Submission tab', () => {
  cy.get('[data-testid=nav-tabpanel-submission]').click({ force: true });
});
When('they click Save and Present', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they see the Landing Page for the Publication', () => {
  cy.location('pathname').should('contain', 'registration').and('contain', 'public');
});
And('they see a confirmation message that the Publication is saved', () => {
  cy.contains('Updated registration');
});
