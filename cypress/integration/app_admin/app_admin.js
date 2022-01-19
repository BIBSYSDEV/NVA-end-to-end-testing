import { Before, After } from 'cypress-cucumber-preprocessor/steps';
import { adminUser } from '../../support/constants';

Before(() => {
  cy.loginCognito(adminUser).then((idToken) => cy.wrap(idToken).as('idToken'));
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
  cy.deleteCognitoUser(adminUser);
});
