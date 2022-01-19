import { userResourceType } from '../../../../support/constants';
import { reportSubtypes, reportFields } from '../../../../support/data_testid_constants';
import { Before } from 'cypress-cucumber-preprocessor/steps';
import { dataTestId } from '../../../../support/dataTestIds';

// Feature: Creator selects Resource type Report

Before(() => {
  cy.login(userResourceType);
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.myRegistrationsLink}]`).click({ force: true });
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});

// @393
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Report"
Given('Creator navigates to Resource Type tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
});
When('they select the Resource type "Report"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, reportSubtypes);
});
// | Research report      |
// | Policy report        |
// | Working paper        |
// | Other type of report |

// @1693
// Scenario Outline: Creator sees fields for Resource subtypes for "Report"
Given('Creator navigates to the Resource Type tab and selects Resource type "Report"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
});
When('they select the Subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${reportSubtypes[subtype]}]`).click();
});
Then('they see fields:', (dataTable) => {
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
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
});
And('they have selected the Subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${reportSubtypes[subtype]}]`).click();
});
When('they enter an invalid value in fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${reportFields[field[0]]}]`).type('{selectall}{del}invalid');
  });
});
// | ISBN                  |
// | Total number of pages |
Then('they can see the "Invalid ISBN" error message', () => {
  cy.get(`[data-testid=${reportFields['ISBN']}]`).type('{selectall}{del}111111111111111');
  cy.get(`[data-testid=${reportFields['ISBN']}] > div > input`).blur();
  cy.get(`[data-testid=${reportFields['ISBN']}]`).within(() => {
    cy.get('p').should('have.class', 'Mui-error');
  });
});
When('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click();
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${reportFields[field[0]]}]`).within(() => {
      cy.get('p').should('have.class', 'Mui-error');
      cy.get('p').should('have.class', 'Mui-required');
    });
  });
});
// | Search box for Publisher |
And('they can see "Invalid format" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${reportFields[field[0]]}]`).within(() => {
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
