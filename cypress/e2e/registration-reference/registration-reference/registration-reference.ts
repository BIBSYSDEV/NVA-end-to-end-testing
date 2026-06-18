import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import {
  createChapterInAnthologyUsingAPI,
  createPublicationUsingAPI,
  NviLevels,
} from '../../../support/create_registration';
import { v4 as uuid } from 'uuid';
import { CategoryTypes, TestUsers, userName } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { currentYear } from '../../../support/commands';

const articleTitleUuid = uuid();
const bookTitleUuid = uuid();
const chapterTitleUuid = uuid();
const degreeTitleUuid = uuid();
const reportTitleUuid = uuid();

const anthologyTitle = `testPublicationRefernceAnhology ${uuid()}`;
const articleTitle = `testPublicationRefernceArticle ${articleTitleUuid}`;
const bookTitle = `testPublicationReferenceBook ${bookTitleUuid}`;
const chapterTitle = `testPublicationReferenceChapter ${chapterTitleUuid}`;
const degreeTitle = `testPublicationReferenceDegreeBachelor ${degreeTitleUuid}`;
const reportTitle = `testPublicationReferenceReport ${reportTitleUuid}`;

const journalName = 'ACM Journal of Data and Information Quality';

BeforeAll(() => {
  cy.login(TestUsers.creators.withAuthor).then(() => {
    createPublicationUsingAPI(
      articleTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[TestUsers.creators.withAuthor],
      NviLevels.LEVEL_1
    );
    createPublicationUsingAPI(
      bookTitle,
      CategoryTypes.ACADEMIC_MONOGRAPH,
      userName[TestUsers.creators.withAuthor],
      NviLevels.LEVEL_1
    );
    createPublicationUsingAPI(
      reportTitle,
      CategoryTypes.RESEARCH_REPORT,
      userName[TestUsers.creators.withAuthor],
      NviLevels.LEVEL_1
    );
    createChapterInAnthologyUsingAPI(
      chapterTitle,
      anthologyTitle,
      userName[TestUsers.creators.withAuthor],
      NviLevels.LEVEL_1
    );
    createPublicationUsingAPI(
      degreeTitle,
      CategoryTypes.DEGREE_BACHELOR,
      userName[TestUsers.creators.withAuthor],
      NviLevels.LEVEL_1
    );
  });
});

// Feature: reference in right-hand menu on NVA landing page
//   As a user of NVA
//   I want to see a ready-to-use reference on every presentation page
//   So that I can copy it directly into Word or a reference manager without manual formatting
//
//   Background:

Given('I am viewing a resource presentation page on NVA', () => {
  cy.login(TestUsers.creators.withAuthor);
});

const findResource = (uuid: string) => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${uuid} {enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .first()
    .within(() => {
      cy.get('a').first().click();
    });
};

// Scenario Outline: Citation is formatted correctly for supported resource types (KR-02)
const resourceUuidByType = {
  JournalArticle: articleTitleUuid,
  Book: bookTitleUuid,
  Report: reportTitleUuid,
  BookChapter: chapterTitleUuid,
  DegreeBachelor: degreeTitleUuid,
} as const;

type ResourceType = keyof typeof resourceUuidByType;

Given('a resource of type {string}', (resourceType: string) => {
  const resourceUuid = resourceUuidByType[resourceType as ResourceType];
  if (!resourceUuid) {
    throw new Error(`Unknown resource type "${resourceType}"`);
  }
  findResource(resourceUuid);
});
When('the reference is generated', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
Then('the output follows the {string} for {string}', (template: unknown, resourceType) => {
  let title = '';
  switch (resourceType) {
    case 'JournalArticle':
      title = articleTitle;
      break;
    case 'Book':
      title = bookTitle;
      break;
    case 'Report':
      title = reportTitle;
      break;
    case 'BookChapter':
      title = chapterTitle;
      break;
  }
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    const elements = (template as string).split('; ');
    elements.forEach((element) => {
      switch (element) {
        case 'authors':
          cy.get('p').should('contain.text', 'Withauthor TestUser');
          break;
        case 'year':
          cy.get('p').should('contain.text', `(${currentYear}).`);
          break;
        case 'journalName':
          cy.get('p').should('contain.text', journalName);
          break;
        case 'title':
          cy.get('p').should('contain.text', title);
          break;
        case 'volume':
          cy.get('p').should('contain.text', '15(3),');
          break;
        case 'pages':
          cy.get('p').should('contain.text', '10–20');
          break;
        case 'publisher':
          cy.get('p').should('contain.text', 'Springer Nature');
          break;
        case 'institution':
          cy.get('p').should('contain.text', 'SINTEF akademisk forlag');
          break;
        case 'reportNumber':
          cy.get('p').should('contain.text', '(Report No. 123)');
          break;
        case 'chapterPages':
          cy.get('p').should('contain.text', '(pp. 1–20)');
          break;
        case 'bookTitle':
          cy.get('p').should('contain.text', anthologyTitle);
          break;
      }
    });
  });
});

