// Feature: Channel claims
import { Before, BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userEditorSintef, userThirdEditor, userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

const editChannelClaims = () => {
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publisherClaimButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.wait(1000);
};

const claimChannel = (searchString: string) => {
  cy.getDataTestId(dataTestId.editor.addChannelClaimButton).click();
  cy.getDataTestId(dataTestId.editor.channelSearchField).type(searchString);
  cy.get('[data-option-index=0]').click();
  // cy.contains(channelName).last().click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
};

const removeChannel = (channelName: string) => {
  cy.get('table').within(() => {
    cy.get('tr')
      .filter(`:contains(${channelName})`)
      .within(() => {
        cy.get('[data-testid^=delete-channel-claim]').first().click();
      });
  });
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.getSuccessDone();
};

const filterAllClaims = () => {
  cy.getDataTestId(dataTestId.editor.channelClaimFilterSelect).click();
  cy.get('[data-value=showAll]').click();
};

const filterOwnClaims = () => {
  cy.getDataTestId(dataTestId.editor.channelClaimFilterSelect).click();
  cy.get('[data-value=showOwn]').click();
};

BeforeAll(() => {
  cy.login(userThirdEditor);
  editChannelClaims();
  cy.get('.MuiSkeleton-root').should('not.exist');
  cy.get('body').then(($body) => {
    if (!$body.text().includes('Sikt – Kunnskapssektorens tjenesteleverandør')) {
      claimChannel('Sikt');
    }
  });
  cy.login(userEditorSintef);
  editChannelClaims();
  cy.get('table').then(($body) => {
    if ($body.text().includes('SINTEF AS')) {
      removeChannel('SINTEF AS');
    }
    if ($body.text().includes('SINTEF Community')) {
      removeChannel('SINTEF Community');
    }
  });
});

Before(() => {
  cy.login(userEditorSintef);
});

//   Scenario: Owned channel cannot be claimed
When('a channel is owned by institution A', () => {});
Then('the channel cannot be claimed by insitution B', () => {
  editChannelClaims();
  claimChannel('Sikt');
  cy.on('uncaught:exception', (err, runnable) => {
    console.log('Exception!');
    return false;
  });
  cy.getDataTestId('snackbar-error').within(() => cy.contains('Channel is already claimed'));
});

//   Scenario: Editor can claim a channel for their institution
When('an Editor claims a channel', () => {
  editChannelClaims();
  claimChannel('SINTEF AS');
});
Then('the channel is owned by the Editors institution', () => {
  filterOwnClaims();
  cy.get('tr').filter(':contains("SINTEF AS")');
});

//   Scenario: Editor can abandon claim of a channel for their institution
When('an Editor at institution A claims a channel', () => {
  editChannelClaims();
  cy.get('body').then(($body) => {
    if (!$body.text().includes('SINTEF Community')) {
      claimChannel('SINTEF Community');
    }
  });
});
Then('an Editor at institution A can abandon the channel claim', () => {
  cy.get('tr')
    .filter(':contains("SINTEF Community")')
    .within(() => {
      cy.get('[data-testid^=delete-channel-claim]');
    });
});

//   Scenario: Editor cannot abandon claim of a channel owned by another institution
Then('an Editor at institution B cannot abandon the channel claim', () => {
  cy.login(userThirdEditor);
  editChannelClaims();
  cy.get('tr')
    .filter(':contains("SINTEF Community")')
    .within(() => {
      cy.get('[data-testid^=delete-channel-claim]').should('not.exist');
    });
});

//   Scenario: Non-editor cannot claim a channel
When('they inspect an unclaimed channel', () => {});
Then('they cannot claim it', () => {});

//   Scenario: Non-editor cannot abandon claim of a channel
Given('a user is not Editor', () => {
  cy.login(userWithAuthor);
});
When('they inspect a claimed channel', () => {
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.publisherClaimOverviewButton).click();
});
Then('they cannot abandon the claim', () => {
  cy.get('tr')
    .filter(`:contains("Sikt – Kunnskapssektorens tjenesteleverandør")`)
    .within(() => {
      cy.get('[data-testid^=delete-channel-claim]').should('not.exist');
    });
});

//   Scenario: View all channel claims
When('requesting all channel claims', () => {
  editChannelClaims();
  filterAllClaims();
});
Then('all channel claims are returned', () => {
  cy.get('tr').should('have.length.above', 2);
});

//   Scenario: Filter channel claims by institution
When('requesting all channel claims, with a filter by institution', () => {
  editChannelClaims();
  filterOwnClaims();
});
Then('all channels claimed by that institution are returned', () => {
  cy.get('tr').filter(':contains("SINTEF")').should('have.length', 2);
});
