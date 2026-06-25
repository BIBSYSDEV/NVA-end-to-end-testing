import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import {
  approveDoi,
  createChapterInAnthologyUsingAPI,
  createDraftPublicationUsingAPI,
  createPublicationUsingAPI,
  findContributorByName,
  NviLevels,
  requestDoi,
} from '../../../support/create_registration';
import { v4 as uuid } from 'uuid';
import { CategoryTypes, ContributorTypes, TestUsers, userName } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { currentYear } from '../../../support/commands';

const articleTitleUuid = uuid();
const bookTitleUuid = uuid();
const chapterTitleUuid = uuid();
const degreeTitleUuid = uuid();
const reportTitleUuid = uuid();
// Numeric-only suffixes on purpose: the sentence-case logic decides whether to
// down-case a title based on the percentage of all-caps characters. A regular
// uuid() introduces lowercase letters that "poison" that ratio, so we use a
// digits-only timestamp instead. Derive all three from one base so they can't
// collide on the same millisecond (they're also used as unique search terms).
const sentenceCaseBaseUuid = new Date().getTime();
const withAllCapsTitleUuid = `${sentenceCaseBaseUuid}1`;
const withTitleCaseTitleUuid = `${sentenceCaseBaseUuid}2`;
const withSentenceCaseTitleUuid = `${sentenceCaseBaseUuid}3`;
const withEditorTitleUuid = uuid();
const withDoiTitleUuid = uuid();
const withTwentyContributorsTitleUuid = uuid();
const withTwentyOneContributorsTitleUuid = uuid();
const withoutVolumeAndPagesTitleUuid = uuid();

const anthologyTitle = `testPublicationRefernceAnhology ${uuid()}`;
const articleTitle = `testPublicationRefernceArticle ${articleTitleUuid}`;
const bookTitle = `testPublicationReferenceBook ${bookTitleUuid}`;
const chapterTitle = `testPublicationReferenceChapter ${chapterTitleUuid}`;
const degreeTitle = `testPublicationReferenceDegreeBachelor ${degreeTitleUuid}`;
const reportTitle = `testPublicationReferenceReport ${reportTitleUuid}`;
const withAllCapsTitle = `AN INTRODUCTION TO MACHINE LEARNING ${withAllCapsTitleUuid}`;
const withTitleCaseTitle = `An Introduction to Machine Learning ${withTitleCaseTitleUuid}`;
const withSentenceCaseTitle = `An introduction to machine learning ${withSentenceCaseTitleUuid}`;
const withEditorTitle = `testPublicationReferenceWithEditor ${withEditorTitleUuid}`;
const withDoiTitle = `testPublicationReferenceWithDoi ${withDoiTitleUuid}`;
const withTwentyContributorsTitle = `testPublicationReferenceWithTwentyContributors ${withTwentyContributorsTitleUuid}`;
const withTwentyOneContributorsTitle = `testPublicationReferenceWithTwentyOneContributors ${withTwentyOneContributorsTitleUuid}`;
const withoutVolumeAndPagesTitle = `testPublicationReferenceWithoutVolumeAndPages ${withoutVolumeAndPagesTitleUuid}`;

const journalName = 'ACM Journal of Data and Information Quality';

const referenceContributors: string[] = [
  'ReferenceAuthor1 TestUser',
  'ReferenceAuthor2 TestUser',
  'ReferenceAuthor3 TestUser',
  'ReferenceAuthor4 TestUser',
  'ReferenceAuthor5 TestUser',
  'ReferenceAuthor6 TestUser',
  'ReferenceAuthor7 TestUser',
  'ReferenceAuthor8 TestUser',
  'ReferenceAuthor9 TestUser',
  'ReferenceAuthor10 TestUser',
  'ReferenceAuthor11 TestUser',
  'ReferenceAuthor12 TestUser',
  'ReferenceAuthor13 TestUser',
  'ReferenceAuthor14 TestUser',
  'ReferenceAuthor15 TestUser',
  'ReferenceAuthor16 TestUser',
  'ReferenceAuthor17 TestUser',
  'ReferenceAuthor18 TestUser',
  'ReferenceAuthor19 TestUser',
  'ReferenceAuthor20 TestUser',
  'ReferenceAuthor21 TestUser',
];

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
    createPublicationUsingAPI(
      withEditorTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[TestUsers.creators.withAuthor],
      NviLevels.LEVEL_1
    ).then((builder) => {
      findContributorByName(userName[TestUsers.creators.withAuthor1], ContributorTypes.EDITOR).then((editor) => {
        builder.addContributor(editor).update();
      });
    });
  });
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

// Feature: reference in right-hand menu on NVA landing page
//   As a user of NVA
//   I want to see a ready-to-use reference on every presentation page
//   So that I can copy it directly into Word or a reference manager without manual formatting

