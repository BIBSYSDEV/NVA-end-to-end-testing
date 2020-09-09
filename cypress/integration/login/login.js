import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import { TEST_USER, TEST_USER_NAME } from '../../support/constants';

Given('A user have logged in using Cognito', () => {
  cy.loginCognito(TEST_USER).then((idToken) => {
    cy.wrap(idToken).as('idToken');
  });
});

When('the user navigates to the front page', () => {
  cy.get('@idToken').then(() => {
    cy.visit('/');
  });
});

Then('the user sees that they are logged in', () => {
  cy.get('[data-testid=menu]').within(($menu) => {
    cy.get('p').should('have.text', TEST_USER_NAME);
  });
});
