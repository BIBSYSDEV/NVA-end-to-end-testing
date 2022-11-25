import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import { TEST_USER, TEST_USER_NAME } from '../../support/constants';
import { dataTestId } from '../../support/dataTestIds';

Given('A user have logged in using Cognito', () => {
  cy.loginCognito(TEST_USER);
});

When('the user navigates to the front page', () => {
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
});

Then('the user sees that they are logged in', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).within(($menu) => {
    cy.get('p').should('have.text', TEST_USER_NAME);
  });
});
