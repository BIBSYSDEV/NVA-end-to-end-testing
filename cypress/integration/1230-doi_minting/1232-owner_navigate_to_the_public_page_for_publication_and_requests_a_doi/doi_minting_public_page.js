import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_CURATOR_WITH_AUTHOR, USER_WITH_AUTHOR } from '../../../support/constants';

Given('that the Creator navigates to the Landing page for published Registration without DOI', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
  cy.get('[data-testid=published-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
    .filter(':contains("Published publication request DOI")')
    .parent()
    .within((presentationLine) => {
      cy.wrap(presentationLine).get('[data-testid^=open-registration]').click({ force: true });
    });
});
And('they are the Owner of the Publication', () => {});
And('open "Request a DOI" dialog', () => {
  cy.get('[data-testid=button-toggle-request-doi]').click({ force: true });
});
And('optional add a message to the Curator', () => {
  cy.get('textarea').type('Optional message');
});
When('the user click the Send Button', () => {
  cy.get('[data-testid=button-send-doi-request]'); // TODO find out how to test without creating a multitude of doi
});
Then('the Public Page for Publication is displayed', () => {
  cy.location('pathname').should('contain', 'public');
});
And('the "Request a DOI" button is renamed to "DOI pending" and is disabled', () => {
  // rewrite scenario
});
And('the request is listed in User Worklist', () => {
  cy.get('[data-testid=my-messages]').click({ force: true });
  cy.get('[data-testid^=doi-request]').contains('Published publication request DOI');
});
And('the request is listed in Curator Worklist', () => {
  cy.login(USER_CURATOR_WITH_AUTHOR);
  cy.visit('/')
  cy.get('[data-testid=menu]').click({force: true})
  cy.get('[data-testid=menu-my-worklist-button]').click({force: true})

});


And they are the Owner of the Registration
And open "Request a DOI" dialog
And optional add a message to the Curator
When the user click the Send Button
Then the Landing page is displayed
And the "Request a DOI" button is no longer visible
And the request is listed in My messages
And the request is listed in Curator Worklist