import { CategoryTypes, userName, userUnitWithAuthor } from '../../../support/constants';
import {
  createDraftPublicationUsingAPI,
  createPublicationUsingAPI,
  NviLevels,
  RegistrationData,
} from '../../../support/create_registration';
import { dataTestId } from '../../../support/dataTestIds';
import { profilePageFields } from '../../../support/data_testid_constants';
import { Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';

const today = new Date();
const yesterday = today.getDate() - 1;
const lastYear = today.getFullYear() - 1;
const monthChange = today.getDate() === 1 ? today.getDate() - 1 : 1;
const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
const nextMonth = today.getMonth() === 11 ? 0 : today.getMonth() + 1;

const titleToday = `Publication for My Profile Page - ${today.toISOString().split('T')[0]} ${uuid()}`;
const titleYesterday = `Publication for My Profile Page - ${new Date(today.setDate(yesterday)).toISOString().split('T')[0]} ${uuid()}`;
const titleLastYear = `Publication for My Profile Page - ${new Date(today.setFullYear(lastYear)).toISOString().split('T')[0]} ${uuid()}`;
const titleMonthChange = `Publication for My Profile Page - ${new Date(today.setDate(monthChange)).toISOString().split('T')[0]} ${uuid()}`;
const titleLastMonth = `Publication for My Profile Page - ${new Date(today.setMonth(lastMonth)).toISOString().split('T')[0]} ${uuid()}`;
const titleNextMonth = `Publication for My Profile Page - ${new Date(today.setMonth(nextMonth)).toISOString().split('T')[0]} ${uuid()}`;

BeforeAll(() => {
  cy.login(userUnitWithAuthor).then(() => {
    createPublicationUsingAPI(
      titleToday,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_1
    );
    createDraftPublicationUsingAPI(
      titleLastYear,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.year = lastYear;
      registrationBuilder.update().then(() => registrationBuilder.publish());
    });
    createDraftPublicationUsingAPI(
      titleYesterday,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.day = yesterday;
      registrationBuilder.update().then(() => registrationBuilder.publish());
    });
    createDraftPublicationUsingAPI(
      titleLastMonth,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.month = lastMonth + 1;
      registrationBuilder.update().then(() => registrationBuilder.publish());
    });
    createDraftPublicationUsingAPI(
      titleNextMonth,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.month = nextMonth + 1;
      registrationBuilder.update().then(() => registrationBuilder.publish());
    });
    // cy.wrap(
    //   createPublicationUsingAPI(
    //     titleMonthChange,
    //     CategoryTypes.ACADEMIC_ARTICLE,
    //     userName[userUnitWithAuthor],
    //     NviLevels.LEVEL_1
    //   )
    // ).then((builder: unknown) => {
    //   const registrationBuilder = builder as RegistrationData;
    //   registrationBuilder.entityDescription.publicationDate.day = monthChange;
    //   cy.wrap(registrationBuilder.update()).then(() => {});
    // });
  });
});

Given('that the user is logged in', () => {
  cy.login(userUnitWithAuthor);
});
When('they click the menu item My user profile', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  // TODO(NP-51500): "My page" lands on Dialogue when the user has unread
  // notifications, hiding the profile link. Navigate explicitly until the
  // behavior is confirmed and covered by dedicated tests.
  cy.getDataTestId(dataTestId.myPage.researchProfileAccordion).click();
  cy.getDataTestId(dataTestId.myPage.myProfileLink).click();
});
Then('they see My Profile', () => {
  cy.location('pathname').should('contain', '/my-page/profile/personalia');
});
Then('they see their Profile page which includes information for', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, profilePageFields);
  cy.get('button').filter(':lang("nb")').should('be.visible');
  cy.get('button').filter(':lang("en")').should('be.visible');
});
// | Real name          |
// | Feide ID           |
// | Email              |
// | ORCID              |
// | Roles              |
// | Organizations      |
// | Language           |

// Scenario: User view list of publications
// Given ('the user us logged in', () => {});
When('they view their research profile', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  // TODO(NP-51500): "My page" lands on Dialogue when the user has unread
  // notifications. Navigate explicitly until the behavior is confirmed and
  // covered by dedicated tests.
  cy.getDataTestId(dataTestId.myPage.researchProfileAccordion).click();
});
Then('they see a list of their publications', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.greaterThan', 0);
});

/**
 * Extracts the publication date from a result item. Partial dates default to
 * the end of the period, e.g. "2025" is parsed to "2025-12-31".
 */
const parseDisplayedPublicationDate = (itemText: string): number => {
  const match = itemText.match(/\b(?:(\d{2})\.)?(?:(\d{2})\.)?(\d{4})\b/);
  if (!match) {
    throw new Error(`No publication date found in result item: ${itemText}`);
  }
  const [, firstPart, secondPart, year] = match;
  const month = secondPart ?? firstPart;
  const day = secondPart ? firstPart : undefined;
  return Date.UTC(Number(year), month ? Number(month) - 1 : 11, day ? Number(day) : 31);
};

Then('the list of publications is sorted by newest first', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).then(($items) => {
    const datesInListOrder = Cypress.$.makeArray($items).map((item) => parseDisplayedPublicationDate(item.innerText));
    const datesNewestFirst = [...datesInListOrder].sort((first, second) => second - first);
    expect(datesInListOrder, 'displayed publication dates in list order').to.deep.equal(datesNewestFirst);
  });
});

// Scenario: User sort list of publications
Given('User view list of publications', () => {});
When('they sort the list by oldest first', () => {});
Then('the list show publications sorted by oldest first', () => {});
