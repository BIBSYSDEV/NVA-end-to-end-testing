import { Given, When, Then, And, Before } from 'cypress-cucumber-preprocessor/steps';
import { USER_RESOURCE_TYPE } from '../../../../support/constants';
import { STUDENT_THESIS_SUBTYPES, STUDENT_THESIS_FIELDS } from '../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Degree

Before(() => {
  cy.login(USER_RESOURCE_TYPE);
  cy.get('[data-testid=my-registrations]').click({ force: true });
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});

// Common steps
Given('Creator navigates to the Resource Type tab and selects Resource type "Student thesis"', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
});
Then('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, STUDENT_THESIS_FIELDS);
});
// End common steps

// @394
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Student thesis"
Given('Creator navigates to Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
});
When('they select the Resource type "Student thesis"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, STUDENT_THESIS_SUBTYPES);
});
// | Bachelor thesis      |
// | Master thesis        |
// | Doctoral thesis      |
// | Other student thesis |

// @1694
// Scenario Outline: Creator sees fields for Resource subtypes for "Student thesis"
When('they select the Subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${STUDENT_THESIS_SUBTYPES[subtype]}]`).click({ force: true });
});
// Examples:
//     | Subtype              |
//     | Bachelor thesis      |
//     | Master thesis        |
//     | Doctoral thesis      |
//     | Other student thesis |

// Scenario: Creator sees that fields are validated for Resource subtypes for "Student thesis"
Given('Creator sees fields for Resource subtypes for "Student thesis"', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-DegreeBachelor]').click({ force: true });
});
When('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${STUDENT_THESIS_FIELDS[field[0]]}]`).within((field) => {
      cy.get(field).get('p').should('have.class', 'Mui-error').and('have.class', 'Mui-required');
    });
  });
});
// | Search box for Publisher |

// @2776
// Scenario: Creator sees series fields for Resource subtypes "Doctoral thesis"
When('they select the Subtype "Doctoral thesis"', () => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${STUDENT_THESIS_SUBTYPES['Doctoral thesis']}]`).click({ force: true });
});
