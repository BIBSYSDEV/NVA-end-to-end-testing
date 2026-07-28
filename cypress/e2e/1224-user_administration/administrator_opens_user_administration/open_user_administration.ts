import { userSiktInstAdmin } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import {
  userAdministrationButtons,
  userAdministrationSections,
  userAdministrationRemoveRoleButtons,
  userAdministrationAddRoleButtons,
  userAdministrationPagination,
} from '../../../support/data_testid_constants';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const roleSearchTerms = {
  'Administrator': 'Second Institution Curator',
  'Curator': 'Second Institution Editor',
  'Editor': 'Second Institution-admin',
};

// Feature: Administrator opens user administration
// Common steps
Then('they see the number of items viewed per page', () => {
  cy.get('@listControls').within(() => {
    cy.get('[class^=MuiTablePagination-select]').contains('5');
  });
});
Then('they can change the number of items viewed per page', () => {
  cy.get('@listControls').within(() => {
    cy.get('[class^=MuiTablePagination-select]').last().click();
  });
  cy.get('[role=listbox]')
    .contains('25')
    .parent()
    .within(() => {
      cy.get('li').should('have.length', 3);
    });
  cy.get('[role=listbox]').contains('5').click();
});
Then('they see the number of items viewed of the total amount of items', () => {
  cy.get('@listControls').within(() => {
    cy.get('.MuiToolbar-root > .MuiTablePagination-displayedRows').should('be.visible');
  });
});
Then('they see that previous page of items is disabled', () => {
  cy.get('@listControls').within(() => {
    cy.get('[class=MuiTablePagination-actions] > button').first().should('be.disabled');
  });
});
Then('they can select next page of items', () => {
  cy.get('@listControls').within(() => {
    cy.get('[class=MuiTablePagination-actions] > button').last().should('be.enabled');
  });
});
When('they click {string} under {string}', (button: string, section) => {
  cy.wrap(button).as('button');
  cy.wrap(section).as('section');
  cy.getDataTestId(userAdministrationButtons[button]).click();
});

// End common steps

// @test
// @359
// Scenario Outline: Administrator opens User Administration
Given('that the user is logged in as Administrator', () => {
  cy.login(userSiktInstAdmin);
});
When('they click the menu item Users', () => {
  cy.getDataTestId(dataTestId.header.basicDataLink).click({ force: true });
});
Then('they see the User Administration page', () => {
  cy.location('pathname').should('equal', '/basic-data/person-register');
});
Then(
  'they see that Section {string} lists all users affiliated with their institution with role {string}',
  (section: string, role: string) => {
    cy.wrap(section).as('section');
    cy.wrap(role).as('role');
    cy.getDataTestId(userAdministrationSections[section]).should('exist').and('be.visible');
    cy.getDataTestId(userAdministrationSections[section]).within(() => {
      cy.get('tbody > tr').should('have.length', 5);
      cy.get(`[data-testid=user-pagination-${userAdministrationPagination[role]}]`).as('listControls');
    });
  }
);
Then('they see a Button {string}', (button: string) => {
  cy.getDataTestId(userAdministrationButtons[button]).should('exist').and('be.visible');
});
Then('they see that the list has the fields "Username" and "Name" for each user', () => {
  cy.get('@section').then((section: any) => {
    cy.getDataTestId(userAdministrationSections[section]).within(() => {
      cy.get('tbody > tr').each((user_line) => {
        cy.wrap(user_line).within(() => {
          cy.get('td').should('have.length.at.least', 2);
        });
      });
    });
  });
});
Then('they see a button "Remove" that is enabled for each user', () => {
  cy.get('@role').then((role: any) => {
    cy.getDataTestId(userAdministrationRemoveRoleButtons[role]).should('have.length', 5);
  });
});
Then('they see a section Registrator with a policy for who are able to publish', () => {
  cy.getDataTestId(dataTestId.myInstitutionUsersPage.usersCreators).should('be.visible');
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
  cy.login(userSiktInstAdmin);
  cy.getDataTestId(dataTestId.header.basicDataLink).click({ force: true });
});
Then('they see the Add Role Dialog', () => {
  cy.get('[data-testid=add-role-modal]').as('roleModal');
  cy.get('@roleModal').within(() => {
    cy.get('[data-testid^=user-pagination]').as('listControls');
  });
});
Then('they see an Information box', () => {
  cy.get('[data-testid=add-role-info]').should('be.visible');
});
Then('they see an input field to Search for employees', () => {
  cy.get('[data-testid=add-role-search-box]').should('be.visible');
});
Then('they see a list of employees with an "Add" button', () => {
  cy.get('@roleModal').within(() => {
    cy.get('@button').then((button: any) => {
      cy.get(`[data-testid^=${userAdministrationAddRoleButtons[button]}]`).should('have.length.at.least', 1);
    });
  });
});
Then('they see a "Close" button', () => {
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
  cy.login(userSiktInstAdmin);
  cy.get(`[data-testid=${dataTestId.header.basicDataLink}]`).click({ force: true });
});
When('they enter text into the Search field', () => {
  cy.get('@section').then((section) => {
    cy.get('[data-testid=add-role-search-box]').type(roleSearchTerms[section.toString()]);
  });
});
Then('they see a list of employees matching the search with an "Add" button', () => {
  cy.get('@section').then((section) => {
    cy.get('[data-testid=add-role-modal]').within(() => {
      cy.get('tbody').within(() => {
        cy.get('tr').each((user: any) => {
          cy.get(user).contains(roleSearchTerms[section.toString()]);
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
    cy.get('[data-testid=add-role-search-box]').type(roleSearchTerms[section.toString()]);
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
Then('they see that the clicked "Add" button is disabled', () => {
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

// Scenario: Administrator inspect a Curators scope
When('they see on the Curator section of the User Administration', () => {
  cy.getDataTestId(dataTestId.myInstitutionUsersPage.usersCurators).should('be.visible');
});
Then('they see that each Curator has a "Scope" field', () => {
  cy.get(`[data-testid=${dataTestId.myInstitutionUsersPage.usersCurators}] > table > tbody > tr`).each((row) => {
    cy.wrap(row).within(() => {
      cy.get('[data-testid=area-of-responsibility-field]').should('exist');
    });
  });
});
Then('the "Scope" field is a dropdown containing all levels of their Institution', () => {
  cy.get(`[data-testid=${dataTestId.myInstitutionUsersPage.usersCurators}] > table > tbody > tr`).each((row) => {
    cy.wrap(row).within(() => {
      cy.get('[data-testid=area-of-responsibility-field]').click();
    });
    cy.contains('Mock department 1');
    cy.contains('Mock department 2');
    cy.contains('Mock department 3');
    cy.contains('Mock institution 2');
    cy.contains('Mock institution 2').click();
  });
});

// Scenario: Administrator define a Curators scope
When('they click on the Scope dropdown for a Curator', () => {
  cy.get(`[data-testid=${dataTestId.myInstitutionUsersPage.usersCurators}] > table > tbody > tr`)
    .first()
    .within(() => {
      cy.get('[data-testid=area-of-responsibility-field]').click();
    });
});
When('they select an Institution or subunit', () => {
  cy.contains('Mock department 1').click();
});
Then('the dropdown is closed', () => {
  cy.contains('Mock department 2').should('not.exist');
});
Then('they see a confirmation message that the Scope was updated', () => {
  cy.contains('Updated user');
});
