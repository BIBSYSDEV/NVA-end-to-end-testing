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
// digits-only timestamp instead.
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

// Expected APA-rendered citation fragments origin reference.
const expectedCitation = {
  volumeIssue: '15(3),', // reference.ts ArticleReference: volume '15', issue '3'
  pages: '10–20', // reference.ts ArticleReference: pages begin 10, end 20 (en-dash)
  chapterPages: '(pp. 1–20)',
  publisher: 'Springer Nature', // from PUBLISHER[nviLevel] channel URI
  institution: 'SINTEF akademisk forlag', // from publisher channel URI
  reportNumber: '(Report No. 123)', // reference.ts ReportReference: seriesNumber '123'
} as const;

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

// Returns the reference text box; the long data-testid path lives here only.
const getReferenceBoxDataTestId = () =>
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.referenceTextBox);

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

// Scenario Outline: Citation is formatted correctly for supported resource types (KR-02)
const resourcesByType = {
  JournalArticle: { uuid: articleTitleUuid, title: articleTitle },
  Book: { uuid: bookTitleUuid, title: bookTitle },
  Report: { uuid: reportTitleUuid, title: reportTitle },
  BookChapter: { uuid: chapterTitleUuid, title: chapterTitle },
  DegreeBachelor: { uuid: degreeTitleUuid, title: degreeTitle },
} as const;

type ResourceType = keyof typeof resourcesByType;

Given('a resource of type {string}', (resourceType: string) => {
  const resource = resourcesByType[resourceType as ResourceType];
  if (!resource) {
    throw new Error(`Unknown resource type "${resourceType}"`);
  }
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(resource.uuid);
});
When('the reference is generated', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
Then('the output follows the {string} for {string}', (template: string, resourceType: string) => {
  const title = resourcesByType[resourceType as ResourceType].title;
  getReferenceBoxDataTestId().within(() => {
    const elements = template.split('; ');
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
          cy.get('p').should('contain.text', expectedCitation.volumeIssue);
          break;
        case 'pages':
          cy.get('p').should('contain.text', expectedCitation.pages);
          break;
        case 'publisher':
          cy.get('p').should('contain.text', expectedCitation.publisher);
          break;
        case 'institution':
          cy.get('p').should('contain.text', expectedCitation.institution);
          break;
        case 'reportNumber':
          cy.get('p').should('contain.text', expectedCitation.reportNumber);
          break;
        case 'chapterPages':
          cy.get('p').should('contain.text', expectedCitation.chapterPages);
          break;
        case 'editor':
          // The anthology's editor is rendered with the APA "(Ed.)" marker
          cy.get('p').should('contain.text', '(Ed.)');
          break;
        case 'bookTitle':
          cy.get('p').should('contain.text', anthologyTitle);
          break;
      }
    });
  });
});

// Scenario: Unsupported resource type falls back to generic APA template (KR-02)
Given('a resource of an unsupported type "DegreeBachelor"', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(degreeTitleUuid);
});
Then('the output follows the generic APA fallback template', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('p').should('contain.text', 'Withauthor TestUser');
    cy.get('p').should('contain.text', `(${currentYear}).`);
    cy.get('p').should('contain.text', degreeTitle);
  });
});

// Scenario: Authors are taken only from contributors with role Creator (KR-03)
Given('a resource with contributors of mixed roles including "Creator" and "Editor"', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(withEditorTitleUuid);
});
Then('only contributors with role "Creator" appear in the author list', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('p').should('not.contain.text', '(Ed.)');
    cy.get('p').should('not.contain.text', 'Withauthor1 TestUser');
  });
});
Then('each author is formatted as "Firstname Surname."', () => {
  getReferenceBoxDataTestId().within(() => {
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

  cy.searchFor(withTwentyContributorsTitleUuid);
});
Then('all 20 authors appear in the citation', () => {
  getReferenceBoxDataTestId().within(() => {
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

  cy.searchFor(withTwentyOneContributorsTitleUuid);
});
Then('the first 19 authors are listed', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('p').should('contain.text', '...');
    cy.get('p').should('contain.text', 'ReferenceAuthor1 TestUser');
    cy.get('p').should('contain.text', 'ReferenceAuthor21 TestUser');
    cy.get('p').should('not.contain.text', `ReferenceAuthor19 TestUser (${currentYear})`);
  });
});
Then('"..." appears after the 19th author', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('p').should('contain.text', 'ReferenceAuthor18 TestUser, ...');
  });
});
Then('the last author appears after "..."', () => {
  getReferenceBoxDataTestId().within(() => {
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
Then('the citation is produced without error messages', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('p').should('contain.text', withoutVolumeAndPagesTitle);
    cy.get('p').should('contain.text', `(${currentYear}).`);
    cy.get('[data-testid=snackbar-error]').should('not.exist');
  });
});
Then('the "volume" and "pages" segments are absent from the output string', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('p').should('not.contain.text', expectedCitation.volumeIssue);
    cy.get('p').should('not.contain.text', expectedCitation.pages);
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

Then('the PID appears in the citation string', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('p').should('contain.text', 'https://handle.stage.datacite.org/');
  });
});

// Scenario: Neither DOI nor handle appears when both are absent (KR-04)
Given('a resource without DOI and without handle', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(articleTitleUuid);
});
Then('the citation contains no URL or identifier segment', () => {
  getReferenceBoxDataTestId().within(() => {
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
Then(
  'the title in the citation reads "An introduction to machine learning" and not "AN INTRODUCTION TO MACHINE LEARNING"',
  () => {
    getReferenceBoxDataTestId().within(() => {
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
Then('the title in the citation reads "An introduction to machine learning"', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('p').should('contain.text', 'An introduction to machine learning');
  });
});

// Scenario: The formatting function returns plain text (KR-06)
Given('a resource with complete metadata', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(articleTitleUuid);
});
Then('the return value is a single plain-text string', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('p').should('have.length', 1);
    cy.get('p').invoke('text').should('not.be.empty');
  });
});
Then('the string contains no HTML tags', () => {
  getReferenceBoxDataTestId().within(() => {
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
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
    failOnStatusCode: false,
  });

  cy.searchFor(articleTitleUuid);
});
Then('a citation is present', () => {
  getReferenceBoxDataTestId().should('exist');
});

// Scenario: Citation text is displayed as read-only (KR-08)
Given('I am on a resource presentation page with a long reference', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(articleTitleUuid);
});
Then('the citation text is shown as read-only', () => {
  getReferenceBoxDataTestId().within(() => {
    cy.get('input, textarea, [contenteditable="true"]').should('not.exist');
    cy.get('p').should('exist').and('not.have.attr', 'contenteditable', 'true');
  });
});

// Scenarios: Copy function writes citation to clipboard / gives visual confirmation (KR-09)
Given('I am on a resource presentation page', () => {
  cy.login(TestUsers.creators.withAuthor);
  cy.searchFor(articleTitleUuid);
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.detailsTab).click();
});
When('I use the copy function', () => {
  cy.window().then((win) => {
    cy.stub(win.navigator.clipboard, 'writeText').as('copyToClipboard').resolves();
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.detailsTab.copyReferenceButton).click();
});
Then('the formatted citation string is written to the clipboard', () => {
  cy.get('@copyToClipboard').should('have.been.calledOnce');
  cy.get('@copyToClipboard').its('firstCall.args.0').should('contain', articleTitle);
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
