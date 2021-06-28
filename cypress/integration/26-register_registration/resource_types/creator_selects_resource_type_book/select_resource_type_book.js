import { Given, When, Then, And, Before } from 'cypress-cucumber-preprocessor/steps';
import { USER_RESOURCE_TYPE } from '../../../../support/constants';
import { BOOK_SUBTYPES, BOOK_FIELDS } from '../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Book
Before(() => {
  cy.login(USER_RESOURCE_TYPE);
  cy.get('[data-testid=my-registrations]').click({ force: true });
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});

// Common steps
Given('Creator navigates to the Resource Type tab and selects Resource type "Book"', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
});
When('they select Resource subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${BOOK_SUBTYPES[subtype]}]`).click({ force: true });
});
// end Common steps

// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Book"
Given('Creator navigates to Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
});
When('they select the Resource type "Book"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, BOOK_SUBTYPES);
});
// | Anthology           |
// | Monograph           |
// | Abstract collection |
// | Exhibition catalog  |

// @392
// Scenario Outline: Creator navigates to the Resource Type tab and selects Resource subtype
And('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, BOOK_FIELDS);
});
//     | Publisher             |
//     | ISBN                  |
//     | Total number of pages |
// Examples:
//     | BookType            |
//     | Anthology           |
//     | Monograph           |
//     | Abstract collection |
//     | Exhibition catalog  |

// @2229
// Scenario Outline: Creator sees that fields for Book are validated on Resource Type tab
And('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${BOOK_FIELDS[field[0]]}]`).within(() => {
      cy.get('p').should('have.class', 'Mui-error');
      cy.get('p').should('have.class', 'Mui-required');
    });
  });
});
//     | Publisher |
// Examples:
//     | BookType            |
//     | Anthology           |
//     | Monograph           |
//     | Abstract collection |
//     | Exhibition catalog  |

// @1963
// Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Monograph"
When('they select Resource subtype "Monograph"', () => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });
});
And('they see fields:', () => {});
// | NPI discipline |
// | Series title   |
// | Series number  |
And('they see a field Content Type with options:', () => {});
// | Academic Monograph        |
// | Non-fiction Monograph     |
// | Popular Science Monograph |
// | Textbook                  |
// | Encyclopedia              |

// @2782
// Scenario: Creator selects Resource subtype "Monograph" and Content type Academic Monograph
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Monograph"', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });
});
When('they select Content type "Academic Monograph"', () => {});
Then('they see fields:', () => {});
// | Peer reviewed         |
// | Presents new research |
And('they see the Norwegian Science Index \\(NVI) evaluation status', () => {});
