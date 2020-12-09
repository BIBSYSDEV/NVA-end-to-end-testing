import { Given, When, Then, And, After } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { JOURNAL_SUBTYPES } from '../../../support/data_testid_constants';

const testFile = 'example.txt';

const subTypes = JOURNAL_SUBTYPES;

Given('that a Creator navigates to the Reference tab', () => {
  cy.login(USER_WITH_AUTHOR).then(() => {
    cy.startRegistrationWithFile(testFile);
  });
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
  cy.get('[data-testid=nav-tabpanel-reference').click({ force: true });
});
And('they select type Publication in Journal', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Journal]').click({ force: true });

  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
});
When('they select {string}', (subType) => {
  cy.get(`[data-testid=${subTypes[subType]}]`).click({ force: true });
  cy.wrap(subType).as('subtype');
});
Then('they see that the Peer Review Details are hidden', () => {
  const subtype = cy.get('@subtype');
  if (subtype === 'Short communication') {
    cy.get('[data-testid=nvi_fail_no_peer_review]').should('be.visible');
  } else {
    cy.get('[data-testid=nvi_fail_no_peer_review]').should('not.exist');
  }
  cy.get('[data-testid=nvi_fail_not_rated]').should('not.exist');
  cy.get('[data-testid=nvi_success]').should('not.exist');
});
// Examples:
//     | Subtype              |
//     | Short communication  |
//     | Editorial            |
//     | Letter to the editor |
//     | Book review          |

After(() => {
  cy.logoutCognito();
});
