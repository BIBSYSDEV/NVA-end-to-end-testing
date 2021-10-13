import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { LANDING_PAGE_FIELDS } from '../../../support/data_testid_constants';

// @881
// Scenario: Anonymous User views Landing Page for Registration
When('an Anonymous user navigates to a Landing Page for a Resource', () => {
  cy.visit('/');
  cy.get('[data-testid=search-button]').click();
  cy.get('[data-testid=search-field]').type('View Landing Page{enter}');
  cy.get('[data-testid=result-list-item]').first().within((result) => {
    cy.wrap(result).get('a').filter(':contains("View Landing Page")').click();
  });
});
Then('they see', (dataTable) => {
  cy.testDataTestidList(dataTable, LANDING_PAGE_FIELDS);
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
// | Related Registrations           |
// | License                         |
And('they see sharing Buttons for:', () => {});
// | Email    |
// | LinkedIn |
// | Facebook |
// | Twitter  |
