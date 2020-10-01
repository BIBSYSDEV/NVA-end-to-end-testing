import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { v4 as uuidv4 } from 'uuid';
import 'cypress-localstorage-commands';

Given('that the user is logged in', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
  });
});
And('they have the role of Creator', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidv4()}`);
});
Then('they see a menu containing', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get('[data-testid=menu]').click({ force: true });
    cy.get('ul[role=menu]').within(() => {
      cy.get('li[role=menuitem]').contains(value[0]);
    });
  });
});
// | My Profile       |
// | New Registration |
// | My Publications  |
// | Log Out          |
And('they see the buttons', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid]`).contains(value[0]);
  });
});
// | New publication |
// | My publications |
