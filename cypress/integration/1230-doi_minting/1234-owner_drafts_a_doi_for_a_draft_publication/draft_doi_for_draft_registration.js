import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('that an Owner views the Landing Page for their Registration', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
});
And('the Registration has status Draft', () => {
  cy.get('[data-testid=unpublished-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
    .filter(':contains("Draft registration requesting DOI")')
    .parent()
    .within((presentationLine) => {
      cy.get('[data-testid^=open-registration]').click({ force: true });
    });
});
And('the Registration has no DOI', () => {
  cy.get('[data-testid=doi-presentation]').should('not.exist');
});
When('they click the "Reserve a DOI" button', () => {
  cy.get('[data-testid=button-toggle-request-doi]').click({ force: true });
});
Then('the "Reserve a DOI" button is no longer visible', () => {
  cy.get('[data-testid=button-toggle-request-doi]').should('not.exist')
});
And('the Landing Page for the Registration contains the Draft DOI', () => {
    cy.get('[data-testid=doi-presentation]').should('be.visible');
});
And('the drafted DOI is not clickable and marked "In progress"', () => {
    cy.get('[data-testid=doi-presentation]').contains('(In progress)');
});
