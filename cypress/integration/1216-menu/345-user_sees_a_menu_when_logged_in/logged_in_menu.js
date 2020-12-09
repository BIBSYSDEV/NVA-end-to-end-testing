import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_NO_ROLE } from '../../../support/constants';
import { USER_MENU } from '../../../support/data_testid_constants';
import { v4 as uuidV4 } from 'uuid';

Given('that the user is logged in', () => {
  cy.login(USER_NO_ROLE);
});
And('they have no NVA role', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidV4()}`);
});
Then('they see a menu containing', (dataTable) => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, USER_MENU);
});
// | My profile |
// | Log out    |