//   Background:
// Given('I am viewing a resource presentation page on NVA', () => {
//   cy.login(TestUsers.creators.withAuthor);
// });

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
  cy.login(TestUsers.creators.withAuthor);
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
  cy.login(TestUsers.creators.withAuthor);
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
Given('a resource with contributors of mixed roles including "Creator" and "Editor"', () => {
  cy.login(TestUsers.creators.withAuthor);
  findResource(withEditorTitleUuid);
});
// When('the reference is generated', () => {
//   cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
// });
Then('only contributors with role "Creator" appear in the author list', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('not.contain.text', '(Ed.)');
    cy.get('p').should('not.contain.text', 'Withauthor1 TestUser');
  });
});
Then('each author is formatted as "Firstname Surname."', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('contain.text', 'Withauthor TestUser');
  });
});

// Scenario: All authors are listed when there are 20 or fewer (KR-03)
Given('a resource with 20 contributors with role "Creator"', () => {
  cy.login(TestUsers.creators.withAuthor);
  createPublicationUsingAPI(
    withTwentyContributorsTitle,
    CategoryTypes.ACADEMIC_ARTICLE,
    userName[TestUsers.creators.withAuthor],
    NviLevels.LEVEL_1
  ).then((builder) => {
    referenceContributors.slice(0, 19).forEach((user) => {
      findContributorByName(user, ContributorTypes.CREATOR).then((contributor) => {
        builder.addContributor(contributor);
      });
    });
    builder.update();
  });

  findResource(withTwentyContributorsTitleUuid);
});
// When('the reference is generated', () => {});
Then('all 20 authors appear in the citation', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('not.contain.text', '...');
    cy.get('p').should('contain.text', 'ReferenceAuthor1 TestUser');
    cy.get('p').should('contain.text', `ReferenceAuthor19 TestUser (${currentYear})`);
  });
});

// Scenario: Author list is truncated when there are more than 20 authors (KR-03)
Given('a resource with more than 20 contributors with role "Creator"', () => {
  cy.login(TestUsers.creators.withAuthor);
  createPublicationUsingAPI(
    withTwentyOneContributorsTitle,
    CategoryTypes.ACADEMIC_ARTICLE,
    userName[TestUsers.creators.withAuthor],
    NviLevels.LEVEL_1
  ).then((builder) => {
    referenceContributors.forEach((user) => {
      findContributorByName(user, ContributorTypes.CREATOR).then((contributor) => {
        builder.addContributor(contributor);
      });
    });
    builder.update();
  });

  findResource(withTwentyOneContributorsTitleUuid);
});
// When('the reference is generated', () => {});
Then('the first 19 authors are listed', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('contain.text', '...');
    cy.get('p').should('contain.text', 'ReferenceAuthor1 TestUser');
    cy.get('p').should('contain.text', 'ReferenceAuthor21 TestUser');
    cy.get('p').should('not.contain.text', `ReferenceAuthor19 TestUser (${currentYear})`);
  });
});
Then('"..." appears after the 19th author', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('contain.text', 'ReferenceAuthor18 TestUser, ...');
  });
});
Then('the last author appears after "..."', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('contain.text', `... ReferenceAuthor21 TestUser (${currentYear})`);
  });
});

// Scenario: Missing optional metadata fields are omitted silently (KR-04)
Given('a journal article resource without "volume" and "pages" in its metadata', () => {
  cy.login(TestUsers.creators.withAuthor);
  createDraftPublicationUsingAPI(
    withoutVolumeAndPagesTitle,
    CategoryTypes.ACADEMIC_ARTICLE,
    userName[TestUsers.creators.withAuthor]
  ).then((builder) => {
    const { publicationContext, publicationInstance } = builder.entityDescription.reference;
    delete publicationContext.volume;
    delete publicationContext.issue;
    delete publicationInstance.volume;
    delete publicationInstance.issue;
    delete publicationInstance.pages;

    builder.update().then(() => {
      builder.publish();
    });

    cy.searchFor(withoutVolumeAndPagesTitleUuid);
  });
});
When('the reference for KR-04 is generated', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
Then('the citation is produced without error messages', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('contain.text', withoutVolumeAndPagesTitle);
    cy.get('p').should('contain.text', `(${currentYear}).`);
    cy.get('[data-testid=snackbar-error]').should('not.exist');
  });
});
Then('the "volume" and "pages" segments are absent from the output string', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('not.contain.text', '15(3),');
    cy.get('p').should('not.contain.text', '10–20');
  });
});

// Scenario: PID is included when present (KR-04)
Given('a resource with a PID in its metadata', () => {
  cy.login(TestUsers.creators.withAuthor);
  createDraftPublicationUsingAPI(
    withDoiTitle,
    CategoryTypes.ACADEMIC_ARTICLE,
    userName[TestUsers.creators.withAuthor]
  ).then((builder) => {
    builder.publish().then(() => {
      requestDoi(builder.identifier).then(() => {
        cy.login(TestUsers.curators.specialty.draftDoi).then(() => {
          approveDoi(builder.identifier).then(() => {
            cy.login(TestUsers.creators.withAuthor);
            cy.searchFor(withDoiTitle);
          });
        });
      });
    });
  });
});

When('the reference is generated for the publication with a DOI', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
Then('the PID appears in the citation string', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('contain.text', 'https://handle.stage.datacite.org/');
  });
});

