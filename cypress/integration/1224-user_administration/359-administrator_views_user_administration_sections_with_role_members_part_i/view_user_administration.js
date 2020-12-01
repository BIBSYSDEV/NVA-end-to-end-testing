import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';

const SECTION_HEADINGS = {
  'Institution Administrators': 'Administrators',
  'Curators': 'Curators',
  'Editors': 'Editors',
  'Creators': 'Registrator',
};

const ROLE_BUTTONS = {
  'Administrator': 'button-add-institution-admin',
  'Curator': 'button-add-curator',
  'Editor': 'button-add-editor',
  'Creator': '',
};

Given('that the user is logged in as Administrator', () => {
  cy.login(USER_INST_ADMIN_WITH_AUTHOR);
});
When('they click the menu item User Administration', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-admin-institution-users-button]').click({ force: true });
});
Then('they see the User Administration page', () => {
  cy.location('pathname').should('equal', '/my-institution-users');
});
And('they see the {string}', (section) => {
  cy.get('h3').contains(SECTION_HEADINGS[section]);
});
And(
  'they see the {string} contains a list of all users affiliated with their institution and with with role {string}',
  (dataTable) => {}
);
And('they see under each Section a Button to assign the {string} to a another user', (role) => {
  if (role !== 'Creator') {
    cy.get(`[data-testid=${ROLE_BUTTONS[role]}]`).should('be.visible');
  }
});
And('they see that each list has the field "Authentication ID"', () => {});
And('they see a button Remove that is enabled for each user', () => {});
// Examples:
//     | Section                    | Role          |
//     | Institution Administrators | Administrator |
//     | Curators                   | Curator       |
//     | Editors                    | Editor        |
//     | Creators                   | Creator       |
