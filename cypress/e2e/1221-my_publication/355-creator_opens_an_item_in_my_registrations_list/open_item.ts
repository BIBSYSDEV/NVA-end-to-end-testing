import { userMyRegistrations } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { descriptionFields } from '../../../support/data_testid_constants';
import { v4 as uuid } from 'uuid';
import { Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';

const errorTitle = `Registration with validation error ${uuid()}`;
const registrationTitle = `Registration ${uuid()}`;

const initData = () => {
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(null, registrationTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.wait(3000);

  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(null, errorTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.openMyRegistrations();
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains(${errorTitle})`)
    .parent()
    .within(() => {
      cy.get('[data-testid^=edit-registration]').first().click({ force: true });
    });
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalChip).within(() => {
    cy.get('svg').click();
  });
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.contains('Registration updated successfully');
  cy.get('.MuiAlert-message').should('be.visible');
  cy.getDataTestId(dataTestId.header.myPageLink).click();
};

BeforeAll(() => initData());

// Common step
Given('that the user is logged in as Creator', () => {
  cy.login(userMyRegistrations);
});
// end common step

Given('is on the page My Registrations', () => {
  cy.openMyRegistrations();
});
When('they click Edit on an item', () => {
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});
Then('they see the item is opened in the Wizard', () => {});
Then('they see the Description tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`);
});
Then('they see fields:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, descriptionFields);
});

// | Title                        |
// | Abstract                     |
// | Description                  |
// | Date published               |
// | Primary language for content |

// Scenario: Creator sees Validation Errors for Registration
Given('they are on the page My Registrations', () => {
  cy.openMyRegistrations();
});
Given('they see a List of Registrations', () => {
  cy.get('[data-testid^=edit-registration]').should('have.length.above', 0);
});
When('they click Edit on a Registration', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains(${errorTitle})`)
    .parent()
    .within(() => {
      cy.get('p > a').first().click({ force: true });
    });
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
});
When('they see the Registration is opened in Edit Mode', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type('{selectall}{del}');
  cy.getDataTestId(dataTestId.registrationWizard.description.abstractField).type('{selectall}');
});
When('they see the Registration has Validation Errors', () => {
  cy.get('[data-testid=error-tab]').should('exist');
});
Then('they see that tabs with Validation Errors are marked with an Error Icon', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).within(() => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.errorStep}]`);
  });
});
