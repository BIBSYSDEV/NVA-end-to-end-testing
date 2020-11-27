import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { ADMIN_USER } from '../../../support/constants';
import { v4 as uuidv4 } from 'uuid';
import 'cypress-localstorage-commands';

Given('that the user is logged in', () => {
  cy.login(ADMIN_USER);
});
And('they have the role of Application administrator', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a menu containing', (dataTable) => {
  const fieldMap = {
    'My profile': 'menu-user-profile-button',
    'Institutions': 'menu-admin-institution-button',
    'Log out': 'menu-logout-button',
  };
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, fieldMap);
});
// | My profile   |
// | Institutions |
// | Log Out      |
