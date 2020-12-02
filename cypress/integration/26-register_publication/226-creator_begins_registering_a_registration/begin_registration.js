import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('that the user is logged in', () => {
  cy.login(USER_WITH_AUTHOR);
});
And('they have Role Creator', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
  cy.get('[data-testid=user-role-creator]').should('exist');
});
And('they are on the Start page', () => {
  cy.visit('/');
});
When('they click the New Registration button', () => {
  cy.get('[data-testid=new-registration]').click({ force: true });
});
Then('they are redirected to the New Registration page', () => {
  cy.location('pathname').should('equal', '/registration');
});
And('they see an Expansion panel for Upload file', () => {
  cy.get('[data-testid=new-registration-file]').should('exist');
});
And('they see an Expansion panel for Link to resource', () => {
  cy.get('[data-testid=new-registration-link]').should('exist');
});
