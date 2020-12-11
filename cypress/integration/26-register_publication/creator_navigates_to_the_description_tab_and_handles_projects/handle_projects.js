import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

const filename = 'example.txt';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(filename);
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});
When('they navigate to the Description tab', () => {
  cy.get('[data-testid=nav-tabpanel-description]').click({ force: true });
});
And('they see a Search box for Projects', () => {
  cy.get('[data-testid=project-search-input]').should('be.visible');
});
And('they enter search term in the Search box', () => {
  cy.get('[data-testid=project-search-input]').type('test');
});
Then('they see list of Projects matching the search term', () => {
  //   cy.get('[class=MuiAutocomplete-option]').as('options');
  //   cy.get('@options').then((options) => {
  //     console.log(options);
  //   });
  // cy.get('[data-testid^=project-option]').should('have.length.above', 0);
  cy.get('[class=MuiAutocomplete-option]').should('have.length.above', 0);
});
And('they see title and associated Institutions for each Project', () => {
  // cy.get('[data-testid^=project-option]').contains('a test battery for assessing pain');
  // cy.get('[data-testid^=project-option]').contains('Høgskulen på Vestlandet');
  cy.get('[class=MuiAutocomplete-option]').contains('a test battery for assessing pain');
  cy.get('[class=MuiAutocomplete-option]').contains('Høgskulen på Vestlandet');
});

Given('Creator has searched for a Project', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(filename);
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
  cy.get('[data-testid=nav-tabpanel-description]').click({ force: true });
});
And('they see Search results', () => {
  cy.get('[data-testid=project-search-input]').type('test');
});
When('they select a Project from the Search results', () => {
  cy.get('[class=MuiAutocomplete-option]').contains('a test battery for assessing pain').click({ force: true });
});
Then('the selected Project is added to the list of selected Projects', () => {
  cy.get('[data-testid=project-chip]').should('have.length', 1);
  cy.get('[data-testid=project-chip]').contains('a test battery for assessing pain');
});

Given('Creator has added a Project', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(filename);
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
  cy.get('[data-testid=nav-tabpanel-description]').click({ force: true });
  cy.get('[data-testid=project-search-input]').type('test');
  cy.get('[class=MuiAutocomplete-option]').contains('a test battery for assessing pain').click({ force: true });
});
When('they click the Remove Project icon', () => {
  cy.get('[data-testid=project-chip]').get('[class="MuiSvgIcon-root MuiChip-deleteIcon"]').click({ force: true });
});
Then('they see the Project is removed from the list of selected Projects', () => {
  cy.get('[data-testid=project-chip]').should('not.exist');
});
