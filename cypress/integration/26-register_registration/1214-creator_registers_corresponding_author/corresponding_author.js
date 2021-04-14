import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

const testFile = 'example.txt';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR).then(() => {
    cy.startRegistrationWithFile(testFile);
  });
});
And('they navigate to the Contributors tab', () => {
  cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
  cy.get('[data-testid=nav-tabpanel-contributors').click({ force: true });
});
And('they see an Author', () => {
  cy.get('[data-testid=nav-tabpanel-contributors').click({ force: true });
  cy.get('[data-testid=add-contributor]').click({ force: true });
  cy.get('[data-testid=search-input]').type('Testuser Withauthor{enter}');
  cy.get('[data-testid=author-radio-button]').click({ force: true });
  cy.get('[data-testid=connect-author-button]').click({ force: true });
});
When('they check the Corresponding checkbox', () => {
  cy.get('[data-testid=author-corresponding-checkbox]').click({ force: true });
});
Then('they see the Corresponding Author checkbox is checked', () => {
  cy.get('[data-testid=author-corresponding-checkbox]').within((checkbox) => {
    cy.wrap(checkbox).get('input').should('be.checked');
  });
});
