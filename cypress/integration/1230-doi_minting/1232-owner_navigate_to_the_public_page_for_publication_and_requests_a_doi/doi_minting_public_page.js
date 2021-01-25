import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('that the Creator navigates to the Public Page for Publication for published publication without DOI', () => {
  cy.login(USER_WITH_AUTHOR);
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
  cy.get('[data-testid=button-toggle-request-doi]').should('have.text', 'DOI pending');
  cy.get('[data-testid=button-toggle-request-doi]').should('be.disabled');
});
And('the request is listed in User Worklist', () => {
    
});
And('the request is listed in Curator Worklist', () => {});
