// Feature: NVI points calculations

import { Before, BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';
import { CategoryTypes, TestUsers } from '../../../support/constants';

//   Scenario Outline: Verify NVI points calculations for different NVI candidates
Given('a curator looks at a NVI candidate with Category {string} and NVI level {string}', (category, level) => {
  cy.login(TestUsers.nvi.usn.institution);
  const categoryText = category.toString();
  const levelText = level.toString();

  const title = `NVI Candidate ${categoryText} ${levelText} ${uuid()}`;
  cy.wrap(title).as('title');

  cy.createPublishedRegistration(title, categoryText);
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  if (levelText === 'Level 1') {
    switch (categoryText) {
      case 'AcademicLiteratureReview':
      case 'AcademicArticle':
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type(
          'acm journal of data and information quality{enter}'
        );
        cy.contains('ACM Journal of Data and Information Quality').click();
        break;
      case 'AcademicMonograph':
        break;
      default:
        throw new Error(`Unknown category: ${categoryText}`);
    }
  } else {
    switch (categoryText) {
      case 'AcademicLiteratureReview':
      case 'AcademicArticle':
        break;
      case 'AcademicMonograph':
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('harvard university press');
        cy.contains('Harvard University Press (HUP)').click();
        break;
      default:
        throw new Error(`Unknown category: ${categoryText}`);
    }
  }
});
Given(
  '{string} local contributors and {string} international contributors with {string} total contributors',
  (contributors, internationalContributors, totalContributors) => {
    if (internationalContributors.toString() === 'one or more') {
      cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('Foreign TestUser{enter}');
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    } else if (totalContributors.toString() === '2') {
      cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('Withauthor TestUser{enter}');
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    }
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccessDone();
    cy.wait(5000);
  }
);
When('the curator reviews the NVI candidate', () => {
  cy.get('@title').then((title) => {
    cy.login(TestUsers.nvi.usn.curator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
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
    cy.login(TestUsers.nvi.usn.institution);
    const publisherLevelString = publisherLevel.toString();
    cy.wrap(publisherLevelString).as('level');
  }
);
Given('NVI level {string} series', (series) => {
  cy.get('@level').then((level) => {
    const levelText = level.toString();
    const seriesText = series.toString();

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
    Given ('a curator looks at a NVI candidate with Category AcademicMonograph, level 1 publisher and level 2 series', () => {
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
    });
    // When ('the curator reviews the NVI candidate', () => {});
    // Then ('the NVI points should be calculated as "8.0"', () => {});
