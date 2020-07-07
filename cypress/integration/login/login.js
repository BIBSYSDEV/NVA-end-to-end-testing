import { Given, When, Before, After } from 'cypress-cucumber-preprocessor/steps';
import { USER_NAME } from '../../support/constants';

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
    cy.get('p').should('have.text', TEST_USER_NAME);
  });
});

After(() => {
  cy.deleteUser(USER_NAME);
});
