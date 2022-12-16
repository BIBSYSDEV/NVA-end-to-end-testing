import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userWithAuthor5 } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { resourceTypeFields } from '../../../support/data_testid_constants';

// Feature: Creator navigates to Resource Type tab

// Common steps
Given('Creator begins registering a Registration in the Wizard with a File', () => {
  cy.login(userWithAuthor5);
  cy.startWizardWithEmptyRegistration();
});
When('they navigate to the Resource Type tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
  cy.wrap(resourceTypeFields).as('fields');
});
// end common steps

//   @453
//   Scenario: Creator navigates to Resource Type tab
Then('they see the field for Type', () => {
  cy.get(`[data-testid^=resource-type-]`).should('exist')
});
Then('they see the tab Description is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).should('be.enabled');
});
Then('they see the tab Resource Type is selected', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).get('[tabindex=0]');
});
Then('they see the tab Contributors is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).should('be.visible');
});
Then('they see the tab Files and License is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).should('be.visible');
});
Then('they see Previous is enabled', () => {
  cy.get('[data-testid=button-previous-tab]').should('be.enabled');
});
Then('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
Then('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration').should('be.enabled');
});

//   Scenario: Creator sees that fields are validated on Resource Type tab

Then('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => { });
// | Type |
