import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

const testFile = 'example.txt';

// Start common steps for
// Scenario: Creator navigates to Reference tab
// and
// Scenario: Creator sees that fields are validated on Reference tab

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR).then(() => {
    cy.startRegistrationWithFile(testFile);
  });
});
When('they navigate to the Reference tab', () => {
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
  cy.get('[data-testid=nav-tabpanel-reference').click({ force: true });
});

And('they see Previous is enabled', () => {
  // TODO waiting for implementation
});

// End common steps

// Scenario: Creator navigates to Reference tab
Then('they see the field for Type', () => {
  cy.get('[data-testid=publication-context-type]').should('be.visible');
});
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.visible');
});
And('they see the tab Reference is selected', () => {
  cy.get('[data-testid=nav-tabpanel-reference][aria-selected=true]');
});
And('they see the tab Contributors is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').should('be.visible');
});
And('they see the tab Files and License is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license]').should('be.visible');
});
And('they see the tab Summary is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-submission]').should('be.visible');
});
And('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});

// Scenario: Creator sees that fields are validated on Reference tab
And('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they can see "Required field" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.contains(`${value[0]}`).within(($field) => {
      cy.wrap($field).parent().contains('Mandatory');
    });
  });
});
// | Type |
