import { Given, And, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import { USER_NAME } from '../../support/constants';

Before(() => {
  cy.deleteUser(USER_NAME).then(() => {
    cy.addUser(USER_NAME).then((idToken) => {
      cy.wrap(idToken).as('idToken');
      cy.get('@idToken').then((idToken) => {
        const newAuthority = { firstName: 'Test-end-to-end', lastName: 'User-end-to-end', feideid: 'test@unit.no' };
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
