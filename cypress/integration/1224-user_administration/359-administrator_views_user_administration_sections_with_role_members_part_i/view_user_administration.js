import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';
import {
  USER_ADMINISTRAION_BUTTONS,
  USER_ADMINISTRATION_HEADINGS,
  USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS,
} from '../../../support/data_testid_constants';

Given('that the user is logged in as Administrator', () => {
  cy.login(USER_INST_ADMIN_WITH_AUTHOR);
});
When('they click the menu item Users', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-admin-institution-users-button]').click({ force: true });
});
Then('they see the User Administration page', () => {
  cy.location('pathname').should('equal', '/my-institution-users');
});
And('they see the {string}', (section) => {
  cy.get('h3').contains(USER_ADMINISTRATION_HEADINGS[section]).parent().as('section');
  cy.wrap(section).as('sectionName');
});
And(
  'they see the {string} contains a list of all users affiliated with their institution and with with role {string}',
  (section, role) => {
    cy.get('@section').get('tr').as('userList').should('have.length.above', 0);
  }
);
And('they see under each Section a Button to assign the {string} to a another user', (role) => {
  cy.get(`[data-testid=${USER_ADMINISTRAION_BUTTONS[role]}]`).should('be.visible');
});
And('they see that each list has the field "Username"', () => {
  cy.get('@userList').parent().get('thead').contains('Username');
});
And('they see a button Remove that is enabled for each user', () => {
  cy.get('@section').within((section) => {
    cy.get('@sectionName').then((sectionName) => {
      cy.get(`[data-testid^=${USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS[sectionName]}]`).should('be.enabled');
    });
  });
});
And('they see a section Registrator with a policy for who are able to publish', () => {
  cy.get('h3').contains('Registrator');
  cy.get('[data-testid=checkbox-assign-creators]').should('exist');
});
// Examples:
//     | Section                    | Role          |
//     | Institution Administrators | Administrator |
//     | Curators                   | Curator       |
//     | Editors                    | Editor        |
