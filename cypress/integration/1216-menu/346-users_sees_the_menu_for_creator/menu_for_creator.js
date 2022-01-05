import { userWithAuthor } from '../../../support/constants';
import { creatorMenu, mainButtons } from '../../../support/data_testid_constants';
import { v4 as uuidv4 } from 'uuid';

Given('that the user is logged in', () => {
  cy.login(userWithAuthor);
});
And('they have the role of Creator', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a menu containing', (dataTable) => {
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.testDataTestidList(dataTable, creatorMenu);
});
// | My Profile       |
// | Log Out          |
And('they see the buttons', (dataTable) => {
  cy.testDataTestidList(dataTable, mainButtons);
});
// | New Registration |
// | My Registrations |
// | My Messages      |
