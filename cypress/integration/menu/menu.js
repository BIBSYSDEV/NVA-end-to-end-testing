import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import { v4 as uuidv4 } from 'uuid';

const USER_NAME = 'testUser@unit.no';

Before(() => {
  cy.addUser(USER_NAME).then((authResult) => {
    cy.wrap(authResult).as('authResult');
  });
});

Given('that the user is not logged in', () => {
  cy.get('@authResult').then((authResult) => {
    const auth = `Bearer ${authResult.AccessToken}`;
    cy.visit({
      url: '/',
      headers: {
        Authorization: auth,
      },
    });
    cy.get('[data-testid=menu-login-button]').should('be.visible');
  });
});

When('they look at any page in NVA', () => {
  cy.get('@authResult').then((authResult) => {
    const uuid = uuidv4();
    const auth = `Bearer ${authResult.AccessToken}`;
    cy.visit({
      url: `/${uuid}`,
      headers: {
        Authorization: auth,
      },
    });
  });
});
Then('they see the Log in button', () => {
  cy.get('[data-testid=menu-login-button]').should('be.visible');
});
