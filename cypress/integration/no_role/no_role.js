import { Given, When, Then, Before, After, And } from 'cypress-cucumber-preprocessor/steps';
import { USER, NAME } from '../../support/constants';
import { createUser } from '../../support/users';

Before(() => {
  cy.loginCognito(USER).then((idToken) => cy.wrap(idToken).as('idToken'));
  cy.visit('/');

  cy.get('[data-testid=create-author-button]').click();
  cy.get('[data-testid=modal_next]').click();
  cy.get('[data-testid=skip-connect-to-orcid]').click();

  cy.setLanguage();
  cy.visit('/');
});

Given('that the user is logged in', () => {
  cy.get('@idToken');
});
And('they have no NVA role', () => {});

When('they look at any page in NVA', () => {
  cy.visit('/');
});

Then('they see a menu containing', (tableData) => {
  //   | My Profile |
  //   | Log Out    |
  cy.checkMenu(tableData.rawTable);
});

After(() => {
  cy.deleteCognitoUser(USER);
});
