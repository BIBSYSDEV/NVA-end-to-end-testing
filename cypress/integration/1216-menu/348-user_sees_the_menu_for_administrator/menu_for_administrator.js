import { userInstAdminWithAuthor } from '../../../support/constants';
import { instAdminMenu } from '../../../support/data_testid_constants';
import { v4 as uuidv4 } from 'uuid';

Given('that the user is logged in', () => {
  cy.login(userInstAdminWithAuthor);
});
And('they have the role of Institution-admin', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a menu containing', (dataTable) => {
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.testDataTestidList(dataTable, instAdminMenu);
});
// | My profile     |
// | Users          |
// | My institution |
// | Log out        |
