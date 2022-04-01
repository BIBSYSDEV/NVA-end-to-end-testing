import { userMyRegistrations } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { descriptionFields } from '../../../support/data_testid_constants';

// Common step
Given('that the user is logged in as Creator', () => {
  cy.login(userMyRegistrations);
});
// end common step

And('is on the page My Registrations', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.myRegistrationsLink}]`).click({ force: true });
});
When('they click Edit on an item', () => {
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});
Then('they see the item is opened in the Wizard', () => {});
And('they see the Description tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`);
});
And('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, descriptionFields);
});

// | Title                        |
// | Abstract                     |
// | Description                  |
// | Date published               |
// | Primary language for content |

// Scenario: Creator sees Validation Errors for Registration
And('they are on the page My Registrations', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.myRegistrationsLink}]`).click({ force: true });
});
And('they see a List of Registrations', () => {
  cy.get('[data-testid^=edit-registration]').should('have.length', 1);
});
When('they click Edit on a Registration', () => {
  cy.get('tr')
    .filter(':contains("Registration with validation error")')
    .within(() => {
      cy.get('[data-testid^=edit-registration]').click({ force: true });
    });
});
And('they see the Registration is opened in Edit Mode', () => {
  cy.get('[data-testid=registration-title-field]').should('exist');
});
And('they see the Registration has Validation Errors', () => {
  cy.get('[data-testid=error-tab]').should('exist');
});
Then('they see a List of all Validation Errors', () => {
});
And('they see that tabs with Validation Errors are marked with an Error Icon', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).within(() => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.errorStep}]`);
  });
});
