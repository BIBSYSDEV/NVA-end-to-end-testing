import { userResourceTypeBook } from '../../../../support/constants';
import { bookSubtypes, bookFields, contentType } from '../../../../support/data_testid_constants';
import { Before } from 'cypress-cucumber-preprocessor/steps';
import { dataTestId } from '../../../../support/dataTestIds';

// Feature: Creator selects Resource type Book
Before(() => {
  cy.login(userResourceTypeBook);
  cy.startWizardWithEmptyRegistration();
});

// Common steps
Given('Creator navigates to the Resource Type tab and selects Resource type "Book"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
});
When('they select Resource subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${bookSubtypes[subtype]}]`).click({ force: true });
});
// end Common steps

// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Book"
Given('Creator navigates to Resource Type tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
});
When('they select the Resource type "Book"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, bookSubtypes);
});
// | Anthology           |
// | Monograph           |
// | Abstract collection |
// | Exhibition catalog  |

// @392
// Scenario Outline: Creator navigates to the Resource Type tab and selects Resource subtype
And('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, bookFields);
});
//     | Publisher             |
//     | ISBN                  |
//     | Total number of pages |
// Examples:
//     | BookType            |
//     | Anthology           |
//     | Monograph           |
//     | Abstract collection |
//     | Exhibition catalog  |

// @1963
// Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Monograph"
And('they see a field Content Type with options:', (dataTable) => {
  cy.get('[data-testid=content-field]').click();
  cy.testDataTestidList(dataTable, contentType);
});
// | Academic Monograph        |

// @2229
// Scenario Outline: Creator sees that fields for Book are validated on Resource Type tab
And('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click();
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
  cy.get('[data-testid=button-next-tab]').click();
  cy.get('[data-testid=button-previous-tab]').click();
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${bookFields[field[0]]}]`).within(() => {
      cy.get('p').should('have.class', 'Mui-error');
      cy.get('p').should('have.class', 'Mui-required');
    });
  });
});
//     | Publisher |
// Examples:
//     | BookType            |
//     | Anthology           |
//     | Monograph           |

// Scenario: Creator selects Resource subtype "Monograph" and Content type Academic Monograph
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Monograph"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });
})
When('they select Content type "Academic Monograph"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentField}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentValue('academicmonograph')}]`).click({ force: true });
})
// Then they see fields:
//     | Peer reviewed and presents new research |
And('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.nviFailed}]`).should('be.visible');
})