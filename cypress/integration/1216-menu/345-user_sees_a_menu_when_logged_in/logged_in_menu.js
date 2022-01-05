import { userNoRole } from '../../../support/constants';
import { userMenu } from '../../../support/data_testid_constants';
import { v4 as uuidV4 } from 'uuid';

Given('that the user is logged in', () => {
  cy.login(userNoRole);
});
And('they have no NVA role', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidV4()}`);
});
Then('they see a menu containing', (dataTable) => {
  cy.get('[data-testid=menu-button]').should('exist');
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.testDataTestidList(dataTable, userMenu);
});
// | My profile |
// | Log out    |
