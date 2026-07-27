import {
  userUnitCurator,
  userUnitNoRole,
  userUnitTestMenu,
  adminUserUnit,
  userUnitInstAdmin,
  userUnitEditor,
  userUnitWithAuthor,
} from '../../../support/constants';
import { mainButtons } from '../../../support/data_testid_constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

// Feature: User sees menu

const userForRole: Record<string, string> = {
  Creator: userUnitTestMenu,
  Curator: userUnitCurator,
  'Institution-admin': userUnitInstAdmin,
  Editor: userUnitEditor,
  'App-admin': adminUserUnit,
};

// Common steps
Given('a user is logged in', () => {
  cy.login(userUnitWithAuthor);
});
Given('a user without any NVA role is logged in', () => {
  cy.login(userUnitNoRole);
});
Given('a user with the {string} role is logged in', (role: string) => {
  const userId = userForRole[role];
  if (!userId) {
    throw new Error(`No test user configured for role "${role}"`);
  }
  cy.login(userId);
});
When('they look at any page in NVA', () => {
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
});
When('they see Menu items:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, mainButtons);
});
When('they see the Language selector', () => {
  cy.get('button').filter(':lang("nb")').should('be.visible');
  cy.get('button').filter(':lang("en")').should('be.visible');
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
Then('they have an option to log out', () => {
  cy.getDataTestId(dataTestId.header.menuButton).should('be.visible').click();
  cy.getDataTestId(dataTestId.header.logOutLink).should('be.visible');
});
