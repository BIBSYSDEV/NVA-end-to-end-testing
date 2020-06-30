import { Given, When, Before, After } from 'cypress-cucumber-preprocessor/steps';

const USER_NAME = 'test@unit.no';

Before(() => {
  cy.deleteUser(USER_NAME).then(() => {
    cy.addUser(USER_NAME).then((userId) => {
      cy.wrap(userId).as('userId');
      cy.visit('/');
      cy.wait(5000);
    });
  });
});

Given('A user have logged in using Cognito', () => {
  cy.get('@userId');
});

When('the user navigates to the front page', () => {
  cy.get('@userId').then(() => {
    cy.visit('/');
  });
});

Then('the user sees that they are logged in', () => {
  cy.get('[data-testid=menu]').within(($menu) => {
    cy.get('p').should('have.text', 'Test User');
  });
});

Given('that the user logs in with Feide for the first time', () => {
  cy.get('@userId').then(() => {
    cy.visit('/');
  });
});

When('they click OK in the Connect Author dialog', () => {
  cy.get('[data-testid=create-author-button]').click();
});

Then('the Connect Author dialog closes', () => {
  cy.get('[data-testid=create-author-button').should('not.be.visible');
  cy.get('[data-testid=modal_next]').click();
});

Then('they see the Connect Orcid dialog', () => {
  cy.get('[data-testid=connect-to-orcid]').should('be.visible');
});

After(() => {
  cy.deleteUser(USER_NAME);
});
