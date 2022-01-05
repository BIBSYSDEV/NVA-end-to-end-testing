import { v4 as uuidv4 } from 'uuid';

Given('that the user is not logged in', () => {
  cy.visit('/');
});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see the Log in button', () => {
  cy.get('[data-testid=log-in-link').should('be.visible');
});
