import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';
import { INST_ADMIN_MENU } from '../../../support/data_testid_constants';
import { v4 as uuidv4 } from 'uuid';

Given('that the user is logged in', () => {
  cy.login(USER_INST_ADMIN_WITH_AUTHOR);
});
And('they have the role of Institution-admin', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a menu containing', (dataTable) => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, INST_ADMIN_MENU);
});
// | My profile     |
// | Users          |
// | My institution |
// | Log out        |
