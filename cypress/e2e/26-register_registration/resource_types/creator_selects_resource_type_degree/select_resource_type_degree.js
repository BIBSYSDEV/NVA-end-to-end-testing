import { userResourceTypeDegree } from '../../../../support/constants';
import { studentThesisSubtypes, studentThesisFields } from '../../../../support/data_testid_constants';
import { Before } from 'cypress-cucumber-preprocessor/steps';
import { dataTestId } from '../../../../support/dataTestIds';

// Feature: Creator selects Resource type Degree

Before(() => {
  cy.login(userResourceTypeDegree);
  cy.startWizardWithEmptyRegistration();
});

// Common steps
Given('Creator navigates to the Resource Type tab and selects Resource type "Student thesis"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
Then('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, studentThesisFields);
});
// End common steps

// @394
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Student thesis"
Given('Creator navigates to Resource Type tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
});
When('they select the Resource type "Student thesis"', () => {
  // cy.get('[data-testid^=resource-type-chip-]').first().click();
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.testDataTestidList(dataTable, studentThesisSubtypes);
});
// | Bachelor thesis      |
// | Master thesis        |
// | Doctoral thesis      |
// | Other student thesis |

// @1694
// Scenario Outline: Creator sees fields for Resource subtypes for "Student thesis"
When('they select the Subtype {string}', (subtype) => {
  if (subtype in studentThesisSubtypes) {
    cy.get(`[data-testid=${studentThesisSubtypes[subtype]}]`).click({ force: true });
  }
});
// Examples:
//     | Subtype              |
//     | Bachelor thesis      |
//     | Master thesis        |
//     | Doctoral thesis      |
//     | Other student thesis |

// Scenario: Creator sees that fields are validated for Resource subtypes for "Student thesis"
Given('Creator sees fields for Resource subtypes for "Student thesis"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
  cy.get(`[data-testid^=resource-type-chip-Degree]`).first().click()
});
When('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${studentThesisFields[field[0]]}]`)
      .scrollIntoView()
      .within(() => {
        cy.get('p').should('have.class', 'Mui-error');
        cy.get('p').should('have.class', 'Mui-required');
      });
  });
});
// | Search box for Publisher |

// @2776
// Scenario: Creator sees series fields for Resource subtypes "Doctoral thesis"
When('they select the Subtype "Doctoral thesis" and "Licentiate thesis"', () => {
  cy.get(`[data-testid=${studentThesisSubtypes['Doctoral thesis']}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
});
