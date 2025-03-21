// Feature: Data Management Plan (DMP)

//	#also know as Research Output Plan
//	# https://whimsical.com/nva-wireframes-YPhaVjNfbZ5wgCXgAPdpuq

//	In order to fulfil demands from funders and own institution
//	As a User (researcher)
//	I want to publish my DMP

//	In order to fulfil demands from funders and own institution
//	As a User (researcher)
//	I want to publish new versions of my DMP

import { userResearchDataDmp } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

//	Background:

//  Common steps

Given('User selects Resource type "Research Data"', () => {
  cy.login(userResearchDataDmp);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
Given('they select DMP as subtype', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('DataManagementPlan')).click();
});

// end common steps

// Scenario: User sees a prefilled Publisher field
When('the User sees the Publisher field', () => {});
Then('the corresponding institution is prefilled', () => {});

// Scenario: User changes the prefilled Publisher
When('the User searches for a Publisher in the Publisher field', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.publisherField}]`).type('Norges forskningsråd');
  cy.contains('Norges forskningsråd').first().click({ force: true });
});
Then('the User replaces the prefilled Publisher with a Publisher from the search result', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.publisherField}]`).within(() => {
    cy.contains('Norges forskningsråd');
  });
});

// Scenario: User adds zero or more related-references to a resource published in NVA
When('the User searches for published Registrations in NVA', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.relatedRegistrationField}]`).type('Antologi');
  cy.contains('Antologi').first().click({ force: true });
});
Then('the User can store any search result as a related-reference', () => {
  cy.get(`[data-testid^=${dataTestId.startPage.searchResultItem}]`).within(() => {
    cy.contains('Antologi');
  });
  cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.removeRelationButton('')}]`).should('be.visible');
});
// # future scenario will allow use of external IRI, not only internal

// Scenario: User removes a related-references to resource
Given('User adds zero or more related-references to resource published in NVA', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.relatedRegistrationField}]`).type('Antologi');
  cy.contains('Antologi').first().click({ force: true });
});
When('the User removes a related-reference resource', () => {
  cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.removeRelationButton('')}]`).click();
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
});
Then('the related-reference is removed', () => {
  cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.relatedRegistrationLink('')}]`).should(
    'not.exist'
  );
  cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.removeRelationButton('')}]`).should('not.exist');
});

// Scenario: User adds an external links to a DMP
When('the user types in an external link', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.externalLinkField}]`).type('https://sikt.no/');
});
When('the user adds the link', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.externalLinkAddButton}]`).click();
});
Then('the user sees the saved link', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.externalLink}]`).within(() => {
    cy.contains('https://sikt.no/');
  });
});
Then('the user has the option to remove the saved link', () => {
  cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.removeRelationButton('')}]`).should('be.visible');
});

// Scenario: User removes an external link to a resource
Given('User adds an external links to a DMP', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.externalLinkField}]`).type('https://sikt.no/');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.externalLinkAddButton}]`).click();
});
When('the user removes an external link', () => {
  cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.removeRelationButton('')}]`).click();
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
});
Then('the user sees the external link is removed', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.externalLink}]`).should('not.exist');
  cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.removeRelationButton('')}]`).should('not.exist');
});
