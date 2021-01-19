import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { REPORT_FIELDS, REPORT_SUBTYPES } from '../../../support/data_testid_constants';

const filename = 'example.txt';

// Start common steps for
// Scenario: Creator sees fields for Reference subtypes for "Report"
// and
// Scenario: Creator sees that fields are validated for Reference subtypes for "Report"

Given('Creator begins registering a Publication in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(filename);
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});
When('they navigate to the Reference tab', () => {
  cy.get('[data-testid=nav-tabpanel-reference').click({ force: true });
});
And('they select the Reference type "Report"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
});
And('they select the subtype {string}:', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${REPORT_SUBTYPES[subtype]}]`).click({ force: true });
});
// | Research report      |
// | Policy report        |
// | Working paper        |
// | Other type of report |

// End common steps

// Scenario: Creator sees fields for Reference subtypes for "Report"
Then('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, REPORT_FIELDS);
});
// | Search box for Publisher |
// | ISBN                     |
// | Total number of pages    |
// | Search box for Series    |

// Scenario: Creator sees that fields are validated for Reference subtypes for "Report"
And('they enter an invalid value in fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${REPORT_FIELDS[value[0]]}]`).type('abc123');
  });
});
// | ISBN                  |
// | Total number of pages |
Then('they can see the "Invalid ISBN" error message', () => {
  cy.get('[data-testid=snackbar-warning]').should('be.visible');
  cy.get('[data-testid=snackbar-warning]').contains('Invalid ISBN');
});
When('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${REPORT_FIELDS[value[0]]}]`).focus();
    cy.get(`[data-testid=${REPORT_FIELDS[value[0]]}]`).blur();
    cy.get(`[data-testid=${REPORT_FIELDS[value[0]]}]`).parent().parent().contains('Mandatory');
  });
});
// | Search box for Publisher |
And('they can see "Invalid format" error message for fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${REPORT_FIELDS[value[0]]}]`).parent().parent().contains('Invalid format');
  });
});
// | Total number of pages |
