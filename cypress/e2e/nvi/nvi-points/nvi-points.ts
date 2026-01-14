// Feature: NVI points calculations

import { Before, BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';
import { CategoryTypes, ContributorTypes, TestUsers } from '../../../support/constants';
import {
  createEntityDescription,
  findContributorByName,
  registrationBuilder,
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
};

const USN_USER = 'User NVI-institution A TestUser';

const createPublication = (title: string, category: CategoryTypes) => {
  const builder = registrationBuilder(Cypress.env('accessToken')).create();
  cy.wrap(builder).as('builder');
  cy.get('@builder').then((builder: unknown) => {
    const registrationBuilder = builder as RegistrationData;
    const entity = createEntityDescription(title, category, '1003');
    const contributorNVIUSN = findContributorByName(Cypress.env('accessToken'), USN_USER, ContributorTypes.CREATOR);

    cy.then(() => {
      registrationBuilder.addEntityDescription(entity).addContributor(contributorNVIUSN);
      cy.then(() => {
        registrationBuilder.update();
        cy.wrap(registrationBuilder).as('builder2');
        cy.then(() => {
          registrationBuilder.publish();
          // cy.wait(3000);
        });
      });
    });
  });
};

//   Scenario Outline: Verify NVI points calculations for different NVI candidates
Given('a curator looks at a NVI candidate with Category {string} and NVI level {string}', (category, level) => {
  cy.wrap(level.toString()).as('level');
  cy.wrap(category.toString()).as('category');
});
Given(
  '{string} local contributors and {string} international contributors with {string} total contributors',
  (contributors, internationalContributors, totalContributors) => {
    cy.login(TestUsers.nvi.usn.institution).then(() => {
      cy.get('@category').then((category: unknown) => {
        cy.get('@level').then((level: unknown) => {
          const categoryText = categories[category as string];
          const levelText = level.toString();

          const title = `NVI Candidate ${categoryText} ${levelText} ${uuid()}`;
          cy.wrap(title).as('title');

          // cy.createPublishedRegistration(title, categoryText);
          createPublication(title, categoryText);
          cy.get('@builder2').then((builder: unknown) => {
            const registrationBuilder = builder as RegistrationData;
            if (levelText === 'Level 1') {
              switch (categoryText) {
                case CategoryTypes.ACADEMIC_REVIEW_ARTICLE:
                case CategoryTypes.ACADEMIC_ARTICLE:
                  registrationBuilder.entityDescription.reference.publicationContext.id = channelIds['article level 1'];
                  registrationBuilder.update();
                  cy.then(() => {
                    // cy.wait(3000);
                  });
                  break;
                case CategoryTypes.ACADEMIC_MONOGRAPH:
                  registrationBuilder.entityDescription.reference.publicationContext.publisher.id =
                    channelIds['monograph level 1'];
                  registrationBuilder.update();
                  cy.then(() => {
                    // cy.wait(3000);
                  });
                  break;
                default:
                  throw new Error(`Unknown category: ${categoryText}`);
              }
            } else {
              switch (categoryText) {
                case CategoryTypes.ACADEMIC_REVIEW_ARTICLE:
                case CategoryTypes.ACADEMIC_ARTICLE:
                  registrationBuilder.entityDescription.reference.publicationContext.id = channelIds['article level 2'];
                  registrationBuilder.update();
                  cy.then(() => {
                    // cy.wait(3000);
                  });
                  break;
                case CategoryTypes.ACADEMIC_MONOGRAPH:
                  registrationBuilder.entityDescription.reference.publicationContext.publisher.id =
                    channelIds['monograph level 2'];
                  registrationBuilder.update();
                  cy.then(() => {
                    // cy.wait(3000);
                  });
                  break;
                default:
                  throw new Error(`Unknown category: ${categoryText}`);
              }
            }
            cy.wrap(registrationBuilder).as('builder');
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
              const contributor = findContributorByName(
                Cypress.env('accessToken'),
                contributorName,
                ContributorTypes.CREATOR
              );
              cy.then(() => {
                registrationBuilder.addContributor(contributor);
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
  }
);
Given('NVI level {string} series', (series) => {
  cy.get('@level').then((level) => {
    const levelText = level.toString();
    const seriesText = series.toString();

    cy.login(TestUsers.nvi.usn.institution).then(() => {
      const anthologyTitle = `NVI candidate Anthology ${levelText} series ${seriesText} ${uuid()}`;
      const chapterTitle = `NVI candidate AcademicChapter ${levelText} series ${seriesText} ${uuid()}`;
      cy.wrap(chapterTitle).as('title');

      cy.login(TestUsers.nvi.usn.institution);
      cy.createPublishedRegistration(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);

      if (levelText === 'Level 2') {
        cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('harvard university press');
        cy.contains('Harvard University Press (HUP)').click();
        cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
        cy.getSuccessDone();
      }

      if (seriesText !== 'Unconfirmed') {
        const seriesTitle =
          seriesText === 'Level 1'
            ? 'Geoscientific Instrumentation, Methods and Data Systems'
            : 'Geoscientific Model Development';
        cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type(seriesTitle.toLowerCase());
        cy.contains(seriesTitle).click();
        cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
        cy.getSuccessDone();
      }

      cy.createPublishedChapter(chapterTitle, anthologyTitle);
      cy.wait(5000);
      cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
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
    cy.login(TestUsers.nvi.usn.institution);
    const title = `Monograph level 1 publisher level 2 series ${uuid()}`;
    cy.wrap(title).as('title');
    cy.createPublishedRegistration(title, CategoryTypes.ACADEMIC_MONOGRAPH);
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type('geoscientific model development');
    cy.contains('Geoscientific Model Development').click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccessDone();
    cy.wait(5000);
  }
);
// When ('the curator reviews the NVI candidate', () => {});
// Then ('the NVI points should be calculated as "8.0"', () => {});
