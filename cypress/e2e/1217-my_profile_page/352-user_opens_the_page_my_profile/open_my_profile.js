import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { profilePageFields } from '../../../support/data_testid_constants';

Given('that the user is logged in', () => {
  cy.login(userWithAuthor);
});
// When('they click the menu item My user profile', () => {
//   cy.mockInstitution();
//   cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
//   cy.get(`[data-testid=${dataTestId.header.myProfileLink}]`).click({ force: true });
// });
Then('they see My Profile', () => {});
And('they see their Profile page which includes information for', (dataTable) => {
  cy.testDataTestidList(dataTable, profilePageFields);
});
// | Real name          |
// | Feide ID           |
// | Email              |
// | ORCID              |
// | Roles              |
// | Organizations      |
// | Language           |
