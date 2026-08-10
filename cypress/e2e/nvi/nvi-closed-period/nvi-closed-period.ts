// Feature: Tests for closed NVI-periods

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';
import {
  closeNviPeriod,
  createDraftPublicationUsingAPI,
  createPublicationUsingAPI,
  listNviCandidates,
  NviLevels,
  NviStatus,
  openNviPeriod,
  RegistrationData,
  updateNVICandidate,
} from '../../../support/create_registration';
import {
  adminUserUnit,
  CategoryTypes,
  userName,
  userUnitInstAdmin,
  userUSNChangeNviCuratorInstitution,
  userUSNNviInstitution,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

const title = `Closed period candidate ${uuid()}`;

BeforeAll(() => {
  const lastYear = new Date().getFullYear() - 1;
  const USN = 'https://api.e2e.nva.aws.unit.no/cristin/organization/222.0.0.0';
  const USN_ID = '222.0.0.0';
  cy.login(adminUserUnit).then(() => {
    cy.wrap(openNviPeriod(lastYear.toString())).then(() => {});
  });
  cy.login(userUSNNviInstitution).then(() => {
    createDraftPublicationUsingAPI(
      title,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUSNNviInstitution],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.year = lastYear;
      registrationBuilder.update().then(() => {
        registrationBuilder.publish().then(() => {
          cy.wrap(listNviCandidates(USN_ID, lastYear.toString(), '50')).then((candidates) => {
            candidates['hits'].forEach((candidate) => {
              if (candidate['publicationDetails']['identifier'] === registrationBuilder.identifier) {
                cy.wrap(updateNVICandidate(candidate['identifier'], USN, NviStatus.APPROVED)).then(() => {});
              }
            });
          });
        });
      });
    });
  });
  cy.login(adminUserUnit).then(() => {
    cy.wrap(closeNviPeriod(lastYear.toString())).then(() => {});
  });
});

// Scenario: A curator tries to change NVI status
Given('an NVI-candidate reported in a closed NVI-period', () => {
  cy.login(userUSNChangeNviCuratorInstitution).then(() => {});
});
When('an NVI-curator tries to change NVI reporting status', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.get(`[data-value="${new Date().getFullYear() - 1}"]`).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
});
Then('they are not able to change that', () => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
  cy.get('body').then(($body) => {
    if ($body.find(`[data-testid="${dataTestId.tasksPage.nvi.candidatesList}"]`).length > 0) {
      cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList)
        .filter(`:contains(${title})`).should('not.exist');
      }
    });
  cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList)
    .filter(`:contains(${title})`)
    .within(() => {
      cy.get('a').first().click();
    });
  cy.get('p').filter(`:contains("The reporting period for this result is closed.")`);
});

//   Scenario: A user changes the metadata for the NVI-candidate
// Given('an NVI-candidate reported in a closed NVI-period', () => {});
When('a user changes the metadata for the NVI-candidate', () => {
  cy.searchFor(title as string);
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('Under dusken{enter}');
  cy.contains('Under dusken').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
});
Then('the NVI-status is not changed', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).filter(`:contains(${title})`);
});
