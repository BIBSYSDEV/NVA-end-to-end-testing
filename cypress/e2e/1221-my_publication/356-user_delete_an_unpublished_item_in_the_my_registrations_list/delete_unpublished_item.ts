import { v4 as uuid } from 'uuid';
import { userDeleteRegistrations } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

const firstTitle = `Delete registration ${uuid()}`;
const secondTitle = `Delete registration ${uuid()}`;

let init = false;
const initData = () => {
  if (!init) {
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(null, firstTitle);
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccess();
    cy.getSuccessDone();
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(null, secondTitle);
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccess();
    cy.getSuccessDone();
    init = false;
  }
};

Given('Creator opens My Registrations', () => {
  cy.login(userDeleteRegistrations);
  initData();
  cy.openMyRegistrations();
});
When('they click Delete on an item', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(':contains("Delete registration")')
    .first()
    .parent()
    .within(() => {
      cy.get('[data-testid^=delete-registration]').click();
    });
});
When('they see a confirmation pop-up is opened', () => {
  cy.get('[data-testid=confirm-delete-dialog]').should('be.visible');
});
When('they select Yes', () => {
  cy.get('[data-testid=accept-button]').click();
  cy.get('[data-testid=accept-button]').should('not.exist');
  cy.wait(3000);
  cy.reload();
});
Then('they see that the Registration is deleted', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 1);
});

// Scenario: Creator deletes all Draft Registrations
When('they select "Delete all drafts"', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
  cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox).parent().parent().parent().within(() => {
    cy.get('button').click();
  })
});
When('they confirm that they want to Delete all drafts', () => {
  cy.get('[data-testid=accept-button]').click();
  cy.get('[data-testid=accept-button]').should('not.exist');
  cy.reload();
});
Then('all Draft Registration are deleted', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 0);
});
