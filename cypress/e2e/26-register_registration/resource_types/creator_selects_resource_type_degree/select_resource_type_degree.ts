import { userUnitResourceTypeDegree, userUnitWithAuthor } from '../../../../support/constants';
import { studentThesisSubtypes, studentThesisFields } from '../../../../support/data_testid_constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

// Feature: Creator selects Resource type Degree

// Common steps
Given('Creator navigates to the Resource Type tab and selects Resource type "Student thesis"', () => {
  cy.login(userUnitResourceTypeDegree);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
Then('they see fields:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, studentThesisFields);
});
// End common steps

// @394
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Student thesis"
Given('Creator navigates to Resource Type tab', () => {
  cy.login(userUnitResourceTypeDegree);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
});
When('they select the Resource type "Student thesis"', () => {
  // cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('StudentThesis')).click();
});
Then('they see a list of subtypes:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, studentThesisSubtypes);
});
// | Bachelor thesis      |
// | Master thesis        |
// | Doctoral thesis      |
// | Other student thesis |

// Scenario: Non-Curator user select Resource type "Student thesis"
Given('Creator without rights to register thesis navigates to Resource Type tab', () => {
  cy.login(userUnitWithAuthor);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
});
Then('they are unable to select resource type:', (dataTable: DataTable) => {
  dataTable.raw().forEach((type) => {
    cy.getDataTestId(studentThesisSubtypes[type[0]]).should('have.class', 'Mui-disabled');
  });
});
// | Bachelor thesis      |
// | Master thesis        |
// | Doctoral thesis      |
// | Other student thesis |

// @1694
// Scenario Outline: Creator sees fields for Resource subtypes for "Student thesis"
When('they select the Subtype {string}', (subtype: string) => {
  if (subtype in studentThesisSubtypes) {
    cy.getDataTestId(studentThesisSubtypes[subtype]).click({ force: true });
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
  cy.login(userUnitResourceTypeDegree);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('StudentThesis')).first().click();
});
When('they click the Save button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});
Then('they can see "Mandatory" error messages for fields:', (dataTable: DataTable) => {
  dataTable.raw().forEach((field) => {
    cy.getDataTestId(studentThesisFields[field[0]])
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
  cy.getDataTestId(studentThesisSubtypes['Doctoral thesis']).click({ force: true });
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
