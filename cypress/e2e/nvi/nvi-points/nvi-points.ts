// Feature: NVI points calculations

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';
import { CategoryTypes, ContributorTypes, TestUsers } from '../../../support/constants';
import {
  createPublicationUsingAPI,
  findContributorByName,
  NviLevels,
  RegistrationData,
} from '../../../support/create_registration';
import { currentYear } from '../../../support/commands';

const categories = {
  'AcademicArticle': CategoryTypes.ACADEMIC_ARTICLE,
  'AcademicLiteratureReview': CategoryTypes.ACADEMIC_REVIEW_ARTICLE,
  'AcademicMonograph': CategoryTypes.ACADEMIC_MONOGRAPH,
  'AcademicChapter': CategoryTypes.ACADEMIC_CHAPTER,
};

const channelIds = {
  'article level 1': `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/7ECF363E-84A8-4328-B8D0-38A9BF93E356/${currentYear}`,
  'article level 2': `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/1864A370-80CA-4BE5-9CB7-40B0CCEF23CA/${currentYear}`,
  'monograph level 1': `https://api.e2e.nva.aws.unit.no/publication-channels-v2/publisher/DC752087-7122-4D3A-9E4F-382AA2F39D2C/${currentYear}`,
  'monograph level 2': `https://api.e2e.nva.aws.unit.no/publication-channels-v2/publisher/2C26EB7E-B93B-45B8-A5CE-AACBE2B86448/${currentYear}`,
  'series level 1': `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/DC26EADA-5DA7-42C7-8C70-4250E9C93C64/${currentYear}`,
  'series level 2': `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/8C757DB5-8205-4A28-A6D5-BABD2DF32180/${currentYear}`,
};

const USN_USER = 'User NVI-institution A TestUser';

BeforeAll(() => {
  cy.login(TestUsers.nvi.usn.institution).then(() => {
    createPublicationUsingAPI('Publication for warmup', CategoryTypes.ACADEMIC_ARTICLE, USN_USER, NviLevels.LEVEL_1);
    cy.wait(5000);
  });
});

