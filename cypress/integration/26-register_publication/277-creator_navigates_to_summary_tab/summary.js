import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

const testFile = 'example.txt';

// Start common steps for
// Scenario: Creator navigates to Summary tab with validation errors
// and
// Scenario: Creator navigates to Summary tab without validation errors

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR).then(() => {
    cy.startRegistrationWithFile(testFile);
    cy.get('[data-testid=registration-file-start-button]').click({ force: true });
  });
});

When('they navigate to the Summary tab', () => {
  cy.get('[data-testid=nav-tabpanel-submission').click({ force: true });
});

// common for Then
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.visible');
});
And('they see the tab Reference is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-reference]').should('be.visible');
});
And('they see the tab Contributors is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').should('be.visible');
});
And('they see the tab Files and License is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license]').should('be.visible');
});
And('they see the tab Summary is selected', () => {
  cy.get('[data-testid=nav-tabpanel-submission][aria-selected=true]');
});
And('they see Save and present is enabled', () => {
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});
And('they see Information box for', (dataTable) => {
  cy.get('h2')
    .contains('Summary')
    .parent()
    .within(($summary) => {
      dataTable.rawTable.forEach((value) => {
        cy.contains(value[0]);
      });
    });
});
// | Description       |
// | Reference         |
// | Contributors      |
// | Files and License |

// End common steps

// Scenario: Creator navigates to Summary tab with validation errors

And('there are validation errors', () => {});

Then('they see Error box for Validation errors', () => {
  cy.get('[data-testid=error-summary-card]');
});
And('they see Publish is disabled', () => {
  cy.get('[data-testid=button-publish-registration]').should('be.disabled');
});

// Scenario: Creator navigates to Summary tab without validation errors

And('there are no validation errors', () => {
  cy.createValidRegistration();
});

And('they see Publish is enabled', () => {
  cy.get('[data-testid=button-publish-registration]').should('be.enabled');
});
