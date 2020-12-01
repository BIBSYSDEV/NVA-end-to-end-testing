import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { ADMIN_USER } from '../../../support/constants';
import { ADMIN_MENU } from '../../../support/data_testid_constants';
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
  const fieldMap = ADMIN_MENU;
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, fieldMap);
});
// | My profile   |
// | Institutions |
// | Log Out      |
