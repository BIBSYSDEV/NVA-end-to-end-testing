import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// @881
// Scenario: Anonymous User views Landing Page for Registration
Given('the Anonymous User has opened NVA', () => {
  cy.visit('/');
});
When('they navigate to Landing Page for a Registration', () => {});
Then('they see page fields for', () => {});
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
