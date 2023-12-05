import { adminUser } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { institutionFields } from '../../../support/data_testid_constants';
// Feature: Application Administrator administers Customer Institutions

const sectors = {
  'University and college': dataTestId.basicData.institutionAdmin.sectorChip('UHI'),
  'Health sector': dataTestId.basicData.institutionAdmin.sectorChip('HEALTH'),
  'Institute sector': dataTestId.basicData.institutionAdmin.sectorChip('INSTITUTE'),
  'Archives, Libraries and Museums': dataTestId.basicData.institutionAdmin.sectorChip('ABM'),
  'Other': dataTestId.basicData.institutionAdmin.sectorChip('OTHER'),
}

// Common steps
Given('that the user is logged in as Application Administrator', () => {
  cy.login(adminUser);
});

And('they see fields:', (table) => {
  cy.testDataTestidList(table, institutionFields);
});
And('they see Sector options:', (table) => {
  cy.testDataTestidList(table, sectors);
});
// | University and college          |
// | Health sector                   |
// | Institute sector                |
// | Archives, Libraries and Museums |
// | Other                           |
And('they see options for NVI reporting', () => {
  cy.getDataTestId(dataTestId.basicData.institutionAdmin.nviInstitutionCheckbox).should('be.visible');
  cy.getDataTestId(dataTestId.basicData.institutionAdmin.rboInstitutionCheckbox).should('be.visible');
});

// End common steps

// Scenario: Application Administrator opens Institutions
When('they click the menu item Institutions', () => {
  cy.getDataTestId(dataTestId.header.basicDataLink).click();
  cy.getDataTestId(dataTestId.basicData.adminInstitutionsLink).click();
});
Then('they see the page Institutions', () => {
  cy.location('pathname').should('equal', '/basic-data/institutions');
});
And('they see a table of all Customer Institutions', () => {
  cy.getDataTestId(dataTestId.basicData.customers.customerList);
});
And('they see the table contains the fields', (table) => {
  cy.getDataTestId(dataTestId.basicData.customers.customerList).within(() => {
    table.rawTable.forEach((field) => {
      cy.contains(field[0]);
    });
  });
});
// | Name |
// | Date |
And('they see a button Edit that is enabled for each Institution', () => {
  cy.getDataTestId(dataTestId.basicData.customers.customerList).within(() => {
    cy.get(`[data-testid^=${dataTestId.basicData.customers.editInstitutionButton('')}]`).should('have.length.above', 0);
  });
});
And('they see a button Add institution that is enabled', () => {
  cy.getDataTestId(dataTestId.basicData.addCustomerLink).should('exist');
});

// Scenario: Application Administrator adds a Customer Institution
When('they click Add Institution', () => {
  cy.getDataTestId(dataTestId.basicData.addCustomerLink).click();
});
Then('they see the Add Institution page', () => {
  cy.location('pathname').should('equal', '/basic-data/institutions');
  cy.location('search').should('equal', '?id=new');
});
And('they see fields:', (table) => { });
// | Name in organization registry |
// | Display name                  |
// | Archive name                  |
// | Feide Organization ID         |
// | ROR ID                        |
And('they see Sector options:', () => { });
// | University and college          |
// | Health sector                   |
// | Institute sector                |
// | Archives, Libraries and Museums |
And('a button Create that is enabled', () => {
  cy.getDataTestId(dataTestId.basicData.institutionAdmin.saveButton).should('be.enabled');
});

// Scenario: Application Administrator opens a Customer Institution
When('they open a Customer Institution', () => {
  cy.getDataTestId(dataTestId.header.basicDataLink).click();
  cy.getDataTestId(dataTestId.basicData.adminInstitutionsLink).click();
  cy.getDataTestId(dataTestId.basicData.customers.editInstitutionButton('test-institution-2')).click();
  // cy.getDataTestId(dataTestId.basicData.institutionAdmin.)
});
Then('they see fields:', (table) => { });
// | Name in organization registry |
// | Display name                  |
// | Short display name            |
// | Archive name                  |
// | Feide Organization ID         |
// | ROR ID                        |
And('they see Sector options:', () => { });
// | University and college          |
// | Health sector                   |
// | Institute sector                |
// | Archives, Libraries and Museums |
And('they see options for NVI reporting', () => { });
And('they see the Save button', () => {
  cy.getDataTestId(dataTestId.basicData.institutionAdmin.saveButton).should('be.visible');
});
And('they see the list of current Institution Administrators', () => {
  cy.get('tr').filter(':contains("Institution-admin TestUser")').should('have.length.above', 0);
});
And('every Institution Administrator has a Remove button', () => {
  cy.get(`[data-testid^=button-remove-role-Institution-admin-]`).should('have.length.above', 0);
});
And('they see button to add a new Institution Administrator', () => {
  cy.getDataTestId('button-open-add-admin').should('be.visible');
});
