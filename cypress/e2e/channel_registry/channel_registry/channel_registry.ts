// Feature: Test channel registry

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { TestUsers } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Scenario: Add publisher to registration
Given('I create a registration', () => {
  cy.login(TestUsers.creators.basic);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});

When('I add a publisher to the registration', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicMonograph')).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('sintef');
});

Then('the registration should have the publisher set', () => {
  cy.contains('SINTEF').should('exist');
});

// Scenario: Add journal to registration
// Given ('I create a registration', () => {});

When('I add a journal to the registration', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('acs chemical biology');
});

Then('the registration should have the journal set', () => {
  cy.contains('ACS Chemical Biology').should('exist');
});

// Scenario: Add series to registration
// Given ('I create a registration', () => {});

When('I add a series to the registration', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicMonograph')).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type('lecture notes in computer science');
});

Then('the registration should have the series set', () => {
  cy.contains('Lecture Notes in Computer Science').should('exist');
});
