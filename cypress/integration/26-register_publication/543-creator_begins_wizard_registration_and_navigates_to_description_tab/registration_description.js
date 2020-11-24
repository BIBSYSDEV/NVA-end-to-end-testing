import { Given, When, Before } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';
import 'cypress-file-upload';

const testFile = 'example.txt';

// Start common steps for
// Scenario: Creator begins Wizard registration and navigates to Description tab
// and
// Scenario: Creator sees that fields are validated on Description tab

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR).then(() => {
    cy.startRegistrationWithFile(testFile);
  });
});
When('they navigate to the Description tab', () => {
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});

// End common steps

// Scenario: Creator begins Wizard registration and navigates to Description tab
Then('they see the Description tab is selected', () => {
  cy.get('[data-testid=nav-tabpanel-description][aria-selected=true]');
});
And('they see fields:', (dataTable) => {
  const fieldMap = {
    Title: 'Title',
    Abstract: 'Abstract',
    Description: 'Description',
    'NPI disciplines': 'Scientific field in Norwegian publication indicator',
    Keywords: 'Keywords',
    'Primary language for content': 'Primary language for content',
    'Project association': 'Project association',
  };
  dataTable.rawTable.forEach((value) => {
    cy.contains(`${fieldMap[value[0]]}`);
  });
});
//   | Title                        |
//   | Abstract                     |
//   | Description                  |
//   | Date published               |
//   | NPI disciplines              |
//   | Keywords                     |
//   | Primary language for content |
//   | Project association          |
And('they see the tab Reference is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-reference]').should('be.visible');
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

// Scenario: Creator sees that fields are validated on Description tab
And('they click the Save button', () => {
  cy.get('[data-testid=registration-title-input]').focus();
  cy.get('[data-testid=registration-title-input]').blur();
  // TODO works in dev, not in sandbox atm
  //   cy.get('[data-testid=button-save-publication]').click({ force: true });
});

Then('they can see "Required field" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.contains(`${value[0]}`).within(($field) => {
      cy.wrap($field).parent().contains('Required field');
    });
  });
});
// | Title |
