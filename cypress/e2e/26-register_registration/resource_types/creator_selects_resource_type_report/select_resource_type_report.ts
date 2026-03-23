import { userUnitResourceTypeReport } from '../../../../support/constants';
import { reportSubtypes, reportFields } from '../../../../support/data_testid_constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { Before, Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

// Feature: Creator selects Resource type Report

Before(() => {
  cy.login(userUnitResourceTypeReport);
  cy.startWizardWithEmptyRegistration();
});

// @393
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Report"
Given('Creator navigates to Resource Type tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
});
When('they select the Resource type "Report"', () => {});
Then('they see a list of subtypes:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, reportSubtypes);
});
// | Research report      |
// | Policy report        |
// | Working paper        |
// | Abstract collection  |
// | Other type of report |

// @1693
// Scenario Outline: Creator sees fields for Resource subtypes for "Report"
Given('Creator navigates to the Resource Type tab and selects Resource type "Report"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
});
When('they select the Subtype {string}', (subtype: string) => {
  cy.getDataTestId(reportSubtypes[subtype]).click();
});
Then('they see fields:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, reportFields);
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
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
});
Given('they have selected the Subtype {string}', (subtype: string) => {
  cy.getDataTestId(reportSubtypes[subtype]).click();
});
When('they enter an invalid value in fields:', (dataTable: DataTable) => {
  dataTable.raw().forEach((field) => {
    cy.getDataTestId(reportFields[field[0]]).type('{selectall}{del}invalid');
  });
});
// | ISBN                  |
// | Total number of pages |
Then('they can see the "Invalid ISBN" error message', () => {
  cy.getDataTestId(reportFields['ISBN']).type('{selectall}{del}111111111111111');
  cy.get(`[data-testid=${reportFields['ISBN']}] > div > input`).blur();
  cy.getDataTestId(reportFields['ISBN']).within(() => {
    cy.get('p').should('have.class', 'Mui-error');
  });
});
When('they click the Save button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});
Then('they can see "Mandatory" error messages for fields:', (dataTable: DataTable) => {
  dataTable.raw().forEach((field) => {
    cy.getDataTestId(reportFields[field[0]]).within(() => {
      cy.get('p').should('have.class', 'Mui-error');
      cy.get('p').should('have.class', 'Mui-required');
    });
  });
});
// | Search box for Publisher |
Then('they can see "Invalid format" error messages for fields:', (dataTable: DataTable) => {
  dataTable.raw().forEach((field) => {
    cy.getDataTestId(reportFields[field[0]]).within(() => {
      cy.get('input').focus().blur();
      cy.get('p').should('have.class', 'Mui-error');
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
