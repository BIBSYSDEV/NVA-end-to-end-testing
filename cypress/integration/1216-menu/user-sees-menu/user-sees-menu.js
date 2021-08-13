import { Given, When, Then, And, Before } from 'cypress-cucumber-preprocessor/steps';
import { USER_CURATOR_WITH_AUTHOR, USER_NO_ROLE, USER_WITH_AUTHOR } from '../../../support/constants';
import { v4 as uuidV4 } from 'uuid';

// Feature: User sees menu

// Common steps

Before(() => {
  cy.log(Cypress.currentTest);
});

Given('that the user is logged in', () => {
  cy.login(USER_NO_ROLE);
});
And('they see the Language selector', () => {});
// End common steps

// @344
// Scenario: Unauthenticated User sees menu
Given('that the User is not logged in', () => {
  cy.visit('/');
});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidV4()}`);
});
Then('they see the Log in button', () => {
  cy.get('[data-testid=menu-login-button').should('be.visible');
});

// @345
// Scenario: User without any role sees menu
Given('that the user is logged in', () => {
  cy.login(USER_NO_ROLE);
});
And('they have no NVA role', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidV4()}`);
});
Then('they see a menu containing', (dataTable) => {
  cy.get('[data-testid=menu]').should('exist');
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, USER_MENU);
});
// | My user profile |
// | Log out    |

// @346
// Scenario: User sees the menu for Creator
Given('that the user is logged in', () => {
  cy.login(USER_WITH_AUTHOR);
});
And('they have the "Creator" role', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a Dropdown Menu with items:', (dataTable) => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, CREATOR_MENU);
});
// | My Profile       |
// | Log Out          |
And('they see Menu items:', (dataTable) => {
  cy.testDataTestidList(dataTable, MAIN_BUTTONS);
});
// | New Registration |
// | My Registrations |
// | My Messages      |

// @347
// Scenario: User sees the menu for Curator
Given('that the user is logged in', () => {
  cy.login(USER_CURATOR_WITH_AUTHOR);
});
And('they have the "Curator" Role', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a Dropdown Menu with items:', (dataTable) => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, CURATOR_MENU);
});
//   | My worklist     |
//   | My user profile |
//   | Log out         |
And('they see Menu items:', (dataTable) => {});
//   | My messages |

// @348
// Scenario: User sees the menu for Institution-admin
Given('that the user is logged in', () => {
  cy.login(USER_INST_ADMIN_WITH_AUTHOR);
});
And('they have the "Institution-admin" role', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a Dropdown Menu with items:', (dataTable) => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, INST_ADMIN_MENU);
});
// | My institution  |
// | Users           |
// | My user profile |
// | Log out         |

// @350
// Scenario: User sees the menu for Application administrator
Given('that the user is logged in', () => {
  cy.login(ADMIN_USER);
});
And('they have the "App-admin" role', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a Dropdown Menu with items:', (dataTable) => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.testDataTestidList(dataTable, ADMIN_MENU);
});
