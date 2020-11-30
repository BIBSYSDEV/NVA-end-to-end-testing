import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { v4 as uuidv4 } from 'uuid';
import 'cypress-localstorage-commands';

Given('that the user is logged in', () => {
  cy.login(USER_WITH_AUTHOR);
});
And('they have the role of Creator', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a menu containing', (dataTable) => {
  const fieldMap = {
    'My profile': 'menu-user-profile-button',
    'Log out': 'menu-logout-button',
  };
  cy.get('[data-testid=menu]').click({ force: true });
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${fieldMap[value[0]]}]`);
  });
});
// | My Profile       |
// | Log Out          |
And('they see the buttons', (dataTable) => {
  const fieldMap = {
    'New Registration': 'new-registration',
    'My Registrations': 'my-registrations',
    'My Messages': 'my-messages',
  };
  cy.testDataTestidList(dataTable, fieldMap);
});
// | New Registration |
// | My Registrations |
// | My Messages      |
