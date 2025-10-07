// Feature: Changing values in a NVI-candidate

import { NVI_PENDING } from '../../../support/commands';
import {
  userUSNChangeNviCuratorInstitution,
  userUSNNviCuratorInstitution,
  userUSNNviInstitution,
} from '../../../support/constants';
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

const changeToUnidentifiedUser = () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.addUnidentifiedContributor(unidentifiedContributor);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
};

const addContributor = (contributor: string) => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  if (contributor === externalContributor) {
    cy.addUnidentifiedContributor(contributor);
  } else {
    cy.addContributor(contributor);
  }
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
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
  cy.login(userUSNNviInstitution);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  titleRoots.forEach((titleRoot) => {
    titles[titleRoot] = [];
    collaborations.forEach((collaboration) => {
      const title = `${titleRoot} Manual ${collaboration} ${uuid()}`;
      titles[titleRoot][collaboration] = title;
      const category = titleRoot === titleNonScientificToScientific ? 'JournalReview' : 'AcademicArticle';
      cy.createPublishedRegistration(title, category);
      changeToUnidentifiedUser();
      if (collaboration !== noCollaboration) {
        addContributor(contributors[collaboration]);
      }
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
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${uuid}{enter}`);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchResultItem)
      .filter(`:contains(${title})`)
      .first()
      .within(() => {
        cy.get('a').filter(`:contains(${title})`).first().click();
      });
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
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.selectNVIStatus(NVI_PENDING);
    cy.getNVIWorklistItem(title.toString());
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
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.selectNVIStatus(NVI_PENDING);
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
  cy.login(userUSNNviInstitution);
  cy.createPublishedRegistration(createNVICandidateTitle, 'AcademicArticle');
  cy.login(userUSNNviCuratorInstitution);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter).click();
  cy.get('[data-value=pending]').click();
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
When('a User changes the publication channel to a level 2 publication channel', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('test');
  cy.contains('American Journal of Physiology - Gastrointestinal and Liver Physiology').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();
});
Then('the NVI points changes to reflect the new publication channel', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter).click();
  cy.get('[data-value=pending]').click();
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
  // lag antologi med nivå 1 publisher
  cy.login(userUSNNviCuratorInstitution);
  cy.createPublishedRegistration(anthologyTitle, 'BookAnthology');
  // lag vitenskapelig kapittel
  cy.createPublishedRegistration(chapterTitle, 'AcademicChapter');
  // legg til kapittel til antologi
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(anthologyTitle.toLowerCase());
  cy.contains(anthologyTitle).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();
  cy.getDataTestId(dataTestId.header.myPageLink).click();

  // sjekk NVI-poeng
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter).click();
  cy.get('[data-value=pending]').click();
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
When('a level 2 series is added to the anthology', () => {
  // legg serie til antologi med nivå 2
  cy.get('[title=Search]').click();
  const uuid = findUuid(anthologyTitle);

  cy.getDataTestId(dataTestId.startPage.searchField).type(`${uuid}{enter}`);
  cy.contains(anthologyTitle).last().click();
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type('geoscientific model development');
  cy.contains('Geoscientific Model Development').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();
});
Then('the NVI points changes to reflect the series added to the anthology', () => {
  // sjekk NVI-poeng
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.selectNVICandidate(chapterTitle, 'pending');
  cy.get('@points').then((points) => {
    cy.get('table')
      .filter(':contains("Points")')
      .within(() => {
        cy.contains(points.toString()).should('not.exist');
      });
  });
});
