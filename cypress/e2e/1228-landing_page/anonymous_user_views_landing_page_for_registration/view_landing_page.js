import { dataTestId } from '../../../support/dataTestIds';
import { landingPageFields, landingPageShareButtons } from '../../../support/data_testid_constants';

const landing_page_registration_title = 'View Landing Page';

// @881
// Scenario: Anonymous User views Landing Page for Registration
When('an Anonymous user navigates to a Landing Page for a Resource', () => {
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVUSER'),
    },
  });
  cy.setLocalStorage('beta', true);
  cy.get(`[data-testid=${dataTestId.startPage.searchButton}]`).click();
  cy.get(`[data-testid=${dataTestId.startPage.searchField}]`).type(landing_page_registration_title);
  cy.get(`[data-testid=${dataTestId.startPage.searchButton}]`).click();
  cy.wait(2000);
  cy.get('[data-testid=result-list-item]').filter(`:contains(${landing_page_registration_title})`).should('be.visible');
  cy.get('[data-testid=result-list-item]')
    .filter(`:contains(${landing_page_registration_title})`)
    .first()
    .within((result) => {
      cy.wrap(result).get('a').filter(`:contains(${landing_page_registration_title})`).click();
    });
});
Then('they see', (dataTable) => {
  cy.testDataTestidList(dataTable, landingPageFields);
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
And('they see sharing Buttons for:', (dataTable) => {
  cy.testDataTestidList(dataTable, landingPageShareButtons);
});
// | Email    |
// | LinkedIn |
// | Facebook |
// | Twitter  |
