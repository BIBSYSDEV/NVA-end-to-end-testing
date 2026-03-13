// Feature: Scenario for NVI curator reports

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import {
  assignNVICandidate,
  ContributorType,
  createPublicationUsingAPI,
  findContributorByName,
  listNviCandidates,
  NviLevels,
  NviStatus,
  RegistrationData,
  updateNVICandidate,
} from '../../../support/create_registration';
import {
  CategoryTypes,
  ContributorTypes,
  TestUsers,
  userName,
  userNviCreatorUia,
  userNviCuratorUia,
  userNviCuratorVolda,
} from '../../../support/constants';
import { currentYear } from '../../../support/commands';
import { v4 as uuid } from 'uuid';

const UIA = 'https://api.e2e.nva.aws.unit.no/cristin/organization/201.0.0.0';
const UIA_ID = '201.0.0.0';
const VOLDA = 'https://api.e2e.nva.aws.unit.no/cristin/organization/223.0.0.0';
const VOLDA_ID = '223.0.0.0';

BeforeAll(() => {
  const approvedList: string[] = [];
  const rejectedList: string[] = [];
  const assignedList: string[] = [];
  const voldaApprovedList: string[] = [];
  const voldaRejectedList: string[] = [];
  const voldaAssignedList: string[] = [];
  cy.login(userNviCreatorUia).then(() => {
    createPublicationUsingAPI(
      `NVI UiA publication candidate ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then(() => {});
    createPublicationUsingAPI(
      `NVI UiA publication approved ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      approvedList.push(registrationBuilder.identifier);
    });
    createPublicationUsingAPI(
      `NVI UiA publication rejected ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      rejectedList.push(registrationBuilder.identifier);
    });
    createPublicationUsingAPI(
      `NVI UiA publication assigned ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      assignedList.push(registrationBuilder.identifier);
    });
    createPublicationUsingAPI(
      `NVI UiA candidate + Volda publication candidate ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA candidate + Volda publication approved ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      voldaApprovedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA candidate + Volda publication rejected ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      voldaRejectedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA candidate + Volda publication assigned ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      voldaAssignedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA assigned + Volda publication candidate ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      assignedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA assigned + Volda publication approved ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      assignedList.push(registrationBuilder.identifier);
      voldaApprovedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA assigned + Volda publication rejected ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      assignedList.push(registrationBuilder.identifier);
      voldaRejectedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA assigned + Volda publication assigned ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      assignedList.push(registrationBuilder.identifier);
      voldaAssignedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA approved + Volda publication candidate ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      approvedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA approved + Volda publication approved ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      approvedList.push(registrationBuilder.identifier);
      voldaApprovedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA approved + Volda publication rejected ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      approvedList.push(registrationBuilder.identifier);
      voldaRejectedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA approved + Volda publication assigned ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      approvedList.push(registrationBuilder.identifier);
      voldaAssignedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA rejected + Volda publication candidate ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      rejectedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA rejected + Volda publication approved ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      rejectedList.push(registrationBuilder.identifier);
      voldaApprovedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA rejected + Volda publication rejected ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      rejectedList.push(registrationBuilder.identifier);
      voldaRejectedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
    createPublicationUsingAPI(
      `NVI UiA rejected + Volda publication assigned ${uuid()}`,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userNviCreatorUia],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      rejectedList.push(registrationBuilder.identifier);
      voldaAssignedList.push(registrationBuilder.identifier);
      findContributorByName(userName[TestUsers.nvi.volda.creator], ContributorTypes.CREATOR).then((contributor) => {
        registrationBuilder.addContributor(contributor);
        registrationBuilder.update().then(() => {});
      });
    });
  });
  cy.login(userNviCuratorUia).then(() => {
    findContributorByName(userName[userNviCuratorUia], ContributorTypes.CURATOR).then(
      (contributor: ContributorType) => {
        const cristinId = `${contributor.identity.id.replace('https://api.e2e.nva.aws.unit.no/cristin/person/', '')}@${UIA_ID}`;
        cy.wrap(cristinId).as('uiaCuratorCristinId');
      }
    );
    listNviCandidates(UIA_ID, currentYear, '50').then((candidates) => {
      cy.wrap(candidates).as('uiaCandidates');
    });
    cy.get('@uiaCandidates').then((candidates) => {
      cy.get('@uiaCuratorCristinId').then((cristinId: unknown) => {
        candidates['hits'].forEach((candidate) => {
          if (approvedList.includes(candidate['publicationDetails']['identifier'])) {
            updateNVICandidate(candidate['identifier'], UIA, NviStatus.APPROVED).then(() => {});
          }
          if (rejectedList.includes(candidate['publicationDetails']['identifier'])) {
            updateNVICandidate(candidate['identifier'], UIA, NviStatus.REJECTED).then(() => {});
          }
          if (assignedList.includes(candidate['publicationDetails']['identifier'])) {
            assignNVICandidate(candidate['identifier'], UIA, cristinId as string).then(() => {});
          }
        });
      });
    });
  });
  cy.login(userNviCuratorVolda).then(() => {
    findContributorByName(userName[userNviCuratorVolda], ContributorTypes.CURATOR).then(
      (contributor: ContributorType) => {
        const cristinId = `${contributor.identity.id.replace('https://api.e2e.nva.aws.unit.no/cristin/person/', '')}@${VOLDA_ID}`;
        cy.wrap(cristinId).as('voldaCuratorCristinId');
      }
    );

    listNviCandidates(VOLDA_ID, currentYear, '50').then((candidates) => {
      cy.wrap(candidates).as('voldaCandidates');
    });
    cy.get('@voldaCandidates').then((candidates) => {
      cy.get('@voldaCuratorCristinId').then((cristinId: unknown) => {
        candidates['hits'].forEach((candidate) => {
          if (voldaApprovedList.includes(candidate['publicationDetails']['identifier'])) {
            updateNVICandidate(candidate['identifier'], VOLDA, NviStatus.APPROVED).then(() => {});
          }
          if (voldaRejectedList.includes(candidate['publicationDetails']['identifier'])) {
            updateNVICandidate(candidate['identifier'], VOLDA, NviStatus.REJECTED).then(() => {});
          }
          if (voldaAssignedList.includes(candidate['publicationDetails']['identifier'])) {
            assignNVICandidate(candidate['identifier'], VOLDA, cristinId as string).then(() => {});
          }
        });
      });
    });
  });
});
// });

//   Scenario: An NVI-curator examines the status reports
Given('an NVI-curator', () => {});
When('they open the NVI status reports', () => {});
Then('they see', () => {});
