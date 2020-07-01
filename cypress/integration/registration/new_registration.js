import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';

const USER_NAME = 'test@unit.no';

Before(() => {
  cy.deleteUser(USER_NAME).then(() => {
    cy.addUser(USER_NAME).then((userId) => {
      cy.wrap(userId).as('userId');
      cy.visit('/');
      cy.wait(5000);
      cy.get('[data-testid=create-author-button]').click();
      cy.get('[data-testid=modal_next]').click();
      cy.get('[data-testid=skip-connect-to-orcid]').click();
    });
  });
});

Given('that the user is logged in as Creator', () => {});

When('they click the menu item New Registration', () => {});

Then('they see the New Registration page', () => {});

Then('they see options:', (dataTable) => {
  console.log(dataTable);
});
//   | Upload file            |
//   | Link                   |
//   | Suggestions from ORCID |
