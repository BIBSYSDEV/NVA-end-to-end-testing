// Feature: NVI-candidates with unidentified users

import { CategoryTypes, userName, userUSNChangeNviCuratorInstitution } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { todayDatePicker } from '../../../support/commands';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  createChapterInAnthologyUsingAPI,
  createPublicationUsingAPI,
  NviLevels,
} from '../../../support/create_registration';

// Scenario: Identify publication as NVI candidate

const fileName = 'example.txt';
const JOURNAL = 'journal';
const PUBLISHER = 'publisher';
const SERIES = 'series';

Given('a publication of {string} published in the active period', (type) => {
  cy.login(userUSNChangeNviCuratorInstitution);
  cy.wrap(type).as('type');
});
Given(
  'the publication has at least one publication channel of type {string} with scientific level of one or two',
  (channel) => {
    cy.wrap(channel).as('channel');
    // cy.startWizardWithEmptyRegistration();
  }
);
Given('the publication has at least one Author affiliated with an NVI institution', () => {
  cy.get('@type').then((type: unknown) => {
    cy.get('@channel').then((channel: unknown) => {
      const title = `NVI-candidate ${type as string} ${channel as string} ${uuid()}`;
      cy.wrap(title).as('title');

      switch (type as string) {
        case CategoryTypes.ACADEMIC_ARTICLE:
        case CategoryTypes.ACADEMIC_REVIEW_ARTICLE:
          createPublicationUsingAPI(
            title,
            type as CategoryTypes,
            userName[userUSNChangeNviCuratorInstitution],
            NviLevels.LEVEL_1
          ).then();
          break;
        case CategoryTypes.ACADEMIC_MONOGRAPH:
        case CategoryTypes.ACADEMIC_COMMENTARY:
          type === SERIES
            ? createPublicationUsingAPI(
                title,
                type as CategoryTypes,
                userName[userUSNChangeNviCuratorInstitution],
                NviLevels.LEVEL_1,
                NviLevels.LEVEL_1
              ).then()
            : createPublicationUsingAPI(
                title,
                type as CategoryTypes,
                userName[userUSNChangeNviCuratorInstitution],
                NviLevels.LEVEL_1
              ).then();
          break;
        case CategoryTypes.ACADEMIC_CHAPTER:
          const anthologyTitle = `Anthology NVI ${channel as string} ${uuid()}`;
          type === SERIES
            ? createChapterInAnthologyUsingAPI(
                title,
                anthologyTitle,
                userName[userUSNChangeNviCuratorInstitution],
                NviLevels.LEVEL_1,
                NviLevels.LEVEL_1
              )
            : createChapterInAnthologyUsingAPI(
                title,
                anthologyTitle,
                userName[userUSNChangeNviCuratorInstitution],
                NviLevels.LEVEL_1
              );
          break;
      }
    });
  });
});
When('the publication is not previously reported', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();
});
Then('the publication is identified as an NVI candidate', () => {
  cy.get('@title').then((title) => {
    cy.getNVIWorklistItem(title.toString());
  });
});

// Examples:
//   | Type                                     | Channel   |
//   | AcademicArticle                          | journal   |
//   | AcademicChapter (published in Anthology) | publisher |
//   | AcademicChapter (published in Anthology) | series    |
//   | AcademicLiteratureReview                 | journal   |
//   | AcademicMonograph                        | publisher |
//   | AcademicMonograph                        | series    |
//   | AcademicCommentary                       | publisher |
//   | AcademicCommentary                       | series    |

// Scenario: Institution can approve/reject when all their contributors are identified

Given('a publication identified as an NVI candidate', () => {});
Given('Institution A is an NVI institution', () => {});
Given('all Authors affiliated with Institution A are identified', () => {});
Then('Institution A can approve or reject the candidate', () => {});

// Scenario: Institution cannot approve/reject when they have any non-identified contributors

Given('a publication identified as an NVI candidate', () => {});
Given('Institution A is an NVI institution', () => {});
Given('Institution A has at least one non-identified Author', () => {});
Then('Institution A cannot approve or reject the candidate', () => {});

// Scenario: NVI points per institution include only identified contributors

Given('a publication identified as an NVI candidate', () => {});
Given('Institution A is an NVI institution', () => {});
Given('Institution A has both identified and non-identified Authors', () => {});
Then('the calculated NVI points for Institution A will include the shares of their identified contributors', () => {});
Then('will not include the shares of their non-identified contributors', () => {});

// Scenario: NVI points are recalculated when the number of identified contributors changes

Given('a publication identified as an NVI candidate', () => {});
Given('Institutions A and B are NVI institutions', () => {});
Given('Institution B has at least one identified Author', () => {});
When('the number of identified Authors affiliated with Institution A changes', () => {});
Then('the NVI points for Institution A are recalculated accordingly', () => {});
Then('the NVI points for Institution B remain unchanged', () => {});

// Scenario: Handle deadlocks when period closes

Given('a publication identified as an NVI candidate', () => {});
Given('Institutions A and B are NVI institutions', () => {});
Given('all Authors affiliated with Institution A are identified', () => {});
Given('Institution B has at least one unidentified Author', () => {});
When('the active period closes and NVI points are reported', () => {});
Then('Institution A is awarded NVI-points', () => {});
Then('Institution B is not awarded NVI-points', () => {});
