import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { LANDING_PAGE_FIELDS } from '../../../support/data_testid_constants';

// @881
// Scenario: Anonymous User views Landing Page for Registration
Given('the Anonymous User has opened NVA', () => {
  cy.visit('/');
});
When('they navigate to Landing Page for a Registration', () => {
  cy.contains('Search for publication').click();
  cy.get('[data-testid=search-field]').type('View landing page{enter}');
  cy.get('[data-testid=result-list-item]').within((result) => {
    cy.wrap(result).get('a').filter(':contains("View Landing Page")').click();
  });
});
Then('they see page fields for', (dataTable) => {
  cy.testDataTestidList(dataTable, LANDING_PAGE_FIELDS)
});
// | Title                           |
// | Abstract                        |
// | NPI                             |
// | Keywords                        |
// | Publication date                |
// | Primary language                |
// | Projects                        |
// | Registration subtype            |
// | Fields corresponding to subtype |
// | Contributors                    |
// | Files                           |
// | DOI link                        |
// | License                         |
