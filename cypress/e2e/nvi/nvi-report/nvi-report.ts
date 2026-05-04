// Feature: Reports from navigate

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import {
  CategoryTypes,
  ContributorTypes,
  TestUsers,
  userBIBSYSPublishNoRights,
  userName,
  userNviCreatorNord,
  userNviCuratorNord,
} from '../../../support/constants';
import {
  updateNVICandidate,
  createPublicationUsingAPI,
  findContributorByName,
  listNviCandidates,
  NviLevels,
  RegistrationData,
  NviStatus,
  ContributorType,
  assignNVICandidate,
} from '../../../support/create_registration';
import { v4 as uuid } from 'uuid';
import { list } from '@badeball/cypress-cucumber-preprocessor/pretty-reporter';
import { currentYear } from '../../../support/commands';
import { dataTestId } from '../../../support/dataTestIds';

const NORD_UNIVERSITET = 'https://api.e2e.nva.aws.unit.no/cristin/organization/204.0.0.0';
const NORD_UNIVERSITET_ID = '204.0.0.0';

BeforeAll(() => {
  const approvedList: string[] = [];
  const rejectedList: string[] = [];
  const assignedList: string[] = [];
  cy.login(userNviCreatorNord).then(() => {
    createPublicationUsingAPI(
      `NVI report publication article level 1 approved ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      approvedList.push(registrationBuilder.identifier);
    });
    createPublicationUsingAPI(
      `NVI report publication article level 1 rejected ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      rejectedList.push(registrationBuilder.identifier);
    });
    createPublicationUsingAPI(
      `NVI report publication article level 1 ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_1
    ).then(() => { });
    createPublicationUsingAPI(
      `NVI report publication article level 1 2 authors approved ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      approvedList.push(registrationBuilder.identifier);
      findContributorByName(userName[userBIBSYSPublishNoRights], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => { });
      });
    });
    createPublicationUsingAPI(
      `NVI report publication article level 1 2 authors ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      findContributorByName(userName[userBIBSYSPublishNoRights], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => { });
      });
    });
    createPublicationUsingAPI(
      `NVI report publication article level 2 approved ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_2
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      approvedList.push(registrationBuilder.identifier);
    });
    createPublicationUsingAPI(
      `NVI report publication article level 2 rejected ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_2
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      rejectedList.push(registrationBuilder.identifier);
    });
    createPublicationUsingAPI(
      `NVI report publication monograph level 1 ${uuid()}`,
      CategoryTypes.ACADEMIC_MONOGRAPH,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_1
    ).then(() => { });
    createPublicationUsingAPI(
      `NVI report publication monograph level 2 ${uuid()}`,
      CategoryTypes.ACADEMIC_MONOGRAPH,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_2
    ).then(() => { });
    createPublicationUsingAPI(
      `NVI report publication monograph level 2 approved ${uuid()}`,
      CategoryTypes.ACADEMIC_MONOGRAPH,
      userName[userNviCreatorNord],
      NviLevels.LEVEL_2
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      approvedList.push(registrationBuilder.identifier);
    });
  });
  cy.login(userNviCuratorNord).then(() => {
    cy.wrap(
      findContributorByName(userName[userNviCuratorNord], ContributorTypes.CURATOR).then(
        (contributor: ContributorType) => {
          const cristinId = `${contributor.identity.id.replace('https://api.e2e.nva.aws.unit.no/cristin/person/', '')}@${NORD_UNIVERSITET_ID}`;
          cy.wrap(listNviCandidates(NORD_UNIVERSITET_ID, currentYear, '50')).then((candidates) => {
            cy.log('NVI candidates', candidates);
            candidates['hits'].forEach((candidate) => {
              const publicationId = candidate['publicationDetails']['identifier'];
              const ticketId = candidate['identifier'];
              if (approvedList.includes(publicationId)) {
                cy.wrap(updateNVICandidate(ticketId, NORD_UNIVERSITET, NviStatus.APPROVED)).then(() => { });
              }
              if (rejectedList.includes(publicationId)) {
                cy.wrap(updateNVICandidate(ticketId, NORD_UNIVERSITET, NviStatus.REJECTED)).then(() => { });
              }
              if (assignedList.includes(publicationId)) {
                cy.wrap(assignNVICandidate(ticketId, NORD_UNIVERSITET, cristinId)).then(() => { });
              }
            });
          });
        }
      )
    );
  });
});

//   Scenario Outline: An administrator looks at reporting status
Given('an administrtor opens the NVI status page in master data', () => {
  cy.login(TestUsers.admins.app).then(() => {
    cy.getDataTestId(dataTestId.header.basicDataLink).click();
    cy.getDataTestId(dataTestId.basicData.nviPeriodsLink).click();
  });
});
When('they open the reporting status for the current year', () => {
  cy.getDataTestId('nvi-status-link').click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.get(`[data-value=${currentYear}]`).click();
});
When('they look at the data for {string}', (institution: string) => {
  cy.getDataTestId('nvi-filter-institution').type(institution, { delay: 10 });
  cy.wrap(institution).as('institution');
});
Then(
  'they see numbers for {string}, {string}, {string}, {string}, {string}, {string}, {string}:',
  (
    candidates: string,
    underControl: string,
    approved: string,
    rejected: string,
    twists: string,
    total: string,
    controlled: string
  ) => {
    cy.get('@institution').then((institution: unknown) => {
      cy.get('tr')
        .filter(`:contains(${institution as string})`)
        .within(() => {
          cy.get('td').eq(2).should('have.text', candidates);
          cy.get('td').eq(3).should('have.text', underControl);
          cy.get('td').eq(4).should('have.text', approved);
          cy.get('td').eq(5).should('have.text', rejected);
          cy.get('td').eq(6).should('have.text', twists);
          cy.get('td').eq(7).should('have.text', total);
          cy.get('td').eq(8).should('have.text', `${controlled}%`);
        });
    });
  }
);

// Examples:
//   | Institution                        | Candidates | Under control | Approved | Rejected | Twists | Total | Controlled |
//   | University of South-Eastern Norway |          7 |            92 |        0 |        3 |      3 |     1 |         85 |

//   Scenario: An administrator looks at publication points status
// Given('an administrtor opens the NVI status page in master data', () => {});
When('they open the publication points status for the current year', () => {
  cy.getDataTestId('nvi-publication-points-link').click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.get(`[data-value=${currentYear}]`).click();
});
// When('they look at the data for "<Institution>"', () => {});
Then(
  'they see numbers for {string}, {string}, {string}, {string}, {string}:',
  (approvedByUs: string, waitingForOthers: string, approvedByAll: string, publicationPoints: string, approved: string) => {
    cy.get('@institution').then((institution: unknown) => {
      cy.get('tr')
        .filter(`:contains(${institution as string})`)
        .within(() => {
          cy.get('td').eq(2).should('have.text', approvedByUs);
          cy.get('td').eq(3).should('have.text', waitingForOthers);
          cy.get('td').eq(4).should('have.text', approvedByAll);
          cy.get('td').eq(5).should('have.text', publicationPoints);
          cy.get('td').eq(6).should('have.text', `${approved}%`);
        });
    });

  }
);
    // Examples:
    //   | Institution | Approved by us | Waiting for others | Approved by all | Publication points | Approved |
    //   | Nord        |              4 |                  0 |               3 |                 12 |       23 |


//   Scenario: An curator exports file for NVI reporting status
Given('a curator in an NVI Institution', () => { });
When('they open the NVI reporting status', () => { });
When('they export the NVI reporting status', () => { });
Then('they get a file with the NVI reporting status in CSV-format with the correct data', () => { });

//   Scenario: An curator exports file for NVI publication points status
Given('a curator in an NVI Institution', () => { });
When('they open the NVI publication points status', () => { });
When('they export the NVI publication points status', () => { });
Then('they get a file with the NVI reporting status in CSV-format with the correct data', () => { });
