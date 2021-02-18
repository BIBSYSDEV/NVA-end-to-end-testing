import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {
  USER_CONNECT_ORCID,
  USER_NO_ARP,
  USER_NO_NAME_IN_ARP,
  USER_NO_ORCID,
  USER_WITH_AUTHOR,
} from '../../../support/constants';

Given('that the user logs in with their Feide ID', () => {});

// @217
// Scenario: User without their Feide ID in ARP logs in
And('they do not have their Feide ID in any ARP entry', () => {
  cy.login(USER_NO_NAME_IN_ARP);
});
Then(
  'they see a list containing "Name", "Last registration" and "Institutions" for each ARP entry matching their name',
  () => {
    cy.get('[data-testid=connect-author-modal]').within((orcidModal) => {
      cy.get(orcidModal).contains('Name');
      cy.get(orcidModal).contains('Last registration');
      cy.get(orcidModal).contains('Organizations');
    });
  }
);
And('they see a Create New Author Button', () => {
  cy.get('[data-testid=button-create-authority]').should('be.visible');
});
And('they see a Support button', () => {
  // TODO Support button not implemented
});

// @1206
// Scenario: User with their Feide ID in ARP logs in
And('their Feide ID is in an ARP entry', () => {
  cy.login(USER_WITH_AUTHOR);
});
Then('they can see their name in the menu', () => {
  cy.get('[data-testid=menu]').contains('Withauthor TestUser');
});

// Common steps for @384 and @219
And('their Feide ID is added to their Author identity', () => {
  cy.get('@authority').its('feideids').should('have.length', 1);
});
And('their Organization ID \\(Cristin ID) is added to their Author identity', () => {
  cy.get('@authority').its('orgunitids').should('have.length', 1);
});

// @384
// Scenario: User creates a new Author identity
And('they do not have their Feide ID in any ARP entry', () => {});
Then('they see proposed name for a new Author identity based on data from their Feide account', () => {
  cy.login(USER_NO_NAME_IN_ARP);
  cy.get('[data-testid=connect-author-modal]').contains('TestUser, No name in ARP');
});
When('they click Create Author identity button', () => {
  cy.get('[data-testid=button-create-authority]').click({ force: true });
});
Then('this new Author identity is added to ARP', () => {});
And('they can see confirmation message that they have connected an Author identity', () => {
  cy.get('[data-testid=connect-author-modal]').contains('Your author identity is connected');
});

// @219
// Scenario: User updates an Author identity
And('they do not have their Feide ID in any ARP entry', () => {});
And(
  'they see a list containing "Name", "Last registration" and "Institutions" for each ARP entry matching their name',
  () => {
    cy.login(USER_NO_ARP);
    cy.get('[data-testid=connect-author-modal]').within((connectAuthor) => {
      cy.wrap(connectAuthor).contains('Name');
      cy.wrap(connectAuthor).contains('Last registration');
      cy.wrap(connectAuthor).contains('Organizations');
    });
  }
);
When('they select an Author identity', () => {
  cy.get('[data-testid=connect-author-modal]').get('[data-testid^=author-radio-button]').first().click({ force: true });
});
And('they click Connect Author identity', () => {
  cy.get('[data-testid=connect-author-button]').should('be.enabled');
  cy.get('[data-testid=connect-author-button]').click({ force: true });
  cy.get('[data-testid=modal_next]').should('be.visible'); // Wait until next modal is visible to avoid race condition
  cy.window().its('store').invoke('getState').its('user').its('authority').as('authority');
});
And('they can see confirmation message that they have connected an Author identity', () => {
  cy.get('[data-testid=connect-author-modal]').contains('Your author identity is connected');
});

// @222
// Scenario: User adds an ORCID to their Author identity
Given('that the user has just connected to an Author identity', () => {
  cy.login(USER_CONNECT_ORCID);
  cy.get('[data-testid=author-radio-button]')
    .filter(':contains("TestUser, Connect ORCID")')
    .get('input[type=radio]')
    .click({ force: true });
  cy.get('[data-testid=connect-author-button]').click({ force: true });
});
And('they can see confirmation message that they have connected an Author identity', () => {
  cy.get('h3').filter(':contains("Your author identity is connected")');
});
And('their Author identity do not have any connection to ORCID', () => {});
When('they click the Next button', () => {
  cy.get('[data-testid=modal_next]').click({ force: true });
});
Then('they see a dialog for connecting ORCID', () => {
  cy.get('[data-testid=open-orcid-modal]').should('be.visible');
});
When('they click Create or add ORCID', () => {
  cy.intercept('https://sandbox.orcid.org', 'success!');
});
And('they are redirected to ORCID for login', () => {});
And('they log into ORCID', () => {});
And('they accept that NVA uses their data', () => {});
Then('they are redirected back to NVA', () => {});
And('their ORCID is added to their Author identity', () => {
  cy.addMockOrcid();
});
And('they see their ORCID on My Profile', () => {
  cy.get('body').click(0, 0);
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
  cy.contains('test_orcid');
});
