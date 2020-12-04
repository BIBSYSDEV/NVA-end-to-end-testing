import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';
import { USER_ADMINISTRATION_HEADINGS, USER_ADMINISTRAION_BUTTONS } from '../../../support/data_testid_constants';

Given('that the User is logged in as Administrator', () => {
  cy.login(USER_INST_ADMIN_WITH_AUTHOR);
});
And('they are on the User Administration Page', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-admin-institution-users-button]').click({ force: true });
});
When('they click {string} under {string}', (button, section) => {
  cy.contains(USER_ADMINISTRATION_HEADINGS[section])
    .parent()
    .within(($section) => {
      cy.wrap($section).get(`[data-testid=${USER_ADMINISTRAION_BUTTONS[button]}]`).click({ force: true });
    });
});
Then('they see the Add Role Dialog with Authentication ID', () => {
  cy.get('[data-testid^=button-add-role]').should('exist');
});
And('they see a Search box for employees', () => {
  cy.get('[data-testid=add-role-search-box]').should('be.visible');
});
And('they see an Information box', () => {
  cy.get('[data-testid=add-role-info]').should('be.visible');
});
And('they see a Close button', () => {
  cy.get('[data-testid=add-role-close-button]').should('be.visible');
});
// Examples:
//     | Section       | Button            |
//     | Administrator | New Administrator |
//     | Curator       | New Curator       |
//     | Editor        | New Editor        |
