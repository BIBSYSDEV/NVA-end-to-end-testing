import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

const fileName = 'example.txt';
const dlrLink = 'https://dlr.unit.no/resources/66888570-3504-4d12-81a4-c3ffe0605945';

// Feature: Creator begins registering a Registration

// Common steps
Given('Creator begins registering a Registration', () => {
  cy.login(userWithAuthor);
  cy.get(`[data-testid=${dataTestId.header.newRegistrationLink}]`).click({ force: true });
});
// End common steps

//   @443
//   Scenario Outline: Creator begins registering a Registration in the Wizard
And('they have selected {string} for starting the Wizard', (method) => {
  cy.wrap(method).as('registrationMethod');
  if (method === 'Link to registration') {
    cy.get(`[data-testid=${dataTestId.registrationWizard.new.linkAccordion}]`).click({ force: true });
    cy.get('[data-testid=new-registration-link-field] > div > input').type(dlrLink);
    cy.get('[data-testid=doi-search-button]').click({ force: true });
  } else if (method === 'Upload file') {
    cy.get(`[data-testid=${dataTestId.registrationWizard.new.fileAccordion}]`).click({ force: true });
    cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  } else if (method === 'Empty Registration') {
    cy.get(`[data-testid=${dataTestId.registrationWizard.new.emptyRegistrationAccordion}]`).click({ force: true });
  }
});
When('they click Start', () => {
  cy.get('@registrationMethod').then((method) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
      .filter(':visible')
      .should('be.enabled')
      .click({ force: true });
  });
});
Then('they see the Wizard', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).should('be.visible');
});
// Examples:
//   | Method               |
//   | Link to registration |
//   | Upload file          |

//   @226
//   Scenario: Creator begins registering a Registration
Given('that the user is logged in', () => {});
And('they have Role Creator', () => {});
And('they are on the Start page', () => {
  cy.login(userWithAuthor);
});
When('they click the New Registration button', () => {
  cy.get(`[data-testid=${dataTestId.header.newRegistrationLink}]`).click({ force: true });
});
Then('they are redirected to the New Registration page', () => {
  cy.location('pathname').should('contain', '/registration');
});
And('they see an Expansion panel for Upload file', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.fileAccordion}]`).should('be.visible');
});
And('they see an Expansion panel for Link to resource', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.linkAccordion}]`).should('be.visible');
});
And('they see an Expansion panel for Empty Registration', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.emptyRegistrationAccordion}]`).should('be.visible');
});

//   @385
//   Scenario: Creator begins registration by uploading a file
When('they click Upload file', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.fileAccordion}]`).click({ force: true });
});
And('they upload a file', () => {
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
Then('they see the file name', () => {
  cy.get('[data-testid=uploaded-file]').within((fileElement) => {
    cy.wrap(fileElement).contains(fileName);
  });
});
And('they see the file size', () => {
  // TODO file size is not implemented yet
});
And('they see the Remove button', () => {
  cy.get('[data-testid=button-remove-file]').should('be.visible');
});
And('they see the Start button is enabled', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible')
    .should('be.enabled');
});

// Common steps for @228, @439, @440, @441, @442, @2208, @2370
And('they expand the Expansion panel for Link to resource', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.linkAccordion}]`).click({ force: true });
});
When('they enter {string} from {string}', (link, source) => {
  cy.wrap(source).as('source');
  cy.get('[data-testid=new-registration-link-field] > div > input').type(link);
});
And('they click Search', () => {
  cy.get('[data-testid=doi-search-button]').click({ force: true });
});
// TODO Need correct link for schema.org
Then('they see metadata about the Link in the Expansion panel', () => {
  cy.get('@source').then((source) => {
    if (source !== 'schema.org') {
      cy.get('[data-testid=link-metadata]').should('be.visible');
    }
  });
});
