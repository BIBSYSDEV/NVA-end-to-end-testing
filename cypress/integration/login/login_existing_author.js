import { Given, And, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR, NAME_WITH_AUTHOR } from '../../support/constants';

Before(() => {
  cy.deleteUser(USER_WITH_AUTHOR).then(() => {
    cy.addUser(USER_WITH_AUTHOR, NAME_WITH_AUTHOR).then((idToken) => {
      cy.wrap(idToken).as('idToken');
      cy.get('@idToken').then((idToken) => {
        const newAuthority = { firstName: NAME_WITH_AUTHOR.split(' ')[0], lastName: NAME_WITH_AUTHOR.split(' ')[1], feideid: USER_WITH_AUTHOR };
        cy.getAuthorities(newAuthority, idToken).then((authorities) => {
          console.log(authorities);
          if (authorities?.length === 0) {
            cy.createAuthority(newAuthority, idToken).then((authority) => {
              cy.wrap(authority).as('authority');
            });
          }
        });
        cy.visit('/');
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
