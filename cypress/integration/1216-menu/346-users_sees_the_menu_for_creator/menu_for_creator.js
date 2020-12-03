import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { CREATOR_MENU, MAIN_BUTTONS } from '../../../support/data_testid_constants';
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
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, CREATOR_MENU);
});
// | My Profile       |
// | Log Out          |
And('they see the buttons', (dataTable) => {
  cy.testDataTestidList(dataTable, MAIN_BUTTONS);
});
// | New Registration |
// | My Registrations |
// | My Messages      |
