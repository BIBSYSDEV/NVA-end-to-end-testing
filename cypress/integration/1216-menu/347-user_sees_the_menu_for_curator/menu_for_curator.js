import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_CURATOR_WITH_AUTHOR } from '../../../support/constants';
import { CURATOR_MENU } from '../../../support/data_testid_constants';
import { v4 as uuidv4 } from 'uuid';
import 'cypress-localstorage-commands';

Given('that the user is logged in', () => {
  cy.login(USER_CURATOR_WITH_AUTHOR);
});
And('they have the role of Curator', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a menu containing', (dataTable) => {
  const fieldMap = CURATOR_MENU;
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, fieldMap);
});
// | My profile  |
// | My worklist |
// | Log out     |
