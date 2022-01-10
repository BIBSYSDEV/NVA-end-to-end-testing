import { userInstAdminWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { myInstitutionFields, myinstitutionfieldsTestvalue } from '../../../support/data_testid_constants';

// Common steps for scenarios:
// Institution Administrator opens My Institution
// and
// Institution Administrator edits My Institution

Given('that the user is logged in as Institution Administrator', () => {
  cy.login(userInstAdminWithAuthor);
});
When('they click the menu item My Institution', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.header.adminInstitutionLink}]`).click({ force: true });
});
Then('they see the My Institution page', () => {
  cy.location('pathname').should('equal', '/my-institution');
});
// End common steps

// Institution Administrator opens My Institution
And('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, myInstitutionFields);
});
// | Name in organization registry |
// | Display name                  |
// | Short display name            |
// | Archive name                  |
And('they see the Save button', () => {
  cy.get('[data-testid=save-button]').should('be.visible');
});

// Institution Administrator edits My Institution
When('they edit fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    if (value[0] in Object.keys(myinstitutionfieldsTestvalue)) {
      cy.get(`[data-testid=${myInstitutionFields[value[0]]}]`).type(
        `{selectall}${myinstitutionfieldsTestvalue[value[0]]}`
      );
    }
  });
});
// | Display name                  |
// | Short display name            |
// | Archive name                  |
And('they click Save', () => {
  cy.get('[data-testid=save-button]').click({ force: true });
});
Then('they see a Notification that the changes were saved', () => {
  cy.get('[data-testid=snackbar-success]').should('be.visible');
});
