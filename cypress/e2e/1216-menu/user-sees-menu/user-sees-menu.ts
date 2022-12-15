import {
  userCuratorWithAuthor,
  userNoRole,
  userWithAuthor,
  adminUser,
  userInstAdminWithAuthor,
} from '../../../support/constants';
import {
  adminMenu,
  creatorMenu,
  curatorMenu,
  instAdminMenu,
  mainButtons,
  userMenu,
} from '../../../support/data_testid_constants';
import { dataTestId } from '../../../support/dataTestIds';
import { DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// Feature: User sees menu

// Common steps
Given('that the user is logged in', () => { });
When('they look at any page in NVA', () => {
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
});
Then('they see a Dropdown Menu with items:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).should('exist');
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get('@MENU').then((menu: any) => {
    cy.testDataTestidList(dataTable, menu);
  });
});
Then('they see Menu items:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, mainButtons);
});
Then('they see the Language selector', () => {
  cy.get(`[data-testid=${dataTestId.header.languageButton}]`).should('be.visible');
});
// End common steps

// @344
// Scenario: Unauthenticated User sees menu
Given('that the User is not logged in', () => {
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
});
Then('they see the Log in Button', () => {
  cy.get(`[data-testid=${dataTestId.header.logInButton}]`).should('be.visible');
});

// @345
// Scenario: User without any role sees menu
Then('they have no NVA role', () => {
  cy.login(userNoRole);
  cy.wrap(userMenu).as('MENU');
});

// @346
// Scenario: User sees the menu for Creator
Then('they have the "Creator" role', () => {
  cy.login(userWithAuthor);
  cy.wrap(creatorMenu).as('MENU');
});

// @347
// Scenario: User sees the menu for Curator
Then('they have the "Curator" Role', () => {
  cy.login(userCuratorWithAuthor);
  cy.wrap(curatorMenu).as('MENU');
});

// @348
// Scenario: User sees the menu for Institution-admin
Then('they have the "Institution-admin" role', () => {
  cy.login(userInstAdminWithAuthor);
  cy.wrap(instAdminMenu).as('MENU');
});

// @350
// Scenario: User sees the menu for Application administrator
Then('they have the "App-admin" role', () => {
  cy.login(adminUser);
  cy.wrap(adminMenu).as('MENU');
});
