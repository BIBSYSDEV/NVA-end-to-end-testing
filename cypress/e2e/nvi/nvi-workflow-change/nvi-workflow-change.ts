// Feature: Changing values in a NVI-candidate

import { NVI_PENDING } from '../../../support/commands';
import {
  CategoryTypes,
  ContributorTypes,
  userUSNChangeNviCuratorInstitution,
  userUSNNviCuratorInstitution,
  userUSNNviInstitution,
} from '../../../support/constants';
import {
  createPublicationUsingAPI,
  findContributorByName,
  NviLevels,
  RegistrationData,
  RegistrationPartTypes,
} from '../../../support/create_registration';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';

const unidentifiedContributor = 'Change User NVI-institution A TestUser';
const NVIContributor = 'Change User NVI-institution B TestUser';
const NVAContributor = 'Change User NVA-institution C TestUser';
const externalContributor = 'External User';

const noCollaboration = 'no Collaboration';
const NVICollaboration = 'NVI institution Collaboration';
const NVACollaboration = 'NVA institution Collaboration';
const externalCollaboration = 'external institution Collaboration';

const contributors = {
  'no Collaboration': '',
  'NVI institution Collaboration': NVIContributor,
  'NVA institution Collaboration': NVAContributor,
  'external institution Collaboration': externalContributor,
};

let titleRoot = '';
const USN_USER = 'User NVI-institution A TestUser';

const changeToUnidentifiedUser = (unidentifiedContributorName: string, builder: RegistrationData) => {
  builder.entityDescription.contributors = [];
  addUnidentifiedContributor(unidentifiedContributorName, builder);
};

const addUnidentifiedContributor = (unidentifiedContributorName: string, builder: RegistrationData) => {
  const squenceNumber = builder.entityDescription.contributors.length + 1;
  builder.entityDescription.contributors.push({
    identity: {
      type: RegistrationPartTypes.IDENTITY,
      id: '',
      name: unidentifiedContributorName,
      verificationStatus: 'NotVerified',
    },
    role: { type: ContributorTypes.CREATOR },
    affiliations: [],
    correspondingAuthor: false,
    sequence: squenceNumber,
    type: RegistrationPartTypes.CONTRIBUTOR,
  });
  builder.update().then(() => {});
};

const addContributor = (contributor: string, builder: RegistrationData) => {
  if (contributor === externalContributor) {
    addUnidentifiedContributor(contributor, builder);
  } else {
    findContributorByName(contributor, ContributorTypes.CREATOR).then((contributorData) => {
      builder.addContributor(contributorData);
      builder.update().then(() => {});
    });
  }
};

const findUuid = (title: string) => title.substring(title.lastIndexOf(' '));

const titleUnidentifiedToIdentifiedContributor = 'Change from unidentified to identified';
const titleNonScientificToScientific = 'Change from non-scientific to scientific';
const titleScientificToNonScientific = 'Change from scientific to non-scientific';

const titleRoots = [
  titleUnidentifiedToIdentifiedContributor,
  titleNonScientificToScientific,
  titleScientificToNonScientific,
];

const titles = {};

const collaborations = [noCollaboration, NVICollaboration, NVACollaboration, externalCollaboration];

BeforeAll(() => {
  cy.login(userUSNNviInstitution).then(() => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    titleRoots.forEach((titleRoot) => {
      titles[titleRoot] = [];
      collaborations.forEach((collaboration) => {
        const title = `${titleRoot} Manual ${collaboration} ${uuid()}`;
        titles[titleRoot][collaboration] = title;
        const category =
          titleRoot === titleNonScientificToScientific ? CategoryTypes.JOURNAL_REVIEW : CategoryTypes.ACADEMIC_ARTICLE;
        createPublicationUsingAPI(title, category, USN_USER, NviLevels.LEVEL_1).then((builder) => {
          if (titleRoot === titleUnidentifiedToIdentifiedContributor) {
            changeToUnidentifiedUser(unidentifiedContributor, builder);
          }
          if (collaboration !== noCollaboration) {
            addContributor(contributors[collaboration], builder);
          }
        });
      });
    });
  });
});

// Scenario Outline: Contributor changes from unidentified to identified
Given('a curator opens a Result that is a NVI-candidate with an unidentified contributor', () => {
  titleRoot = titleUnidentifiedToIdentifiedContributor;
  cy.wrap(titleRoot).as('titleRoot');
  cy.wrap('AcademicArticle').as('category');
});
Given('the Result is {string} registration', (source) => {
  cy.wrap(source).as('source');
});
Given('the Result is {string}', (collaboration: string) => {
  cy.get('@titleRoot').then((titleRoot) => {
    const title: string = titles[titleRoot.toString()][collaboration];
    const uuid = findUuid(title);
    cy.wrap(title).as('title');

    cy.login(userUSNChangeNviCuratorInstitution);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.searchFor(title);
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  });
});
When('the curator changes a contributor from unidentified to identified', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.get(
    `[data-testid="${dataTestId.registrationWizard.contributors.verifyContributorButton(unidentifiedContributor)}"]`
  ).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.get('[role=dialog]').within(() => {
    cy.get('td > div')
      .filter(`:contains(${unidentifiedContributor})`)
      .within(() => {
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
      });
  });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
});
When('saves the changes', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('not.exist');
});
Then('the Result is a NVI-candidate', () => {
  cy.get('@title').then((title) => {
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.openNVIWorklist();
    cy.getNVIWorklistItem(title.toString()).should('exist');
  });
});

