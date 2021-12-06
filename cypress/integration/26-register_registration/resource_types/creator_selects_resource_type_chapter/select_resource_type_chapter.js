import { Given, When, Then, And, Before } from 'cypress-cucumber-preprocessor/steps';
import { USER_RESOURCE_TYPE } from '../../../../support/constants';
import { CHAPTER_SUBTYPES, CHAPTER_FIELDS } from '../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Chapter

Before(() => {
  cy.login(USER_RESOURCE_TYPE);
  cy.get('[data-testid=my-registrations-link]').click({ force: true });
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});

// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Chapter"
// TODO missing subtypes
Given('Creator navigates to Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
});
When('they select the Resource type "Chapter"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Chapter]').click({ force: true });
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, CHAPTER_SUBTYPES);
});
// | Chapter of Anthology               |
// | Chapter of Report                  |
// | Introduction                       |
// | Summary of conference presentation |
