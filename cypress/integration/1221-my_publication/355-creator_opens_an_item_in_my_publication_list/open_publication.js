import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('that the user is logged in as Creator', () => {
  cy.login(USER_WITH_AUTHOR);
});
And('is on the page My Publications', () => {
  cy.get('[data-testid=my-registrations]').click({ force: true });
});
When('they click Edit on an item', () => {
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
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
// | Abstract                     |
// | Description                  |
// | Date published               |
// | Primary language for content |
