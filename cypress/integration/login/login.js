import { Given, When, Before } from 'cypress-cucumber-preprocessor/steps';

const USER_NAME = 'test@unit.no';

Before(() => {
  cy.addUser(USER_NAME).then((authResult) => {
    cy.wrap(authResult).as('authResult');
    cy.visit('/');
    cy.wait(5000);
  });
});

Given('A user have logged in using Cognito', () => {
  cy.get('@authResult');
});

When('the user navigates to the front page', () => {
  cy.get('@authResult').then((authResult) => {
    cy.visit('/');
  });
});

Then('the user sees that they are logged in', () => {
  cy.get('[data-testid=menu]').within(($menu) => {
    cy.get('p').should('have.text', 'Test User');
  });
});
