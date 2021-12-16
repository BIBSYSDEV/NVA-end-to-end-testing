import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../../support/constants';
import { JOURNAL_SUBTYPES, JOURNAL_FIELDS } from '../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Contribution to journal

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';

// Common steps
Given('Creator begins registering a Registration in the Wizard with a Link', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startWizardWithLink(doiLink);
});
Given('Creator begins registering a Registration in the Wizard with a File', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startWizardWithEmptyRegistration();
});
When('they navigate to the Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type').click({ force: true });
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
});
And('they select Resource subtype Journal article', () => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get('[data-testid=publication-instance-type-JournalArticle]').click({ force: true });
});
And('they enter an invalid value in fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${JOURNAL_FIELDS[field]}]`).type('{selectall}{del}invalid');
  });
});
When('they click the Save button', () => {
  cy.get('[data-testid=save-publication-button]').click({ force: true });
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${JOURNAL_FIELDS[field[0]]}]`).within(() => {
      cy.get('p').should('have.class', 'Mui-error');
      cy.get('p').should('have.class', 'Mui-required');
    });
  });
});
And('they can see "Invalid format" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${JOURNAL_FIELDS[field[0]]}]`).within(() => {
      cy.get('input').focus().blur();
      cy.wrap(field).get('p').should('have.class', 'Mui-error');
    });
  });
});
And('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, JOURNAL_FIELDS);
});
And('they select the Resource subtype "Corrigendum"', () => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${JOURNAL_SUBTYPES['Corrigendum']}]`).click({ force: true });
});
// End common steps

// TODO Booklet, Comment missing
// @274
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Contribution to journal"
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, JOURNAL_SUBTYPES);
});
// | Journal article |
// | Feature article |
// | Comment         |
// | Book review     |
// | Leader          |
// | Corrigendum     |
// | Booklet         |

// TODO Article number is not being validated
// Scenario: Creator sees that fields for Journal article are validated

// TODO Booklet, Comment missing
// @1409
// Scenario Outline: Creator selects Contribution to Journal and Peer Review Details are hidden
When('they select the Subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${JOURNAL_SUBTYPES[subtype]}]`).click({ force: true });
});
Then('they see that the Peer Review Details are hidden', () => {
  cy.get('[data-testid=peer-review-field]').should('not.exist');
});
// Examples:
//     | Subtype         |
//     | Feature article |
//     | Comment         |
//     | Book review     |
//     | Leader          |
//     | Corrigendum     |
//     | Booklet         |

// @1625
// Scenario: Creator sees fields for Resource subtype "Corrigendum"
And('they see a disabled field for Journal based on selected Journal article', () => {
  cy.get('[data-testid=corrigendum-for-field]').within(() => {
    cy.get('input').type('Test article corrigendum');
  });
  cy.contains('Test article corrigendum').click({ force: true });
  cy.get('[data-testid=journal-chip]').contains('Test article corrigendum');
});

// TODO Article number is not being validated
// Scenario: Creator sees that fields for Resource subtype "Corrigendum" are validated

// TODO Booklet, Comment missing
// @1659
// Scenario Outline: Creator sees fields for Norwegian Science Index (NVI) incompatible Resource subtype
And('they select Resource subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${JOURNAL_SUBTYPES[subtype]}]`).click({ force: true });
});
// Examples:
//     | Subtype         |
//     | Feature article |
//     | Comment         |
//     | Book review     |
//     | Leader          |
//     | Corrigendum     |
//     | Booklet         |

// TODO Booklet, Comment missing
// TODO Article number is not being validated
// Scenario Outline: Creator sees that fields for Norwegian Science Index (NVI) incompatible Resource subtype are validated
