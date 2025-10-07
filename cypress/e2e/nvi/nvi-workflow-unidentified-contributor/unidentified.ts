// Feature: NVI-candidates with unidentified users

import { userUSNChangeNviCuratorInstitution } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { todayDatePicker } from '../../../support/commands';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

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
    cy.startWizardWithEmptyRegistration();
  }
);
Given('the publication has at least one Author affiliated with an NVI institution', () => {
  cy.get('@type').then((type) => {
    cy.get('@channel').then((channel) => {
      const title = `NVI-candidate ${type} ${channel} ${uuid()}`;
      cy.wrap(title).as('title');
      cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type(`${title}`);
      cy.chooseDatePicker(
        `[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`,
        todayDatePicker()
      );
      cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(type.toString())).click();
      switch (channel.toString()) {
        case JOURNAL:
          cy.intercept('GET', '/publication-channels-v2/serial-publication?*', { fixture: 'channel_mock_serial.json' });
          cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('acs chemical');
          cy.contains('ACS Chemical Biology').click();
          break;
        case PUBLISHER:
          if (type.toString() === 'AcademicChapter') {
            cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(`Anthology NVI ${channel}`);
            cy.contains(`Anthology NVI ${channel}`).click();
          } else {
            cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('Det Norske Samlaget');
            cy.contains('Det Norske Samlaget').click();
          }
          cy.getDataTestId(dataTestId.registrationWizard.resourceType.scientificSubjectField).click();
          cy.contains('Art History').click();
          break;
        case SERIES:
          if (type.toString() === 'AcademicChapter') {
            cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(`Anthology NVI ${channel}`);
            cy.contains(`Anthology NVI ${channel}`).click();
          } else {
            cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('Norsk barnebokinstitutt');
            cy.contains('Norsk barnebokinstitutt').click();
            cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type(
              'Advances in Computer Science Research'
            );
            cy.contains('Advances in Computer Science Research').click();
          }
          cy.getDataTestId(dataTestId.registrationWizard.resourceType.scientificSubjectField).click();
          cy.contains('Art History').click();
          break;
      }
      cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
      cy.getDataTestId('CheckBoxOutlineBlankIcon').parent().click();
      cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).should(
        'be.enabled'
      );
      cy.refreshPublish();
    });
  });
});
When('the publication is not previously reported', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
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
