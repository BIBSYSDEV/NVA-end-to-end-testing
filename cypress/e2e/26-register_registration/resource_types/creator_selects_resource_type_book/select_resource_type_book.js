import { userResourceTypeBook } from '../../../../support/constants';
import { bookSubtypes, bookFields } from '../../../../support/data_testid_constants';
import { Before } from 'cypress-cucumber-preprocessor/steps';
import { dataTestId } from '../../../../support/dataTestIds';

// Feature: Creator selects Resource type Book
Before(() => {
  cy.login(userResourceTypeBook);
  cy.startWizardWithEmptyRegistration();
});

// Common steps
Given('Creator navigates to the Resource Type tab and sees Resource types for "Book"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
});
// end Common steps


// Scenario: Creator navigates to the Resource Type tab and sees Resource types for "Book"
Given('Creator navigates to Resource Type tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
});
When('they select the Resource type "Book"', () => { });
Then('they see a list of subtypes:', (dataTable) => {
  cy.testDataTestidList(dataTable, bookSubtypes);
});
// | Anthology                 |
// | Academic Monograph        |
// | Non-fiction Monograph     |
// | Popular Science Monograph |
// | Textbook                  |
// | Encyclopedia              |
// | Exhibition catalog        |

// Scenario: Creator sees fields for Book
Given('Creator navigates to the Resource Type tab and sees Resource types for "Book"', () => { });
When('they select any Book type', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicMonograph')).click();
});
And('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, bookFields);
});
// | Publisher             |
// | NPI discipline        |
// | ISBN                  |
// | Total number of pages |
// | Series                |
// | Series number         |

// Scenario: Creator sees that fields for Book are validated on Resource Type tab
Given('Creator sees fields for Book', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicMonograph')).click();
});
When('they click the Save button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${bookFields[field[0]]}]`).within(() => {
      cy.get('p').should('have.class', 'Mui-error');
      cy.get('p').should('have.class', 'Mui-required');
    });
  });
});
// | Publisher      |
// | NPI discipline |

// Scenario: Creator selects Resource subtype Academic Monograph
Given('Creator navigates to the Resource Type tab and sees Resource types for "Book"', () => { });
When('they select type "Academic Monograph"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicMonograph')).click();
});
Then('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('sintef akademisk forlag');
  cy.contains('SINTEF akademisk forlag').click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.nviFailed}]`).should('be.visible');
});
