import { Given, And, When, Then, Before, After } from 'cypress-cucumber-preprocessor/steps';
import { NAME_WITH_AUTHOR, USER_WITH_AUTHOR } from '../../support/constants';
import { createUser, formatName } from '../../support/users';

Before(() => {
  createUser(USER_WITH_AUTHOR, NAME_WITH_AUTHOR, true, USER_WITH_AUTHOR);
});

Given('that a User has a valid Feide ID and password', () => {
  cy.get('@idToken');
});
And('they do not have a Feide ID in their ARP entry', () => {});
And('there are entries in ARP', () => {});
// | User, Test |
When('they log in', () => {
});
Then(
  'they see a list containing <Author name> and <Last publication> for each ARP entry matching their <Name>',
  () => {
    cy.get('[data-testid=author-radio-button]').should('contain.text', formatName(NAME_WITH_AUTHOR));
  });
And('a Create New Author Button', () => {
  cy.get('button').should('contain.text', 'Opprett meg som forfatter');
});

After(() => {
  cy.get('[data-testid=menu').click();
  cy.deleteUser(NAME_WITH_AUTHOR);
});