// Feature: Channel claims
import { Before, BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userEditor, userThirdEditor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

const editChannelClaims = () => {
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publisherClaimButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.wait(3000);
};

const claimChannel = (searchString: string, channelName: string) => {
  cy.getDataTestId(dataTestId.editor.addChannelClaimButton).click();
  cy.getDataTestId(dataTestId.editor.channelSearchField).type(searchString);
  cy.contains(channelName).last().click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
};

BeforeAll(() => {
  cy.login(userThirdEditor);
  editChannelClaims();
  cy.get('body').then(($body) => {
    console.log($body.find('Sikt – Kunnskapssektorens tjenesteleverandør'));
    if ($body.find('Sikt – Kunnskapssektorens tjenesteleverandør').length === 0) {
      claimChannel('Sikt', 'Sikt – Kunnskapssektorens tjenesteleverandør');
      cy.getSuccess();
      cy.getSuccessDone();
    }
  });
});

Before(() => {
  //   cy.login(userEditor);
});

//   Scenario: Owned channel cannot be claimed
When('a channel is owned by institution A', () => {});
Then('the channel cannot be claimed by insitution B', () => {
  editChannelClaims();
  //   claimChannel('Sikt');
  //   cy.get('Mui-alert').within(() => cy.contains('Channel already claimed'));
});

//   Scenario: Editor can claim a channel for their institution
When('an Editor claims a channel', () => {});
Then('the channel is owned by the Editors institution', () => {});

//   Scenario: Editor can abandon claim of a channel for their institution
When('an Editor at institution A claims a channel', () => {});
Then('an Editor at institution A can abandon the channel claim', () => {});

//   Scenario: Editor cannot abandon claim of a channel owned by another institution
When('an Editor at institution A claims a channel', () => {});
Then('an Editor at institution B cannot abandon the channel claim', () => {});

//   Scenario: Non-editor cannot claim a channel
Given('a user is not Editor', () => {});
When('they inspect an unclaimed channel', () => {});
Then('they cannot claim it', () => {});

//   Scenario: Non-editor cannot abandon claim of a channel
Given('a user is not Editor', () => {});
When('they inspect a claimed channel', () => {});
Then('they cannot abandon the claim', () => {});

//   Scenario: View all channel claims
When('requesting all channel claims', () => {});
Then('all channel claims are returned', () => {});

//   Scenario: Filter channel claims by institution
When('requesting all channel claims, with a filter by institution', () => {});
Then('all channels claimed by that institution are returned', () => {});