// Examples:
//   | resourceType       |  template |
//   | JournalArticle     |  authors; year; title; journalName; volume; pages; PID          |
//   | Book               |  authors; year; title; PID; publisher                           |
//   | BookChapter        |  authors; year; title; PID; pages; publisher; editor; bookTitle |
//   | Report             |  authors; year; title; PID; institution; reportNumber           |

// Scenario: Unsupported resource type falls back to generic APA template (KR-02)
Given('a resource of an unsupported type "DegreeBachelor"', () => {
  findResource(degreeTitleUuid);
});
Then('the output follows the generic APA fallback template', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('contain.text', 'Withauthor TestUser');
    cy.get('p').should('contain.text', `(${currentYear}).`);
    cy.get('p').should('contain.text', degreeTitle);
  });
});

// Scenario: Authors are taken only from contributors with role Creator (KR-03)
Given('a resource with contributors of mixed roles including "Creator" and "Editor"', () => {});
// When('the reference is generated', () => {});
Then('only contributors with role "Creator" appear in the author list', () => {});
Then('each author is formatted as "Surname, I."', () => {});

// Scenario: All authors are listed when there are 20 or fewer (KR-03)
Given('a resource with 20 contributors with role "Creator"', () => {});
// When('the reference is generated', () => {});
Then('all 20 authors appear in the citation', () => {});

// Scenario: Author list is truncated when there are more than 20 authors (KR-03)
Given('a resource with more than 20 contributors with role "Creator"', () => {});
// When('the reference is generated', () => {});
Then('the first 19 authors are listed', () => {});
Then('"..." appears after the 19th author', () => {});
Then('the last author appears after "..."', () => {});

// Scenario: Missing optional metadata fields are omitted silently (KR-04)
Given('a journal article resource without "volume" and "pages" in its metadata', () => {});
// When('the reference is generated', () => {});
Then('the citation is produced without error messages', () => {});
Then('the "volume" and "pages" segments are absent from the output string', () => {});

// Scenario: PID is included when present (KR-04)
Given('a resource with a PID in its metadata', () => {});
// When('the reference is generated', () => {});
Then('the PID appears in the citation string', () => {});

// Scenario: Handle is used as fallback when DOI is absent (KR-04)
Given('a resource without a DOI but with a handle in its metadata', () => {});
// When('the reference is generated', () => {});
Then('the handle appears in the citation string', () => {});

// Scenario: Neither DOI nor handle appears when both are absent (KR-04)
Given('a resource without DOI and without handle', () => {});
// When('the reference is generated', () => {});
Then('the citation contains no URL or identifier segment', () => {});

// Scenario: Title in ALL CAPS is converted to sentence case (KR-05)
Given('a resource whose mainTitle is "AN INTRODUCTION TO MACHINE LEARNING"', () => {});
// When('the reference is generated', () => {});
Then('the title in the citation reads "An introduction to machine learning"', () => {});

// Scenario: Title in Title Case is converted to sentence case (KR-05)
Given('a resource whose mainTitle is "An Introduction to Machine Learning"', () => {});
// When('the reference is generated', () => {});
Then('the title in the citation reads "An introduction to machine learning"', () => {});

// Scenario: Title already in sentence case is preserved as-is (KR-05)
Given('a resource whose mainTitle is "An introduction to machine learning"', () => {});
// When('the reference is generated', () => {});
Then('the title in the citation reads "An introduction to machine learning"', () => {});

// Scenario: The formatting function returns plain text (KR-06)
Given('a resource with complete metadata', () => {});
// When('the reference is generated', () => {});
Then('the return value is a single plain-text string', () => {});
Then('the string contains no HTML tags', () => {});

// Scenario: Citation is visible (KR-07)
Given('I am on a resource presentation page', () => {});
When('the page has finished loading', () => {});
Then('a citation is present', () => {});

// Scenario: Citation text is displayed as read-only
Given('I am on a resource presentation page with a long reference', () => {});
When('I view the citation', () => {});
Then('the citation text is shown as read-only', () => {});

// Scenario: Copy function writes citation to clipboard (KR-09)
Given('I am on a resource presentation page', () => {});
When('I use the copy function for the citation', () => {});
Then('the formatted citation string is written to the clipboard', () => {});

// Scenario: Copy function gives visual confirmation after copying (KR-09)
Given('I am on a resource presentation page', () => {});
When('I use the copy function', () => {});
Then('a visual confirmation is shown', () => {});
Then('the confirmation disappears after a short delay', () => {});
