import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { REPORT_SUBTYPES } from '../../../support/data_testid_constants';
import 'cypress-localstorage-commands';

const testFile = 'example.txt';

Given('Creator begins registering a Publication in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(testFile);
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});
When('they navigate to the Reference tab', () => {
  cy.get('[data-testid=nav-tabpanel-reference]').click({ force: true });
});
And('they select the Reference type "Report"', () => {
  cy.get('[data-testid=publication-context-type]').type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
  cy.get('[data-testid=publication-instance-type]').type(' ');
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.testDataTestidList(dataTable, REPORT_SUBTYPES);
});
// | Research report      |
// | Policy report        |
// | Working paper        |
// | Other type of report |
