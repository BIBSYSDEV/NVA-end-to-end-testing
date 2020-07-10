import { Given, When, Then, Before, After, And } from 'cypress-cucumber-preprocessor/steps';
import { ADMIN_USER, ADMIN_NAME } from '../../support/constants';
import { createUser } from '../../support/users';

Before(() => {
  createUser(ADMIN_USER, ADMIN_NAME);
  cy.visit('/');

  cy.get('[data-testid=create-author-button]', { timeout: 10000 }).click();
  cy.get('[data-testid=modal_next]', { timeout: 10000 }).click();
  cy.get('[data-testid=skip-connect-to-orcid]', { timeout: 10000 }).click();

  cy.setLanguage();
  cy.visit('/');
});

Given('that the user is logged in', () => {
  cy.get('@idToken');
});
And('they have the role of Application administrator', () => {});

When('they look at any page in NVA', () => {
  cy.visit('/');
});

Then('they see a menu containing', (tableData) => {
  // | My Profile   |
  // | Institutions |
  // | Log Out      |
  cy.checkMenu(tableData.rawTable);
});

After(() => {
  cy.deleteCognitoUser(ADMIN_USER);
});
