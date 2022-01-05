import { adminUser } from '../../../support/constants';
import { adminMenu } from '../../../support/data_testid_constants';
import { v4 as uuidv4 } from 'uuid';

Given('that the user is logged in', () => {
  cy.login(adminUser);
});
And('they have the role of Application administrator', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a menu containing', (dataTable) => {
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.testDataTestidList(dataTable, adminMenu);
});
// | My profile   |
// | Institutions |
// | Log Out      |
