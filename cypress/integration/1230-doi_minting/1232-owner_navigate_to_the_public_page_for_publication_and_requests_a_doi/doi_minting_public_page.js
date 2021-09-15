import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_CURATOR_WITH_AUTHOR, USER_WITH_AUTHOR } from '../../../support/constants';

const PUBLIC_REGISTRATION_REQUESTING_DOI = 'Published registration requesting DOI';

Given('that the Creator navigates to the Landing page for published Registration without DOI', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
  cy.get('[data-testid=published-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${PUBLIC_REGISTRATION_REQUESTING_DOI})`)
    .parent()
    .within((presentationLine) => {
      cy.wrap(presentationLine).get('[data-testid^=open-registration]').click({ force: true });
    });
});
And('they are the Owner of the Registration', () => {});
And('open "Request a DOI" dialog', () => {
  cy.get('[data-testid=button-toggle-request-doi]').click({ force: true });
});
And('optional add a message to the Curator', () => {
  cy.get('textarea').type('Optional message');
});
When('the user click the Send Button', () => {
  cy.get('[data-testid=button-send-doi-request]').click({ force: true });
});
Then('the Landing page is displayed', () => {
  cy.location('pathname').should('contain', 'public');
});
And('the "Request a DOI" button is no longer visible', () => {
  cy.get('[data-testid=button-send-doi-request]').should('not.exist');
});
And('the request is listed in My Messages', () => {
  cy.get('[data-testid=my-messages]').click({ force: true });
  cy.get('[data-testid^=title-doi-request]')
    .filter(`:contains(${PUBLIC_REGISTRATION_REQUESTING_DOI})`)
    .should('be.visible');
});
And('the request is listed in Curator Worklist', () => {
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=log-out-link]').click({ force: true });
  cy.login(USER_CURATOR_WITH_AUTHOR);
  cy.visit('/');
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=menu-my-worklist-button]').click({ force: true });
  cy.get('[data-testid^=title-doi-request]')
    .filter(`:contains(${PUBLIC_REGISTRATION_REQUESTING_DOI})`)
    .should('be.visible');
});
