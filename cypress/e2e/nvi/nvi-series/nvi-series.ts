// Feature: NVI candidates for publications in series

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, TestUsers, userName } from '../../../support/constants';
import { v4 as uuid } from 'uuid';
import {
  createChapterInAnthologyUsingAPI,
  createPublicationUsingAPI,
  createValidRegistrationWithType,
  NviLevels,
} from '../../../support/create_registration';
import { dataTestId } from '../../../support/dataTestIds';

//   Background:
Given('a user with an affiliation from an NVI-institution', () => {
  cy.login(TestUsers.nvi.usn.institution);
});

//   Scenario Outline: A user registrers a monograph in a series that is an NVI-candidate
When(
  'the user registrers a monograph with series {string} and publisher {string}',
  (series: unknown, publisher: unknown) => {
    // const seriesText = series.toString() === 'isNviSeries' ? 'ACM Journal of Data and Information Quality' : 'SINTEF AS';
    const seriesLevel = (series as string) === 'isNviSeries' ? NviLevels.LEVEL_1 : NviLevels.LEVEL_0;
    // const publisherText = publisher.toString() === 'isNviPublisher' ? 'Springer Nature' : 'SINTEF akademisk forlag';
    const publiserLevel = (publisher as string) === 'isNviPublisher' ? NviLevels.LEVEL_1 : NviLevels.LEVEL_0;
    const title = `NVI monograph ${series.toString()} ${publisher.toString()} ${uuid()}`;
    cy.wrap(title).as('registrationTitle');
    createPublicationUsingAPI(
      title,
      CategoryTypes.ACADEMIC_MONOGRAPH,
      userName[TestUsers.nvi.usn.institution],
      publiserLevel,
      seriesLevel
    );

    // cy.startWizardWithEmptyRegistration();
    // createValidRegistrationWithType(title, CategoryTypes.ACADEMIC_MONOGRAPH);

    // cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
    // cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type(seriesText.toLowerCase());
    // cy.contains(seriesText).click();

    // cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type(publisherText.toLowerCase());
    // cy.contains(publisherText).first().click();

    // cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    // cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    // cy.getSuccessDone();
    // cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    // cy.getSuccessDone();
    // cy.wait(5000);
  }
);
Then('the publication is listed as an NVI-candidate for the institution the user is affiliated with', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.get<string>('@registrationTitle').then((title) => {
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.openNVIWorklist();
    cy.selectNVICandidate(title);
  });
});

// Examples:
//   | Series         | Publisher         |
//   | isNviSeries    | isNviPublisher    |
//   | isNviSeries    | isNotNviPublisher |
//   | isNotNviSeries | isNviPublisher    |

// Scenario Outline: A user registrers an academic chapter in a anthology that is an NVI-candidate
When(
  'the user registrers an academic chapter with anthology in {string} and publisher {string}',
  (series: unknown, publisher: unknown) => {
    // const publisherText = publisher.toString() === 'isNviPublisher' ? 'Springer Nature' : 'SINTEF akademisk forlag';
    const publisherLevel = (publisher as string) === 'isNviPublisher' ? NviLevels.LEVEL_1 : NviLevels.LEVEL_0;
    // const seriesText = series.toString() === 'isNviSeries' ? 'ACM Journal of Data and Information Quality' : 'SINTEF AS';
    const seriesLevel = (series as string) === 'isNviSeries' ? NviLevels.LEVEL_1 : NviLevels.LEVEL_0;
    const anthologyTitle = `NVI anthology ${series as string} ${publisher as string} ${uuid()}`;
    const chapterTitle = `NVI chapter ${series as string} ${publisher as string} ${uuid()}`;
    cy.wrap(chapterTitle).as('registrationTitle');
    createChapterInAnthologyUsingAPI(
      chapterTitle,
      anthologyTitle,
      userName[TestUsers.nvi.usn.institution],
      publisherLevel,
      seriesLevel
    );

    // cy.startWizardWithEmptyRegistration();
    // createValidRegistrationWithType(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);
    // cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
    // cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type(seriesText.toLowerCase());
    // cy.contains(seriesText).click();
    // cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type(publisherText.toLowerCase());
    // cy.contains(publisherText).first().click();
    // cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    // cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    // cy.getSuccessDone();
    // cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    // cy.getSuccessDone();

    // cy.createPublishedChapter(chapterTitle, anthologyTitle);
    // cy.wait(5000);
  }
);
//   Then ('the publication is listed as an NVI-candidate for the institution the user is affiliated with', () => {});

//   Examples:
//     | Series         | Publisher         |
//     | isNviSeries    | isNviPublisher    |
//     | isNviSeries    | isNotNviPublisher |
//     | isNotNviSeries | isNviPublisher    |
