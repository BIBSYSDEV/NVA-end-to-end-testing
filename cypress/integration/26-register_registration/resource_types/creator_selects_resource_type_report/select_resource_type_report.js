import { Given, When, Then, And, Before } from 'cypress-cucumber-preprocessor/steps';
import { USER_RESOURCE_TYPE } from '../../../../support/constants';
import { REPORT_SUBTYPES, REPORT_FIELDS } from '../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Report

Before(() => {
  cy.login(USER_RESOURCE_TYPE);
  cy.get('[data-testid=my-registrations]').click({ force: true });
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});

// @393
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Report"
Given('Creator navigates to Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
});
When('they select the Resource type "Report"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, REPORT_SUBTYPES);
});
// | Research report      |
// | Policy report        |
// | Working paper        |
// | Other type of report |

// @1693
// Scenario Outline: Creator sees fields for Resource subtypes for "Report"
Given('Creator navigates to the Resource Type tab and selects Resource type "Report"', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
});
When('they select the Subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${REPORT_SUBTYPES[subtype]}]`).click();
});
Then('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, REPORT_FIELDS);
});
//     | Search box for Publisher |
//     | ISBN                     |
//     | Total number of pages    |
//     | Search box for Series    |
//     | Series number            |
// Examples:
//     | Subtype              |
//     | Research report      |
//     | Policy report        |
//     | Working paper        |
//     | Other type of report |

// Scenario Outline: Creator sees that fields are validated for Resource subtypes for "Report"
Given('Creator sees fields for Resource subtypes for "Report"', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
});
And('they have selected the Subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${REPORT_SUBTYPES[subtype]}]`).click();
});
When('they enter an invalid value in fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${REPORT_FIELDS[field[0]]}]`).type('{selectall}{del}invalid');
  });
});
// | ISBN                  |
// | Total number of pages |
Then('they can see the "Invalid ISBN" error message', () => {
  cy.get(`[data-testid=${REPORT_FIELDS['ISBN']}]`).type('{selectall}{del}invalid{enter}');
  cy.get('[data-testid=snackbar-warning]').contains('ISBN has invalid format');
});
When('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click();
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${REPORT_FIELDS[field[0]]}]`).within(() => {
      cy.get('p').should('have.class', 'Mui-error');
      cy.get('p').should('have.class', 'Mui-required');
    });
  });
});
// | Search box for Publisher |
And('they can see "Invalid format" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${REPORT_FIELDS[field[0]]}]`).within(() => {
      cy.get('p').should('have.class', 'Mui-error');
      cy.get('p').should('have.class', 'Mui-required');
    });
  });
});
//     | Total number of pages |
// Examples:
//     | Subtype              |
//     | Research report      |
//     | Policy report        |
//     | Working paper        |
//     | Other type of report |
