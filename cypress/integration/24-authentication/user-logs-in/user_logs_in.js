import {
  userConnectOrcid,
  userNoArp,
  userNoNameInArp,
  userWithAuthor,
  userNameInArp,
  userConnectAuthor,
} from '../../../support/constants';
import { Before } from 'cypress-cucumber-preprocessor/steps';
import { dataTestId } from '../../../support/dataTestIds';

Before({ tags: '@217' }, () => {
  cy.wrap(userNoArp).as('user');
});

Before({ tags: '@219' }, () => {
  cy.wrap(userNameInArp).as('user');
});

Before({ tags: '@222' }, () => {
  cy.wrap(userConnectOrcid).as('user');
});

Before({ tags: '@384' }, () => {
  cy.wrap(userNoNameInArp).as('user');
});

Before({ tags: '@1206' }, () => {
  cy.wrap(userWithAuthor).as('user');
});

Given('that the user logs in with their Feide ID', () => {
  cy.get('@user').then((user) => {
    cy.login(user);
  });
});

// Common steps for @217 and @219
Then(
  'they see a list containing "Name", "Last registration" and "Institutions" for each ARP entry matching their name',
  () => {
    cy.get('[data-testid=author-name-column]');
    cy.get('[data-testid=author-last-registration-column]');
    cy.get('[data-testid=author-organizations-column]');
  }
);

// @217
// Scenario: User without their Feide ID in ARP logs in
And('they do not have their Feide ID in any ARP entry', () => {});
And('they see a Create New Author Button', () => {
  cy.get('[data-testid=button-create-authority]').should('be.visible');
});
And('they see a Support button', () => {
  // TODO Support button not implemented
});

// @1206
// Scenario: User with their Feide ID in ARP logs in
And('their Feide ID is in an ARP entry', () => {});
Then('they can see their name in the menu', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).contains('Withauthor TestUser');
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
  cy.get('[data-testid=connect-author-modal]').contains('No name in ARP');
});
When('they click Create Author identity button', () => {
  cy.get('[data-testid=create-author-button]').click({ force: true });
  cy.get('[data-testid=modal_next]').should('be.visible'); // Wait until next modal is visible to avoid race condition
  cy.window().its('store').invoke('getState').its('user').its('authority').as('authority');
});
Then('this new Author identity is added to ARP', () => {});
And('they can see confirmation message that they have connected an Author identity', () => {
  cy.get('[data-testid=connect-author-modal]').get('[data-testid=connected-authority-heading]').should('be.visible');
});

// @219
// Scenario: User updates an Author identity
And('they do not have their Feide ID in any ARP entry', () => {});
When('they select an Author identity', () => {
  cy.get('[data-testid=connect-author-modal]')
    .get('[data-testid^=author-radio-button]')
    .filter(':contains("TestUser, Name in ARP")')
    .click({ force: true });
});
And('they click Connect Author identity', () => {
  cy.get('[data-testid=connect-author-button]').should('be.enabled');
  cy.get('[data-testid=connect-author-button]').click({ force: true });
  cy.get('[data-testid=modal_next]').should('be.visible'); // Wait until next modal is visible to avoid race condition
  cy.window().its('store').invoke('getState').its('user').its('authority').as('authority');
});
And('they can see confirmation message that they have connected an Author identity', () => {
  cy.get('[data-testid=connect-author-modal]').get('[data-testid=connected-authority-heading]').should('be.visible');
});

// @222
// Scenario: User adds an ORCID to their Author identity
Given('that the user has just connected to an Author identity', () => {
  cy.get('@user').then((user) => {
    cy.login(user);
  });
  cy.get('[data-testid=author-radio-button]')
    .filter(':contains("TestUser, Connect ORCID")')
    .get('input[type=radio]')
    .first()
    .click({ force: true });
  cy.get('[data-testid=connect-author-button]').click({ force: true });
});
And('they can see confirmation message that they have connected an Author identity', () => {
  cy.get('[data-testid=connected-authority-heading]').should('be.visible');
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
  cy.addMockOrcid(userConnectOrcid);
});
And('they see their ORCID on My Profile', () => {
  cy.get('[data-testid=close-modal]').click({ force: true });
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.header.myProfileLink}]`).click({ force: true });
  cy.get('[data-testid=orcid-line]').contains('test_orcid');
});

// @1205
// Scenario: User connects Author
Given('that the user logs in with Feide for the first time', () => {
  cy.login(userConnectAuthor);
});
When('they click OK in the Connect Author dialog', () => {
  cy.get('[data-testid=connect-authority-heading]').should('be.visible');
  cy.get('[data-testid=create-author-button]').click();
});
Then('the Connect Author dialog closes', () => {});
And('they see a confirmation dialog', () => {
  cy.get('[data-testid=connected-authority-heading]').should('be.visible');
});

// @353
// Scenario: A user logs out
Given('that the user is already logged in', () => {
  cy.login(userWithAuthor);
});
When('they click on the Menu', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
});
And('they click Log out', () => {
  cy.get(`[data-testid=${dataTestId.header.logOutLink}]`).should('be.visible');
  cy.window().its('store').invoke('dispatch', {
    type: 'logout success',
  });
});
Then('they are logged out of the NVA application', () => {
  cy.get(`[data-testid=${dataTestId.header.logInButton}]`).should('be.visible');
});
