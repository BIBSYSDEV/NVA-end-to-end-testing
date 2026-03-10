// Feature: Reports from navigate

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import {
  adminUserUnit,
  CategoryTypes,
  ContributorTypes,
  userBIBSYSNviCuratorInstitution,
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
import { currentYear } from '../../../support/commands';
import { dataTestId } from '../../../support/dataTestIds';

const NORD_UNIVERSITET_ID = '204.0.0.0';
const BIBSYS_ID = '5991.0.0.0';
const NORD_UNIVERSITET = `https://api.e2e.nva.aws.unit.no/cristin/organization/${NORD_UNIVERSITET_ID}`;
const BIBSYS = `https://api.e2e.nva.aws.unit.no/cristin/organization/${BIBSYS_ID}`;

const createNVICandidate = (title: string, level: NviLevels, multipleAuthors?: boolean) => {
  return new Cypress.Promise((resolve, reject) => {
    createPublicationUsingAPI(
      title,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorNord],
      level
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      if (multipleAuthors) {
        findContributorByName(userName[userBIBSYSPublishNoRights], ContributorTypes.CREATOR).then((contributor) => {
          registrationBuilder.addContributor(contributor);
          registrationBuilder.update().then(() => { });
        });
      }
      resolve(registrationBuilder.identifier);
    }).catch((error) => {
      reject(error);
    });
  });
}


const createCandidates = () => {
  const candidateList = [
    { title: `NVI report publication article level 1 ${uuid()}`, level: NviLevels.LEVEL_1 },
    { title: `NVI report publication article level 1 2 authors ${uuid()}`, level: NviLevels.LEVEL_1, multipleAuthors: true },
    { title: `NVI report publication article level 2 ${uuid()}`, level: NviLevels.LEVEL_2 },
    { title: `NVI report publication monograph level 1 ${uuid()}`, level: NviLevels.LEVEL_1 },
    { title: `NVI report publication monograph level 2 ${uuid()}`, level: NviLevels.LEVEL_2 },
  ];
  candidateList.forEach((candidate) => {
    createNVICandidate(candidate.title, candidate.level, candidate.multipleAuthors).then(() => { });
  });
}

const createApprovedPublications = () => {
  return new Cypress.Promise<string[]>((resolve) => {
    const approvedIdList: string[] = [];
    const approvedList = [
      { title: `NVI report publication article level 1 approved`, level: NviLevels.LEVEL_1 },
      { title: `NVI report publication article level 1 2 authors approved`, level: NviLevels.LEVEL_1, multipleAuthors: true },
      { title: `NVI report publication article level 2 approved`, level: NviLevels.LEVEL_2 },
      { title: `NVI report publication monograph level 2 approved`, level: NviLevels.LEVEL_2 },
    ];
    approvedList.forEach((candidate) => {
      createNVICandidate(`${candidate.title} ${uuid()}`, candidate.level, candidate.multipleAuthors).then((identifier: unknown) => {
        approvedIdList.push(identifier as string);
      });
    });
    resolve(approvedIdList);
  });
};

const createRejectedPublications = () => {
  return new Cypress.Promise<string[]>((resolve) => {
    const rejectedIdList: string[] = [];
    const rejectedList = [
      { title: `NVI report publication article level 1 rejected`, level: NviLevels.LEVEL_1 },
      { title: `NVI report publication article level 1 rejected`, level: NviLevels.LEVEL_1, multipleAuthors: true },
      { title: `NVI report publication article level 2 rejected`, level: NviLevels.LEVEL_2 },
    ];
    rejectedList.forEach((candidate) => {
      createNVICandidate(`${candidate.title} ${uuid()}`, candidate.level, candidate.multipleAuthors).then((identifier: unknown) => {
        rejectedIdList.push(identifier as string);
      });
    });
    resolve(rejectedIdList);
  });
}

const createAssignedPublications = () => {
  return new Cypress.Promise<string[]>((resolve) => {

    const assignedIdList: string[] = [];
    const assignedList = [
      { title: `NVI report publication article level 1 assigned`, level: NviLevels.LEVEL_1 },
      { title: `NVI report publication article level 1 2 authors assigned`, level: NviLevels.LEVEL_1, multipleAuthors: true },
    ];
    assignedList.forEach((candidate) => {
      createNVICandidate(`${candidate.title} ${uuid()}`, candidate.level, candidate.multipleAuthors).then((identifier: unknown) => {
        assignedIdList.push(identifier as string);
      });
    });
    resolve(assignedIdList);
  });
};

const createTwistPublications = () => {
  return new Cypress.Promise<string[]>((resolve) => {

    const twistIdList: string[] = [];
    const twistList = [
      { title: `NVI report publication article level 1 2 authors twist`, level: NviLevels.LEVEL_1, multipleAuthors: true },
      { title: `NVI report publication article level 1 2 authors twist`, level: NviLevels.LEVEL_1, multipleAuthors: true },
    ];
    twistList.forEach((candidate) => {
      createNVICandidate(`${candidate.title} ${uuid()}`, candidate.level, candidate.multipleAuthors).then((identifier: unknown) => {
        twistIdList.push(identifier as string);
      });
    });
    resolve(twistIdList);
  });
};

