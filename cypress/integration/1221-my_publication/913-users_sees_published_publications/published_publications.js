import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('Creator opens the page My Publications', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
});
When('they click Published registrations in the navigation bar', () => {});
Then('they see a list of all published registrations with the fields', () => {});
// | Title      |
// | "<Status>" |
// | Created    |
And('they see each list item has buttons Delete and Edit', () => {});
And('the they see the Edit button is enabled', () => {});
And('the Delete button is enabled for registrations not marked as Deleted', () => {});
And('they see the navigation bar for unpublished registrations is enabled', () => {});
And('they see the navigation bar for published registrations is selected', () => {});

// Examples:
//     | Status    |
//     | Deleted   |
//     | Published |
