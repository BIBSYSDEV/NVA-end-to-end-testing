import { USER_WITH_AUTHOR } from '../../../support/constants';
import { Then, And, Before } from 'cypress-cucumber-preprocessor/steps';
import { BOOK_FIELDS, CHAPTER_SUBTYPES, CHAPTER_FIELDS, RESOURCE_TYPES } from '../../../support/data_testid_constants';

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';
const filename = 'example.txt';

// Feature: Creator navigates to Resource Type tab

Before(() => {
  cy.login(USER_WITH_AUTHOR);
});

// Common steps
Then('they see a Search box for "Publisher name"', () => {
  cy.get('[data-testid=publisher-search-field]').should('be.visible');
});
And('they see a checkbox for "Is this a textbook?"', () => {
  cy.get('[data-testid=is-textbook-checkbox]').should('be.visible');
});
// end common steps

//   @274
//   Scenario: Creator navigates to the Resource Type tab and selects Resource type "Contribution to journal"

//   @453
//   Scenario: Creator navigates to Resource Type tab
Then('they see the field for Type', () => {
  cy.get('[data-testid=publication-context-type]').should('be.visible');
});
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.enabled');
});
And('they see the tab Resource Type is selected', () => {
  cy.get('[data-testid=nav-tabpanel-description]').get('[tabindex=0]');
});
And('they see the tab Contributors is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').should('be.visible');
});
And('they see the tab Files and License is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license]').should('be.visible');
});
And('they see Previous is enabled', () => {
  cy.get('[data-testid=button-previous-tab]').should('be.enabled');
});
And('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration').should('be.enabled');
});

//   Scenario: Creator sees that fields are validated on Resource Type tab

//   @393
//   Scenario: Creator navigates to the Resource Type tab and selects Resource type "Report"

//   @392
//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Anthology"
And('they select Resource subtype "Anthology" from the list', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookAnthology]').click({ force: true });
});
And('they see fields for', (dataTable) => {
  cy.testDataTestidList(dataTable, BOOK_FIELDS);
});
//   | ISBN                  |
//   | Total number of pages |
//   | NPI discipline        |
And('they see a Search box for "Title of the Series"', () => {
  cy.get('[data-testid=series-search-field]').should('be.visible');
});
And('they see a preselected value for Peer review "Not peer reviewed"', () => {
  cy.get('[data-testid=peer_review-false]').within((checkbox) => {
    cy.wrap(checkbox).get('input').should('be.checked');
  });
});

// @394
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Student thesis"

// @395
// Scenario: Creator sees fields for Resource subtype "Chapter in book"
// | Part of book/report |
And('they select the Registration Subtype "Chapter in book"', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-ChapterArticle]').click({ force: true });
  cy.wrap('Chapter in book').as('subType');
});
Then('they see an information box describing that a Container book must be published first', () => {
  cy.get('[data-testid=info-anthology]').should('be.visible');
});

// @1409
// Scenario Outline: Creator selects Contribution to Journal and Peer Review Details are hidden
Then('they see that the Peer Review Details are hidden', () => {
  cy.get('[data-testid=peer-review]').should('not.exist');
  cy.get('[data-testid=peer_review-true]').should('not.exist');
  cy.get('[data-testid=peer_review-false]').should('not.exist');
});

// @1625
// Scenario: Creator sees fields for Resource subtype "Corrigendum"
And('they select the Resource subtype "Corrigendum"', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=publication-instance-type-JournalCorrigendum]`).click({ force: true });
});
And('they see a disabled field for Journal based on selected Journal article', () => {
  // Journal article not selected in test, unable to test this
});

// Scenario: Creator sees that fields for Resource subtype "Corrigendum" are validated

// @1656
// Scenario Outline: Creator sees fields for Norwegian Science Index (NVI) compatible Resource subtype

// Scenario Outline: Creator sees that fields for Norwegian Science Index (NVI) compatible Resource subtype are validated

// @1659
// Scenario Outline: Creator sees fields for Norwegian Science Index (NVI) incompatible Resource subtype

// Scenario Outline: Creator sees that fields for Norwegian Science Index (NVI) incompatible Resource subtype are validated

// @1693
// Scenario Outline: Creator sees fields for Resource subtypes for "Report"

// Scenario Outline: Creator sees that fields are validated for Resource subtypes for "Report"
Then('they can see the "Invalid ISBN" error message', () => {
  cy.get('[data-testid=isbn-field] input').type('invalid').focus().blur();
  cy.get('[data-testid=snackbar-warning]').contains('invalid');
});

// @1694
// Scenario Outline: Creator sees fields for Resource subtypes for "Student thesis"
// Scenario Outline: Creator sees that fields are validated for Resource subtypes for "Student thesis"

// @1963
// Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Monograph"
And('they select Resource subtype "Monograph" from the list', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });
});

// @2229
// Scenario Outline: Creator sees that fields for Book are validated on Resource Type tab
And('they select Resource subtype "<BookType>" from the list', (dataTable) => {
  dataTable.rawTable.forEach((type) => {
    cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
    cy.get(`[data-testid=publication-instance-type-${type[0]}]`).click({ force: true });
  });
});
// Examples:
//   | BookType  |
//   | Anthology |
//   | Monograph |

// TODO not implemented
// @1624
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Other publication"

// @1631
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Map"
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Map"', () => {});
// @1632
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Musical notation"
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Musical notation"', () => {});

// @1633
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Other publication"
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Other publication"', () => {});

// @1669
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Feature article"
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Feature article"', () => {});

// @2021
// Scenario: Creator sees fields for Resource subtype "Chapter in report"
And('they select the Registration Subtype "Chapter in report"', () => {
  cy.wrap({}).as('fields');
  cy.wrap({}).as('subTypes');
});
Then('they see an information box describing that a Container report must be published first', () => {});
