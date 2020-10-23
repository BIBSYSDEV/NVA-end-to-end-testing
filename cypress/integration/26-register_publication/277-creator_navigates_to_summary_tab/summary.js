import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';
import 'cypress-file-upload';

const testFile = 'example.txt';

// common steps

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
    cy.get('[data-testid=new-publication]').click({ force: true });
    cy.get('[data-testid=new-publication-file]').click({ force: true });
    cy.get('input[type=file]').attachFile(testFile);
    cy.get('[data-testid=publication-file-start-button]').click({ force: true });
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
  cy.get('[data-testid=button-save-publication]').should('be.enabled');
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

// Scenario: Creator navigates to Summary tab with validation errors
And('there are validation errors', () => {});

Then('they see Error box for Validation errors', () => {
  cy.get('[data-testid=error-summary-card]');
});
And('they see Publish is disabled', () => {
  cy.get('[data-testid=button-publish-publication]').should('be.disabled');
});

// Scenario: Creator navigates to Summary tab without validation errors
And('there are no validation errors', () => {
  // Description
  cy.get('[data-testid=nav-tabpanel-description').click({ force: true });
  cy.get('[data-testid=publication-title-input]').type('Title');

  // Reference
  cy.get('[data-testid=nav-tabpanel-reference').click({ force: true });

  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });

  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });

  cy.get('[data-testid=autosearch-publisher]').click({ force: true }).type('Norges');
  cy.contains('Norges forskningsråd').click({ force: true });

  // Contributors
  cy.get('[data-testid=nav-tabpanel-contributors').click({ force: true });
  cy.get('[data-testid=add-contributor]').click({ force: true });
  cy.get('[data-testid=search-input]').type('Testuser Withauthor{enter}');
  cy.get('[data-testid=author-radio-button]').click({ force: true });
  cy.get('[data-testid=connect-author-button]').click({ force: true });

  // Files and reference
  cy.get('[data-testid=nav-tabpanel-files-and-license').click({ force: true });
  cy.get('[data-testid=uploaded-file-select-license]').click({ force: true }).type(' ');
  cy.get('[data-testid=license-item]').first().click({ force: true });
});

And('they see Publish is enabled', () => {
  cy.get('[data-testid=button-publish-publication]').should('be.enabled');
});
