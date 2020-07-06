import { Given, And, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import { getIdToken } from '../../support/authorityApi';

const USER_NAME = 'test@unit.no';

Before(() => {
  cy.deleteUser(USER_NAME).then(() => {
    cy.addUser(USER_NAME).then((userId) => {
      cy.wrap(userId).as('userId');
      console.log(getIdToken());
      cy.createAuthority().then((authority) => {
        cy.wrap(authority).as('authority');
        cy.visit('/');
        cy.wait(5000);
      });
    });
  });
});

Given('that a User has a valid Feide ID and password', () => {});
And('they do not have a Feide ID in their ARP entry', () => {});
And('there are entries in ARP', () => {});
// | User, Test |
When('they log in', () => {});
Then(
  'they see a list containing <Author name> and <Last publication> for each ARP entry matching their <Name>',
  () => {}
);
And('a Create New Author Button', () => {});
