import { Given, When, Then, Before, After } from 'cypress-cucumber-preprocessor/steps';

const USER_NAME = 'test@unit.no';
const APP_ADMIN_ROLE = 'App-admin';

Before(() => {
  cy.deleteUser(USER_NAME).then(() => {
    cy.addUser(USER_NAME, APP_ADMIN_ROLE).then((userId) => {
      cy.wrap(userId).as('userId');
      cy.visit('/');
      cy.wait(5000);

      cy.get('[data-testid=create-author-button]').click();
      cy.get('[data-testid=modal_next]').click();
      cy.get('[data-testid=skip-connect-to-orcid]').click();

      cy.setLanguage();
      cy.visit('/');
    });
  });
});

Given('that the user is logged in', () => {
  cy.get('@userId');
});
Given('they have the role of Application administrator', () => {});

When('they look at any page in NVA', () => {
  cy.visit('/');
});

Then('they see a menu containing', (tableData) => {
  // | My Profile   |
  // | Institutions |
  // | Log Out      |
  cy.get('[data-testid=menu]').click();
  tableData.rawTable.forEach((row) => {
    const menuItem = row[0];
    cy.get('li').should('contain.text', menuItem);
  });
});

After(() => {
  cy.deleteUser(USER_NAME);
});
