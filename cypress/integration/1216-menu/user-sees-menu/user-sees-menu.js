import { Given, When, Then, And, Before } from 'cypress-cucumber-preprocessor/steps';
import {
  USER_CURATOR_WITH_AUTHOR,
  USER_NO_ROLE,
  USER_WITH_AUTHOR,
  ADMIN_USER,
  USER_INST_ADMIN_WITH_AUTHOR,
} from '../../../support/constants';
import {
  ADMIN_MENU,
  CREATOR_MENU,
  CURATOR_MENU,
  INST_ADMIN_MENU,
  MAIN_BUTTONS,
  USER_MENU,
} from '../../../support/data_testid_constants';
import { v4 as uuidV4 } from 'uuid';

// Feature: User sees menu

// Common steps
Given('that the user is logged in', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidV4()}`);
});
Then('they see a Dropdown Menu with items:', (dataTable) => {
  cy.get('[data-testid=menu-button]').should('exist');
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('@MENU').then((menu) => {
    cy.testDataTestidList(dataTable, menu);
  });
});
And('they see Menu items:', (dataTable) => {
  cy.testDataTestidList(dataTable, MAIN_BUTTONS);
});
And('they see the Language selector', () => {
  cy.get('[data-testid=language-button]').should('be.visible');
});
// End common steps

// @344
// Scenario: Unauthenticated User sees menu
Given('that the User is not logged in', () => {
  cy.visit('/');
});
Then('they see the Log in Button', () => {
  cy.get('[data-testid=log-in-link').should('be.visible');
});

// @345
// Scenario: User without any role sees menu
And('they have no NVA role', () => {
  cy.login(USER_NO_ROLE);
  cy.wrap(USER_MENU).as('MENU');
});

// @346
// Scenario: User sees the menu for Creator
And('they have the "Creator" role', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.wrap(CREATOR_MENU).as('MENU');
});

// @347
// Scenario: User sees the menu for Curator
And('they have the "Curator" Role', () => {
  cy.mockPersonSearch(USER_CURATOR_WITH_AUTHOR);
  cy.login(USER_CURATOR_WITH_AUTHOR);
  cy.wrap(CURATOR_MENU).as('MENU');
});

// @348
// Scenario: User sees the menu for Institution-admin
And('they have the "Institution-admin" role', () => {
  cy.login(USER_INST_ADMIN_WITH_AUTHOR);
  cy.wrap(INST_ADMIN_MENU).as('MENU');
});

// @350
// Scenario: User sees the menu for Application administrator
And('they have the "App-admin" role', () => {
  cy.login(ADMIN_USER);
  cy.wrap(ADMIN_MENU).as('MENU');
});
