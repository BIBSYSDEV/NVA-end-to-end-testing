// Feature: NVI candidates for publications in series

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, TestUsers } from '../../../support/constants';
import { v4 as uuid } from 'uuid';
import { createValidRegistrationWithType } from '../../../support/create_registration';
import { dataTestId } from '../../../support/dataTestIds';

//   Background:
Given('a user with an affiliation from an NVI-institution', () => {
  cy.login(TestUsers.nvi.usn.institution);
});

//   Scenario Outline: A user registrers a monograph in a series that is an NVI-candidate
When(
  'the user registrers a monograph with series {string} and publisher {string}',
  (series: string, publisher: string) => {
    const seriesText = series.toString() === 'isNviSeries' ? 'ACM Journal of Data and Information Quality' : 'SINTEF AS';
    const publisherText = publisher.toString() === 'isNviPublisher' ? 'Springer Nature' : 'SINTEF akademisk forlag';
    const title = `NVI monograph ${series.toString()} ${publisher.toString()} ${uuid()}`;
    cy.wrap(title).as('registrationTitle');
    cy.startWizardWithEmptyRegistration();
    createValidRegistrationWithType(title, CategoryTypes.ACADEMIC_MONOGRAPH);
    
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type(seriesText.toLowerCase());
    cy.contains(seriesText).click();
    
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type(publisherText.toLowerCase());
    cy.contains(publisherText).first().click();
    
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccessDone();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    cy.getSuccessDone();
    cy.wait(5000);
  }
);
Then('the publication is listed as an NVI-candidate for the institution the user is affiliated with', () => {
    cy.login(TestUsers.nvi.usn.curator) 
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
      When ('the user registrers an academic chapter with anthology in {string} and publisher {string}', (series: string, publisher: string) => {
        const seriesText = series.toString() === 'isNviSeries' ? 'ACM Journal of Data and Information Quality' : 'SINTEF AS';
        const publisherText = publisher.toString() === 'isNviPublisher' ? 'Springer Nature' : 'SINTEF akademisk forlag';
        const anthologyTitle = `NVI anthology ${series.toString()} ${publisher.toString()} ${uuid()}`;
        const chapterTitle = `NVI chapter ${series.toString()} ${publisher.toString()} ${uuid()}`;
        cy.wrap(chapterTitle).as('registrationTitle');
        cy.startWizardWithEmptyRegistration();
        createValidRegistrationWithType(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);
        cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type(seriesText.toLowerCase());
        cy.contains(seriesText).click();
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type(publisherText.toLowerCase());
        cy.contains(publisherText).first().click();
        cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
        cy.getSuccessDone();
        cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
        cy.getSuccessDone();

        cy.createPublishedChapter(chapterTitle, anthologyTitle);
        cy.wait(5000);
    });
    //   Then ('the publication is listed as an NVI-candidate for the institution the user is affiliated with', () => {});

    //   Examples:
    //     | Series         | Publisher         |
    //     | isNviSeries    | isNviPublisher    |
    //     | isNviSeries    | isNotNviPublisher |
    //     | isNotNviSeries | isNviPublisher    |