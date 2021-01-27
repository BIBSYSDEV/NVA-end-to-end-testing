import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('that a Creator navigates to the Public Page for Publication for published publication without DOI', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
});
And('they are the Owner of this Publication', () => {
  cy.get('[data-testid=published-button]').click({ force: true });
  cy.get('[data-testid^=open-registration]').first().click({ force: true });
});
When('they click the "Request a DOI" button', () => {
  cy.get('[data-testid=button-toggle-request-doi]').click({ force: true });
});
Then('the "Request a DOI dialog" is opened');
And('they see fields for Message');
And('they see a "Send Request" button');
