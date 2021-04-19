import { USER_WITH_AUTHOR } from '../../../support/constants';
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {
  JOURNAL_SUBTYPES,
  JOURNAL_FIELDS,
  BOOK_SUBTYPES,
  BOOK_FIELDS,
  REPORT_SUBTYPES,
  REPORT_FIELDS,
  CHAPTER_SUBTYPES,
  CHAPTER_FIELDS,
  STUDENT_THESIS_SUBTYPES,
  STUDENT_THESIS_FIELDS,
  RESOURCE_TYPES,
  RESOURCE_TYPE_FIELDS,
} from '../../../support/data_testid_constants';

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';
const filename = 'example.txt';

// Feature: Creator navigates to Resource Type tab

// Common steps
Given('Creator begins registering a Registration in the Wizard with a link', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithLink(doiLink);
  cy.get('[data-testid=registration-link-next-button]').should('be.enabled');
  cy.get('[data-testid=registration-link-next-button]').click({ force: true });
});
Given('Creator begins registering a Registration in the Wizard with a file', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(filename);
  cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});
When('they navigate to the Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type').click({ force: true });
  cy.wrap(RESOURCE_TYPE_FIELDS).as('fields');
});
And('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
  cy.get('[data-testid=button-next-tab]').click({ force: true });
  cy.get('[data-testid=button-previous-tab]').click({ force: true });
});
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
Then('they see a Search box for "Publisher name"', () => {
  cy.get('[data-testid=publisher-search-field]').should('be.visible');
});
And('they select the Resource Type', (dataTable) => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${RESOURCE_TYPES[dataTable.rawTable[0]]}]`).click({ force: true });
  cy.wrap(CHAPTER_SUBTYPES).as('subTypes');
  cy.wrap(CHAPTER_FIELDS).as('fields');
});
And('they select Resource subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('@subTypes').then((subTypes) => {
    cy.get(`[data-testid=${subTypes[subtype]}]`).click({ force: true });
  });
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
And('they select the Resource type "Report"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
  cy.wrap(REPORT_SUBTYPES).as('subTypes');
  cy.wrap(REPORT_FIELDS).as('fields');
});
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
And('they select the Resource type "Student thesis"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
  cy.wrap(STUDENT_THESIS_SUBTYPES).as('subTypes');
  cy.wrap(STUDENT_THESIS_FIELDS).as('fields');
});

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
And('they select the Resource type "Student thesis"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
});

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
And('they select the Resource type "Other publication"', () => {
  cy.wrap({}).as('subTypes');
  cy.wrap({}).as('fields');
});

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
