import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_SAVE_REGISTRATION } from '../../../support/constants';

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';
const doiTitle =
  'The Structure of Ordinary Water: New data and interpretations are yielding new insights into this fascinating substance';
const filename = 'example.txt';
const fileTitle = '[Missing title]';

// Feature: Creator sees Registration is saved

// common steps
When('they click Start', () => {
  const scenario = window.testState.currentScenario.tags[0].name;
  switch (scenario) {
    case '@388':
      cy.get('[data-testid=registration-link-next-button]').should('be.enabled');
      cy.get('[data-testid=registration-link-next-button]').click({ force: true });
      break;
    case '@391':
      cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
      cy.get('[data-testid=registration-file-start-button]').click({ force: true });
      break;
  }
  cy.get('[data-testid=nav-tabpanel-description]').should('be.visible');
});
And('they click My Registrations', () => {
  cy.get('[data-testid=my-registrations]').click({ force: true });
});
And('they see that Edit is enabled', () => {
  cy.get('@registration').within((registration) => {
    cy.get('[data-testid^=edit-registration]');
  });
});
And('they see that Delete is enabled', () => {
  cy.get('@registration').within((registration) => {
    cy.get('[data-testid^=delete-registration]');
  });
});

// end common steps

// @388
// Scenario: Creator sees Registration based on a Link is saved
Given('Creator begins registering with a Link', () => {
  cy.login(USER_SAVE_REGISTRATION);
  cy.startRegistrationWithLink(doiLink);
});
Then('they see the Registration is saved and the title is listed and marked as Draft', () => {
  cy.get('tr')
    .filter(`:contains(${doiTitle})`)
    .first()
    .within((registration) => {
      cy.wrap(registration)
        .as('registration')
        .get('[data-testid^=registration-status]')
        .within((status) => {
          cy.wrap(status).contains('Draft');
        });
    });
});

// @391
// Scenario: Creator sees Registration based on file upload is saved
Given('Creator begins registration by uploading a file', () => {
  cy.login(USER_SAVE_REGISTRATION);
  cy.startRegistrationWithFile(filename);
});
Then('they see the Registration is saved and the title is "[Missing title]" and marked as Draft', () => {
  cy.get('tr')
    .filter(`:contains(${fileTitle})`)
    .first()
    .within((registration) => {
      cy.wrap(registration)
        .as('registration')
        .get('[data-testid^=registration-status]')
        .within((status) => {
          cy.wrap(status).contains('Draft');
        });
    });
});
