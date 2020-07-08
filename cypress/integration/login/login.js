import { Given, When, Before, After } from 'cypress-cucumber-preprocessor/steps';

const USER_NAME = 'test@unit.no';

Before(() => {
  cy.deleteUser(USER_NAME).then(() => {
    cy.addUser(USER_NAME).then((userId) => {
      cy.wrap(userId).as('userId');
      cy.visit('/');
    });
  });
});

Given('A user have logged in using Cognito', () => {
  cy.get('@userId');
});

When('the user navigates to the front page', () => {
  cy.get('@userId').then(() => {
    cy.visit('/');
  });
});

Then('the user sees that they are logged in', () => {
  cy.get('[data-testid=menu]').within(($menu) => {
    cy.get('p').should('have.text', 'Test User');
  });
});

After(() => {
  cy.deleteUser(USER_NAME);
});