// Examples:
//     | Source | Collaboration                      |
//     | Manual | no Collaboration                   |
//     | Manual | NVI institution Collaboration      |
//     | Manual | NVA institution Collaboration      |
//     | Manual | external institution Collaboration |

// Scenario Outline: Category changes from non-scientific to scientific
Given('a curator opens a non-scientific Result that is a NVI-candidate', () => {
  cy.login(userUSNChangeNviCuratorInstitution);
  titleRoot = titleNonScientificToScientific;
  cy.wrap(titleRoot).as('titleRoot');
});
When('the curator changes the Category from non-scientific to scientific', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('JournalReview')).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});

// Scenario Outline: Category changes from scientific to non-scientific
Given('a curator opens a scientific Result that is a NVI-candidate', () => {
  cy.login(userUSNChangeNviCuratorInstitution);
  titleRoot = titleScientificToNonScientific;
  cy.wrap(titleRoot).as('titleRoot');
});
When('the curator changes the Category from scientific to non-scientific', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('JournalReview')).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
});
Then('the Result is not a NVI-candidate', () => {
  cy.get('@title').then((title) => {
    const uuid = findUuid(title.toString());
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.openNVIWorklist();
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${uuid}{enter}`);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.get('main').then((doc) => {
      if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length > 0) {
        cy.wait(30000);
        cy.reload();
      }
      if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length > 0) {
        cy.wait(30000);
        cy.reload();
      }
    });
    cy.get('li').filter(`:contains(${title})`).should('not.exist');
  });
});

const createNVICandidateTitle = `NVI Change candidate ${uuid()}`;

// Scenario: Publication channel changes and NVI points changes
Given('an NVI-candidate with a level 1 publication channel', () => {
  cy.login(userUSNNviInstitution).then(() => {
    createPublicationUsingAPI(
      createNVICandidateTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      USN_USER,
      NviLevels.LEVEL_1
    );
    cy.login(userUSNNviCuratorInstitution).then(() => {
      cy.getDataTestId(dataTestId.header.tasksLink).click();
      cy.openNVIWorklist();
      cy.selectNVICandidate(createNVICandidateTitle);
      cy.get('table')
        .filter(':contains("Points")')
        .within(() => {
          cy.get('p')
            .last()
            .then(($p) => {
              cy.wrap($p.text()).as('points');
            });
        });
    });
  });
});
When('a User changes the publication channel to a level 2 publication channel', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('chemical');
  cy.contains('ACS Chemical Biology').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
});
Then('the NVI points changes to reflect the new publication channel', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();
  cy.selectNVICandidate(createNVICandidateTitle);
  cy.get('@points').then((points) => {
    cy.get('table')
      .filter(':contains("Points")')
      .within(() => {
        cy.contains(points.toString()).should('not.exist');
      });
  });
});

const anthologyTitle = `NVI change anthology ${uuid()}`;
const chapterTitle = `NVI change chapter ${uuid()}`;

// Scenario: Adding a series to an anthology where the series level is higher than the publisher of the anthology
Given('an anthology with a level 1 publisher', () => {
  cy.login(userUSNNviCuratorInstitution).then(() => {
    createPublicationUsingAPI(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY, USN_USER, NviLevels.LEVEL_1).then(
      (builder) => {
        const anthologyIdentifier = builder.identifier;
        cy.wrap(anthologyIdentifier).as('anthologyId');
      }
    );
    createPublicationUsingAPI(chapterTitle, CategoryTypes.ACADEMIC_CHAPTER, USN_USER, NviLevels.LEVEL_1).then(
      (builder) => {
        cy.get('@anthologyId').then((anthologyId: unknown) => {
          const anthology = anthologyId as string;
          builder.entityDescription.reference.publicationContext.id = `https://api.e2e.nva.aws.unit.no/publication/${anthologyId}`;
          builder.update();

          cy.getDataTestId(dataTestId.header.tasksLink).click();
          cy.openNVIWorklist();
          cy.selectNVICandidate(chapterTitle);
          cy.get('table')
            .filter(':contains("Points")')
            .within(() => {
              cy.get('p')
                .last()
                .then(($p) => {
                  cy.wrap($p.text()).as('points');
                });
            });
        });
      }
    );
  });
});
When('a level 2 series is added to the anthology', () => {
  // legg serie til antologi med nivå 2
  cy.get('[title=Search]').click();
  const uuid = findUuid(anthologyTitle);
  cy.location('href').should('include', '/filter');

  cy.searchFor(anthologyTitle);
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type('geoscientific model development');
  cy.contains('Geoscientific Model Development').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.wait(5000);
});
Then('the NVI points changes to reflect the series added to the anthology', () => {
  // sjekk NVI-poeng
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();
  cy.selectNVICandidate(chapterTitle, NVI_PENDING);
  cy.get('@points').then((points) => {
    cy.get('table')
      .filter(':contains("Points")')
      .within(() => {
        cy.contains(points.toString()).should('not.exist');
      });
  });
});
