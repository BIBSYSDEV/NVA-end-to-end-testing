import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {
  BOOK_FIELDS,
  JOURNAL_FIELDS,
  JOURNAL_SUBTYPES,
  BOOK_SUBTYPES,
  REPORT_SUBTYPES,
  REPORT_FIELDS,
  STUDENT_THESIS_FIELDS,
  STUDENT_THESIS_SUBTYPES,
} from '../../support/data_testid_constants';

And('they select the Resource type "Contribution to journal"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Journal]').click({ force: true });
  cy.wrap(JOURNAL_SUBTYPES).as('subTypes');
  cy.wrap(JOURNAL_FIELDS).as('fields');
});

And('they select the Resource type "Book"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
  cy.wrap(BOOK_SUBTYPES).as('subTypes');
  cy.wrap(BOOK_FIELDS).as('fields');
});

And('they select the Resource type "Report"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
  cy.wrap(REPORT_SUBTYPES).as('subTypes');
  cy.wrap(REPORT_FIELDS).as('fields');
});

And('they select the Resource type "Student thesis"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
  cy.wrap(STUDENT_THESIS_SUBTYPES).as('subTypes');
  cy.wrap(STUDENT_THESIS_FIELDS).as('fields');
});

And('they select the Resource type "Other publication"', () => {
  cy.wrap({}).as('subTypes');
  cy.wrap({}).as('fields');
});

And('they select the Resource Type', (dataTable) => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${RESOURCE_TYPES[dataTable.rawTable[0]]}]`).click({ force: true });
  cy.wrap(CHAPTER_SUBTYPES).as('subTypes');
  cy.wrap(CHAPTER_FIELDS).as('fields');
});
// | Part of book/report |
