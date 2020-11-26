import { Given, When, Then, And, After } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

const testFile = 'example.txt';

const subTypes = {
  'Short communication': 'publication-instance-type-JournalShortCommunication',
  Editorial: 'publication-instance-type-JournalLeader',
  'Letter to the editor': 'publication-instance-type-JournalLetter',
  'Book review': 'publication-instance-type-JournalReview',
};

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
});
Then('they see that the Peer Review Details are hidden', () => {
  cy.get('[data-testid=nvi_fail_no_peer_review]').should('be.visible');
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
