import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_SECOND_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';
import {
  USER_ADMINISTRATION_BUTTONS,
  USER_ADMINISTRATION_SECTIONS,
  USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS,
} from '../../../support/data_testid_constants';

const role_numbers = {
  'Administrator': 2,
  'Curator': 1,
  'Editor': 1,
};
// Feature: Administrator opens user administration

// @test
// @359
// Scenario Outline: Administrator opens User Administration
Given('that the user is logged in as Administrator', () => {
  cy.login(USER_SECOND_INST_ADMIN_WITH_AUTHOR);
});
When('they click the menu item Users', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-admin-institution-users-button]').click({ force: true });
});
Then('they see the User Administration page', () => {
  cy.location('pathname').should('equal', '/my-institution-users');
});
And(
  'they see that Section {string} lists all users affiliated with their institution with role {string}',
  (section, role) => {
    cy.wrap(section).as('section');
    cy.wrap(role).as('role')
    cy.get(`[data-testid=${USER_ADMINISTRATION_SECTIONS[section]}]`).should('exist').and('be.visible');
    cy.get(`[data-testid=${USER_ADMINISTRATION_SECTIONS[section]}]`).within(() => {
      cy.get('tbody > tr').should('have.length', role_numbers[role]);
    });
  }
);
And('they see a Button {string}', (button) => {
  cy.get(`[data-testid=${USER_ADMINISTRATION_BUTTONS[button]}]`).should('exist').and('be.visible');
});
And('they see that the list has the fields "Username" and "Name" for each user', () => {
  cy.get('@section').then((section) => {
    cy.get(`[data-testid=${USER_ADMINISTRATION_SECTIONS[section]}]`).within(() => {
      cy.get('tbody > tr').each((user_line) => {
        cy.wrap(user_line).within(() => {
          cy.get('td').should('have.length', 3);
        });
      });
    });
  });
});
And('they see a button "Remove" that is enabled for each user', () => {
  cy.get('@role').then((role) => {
    cy.get(`[data-testid^=${USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS[role]}]`).should('have.length', role_numbers[role]);
  })
});
And('they see the number of items viewed per page', () => {});
And('they can change the number of items viewed per page', () => {});
And('they see the number of items viewed of the total amount of items', () => {});
And('they see that previous page of items is disabled', () => {});
And('they can select next page of items', () => {});
And('they see a section Registrator with a policy for who are able to publish', () => {});
// Examples:
//     | Section        | Role          | Button            |
//     | Administrators | Administrator | Add Administrator |
//     | Curators       | Curator       | Add Curator       |
//     | Editors        | Editor        | Add Editor        |

// @test
// @363
// Scenario Outline: Administrator opens the Add Role Dialog
Given('Administrator opens User Administration', () => {
  cy.login(USER_SECOND_INST_ADMIN_WITH_AUTHOR);
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-admin-institution-users-button]').click({ force: true });
});
When('they click {string} under {string}', (button, section) => {});
Then('they see the Add Role Dialog', () => {});
And('they see an Information box', () => {});
And('they see an input field to Search for employees', () => {});
And('they see a list of employees with an "Add" button', () => {});
And('they see the number of items viewed per page', () => {});
And('they can change the number of items viewed per page', () => {});
And('they see the number of items viewed of the total amount of items', () => {});
And('they see that previous page of items is disabled', () => {});
And('they can select next page of items', () => {});
And('they see a "Close" button', () => {});
// Examples:
//     | Section       | Button            |
//     | Administrator | Add Administrator |
//     | Curator       | Add Curator       |
//     | Editor        | Add Editor        |

// @test
// @1362
// Scenario: Administrator searches for User
Given('Administrator opens the Add Role Dialog', () => {});
When('they enter text into the Search field', () => {});
Then('they see a list of employees matching the search with an "Add" button', () => {});

// @1363
// Scenario: Administrator grants an Employee a role
Given('Administrator opens the Add Role Dialog', () => {});
When('they click "Add" Button for an Employee', () => {});
Then('they see a confirmation message', () => {});
And('they see that the clicked "Add" button is disabled', () => {});

// Scenario: Administrator closes the Add Role Dialog
Given('Administrator opens the Add Role Dialog', () => {});
When('they click the "Close" button', () => {});
Then('the Add Role Dialog is closed', () => {});
