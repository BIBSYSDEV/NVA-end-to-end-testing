import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { DESCRIPTION_FIELDS } from '../../../support/data_testid_constants';
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
  const fieldMap = DESCRIPTION_FIELDS;
  cy.testDataTestidList(dataTable, fieldMap).should('be.visible');
});

// | Title                        |
// | Abstract                     |
// | Description                  |
// | Date published               |
// | Primary language for content |
