import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('that the user is logged in as Creator', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
  });
});
And('is on the page My Publications', () => {
  cy.get('[data-testid=my-publications]').click({ force: true });
});
When('they click Edit on an item', () => {
  cy.get('[data-testid^=edit-publication]').click({ force: true });
});
Then('they see the item is opened in the Wizard', () => {});
And('they see the Description tab', () => {
  cy.get('[data-testid=nav-tabpanel-description');
});
And('they see fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`form`).within(($input) => {
      cy.get('span').contains(value[0]);
    });
  });
});

// | Title                        |
// | Alternative title(s)         |
// | Abstract                     |
// | Alternative abstract(s)      |
// | Description                  |
// | Date published               |
// | Primary language for content |
