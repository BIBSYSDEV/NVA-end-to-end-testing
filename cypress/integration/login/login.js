import { Given, When, Before, After } from 'cypress-cucumber-preprocessor/steps';
import { USER, NAME } from '../../support/constants';
import { createUser } from '../../support/users';

Given('A user have logged in using Cognito', () => {
  createUser(USER, NAME);
  cy.visit('/');
  cy.get('@idToken');
});

When('the user navigates to the front page', () => {
  cy.get('@idToken').then(() => {
    cy.visit('/');
  });
});

Then('the user sees that they are logged in', () => {
  cy.get('[data-testid=menu]').within(($menu) => {
    cy.get('p').should('have.text', NAME);
  });
  cy.deleteUser(USER);
});
