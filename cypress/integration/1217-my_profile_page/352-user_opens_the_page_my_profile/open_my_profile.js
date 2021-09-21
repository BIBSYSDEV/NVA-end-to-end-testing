import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { PROFILE_PAGE_FIELDS } from '../../../support/data_testid_constants';

Given('that the user is logged in', () => {
  cy.login(USER_WITH_AUTHOR);
});
When('they click the menu item My user profile', () => {
  cy.mockInstitution();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
});
Then('they see My Profile', () => {});
And('they see their Profile page which includes information for', (dataTable) => {
  cy.testDataTestidList(dataTable, PROFILE_PAGE_FIELDS);
});
// | Real name          |
// | Feide ID           |
// | Email              |
// | ORCID              |
// | Roles              |
// | Organizations      |
// | Language           |
