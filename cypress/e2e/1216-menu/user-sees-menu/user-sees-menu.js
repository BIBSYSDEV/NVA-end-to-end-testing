import {
  userCuratorWithAuthor,
  userNoRole,
  userTestMenu,
  adminUser,
  userInstAdminWithAuthor,
  userEditor,
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
And('they see Menu items:', (dataTable) => {
  cy.testDataTestidList(dataTable, mainButtons);
});
And('they see the Language selector', () => {
  cy.getDataTestId(dataTestId.header.languageButton).should('be.visible', { force: true });
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
  cy.getDataTestId(dataTestId.header.logInButton).should('be.visible');
});

// Scenario: User have option to log out
Then ('they have an option to log out', () => {
  cy.getDataTestId(dataTestId.header.menuButton).should('exist');
  cy.getDataTestId(dataTestId.header.menuButton).click();
  cy.getDataTestId(dataTestId.header.logOutLink).should('be.visible');
})


// Scenario: User without any role sees menu
And('they have no NVA role', () => {
  cy.login(userNoRole);
  cy.wrap(userMenu).as('MENU');
});

// Scenario: User sees the menu for Creator
And('they have the "Creator" role', () => {
  cy.login(userTestMenu);
  cy.wrap(creatorMenu).as('MENU');
});

// Scenario: User sees the menu for Curator
And('they have the "Curator" Role', () => {
  cy.login(userCuratorWithAuthor);
  cy.wrap(curatorMenu).as('MENU');
});

// Scenario: User sees the menu for Institution-admin
And('they have the "Institution-admin" role', () => {
  cy.login(userInstAdminWithAuthor);
  cy.wrap(instAdminMenu).as('MENU');
});

And('they have the "Editor" role', () => {
  cy.login(userEditor);
  cy.wrap(instAdminMenu).as('MENU');
});

// Scenario: User sees the menu for Application administrator
And('they have the "App-admin" role', () => {
  cy.login(adminUser);
  cy.wrap(adminMenu).as('MENU');
});
