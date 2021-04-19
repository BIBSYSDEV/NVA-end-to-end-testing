import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';
import { MY_INSTITUTION_FIELDS, MY_INSTITUTION_FIELDS_TESTVALUE } from '../../../support/data_testid_constants';

// Common steps for scenarios:
// Institution Administrator opens My Institution
// and
// Institution Administrator edits My Institution

Given('that the user is logged in as Institution Administrator', () => {
  cy.login(USER_INST_ADMIN_WITH_AUTHOR);
});
When('they click the menu item My Institution', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-admin-institution-button]').click({ force: true });
});
Then('they see the My Institution page', () => {
  cy.location('pathname').should('equal', '/my-institution');
});
// End common steps

// Institution Administrator opens My Institution
And('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, MY_INSTITUTION_FIELDS);
});
// | Name in organization registry |
// | Display name                  |
// | Short display name            |
// | Archive name                  |
And('they see the Save button', () => {
  cy.get('[data-testid=customer-institution-save-button]').should('be.visible');
});

// Institution Administrator edits My Institution
When('they edit fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    if (value[0] in Object.keys(MY_INSTITUTION_FIELDS_TESTVALUE)) {
      cy.get(`[data-testid=${MY_INSTITUTION_FIELDS[value[0]]}]`).type(
        `{selectall}${MY_INSTITUTION_FIELDS_TESTVALUE[value[0]]}`
      );
    }
  });
});
// | Display name                  |
// | Short display name            |
// | Archive name                  |
And('they click Save', () => {
  cy.get('[data-testid=customer-institution-save-button]').click({ force: true });
});
Then('they see a Notification that the changes were saved', () => {
  cy.get('[data-testid=snackbar-success]').should('be.visible');
});
