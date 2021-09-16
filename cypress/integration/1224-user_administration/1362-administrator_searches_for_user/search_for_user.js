import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';
import {
  INST_ADMIN_MENU,
  USER_ADMINISTRATION_BUTTONS,
  USER_ADMINISTRATION_ADD_ROLE_BUTTONS,
} from '../../../support/data_testid_constants';

Given('that the User is logged in as Administrator', () => {
  cy.login(USER_INST_ADMIN_WITH_AUTHOR);
});

And('they are on the User Administration Page', () => {
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get(`[data-testid=${INST_ADMIN_MENU['Users']}]`).click({ force: true });
});

When('they click the {string} button', (role) => {
  cy.get(`[data-testid=${USER_ADMINISTRATION_BUTTONS[role]}]`).click({ force: true });
  cy.wrap(role).as('role');
});

And('they execute a search for the employee "Kari"', () => {
  cy.get('[data-testid=add-role-search-box]').type('Kari');
});

Then('they see the Search result for "Kari" with Authentication ID', () => {
  cy.contains('Kari');
  cy.contains('test-user-kari@test.no');
});

And('they see an Add button for each row', () => {
  cy.get('@role').then((role) => {
    cy.get(`[data-testid^=${USER_ADMINISTRATION_ADD_ROLE_BUTTONS[role]}]`).should('be.visible');
  });
});
// Examples:
// | Role          |
// | Administrator |
// | Curator       |
// | Editor        |