//   Scenario Outline: Verify NVI points calculations for different NVI candidates
Given(
  'a curator looks at a NVI candidate with Category {string} and NVI level {string}',
  (category: unknown, level: unknown) => {
    cy.wrap(level as string).as('level');
    cy.wrap(category as string).as('category');
    cy.wrap(null).as('series');
  }
);
Given(
  '{string} local contributors and {string} international contributors with {string} total contributors',
  (contributors, internationalContributors, totalContributors) => {
    cy.login(TestUsers.nvi.usn.institution).then(() => {
      cy.get('@category').then((category: unknown) => {
        cy.get('@level').then((level: unknown) => {
          const categoryText = categories[category as string];
          const levelText = level as string;

          const title = `NVI Candidate ${categoryText} ${levelText} ${uuid()}`;
          cy.wrap(title).as('title');

          // cy.createPublishedRegistration(title, categoryText);
          createPublicationUsingAPI(title, categoryText, USN_USER, NviLevels.LEVEL_1).then((builder) => {
            if (levelText === 'Level 1') {
              switch (categoryText) {
                case CategoryTypes.ACADEMIC_REVIEW_ARTICLE:
                case CategoryTypes.ACADEMIC_ARTICLE:
                  builder.entityDescription.reference.publicationContext.id = channelIds['article level 1'];
                  builder.update();
                  cy.then(() => {
                    // cy.wait(3000);
                  });
                  break;
                case CategoryTypes.ACADEMIC_MONOGRAPH:
                  builder.entityDescription.reference.publicationContext.publisher.id = channelIds['monograph level 1'];
                  builder.update();
                  cy.then(() => {
                    // cy.wait(3000);
                  });
                  break;
                case CategoryTypes.ACADEMIC_CHAPTER:
                  break;
                default:
                  throw new Error(`Unknown category: ${categoryText}`);
              }
            } else {
              switch (categoryText) {
                case CategoryTypes.ACADEMIC_REVIEW_ARTICLE:
                case CategoryTypes.ACADEMIC_ARTICLE:
                  builder.entityDescription.reference.publicationContext.id = channelIds['article level 2'];
                  builder.update();
                  cy.then(() => {
                    // cy.wait(3000);
                  });
                  break;
                case CategoryTypes.ACADEMIC_MONOGRAPH:
                  builder.entityDescription.reference.publicationContext.publisher.id = channelIds['monograph level 2'];
                  builder.update();
                  cy.then(() => {
                    // cy.wait(3000);
                  });
                  break;
                case CategoryTypes.ACADEMIC_CHAPTER:
                  break;
                default:
                  throw new Error(`Unknown category: ${categoryText}`);
              }
            }
            cy.wrap(builder).as('builder');
          });
          cy.get('@builder').then((builder: unknown) => {
            const registrationBuilder = builder as RegistrationData;
            let contributorName = '';
            if (internationalContributors.toString() === 'one or more') {
              contributorName = 'Foreign TestUser';
            } else if (totalContributors.toString() === '2') {
              contributorName = 'Withauthor TestUser';
            }
            if (contributorName !== '') {
              findContributorByName(contributorName, ContributorTypes.CREATOR).then((contributor) => {
                registrationBuilder.addContributor(contributor);
                registrationBuilder.update().then(() => {});
              });
            }
            if (categoryText === CategoryTypes.ACADEMIC_CHAPTER) {
              cy.get('@anthologyId').then((anthologyId) => {
                registrationBuilder.entityDescription.reference.publicationContext.id = `https://api.e2e.nva.aws.unit.no/publication/${anthologyId}`;
                registrationBuilder.update();
              });
            }
          });
        });
      });
    });
  }
);
When('the curator reviews the NVI candidate', () => {
  cy.get('@title').then((title) => {
    cy.login(TestUsers.nvi.usn.curator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.openNVIWorklist();
    cy.selectNVICandidate(title.toString());
  });
});
Then('the NVI points should be calculated as {string}', (expectedPoints) => {
  cy.get('table')
    .filter(':contains("Points")')
    .within(() => {
      cy.contains(expectedPoints.toString());
    });
});

// Examples:
//   | Category                 | NVILevel | Contributors | InternationalContributors | totalContributors | ExpectedPoints |
//   | AcademicArticle          | Level 1  |            1 | no                        |                 1 |              1 |
//   | AcademicArticle          | Level 2  |            1 | no                        |                 1 |              3 |
//   | AcademicArticle          | Level 1  |            1 | one or more               |                 2 |           0.91 |
//   | AcademicArticle          | Level 2  |            1 | one or more               |                 2 |           2.75 |
//   | AcademicLiteratureReview | Level 1  |            1 | no                        |                 1 |              1 |
//   | AcademicMonograph        | Level 1  |            1 | no                        |                 1 |              5 |
//   | AcademicMonograph        | Level 2  |            1 | no                        |                 1 |              8 |
//   | AcademicMonograph        | Level 1  |            1 | one or more               |                 2 |           4.59 |
//   | AcademicMonograph        | Level 2  |            1 | one or more               |                 2 |           7.35 |

// Scenario Outline: Verify NVI points calculations for academic chapters

Given(
  'a curator looks at a NVI candidate with Category AcademicChapter in an Anthology with publisher at NVI level {string}',
  (publisherLevel) => {
    const publisherLevelString = publisherLevel.toString();
    cy.wrap(publisherLevelString).as('level');
    cy.wrap(CategoryTypes.ACADEMIC_CHAPTER).as('category');
  }
);
Given('NVI level {string} series', (series: unknown) => {
  cy.get('@level').then((level: unknown) => {
    const levelText = level as string;
    const seriesText = series as string;

    cy.login(TestUsers.nvi.usn.institution).then(() => {
      const anthologyTitle = `NVI candidate Anthology ${levelText} series ${seriesText} ${uuid()}`;
      const chapterTitle = `NVI candidate AcademicChapter ${levelText} series ${seriesText} ${uuid()}`;
      cy.wrap(chapterTitle).as('title');

      createPublicationUsingAPI(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY, USN_USER, NviLevels.LEVEL_1).then(
        (builder) => {
          const registrationBuilder = builder as RegistrationData;
          const anthologyIdentifier = registrationBuilder.identifier;
          cy.wrap(anthologyIdentifier).as('anthologyId');

          if (seriesText === 'Level 1') {
            registrationBuilder.entityDescription.reference.publicationContext.series.id = channelIds['series level 1'];
            registrationBuilder.entityDescription.reference.publicationContext.series.type = 'Series';
          } else if (seriesText === 'Level 2') {
            registrationBuilder.entityDescription.reference.publicationContext.series.id = channelIds['series level 2'];
            registrationBuilder.entityDescription.reference.publicationContext.series.type = 'Series';
          }

          if (levelText === 'Level 1') {
            registrationBuilder.entityDescription.reference.publicationContext.publisher.id =
              channelIds['monograph level 1'];
          } else {
            registrationBuilder.entityDescription.reference.publicationContext.publisher.id =
              channelIds['monograph level 2'];
          }
          registrationBuilder.update();
          cy.then(() => {
            registrationBuilder.publish();
          });
        }
      );
    });
  });
});
// Given(
//   '{string} local contributors and {string} international contributors with {string} total contributors',
//   (contributors, internationalContributors, totalContributors) => {}
// );
// When ('the curator reviews the NVI candidate', () => {});
// Then ('the NVI points should be calculated as "<ExpectedPoints>"', () => {});

// Examples:
//   | Publisher | Series      | Contributors | InternationalContributors | totalContributors | ExpectedPoints |
//   | Level 1   | Unconfirmed |            1 | no                        |                 1 |            0.7 |
//   | Level 2   | Unconfirmed |            1 | no                        |                 1 |              1 |
//   | Level 1   | Unconfirmed |            1 | one or more               |                 2 |            0.6 |
//   | Level 2   | Unconfirmed |            1 | one or more               |                 2 |            0.9 |
//   | Level 1   | level 1     |            1 | no                        |                 1 |              1 |
//   | Level 1   | level 2     |            1 | no                        |                 1 |            3.0 |
//   | Level 1   | level 1     |            1 | one or more               |                 2 |            0.9 |
//   | Level 1   | level 2     |            1 | one or more               |                 2 |            2.8 |

// Scenario: Verify NVI points calculation for AcademicMonograph with level 1 publisher and level 2 series
Given(
  'a curator looks at a NVI candidate with Category AcademicMonograph, level 1 publisher and level 2 series',
  () => {
    cy.login(TestUsers.nvi.usn.institution).then(() => {
      const title = `Monograph level 1 publisher level 2 series ${uuid()}`;
      cy.wrap(title).as('title');
      createPublicationUsingAPI(title, CategoryTypes.ACADEMIC_MONOGRAPH, USN_USER, NviLevels.LEVEL_1).then(
        (builder) => {
          builder.entityDescription.reference.publicationContext.publisher.id = channelIds['monograph level 1'];
          builder.entityDescription.reference.publicationContext.series.id = channelIds['series level 2'];
          builder.entityDescription.reference.publicationContext.series.type = 'Series';
          builder.update();
        }
      );
    });
  }
);
// When ('the curator reviews the NVI candidate', () => {});
// Then ('the NVI points should be calculated as "8.0"', () => {});
