// Feature: My page navigation from the header

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, userName, userUnitMyPage, userUnitMyPageNotification } from '../../../support/constants';
import {
  createPublicationUsingAPI,
  NviLevels,
  RegistrationData,
  requestDoi,
} from '../../../support/create_registration';
import { dataTestId } from '../../../support/dataTestIds';

BeforeAll(() => {
  cy.login(userUnitMyPage).then(() => {
    createPublicationUsingAPI(
      'Publication for My Page',
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitMyPage],
      NviLevels.LEVEL_1
    );
  });

  cy.login(userUnitMyPageNotification).then(() => {
    createPublicationUsingAPI(
      'Publication for My Page with Notification',
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitMyPageNotification],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      requestDoi((builder as RegistrationData).identifier);
    });
  });
});

// Scenario: User without unread dialogue notifications lands on their research profile
Given('a logged-in user with no unread dialogue notifications', () => {
  cy.login(userUnitMyPage);
});
When('the user clicks "My page" in the header', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
});
Then('they are taken to their research profile', () => {
  cy.location('pathname').should('eq', `/my-page/profile/research-profile`);
});

// Scenario: User with unread dialogue notifications lands on Dialogue
Given('a logged-in user with at least one unread dialogue notification', () => {
  cy.login(userUnitMyPageNotification);
  cy.wait(1000);
});
// When ('the user clicks "My page" in the header', () => {});
Then('they are taken to the Dialogue page', () => {
  cy.location('pathname').should('eq', `/my-page/messages/my-messages`);
});
Then('the message list shows only unread messages', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
});
