import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { STUDENT_THESIS_SUBTYPES, STUDENT_THESIS_FIELDS } from '../../../support/data_testid_constants';

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';

Given('Creator begins registering a Publication in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithLink(doiLink);
  cy.get('[data-testid=registration-link-next-button]').should('be.enabled');
  cy.get('[data-testid=registration-link-next-button]').click({ force: true });
});
When('they navigate to the Reference tab', () => {
  cy.get('[data-testid=nav-tabpanel-reference]').click({ force: true });
});
And('they select the Reference type "Student thesis"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
});
And('they select {string}:', (subType) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${STUDENT_THESIS_SUBTYPES[subType]}]`).click({ force: true });
});
Then('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, STUDENT_THESIS_FIELDS);
});
// | Search box for Publisher |
// | DOI                      |
// | Search box for Series    |

When('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${STUDENT_THESIS_FIELDS[value[0]]}]`).focus();
    cy.get(`[data-testid=${STUDENT_THESIS_FIELDS[value[0]]}]`).blur();
    cy.get(`[data-testid=${STUDENT_THESIS_FIELDS[value[0]]}]`).parent().parent().contains('Mandatory');
  });
});
// | Search box for Publisher |

// Subtypes:
// | Subtype              |
// | Bachelor thesis      |
// | Master thesis        |
// | Doctoral thesis      |
// | Other student thesis |
