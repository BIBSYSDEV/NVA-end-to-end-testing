import { userWithAuthor } from '../../../support/constants';
import { descriptionFields } from '../../../support/data_testid_constants';

// Common step
Given('that the user is logged in as Creator', () => {
  cy.login(userWithAuthor);
});
// end common step

And('is on the page My Registrations', () => {
  cy.get('[data-testid=menu-button]').click();
  cy.get('[data-testid=my-registrations-link]').click({ force: true });
});
When('they click Edit on an item', () => {
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});
Then('they see the item is opened in the Wizard', () => {});
And('they see the Description tab', () => {
  cy.get('[data-testid=nav-tabpanel-description');
});
And('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, descriptionFields);
});

// | Title                        |
// | Abstract                     |
// | Description                  |
// | Date published               |
// | Primary language for content |

And('they are on the page My Registrations', () => {
  cy.get('[data-testid=menu-button]').click();
  cy.get('[data-testid=my-registrations-link]').click({ force: true });
});
And('they see a List of Registrations', () => {
  cy.get('[data-testid^=edit-registration]').should('have.length.above', 1);
});
When('they click Edit on a Registration', () => {
  cy.get('tr')
    .filter(':contains("Registration with validation error")')
    .within(() => {
      cy.get('[data-testid^=edit-registration]').click({ force: true });
    });
});
And('they see the Registration is opened in Edit Mode', () => {
  cy.get('[data-testid=registration-title-field]').should('exist');
});
And('they see the Registration has Validation Errors', () => {
  cy.get('[data-testid=error-list-div]').should('exist');
});
Then('they see a List of all Validation Errors', () => {
  cy.get('[data-testid=error-list-div] > dl > dd').should('have.length.above', 0);
});
And('they see that tabs with Validation Errors are marked with an Error Icon', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').within(() => {
    cy.get('[data-testid=error-tab]');
  });
  cy.get('[data-testid=nav-tabpanel-files-and-license]').within(() => {
    cy.get('[data-testid=error-tab]');
  });
});
