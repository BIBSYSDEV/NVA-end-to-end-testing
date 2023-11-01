import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { profilePageFields } from '../../../support/data_testid_constants';

Given('that the user is logged in', () => {
  cy.login(userWithAuthor);
});
When('they click the menu item My user profile', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.myProfileAccordion).click();
  cy.getDataTestId(dataTestId.myPage.myProfileLink).click();
});
Then('they see My Profile', () => {
  cy.location('pathname').should('contain', '/my-page/my-profile');
});
And('they see their Profile page which includes information for', (dataTable) => {
  cy.testDataTestidList(dataTable, profilePageFields);
  cy.get('button').filter(':lang("nb")').should('be.visible');
  cy.get('button').filter(':lang("en")').should('be.visible');
});
// | Real name          |
// | Feide ID           |
// | Email              |
// | ORCID              |
// | Roles              |
// | Organizations      |
// | Language           |
