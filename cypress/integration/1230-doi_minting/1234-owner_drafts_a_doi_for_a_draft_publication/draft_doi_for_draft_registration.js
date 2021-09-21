import { Before } from 'cypress-cucumber-preprocessor/steps';
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_DRAFT_DOI } from '../../../support/constants';

const filename = 'example.txt';
const registrationTitle = 'Draft registration requesting DOI';

Before(() => {
  cy.login(USER_DRAFT_DOI);
  cy.startWizardWithFile(filename);
  cy.get('[data-testid=registration-title-field]').type(registrationTitle);
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Journal]').click({ force: true });
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-JournalArticle]').click({ force: true });
  cy.get('[data-testid=button-save-registration]').click({ force: true });
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});

Given('that an Owner views the Landing Page for their Registration', () => {
  cy.get('[data-testid=my-registrations]').click({ force: true });
});
And('the Registration has status Draft', () => {
  cy.get('[data-testid=unpublished-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${registrationTitle})`)
    .first()
    .parent()
    .within((presentationLine) => {
      cy.get('[data-testid^=open-registration]').click({ force: true });
    });
});
And('the Registration has no DOI', () => {
  cy.get('[data-testid=doi-presentation]').should('not.exist');
});
When('they click the "Reserve a DOI" button', () => {
  cy.get('[data-testid=button-toggle-request-doi]').click({ force: true });
});
Then('the "Reserve a DOI" button is no longer visible', () => {
  cy.get('[data-testid=button-toggle-request-doi]').should('not.exist');
});
And('the Landing Page for the Registration contains the Draft DOI', () => {
  cy.reload();
  cy.get('[data-testid=doi-presentation]').should('be.visible');
});
And('the drafted DOI is not clickable and marked "In progress"', () => {
  cy.get('[data-testid=doi-presentation]').contains('(In progress)');
});
