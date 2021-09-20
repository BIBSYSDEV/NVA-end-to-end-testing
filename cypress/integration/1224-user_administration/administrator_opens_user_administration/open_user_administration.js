import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_SECOND_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';
import {
  USER_ADMINISTRATION_BUTTONS,
  USER_ADMINISTRATION_SECTIONS,
  USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS,
  USER_ADMINISTRATION_ADD_ROLE_BUTTONS,
  USER_ADMINISTRATION_PAGINATION,
} from '../../../support/data_testid_constants';

const roleSearchTerms = {
  'Administrator': 'Second Institution Curator',
  'Curator': 'Second Institution Editor',
  'Editor': 'Second Institution-admin',
};

// Feature: Administrator opens user administration
// Common steps
And('they see the number of items viewed per page', () => {
  cy.get('@listControls').within(() => {
    cy.get('[class^=MuiSelect-root]').contains('5');
  });
});
And('they can change the number of items viewed per page', () => {
  cy.get('@listControls').within(() => {
    cy.get('[class^=MuiSelect-root]').click();
  });
  cy.get('[class^=MuiList-root]')
    .contains('25')
    .parent()
    .within(() => {
      cy.get('li').should('have.length', 3);
    });
  cy.get('[class^=MuiList-root]').contains('5').click();
});
And('they see the number of items viewed of the total amount of items', () => {
  cy.get('@expectedUserNumbers').then((expectedUserNumbers) => {
    cy.get('@listControls').within(() => {
      cy.get('div > p').contains(expectedUserNumbers);
    });
  });
});
And('they see that previous page of items is disabled', () => {
  cy.get('@listControls').within(() => {
    cy.get('[class=MuiTablePagination-actions] > button').first().should('be.disabled');
  });
});
And('they can select next page of items', () => {
  cy.get('@listControls').within(() => {
    cy.get('[class=MuiTablePagination-actions] > button').last().should('be.enabled');
  });
});
When('they click {string} under {string}', (button, section) => {
  cy.wrap(button).as('button');
  cy.wrap(section).as('section');
  cy.get(`[data-testid=${USER_ADMINISTRATION_BUTTONS[button]}]`).click();
});

// End common steps

// @test
// @359
// Scenario Outline: Administrator opens User Administration
Given('that the user is logged in as Administrator', () => {
  cy.login(USER_SECOND_INST_ADMIN_WITH_AUTHOR);
});
When('they click the menu item Users', () => {
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=admin-users-link]').click({ force: true });
});
Then('they see the User Administration page', () => {
  cy.location('pathname').should('equal', '/my-institution-users');
});
And(
  'they see that Section {string} lists all users affiliated with their institution with role {string}',
  (section, role) => {
    cy.wrap(section).as('section');
    cy.wrap(role).as('role');
    cy.wrap('1-5 of 6').as('expectedUserNumbers');
    cy.get(`[data-testid=${USER_ADMINISTRATION_SECTIONS[section]}]`).should('exist').and('be.visible');
    cy.get(`[data-testid=${USER_ADMINISTRATION_SECTIONS[section]}]`).within(() => {
      cy.get('tbody > tr').should('have.length', 5);
      cy.get(`[data-testid=user-pagination-${USER_ADMINISTRATION_PAGINATION[role]}]`).as('listControls');
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
    cy.get(`[data-testid^=${USER_ADMINISTRATION_REMOVE_ROLE_BUTTONS[role]}]`).should('have.length', 5);
  });
});
And('they see a section Registrator with a policy for who are able to publish', () => {
  cy.get('[data-testid=users-creators]').should('be.visible');
  cy.get('[data-testid=checkbox-assign-creators]').should('be.visible');
});
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
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=admin-users-link]').click({ force: true });
});
Then('they see the Add Role Dialog', () => {
  cy.wrap('1-5 of 19').as('expectedUserNumbers');
  cy.get('[data-testid=add-role-modal]').as('roleModal');
  cy.get('@roleModal').within(() => {
    cy.get('[class=MuiTablePagination-root]').as('listControls');
  });
});
And('they see an Information box', () => {
  cy.get('[data-testid=add-role-info]').should('be.visible');
});
And('they see an input field to Search for employees', () => {
  cy.get('[data-testid=add-role-search-box]').should('be.visible');
});
And('they see a list of employees with an "Add" button', () => {
  cy.get('@roleModal').within(() => {
    cy.get('@button').then((button) => {
      cy.get(`[data-testid^=${USER_ADMINISTRATION_ADD_ROLE_BUTTONS[button]}]`).should('have.length', 5);
    });
  });
});
And('they see a "Close" button', () => {
  cy.get('[data-testid=add-role-close-button]').should('be.visible');
});
// Examples:
//     | Section       | Button            |
//     | Administrator | Add Administrator |
//     | Curator       | Add Curator       |
//     | Editor        | Add Editor        |

// @test
// @1362
// Scenario: Administrator searches for User
Given('Administrator opens the Add Role Dialog', () => {
  cy.login(USER_SECOND_INST_ADMIN_WITH_AUTHOR);
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=admin-users-link]').click({ force: true });
});
When('they enter text into the Search field', () => {
  cy.get('@section').then((section) => {
    cy.get('[data-testid=add-role-search-box]').type(roleSearchTerms[section]);
  });
});
Then('they see a list of employees matching the search with an "Add" button', () => {
  cy.get('@section').then((section) => {
    cy.get('[data-testid=add-role-modal]').within(() => {
      cy.get('tbody').within(() => {
        cy.get('tr').each((user) => {
          cy.get(user).contains(roleSearchTerms[section]);
          cy.get(user).within(() => {
            cy.get('[data-testid^=button-add-role]');
          });
        });
      });
    });
  });
});
// Examples:
// | Section       | Button            |
// | Administrator | Add Administrator |
// | Curator       | Add Curator       |
// | Editor        | Add Editor        |

// @1363
// Scenario: Administrator grants an Employee a role
When('they click "Add" Button for an Employee', () => {
  cy.get('@section').then((section) => {
    cy.get('[data-testid=add-role-search-box]').type(roleSearchTerms[section]);
    cy.get('[data-testid=add-role-modal]').within(() => {
      cy.get('tbody').within(() => {
        cy.get('tr')
          .first()
          .within(() => {
            cy.get('[data-testid^=button-add-role]').click();
          });
      });
    });
  });
});
Then('they see a confirmation message', () => {
  cy.get('[data-testid=snackbar-success]');
});
And('they see that the clicked "Add" button is disabled', () => {
  cy.get('@section').then((section) => {
    cy.get('[data-testid=add-role-modal]').within(() => {
      cy.get('tbody').within(() => {
        cy.get('tr')
          .first()
          .within(() => {
            cy.get('[data-testid^=button-add-role]').should('be.disabled');
          });
      });
    });
  });
});
// Examples:
// | Section       | Button            |
// | Administrator | Add Administrator |
// | Curator       | Add Curator       |
// | Editor        | Add Editor        |

// Scenario: Administrator closes the Add Role Dialog
When('they click the "Close" button', () => {
  cy.get('[data-testid=add-role-close-button]').click();
});
Then('the Add Role Dialog is closed', () => {
  cy.get('[data-testid=add-role-modal]').should('not.exist');
});
// Examples:
// | Section       | Button            |
// | Administrator | Add Administrator |
// | Curator       | Add Curator       |
// | Editor        | Add Editor        |