// Scenario: Neither DOI nor handle appears when both are absent (KR-04)
Given('a resource without DOI and without handle', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(articleTitleUuid);
});
When('the reference is generated for a publication without DOI or handle', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
Then('the citation contains no URL or identifier segment', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('not.contain.text', 'https://handle.stage.datacite.org/');
  });
});

// Scenario: Title in ALL CAPS is converted to sentence case (KR-05)
Given('a resource whose mainTitle is "AN INTRODUCTION TO MACHINE LEARNING"', () => {
  cy.login(TestUsers.creators.withAuthor);
  createPublicationUsingAPI(
    withAllCapsTitle,
    CategoryTypes.ACADEMIC_ARTICLE,
    userName[TestUsers.creators.withAuthor],
    NviLevels.LEVEL_1
  );

  cy.searchFor(withAllCapsTitleUuid);
});
When('the reference is generated for a publication with mainTitle "AN INTRODUCTION TO MACHINE LEARNING"', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
Then(
  'the title in the citation reads "An introduction to machine learning" and not "AN INTRODUCTION TO MACHINE LEARNING"',
  () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
      cy.get('p').should('not.contain.text', 'AN INTRODUCTION TO MACHINE LEARNING');
      cy.get('p').should('contain.text', 'An introduction to machine learning');
    });
  }
);

// Scenario: Title in Title Case is converted to sentence case (KR-05)
Given('a resource whose mainTitle is "An Introduction to Machine Learning"', () => {
  cy.login(TestUsers.creators.withAuthor);
  createPublicationUsingAPI(
    withTitleCaseTitle,
    CategoryTypes.ACADEMIC_ARTICLE,
    userName[TestUsers.creators.withAuthor],
    NviLevels.LEVEL_1
  );

  cy.searchFor(withTitleCaseTitleUuid);
});
When('the reference is generated for a publication with mainTitle "An Introduction to Machine Learning"', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});

// Scenario: Title already in sentence case is preserved as-is (KR-05)
Given('a resource whose mainTitle is "An introduction to machine learning"', () => {
  cy.login(TestUsers.creators.withAuthor);
  createPublicationUsingAPI(
    withSentenceCaseTitle,
    CategoryTypes.ACADEMIC_ARTICLE,
    userName[TestUsers.creators.withAuthor],
    NviLevels.LEVEL_1
  );

  cy.searchFor(withSentenceCaseTitleUuid);
});
When('the reference is generated for a publication with mainTitle "An introduction to machine learning"', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
Then('the title in the citation reads "An introduction to machine learning"', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('contain.text', 'An introduction to machine learning');
  });
});

// Scenario: The formatting function returns plain text (KR-06)
Given('a resource with complete metadata', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(articleTitleUuid);
});
Then('the return value is a single plain-text string', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').should('have.length', 1);
    cy.get('p').invoke('text').should('not.be.empty');
  });
});
Then('the string contains no HTML tags', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    cy.get('p').then(($p) => {
      expect($p.children(), 'no nested elements').to.have.length(0);
      expect($p.html(), 'no HTML tags').to.not.contain('<');
    });
  });
});

// Scenario: Citation is visible for anonymous user (KR-07)
Given('I am on a resource presentation page as an anonymous user', () => {
  cy.visit(`/filter`, {
    auth: {
      username: 'osteloff',
      password: 'osteloff',
    },
    failOnStatusCode: false,
  });

  cy.searchFor(articleTitleUuid);
});
When('the page has finished loading', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
Then('a citation is present', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).should('exist');
});

// Scenario: Citation text is displayed as read-only (KR-08)
Given('I am on a resource presentation page with a long reference', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(articleTitleUuid);
});
When('I view the citation', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
Then('the citation text is shown as read-only', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox).within(() => {
    // The citation is rendered as plain, non-editable text - not an editable field
    cy.get('input, textarea, [contenteditable="true"]').should('not.exist');
    cy.get('p').should('exist').and('not.have.attr', 'contenteditable', 'true');
  });
});

// Scenario: Copy function writes citation to clipboard (KR-09)
// Shared Given for both KR-09 scenarios
Given('I am on a resource presentation page', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(articleTitleUuid);
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
When('I use the copy function for the citation', () => {
  cy.window().then((win) => {
    cy.stub(win.navigator.clipboard, 'writeText').as('copyToClipboard').resolves();
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.copyReferenceButton).click();
});
Then('the formatted citation string is written to the clipboard', () => {
  cy.get('@copyToClipboard').should('have.been.calledOnce');
  cy.get('@copyToClipboard').its('firstCall.args.0').should('contain', articleTitle);
});

// Scenario: Copy function gives visual confirmation after copying (KR-09)
// Reuses the shared Given('I am on a resource presentation page') defined above
When('I use the copy function', () => {
  cy.window().then((win) => {
    cy.stub(win.navigator.clipboard, 'writeText').as('copyToClipboard').resolves();
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.copyReferenceButton).click();
});
Then('a visual confirmation is shown', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.copyReferenceButton).should(
    'contain.text',
    'Referanse kopiert'
  );
});
Then('the confirmation disappears after a short delay', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.copyReferenceButton, {
    timeout: 4000,
  }).should('contain.text', 'Kopier referanse');
});
