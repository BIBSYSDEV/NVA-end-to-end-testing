import { userSaveRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';
const doiTitle = 'The Structure of Ordinary Water';
const filename = 'example.txt';
const fileTitle = '[Missing title]';

// Feature: Creator sees Registration is saved

// common steps
When('they click Start', () => {
  // cy.intercept('/doi-fetch', {
  //   'identifier': '',
  //   'title': 'Mock DOI fetch',
  //   'creatorName': null,
  //   'date': {
  //     'year': '1970',
  //     'month': '8',
  //     'day': '14',
  //   },
  // });
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible', {timeout: 30000})
    .should('be.enabled', {timeout: 30000});
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible', {timeout: 30000})
    .click({ force: true }, {timeout: 30000});
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).should('be.visible');
});
And('they click My Registrations', () => {
  cy.openMyRegistrations();
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
  cy.wrap('link').as('registrationMethod');
  cy.login(userSaveRegistration);
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
  cy.wrap('file').as('registrationMethod');
  cy.login(userSaveRegistration);
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
