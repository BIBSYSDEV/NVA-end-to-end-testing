import { CategoryTypes, userName, userUnitWithAuthor } from '../../../support/constants';
import { createDraftPublicationUsingAPI, createPublicationUsingAPI, NviLevels, RegistrationData } from '../../../support/create_registration';
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
    cy.wrap(
      createPublicationUsingAPI(
        titleToday,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userUnitWithAuthor],
        NviLevels.LEVEL_1
      )
    ).then(() => {});
    cy.wrap(
      createDraftPublicationUsingAPI(
        titleLastYear,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userUnitWithAuthor],
        NviLevels.LEVEL_1
      )
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.year = lastYear;
      cy.wrap(registrationBuilder.update().then(() => registrationBuilder.publish())).then(() => {})
    });
    cy.wrap(
      createDraftPublicationUsingAPI(
        titleYesterday,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userUnitWithAuthor],
        NviLevels.LEVEL_1
      )
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.day = yesterday;
      cy.wrap(registrationBuilder.update().then(() => registrationBuilder.publish())).then(() => {})
    });
    cy.wrap(
      createDraftPublicationUsingAPI(
        titleLastMonth,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userUnitWithAuthor],
        NviLevels.LEVEL_1
      )
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.month = lastMonth + 1;
      cy.wrap(registrationBuilder.update().then(() => registrationBuilder.publish())).then(() => {});
    });
    cy.wrap(
      createDraftPublicationUsingAPI(
        titleNextMonth,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userUnitWithAuthor],
        NviLevels.LEVEL_1
      )
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.month = nextMonth + 1;
      cy.wrap(registrationBuilder.update().then(() => registrationBuilder.publish())).then(() => {});
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
});
Then('they see a list of their publications', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.greaterThan', 0);
});
Then('the list of publications is sorted by newest first', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().should('contain', titleToday);
  cy.getDataTestId(dataTestId.startPage.searchResultItem).eq(1).should('contain', titleYesterday);
  cy.getDataTestId(dataTestId.startPage.searchResultItem).last().should('contain', titleLastYear);
});

// Scenario: User sort list of publications
Given('User view list of publications', () => {});
When('they sort the list by oldest first', () => {});
Then('the list show publications sorted by oldest first', () => {});
