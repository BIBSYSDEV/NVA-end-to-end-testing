import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { JOURNAL_SUBTYPES } from '../../../support/data_testid_constants';

const filename = 'example.txt';

Given('Creator begins registering a Publication in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(filename);
  cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});
When('they navigate to the Reference tab', () => {
  cy.get('[data-testid=nav-tabpanel-reference]').click({ force: true });
});
And('they select the Reference type "Contribution to journal"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Journal]').click({ force: true });
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.testDataTestidList(dataTable, JOURNAL_SUBTYPES);
});
// | Journal article      |
// | Short communication  |
// | Feature article      |
// | Letter to the Editor |
// | Book review          |
// | Editorial            |
// | Corrigendum          |