const createAllNVIPublications = () => {
  return new Cypress.Promise<{ approvedIds: string[]; rejectedIds: string[]; assignedIds: string[]; twistIds: string[] }>((resolve, reject) => {
    cy.login(userNviCreatorNord).then(() => {
    });
    createCandidates();
    createApprovedPublications().then((approvedIds) => {
      createRejectedPublications().then((rejectedIds) => {
        createAssignedPublications().then((assignedIds) => {
          createTwistPublications().then((twistIds) => {
            resolve({ approvedIds, rejectedIds, assignedIds, twistIds });
          });
        });
      });
    });
  });
}

BeforeAll(() => {

  createAllNVIPublications().then(({ approvedIds, rejectedIds, assignedIds, twistIds }) => {
    cy.login(userNviCuratorNord).then(() => {
      findContributorByName(userName[userNviCuratorNord], ContributorTypes.CURATOR).then((contributor: ContributorType) => {
        const cristinId = contributor.identity.id.replace('https://api.e2e.nva.aws.unit.no/cristin/person/', '');
        listNviCandidates(NORD_UNIVERSITET_ID, currentYear).then((candidates) => {
          candidates['hits'].forEach((candidate) => {
            const publicationId = candidate['publicationDetails']['identifier'];
            if (approvedIds.includes(publicationId) || twistIds.includes(publicationId)) {
              updateNVICandidate(candidate['identifier'], NORD_UNIVERSITET, NviStatus.APPROVED).then(() => { });
            }
            if (rejectedIds.includes(publicationId)) {
              updateNVICandidate(candidate['identifier'], NORD_UNIVERSITET, NviStatus.REJECTED).then(() => { });
            }
            if (assignedIds.includes(publicationId)) {
              assignNVICandidate(candidate['identifier'], NORD_UNIVERSITET, `${cristinId}@${NORD_UNIVERSITET_ID}`).then(() => { });
            }
          });
        });
      });
      cy.login(userBIBSYSNviCuratorInstitution).then(() => {
        listNviCandidates(BIBSYS_ID, currentYear).then((candidates) => {
          candidates['hits'].forEach((candidate) => {
            const publicationId = candidate['publicationDetails']['identifier'];
            if (twistIds.includes(publicationId)) {
              updateNVICandidate(candidate['identifier'], BIBSYS, NviStatus.REJECTED).then(() => { });
            }
          });
        });
      });
    });
  });
});

//   Scenario Outline: An administrator looks at reporting status
Given('an administrtor opens the NVI status page in master data', () => {
  cy.login(adminUserUnit).then(() => { });
  cy.getDataTestId(dataTestId.header.basicDataLink).click();
  cy.getDataTestId(dataTestId.basicData.nviPeriodsLink).click();
  cy.getDataTestId('nvi-status-link').click();
});
When('they open the reporting status for the current year', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click()
  cy.contains(currentYear.toString()).click();
});
When('they look at the data for {string}', (institution: string) => {
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
      cy.get('tr').filter(`:contains(${institution as string})`).within(() => {
        cy.get('td').eq(2).should('have.text', candidates);
        cy.get('td').eq(3).should('have.text', underControl);
        cy.get('td').eq(4).should('have.text', approved);
        cy.get('td').eq(5).should('have.text', rejected);
        cy.get('td').eq(6).should('have.text', twists);
        cy.get('td').eq(7).should('have.text', total);
        cy.get('td').eq(8).should('have.text', `${controlled}%`);
      });
    });
  });

// Examples:
//   | Institution     | Candidates | Under control | Approved | Rejected | Twists | Total | Controlled |
//   | Nord university |          7 |            92 |        0 |        3 |      3 |     1 |         85 |

// //   Scenario: An administrator looks at publication points status
// // Given('an administrtor opens the NVI status page in master data', () => {});
// When('they open the publication points status for the current year', () => { });
// // When('they look at the data for "<Institution>"', () => {});
// Then('they see numbers for "<Candidates>", "<Approved>", "<Publication points>", "<Controlled>"', () => { });

// // Examples:
// //   | Institution                        | Candidates | Approved | Publication points | Controlled |
// //   | University of South-Eastern Norway |          7 |        0 |                  1 |         85 |

// //   Scenario: An curator exports file for NVI reporting status
// Given('a curator in an NVI Institution', () => { });
// When('they open the NVI reporting status', () => { });
// When('they export the NVI reporting status', () => { });
// Then('they get a file with the NVI reporting status in CSV-format with the correct data', () => { });

// //   Scenario: An curator exports file for NVI publication points status
// Given('a curator in an NVI Institution', () => { });
// When('they open the NVI publication points status', () => { });
// When('they export the NVI publication points status', () => { });
// Then('they get a file with the NVI reporting status in CSV-format with the correct data', () => { });
