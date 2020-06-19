import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import { v4 as uuidv4 } from 'uuid';

const USER_NAME = 'testUser@unit.no';

Before(() => {
  cy.addUser(USER_NAME)
    .then((authResult) => {
      cy.wrap(authResult).as('authResult');
    })
    .catch((err) => console.log(err));
});

Given('that the user is not logged in', () => {
  cy.visit('/');
  cy.get('[data-testid=menu-login-button]').should('be.visible');
});

When('they look at any page in NVA', () => {
  const uuid = uuidv4();
  cy.visit(`/${uuid}`);
});

Then('they see the Log in button', () => {
  cy.get('[data-testid=menu-login-button]').should('be.visible');
});
