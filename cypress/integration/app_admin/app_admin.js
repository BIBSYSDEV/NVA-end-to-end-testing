import { Given, When, Then, Before, After, And } from 'cypress-cucumber-preprocessor/steps';
import { APP_ADMIN_USER, APP_ADMIN_NAME } from '../../support/constants';

Before(() => {
  cy.deleteUser(APP_ADMIN_USER).then(() => {
    cy.createUser(APP_ADMIN_USER, APP_ADMIN_NAME).then((idToken) => {
      cy.wrap(idToken).as('idToken');
      cy.visit('/');

      cy.get('[data-testid=create-author-button]').click();
      cy.get('[data-testid=modal_next]', { timeout: 10000 }).click();
      cy.get('[data-testid=skip-connect-to-orcid]', { timeout: 10000 }).click();

      cy.setLanguage();
      cy.visit('/');
    });
  });
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
  cy.deleteUser(APP_ADMIN_USER);
});
