import { userUnitSaveRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';
const doiTitle = 'The Structure of Ordinary Water';
const filename = 'example.txt';
const fileTitle = '[Missing title]';

// Feature: Creator sees Registration is saved

// common steps
When('they click Start', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible', { timeout: 30000 })
    .should('be.enabled', { timeout: 30000 });
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible', { timeout: 30000 })
    .click({ timeout: 30000 });
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).should('be.visible');
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
});
When('they click My Registrations', () => {
  cy.openMyRegistrations();
});
Then('they see that Edit is enabled', () => {
  cy.get('@registration')
    .parent()
    .within((registration) => {
      cy.get('[data-testid^= edit-registration]');
    });
});
Then('they see that Delete is enabled', () => {
  cy.get('@registration')
    .parent()
    .within((registration) => {
      cy.get('[data-testid^=delete-registration]');
    });
});

// end common steps

// @388
// Scenario: Creator sees Registration based on a Link is saved
Given('Creator begins registering with a Link', () => {
  cy.wrap('link').as('registrationMethod');
  cy.login(userUnitSaveRegistration);
  cy.startRegistrationWithLink(doiLink);
});
Then('they see the Registration is saved and the title is listed and marked as Draft', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains(${doiTitle})`)
    .first()
    .within((registration) => {
      cy.wrap(registration).as('registration');
    });
});

const title = `Published Registration ${uuidv4()}`;
// Scenario: Creator sees Registration is findable
Given('Creator register a Registration', () => {
  cy.login(userUnitSaveRegistration);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(filename, title);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
});
When('they publish the Registration', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
});
Then('the Registration is findable', () => {
  cy.wait(10000);
  cy.getDataTestId('logo').click();
  cy.getDataTestId(dataTestId.frontPage.registrationsLink).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
  cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).should('be.visible');
});
