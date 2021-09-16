import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_SECOND_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';
import {
  USER_ADMINISTRATION_BUTTONS,
  USER_ADMINISTRATION_HEADINGS,
  USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS,
} from '../../../support/data_testid_constants';

Given('that the user is logged in as Administrator', () => {
  cy.login(USER_SECOND_INST_ADMIN_WITH_AUTHOR);
});
When('they click the menu item Users', () => {
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=menu-admin-institution-users-button]').click({ force: true });
});
Then('they see the User Administration page', () => {
  cy.location('pathname').should('equal', '/my-institution-users');
});
And('they see the Section {string}', (section) => {
  cy.wrap(section).as('section');
  cy.get('h2').contains(USER_ADMINISTRATION_HEADINGS[section]).parent().as('roleSection');
});
And(
  'they see the Section {string} contains a list of all users affiliated with their institution and with with role {string}',
  (section, role) => {
    cy.wrap(section).get('tr').as('userList').should('have.length.above', 0);
  }
);
// And they see a Button "<Button>" to assign the Role "<Role>" to a another user
And('they see a Button {string} to assign the Role {string} to a another user', (button, role) => {
  cy.get(`[data-testid=${USER_ADMINISTRATION_BUTTONS[button]}]`).should('be.visible');
});
And('they see that the list has the field "Username" for each user', () => {
  cy.get('@userList').parent().get('thead').contains('Username');
});
And('they see a button Remove that is enabled for each user', () => {
  cy.get('@roleSection').within(() => {
    cy.get('@section').then((section) => {
      cy.get(`[data-testid^=${USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS[section]}]`).should('be.enabled');
    });
  });
});
And('they see a section Registrator with a policy for who are able to publish', () => {
  cy.get('h2').contains('Registrator');
  cy.get('[data-testid=checkbox-assign-creators]').should('exist');
});
// Examples:
//     | Section                    | Role          |
//     | Institution Administrators | Administrator |
//     | Curators                   | Curator       |
//     | Editors                    | Editor        |
