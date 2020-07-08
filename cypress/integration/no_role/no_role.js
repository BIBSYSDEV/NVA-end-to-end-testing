import { Given, When, Then, Before, After, And } from 'cypress-cucumber-preprocessor/steps';

const USER_NAME = 'test@test.no';
const NO_ROLE = '';

Before(() => {
  cy.deleteUser(USER_NAME).then(() => {
    cy.addUser(USER_NAME, NO_ROLE).then((userId) => {
      cy.wrap(userId).as('userId');
      cy.visit('/');

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
And('they have no NVA role', () => {});

When('they look at any page in NVA', () => {
  cy.visit('/');
});

Then('they see a menu containing', (tableData) => {
  //   | My Profile |
  //   | Log Out    |

  cy.checkMenu(tableData.rawTable);
});

After(() => {
  cy.deleteUser(USER_NAME);
});
