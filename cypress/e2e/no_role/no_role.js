import { Given, When, Then, Before, After, And } from 'cypress-cucumber-preprocessor/steps';
import { USER, NAME } from '../../support/constants';
import { createUser } from '../../support/users';

Before(() => {
  cy.loginCognito(USER);
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });

  cy.get('[data-testid=create-author-button]').click();
  cy.get('[data-testid=modal_next]').click();
  cy.get('[data-testid=skip-connect-to-orcid]').click();

  cy.setLanguage();
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
});

Given('that the user is logged in', () => {});
And('they have no NVA role', () => {});

When('they look at any page in NVA', () => {
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
});

Then('they see a menu containing', (tableData) => {
  //   | My Profile |
  //   | Log Out    |
  cy.checkMenu(tableData.rawTable);
});

After(() => {
  cy.deleteCognitoUser(USER);
});
