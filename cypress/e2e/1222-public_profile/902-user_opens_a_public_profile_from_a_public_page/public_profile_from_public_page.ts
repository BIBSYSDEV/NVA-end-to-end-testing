import { CategoryTypes, userName, userUnitWithAuthor } from '../../../support/constants';
import { createPublicationUsingAPI, NviLevels } from '../../../support/create_registration';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';

const fileName = 'example.txt';
const title = `Published registration ${uuid()}`;

Given('the Creator publishes Publication', () => {
  cy.login(userUnitWithAuthor).then(() => {
    createPublicationUsingAPI(
      title,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_0
    ).then(() => {});
  });
});
When('they click a Contributor', () => {
  cy.searchFor(title);
  cy.get(`[data-testid^=${dataTestId.registrationLandingPage.authorLink('')}]`)
    .first()
    .click({ force: true });
});
Then("they see the Contributor's public profile page", () => {
  cy.location('pathname').should('contain', '/research-profile');
  cy.contains('Withauthor TestUser');
});
