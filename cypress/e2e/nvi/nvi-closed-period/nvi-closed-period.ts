// Feature: Tests for closed NVI-periods

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';
import {
  createDraftPublicationUsingAPI,
  createPublicationUsingAPI,
  listNviCandidates,
  NviLevels,
  NviStatus,
  RegistrationData,
  updateNVICandidate,
} from '../../../support/create_registration';
import {
  CategoryTypes,
  userName,
  userUSNChangeNviCuratorInstitution,
  userUSNNviInstitution,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

BeforeAll(() => {
  const lastYear = new Date().getFullYear() - 1;
  const USN = 'https://api.e2e.nva.aws.unit.no/cristin/organization/222.0.0.0';
  const USN_ID = '222.0.0.0';
  cy.login(userUSNNviInstitution).then(() => {
    const title = `Closed period candidate ${uuid()}`;
    cy.wrap(title).as('title');
    cy.wrap(
      createDraftPublicationUsingAPI(
        title,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userUSNNviInstitution],
        NviLevels.LEVEL_1
      )
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      registrationBuilder.entityDescription.publicationDate.year = lastYear;
      cy.wrap(registrationBuilder.update()).then(() => {
        cy.wrap(registrationBuilder.publish()).then(() => {
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
});

// Scenario: A curator tries to change NVI status
Given('an NVI-candidate reported in a closed NVI-period', () => {
  cy.login(userUSNChangeNviCuratorInstitution).then(() => {});
});
When('an NVI-curator tries to change NVI reporting status', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
});
Then('they are not able to change that', () => {});

//   Scenario: A user changes the metadata for the NVI-candidate
// Given('an NVI-candidate reported in a closed NVI-period', () => {});
When('a user changes the metadata for the NVI-candidate', () => {});
Then('the NVI-status is not changed', () => {});
