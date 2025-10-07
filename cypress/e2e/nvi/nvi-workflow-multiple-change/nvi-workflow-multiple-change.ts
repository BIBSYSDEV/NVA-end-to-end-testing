// Feature: Changing values in a NVI-candidate

import { NVI_PENDING } from '../../../support/commands';
import { userUSNChangeNviCuratorInstitution, userUSNNviInstitution } from '../../../support/constants';
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

const titleNonScientificToScientificUnidentifiedToIdentified =
  'Change from non-scientific to scientific, unidentified to identified';
const titleScientificToNonScientificUnidentfiedToIdentified =
  'Change from scientific to non-scientific, unidentified to identified';

const titleRoots = [
  titleNonScientificToScientificUnidentifiedToIdentified,
  titleScientificToNonScientificUnidentfiedToIdentified,
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
      const category =
        titleRoot === titleNonScientificToScientificUnidentifiedToIdentified ? 'JournalReview' : 'AcademicArticle';
      cy.createPublishedRegistration(title, category);
      changeToUnidentifiedUser();
      if (collaboration !== noCollaboration) {
        addContributor(contributors[collaboration]);
      }
    });
  });
});

Given('the Result is {string} registration', (source) => {
  cy.wrap(source).as('source');
});
Given('the Result is {string}', (collaboration: string) => {
  cy.get('@titleRoot').then((titleRoot) => {
    const title: string = titles[titleRoot.toString()][collaboration];
    cy.wrap(title).as('title');

    cy.login(userUSNChangeNviCuratorInstitution);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
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

When('the curator changes the Category from non-scientific to scientific', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('JournalReview')).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
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
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.selectNVIStatus(NVI_PENDING);
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
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

// Scenario Outline: Category changes from non-scientific to scientific, contributor changes from unidentified to identified
Given('a curator opens a non-scientific Result that is a NVI-candidate with unidentified contributor', () => {
  cy.login(userUSNChangeNviCuratorInstitution);
  titleRoot = titleNonScientificToScientificUnidentifiedToIdentified;
  cy.wrap(titleRoot).as('titleRoot');
});

// Scenario Outline: Category changes from scientific to non-scientific, contributor changes from unidentified to identified
Given('a curator opens a scientific Result that is a NVI-candidate with unidentified contributor', () => {
  cy.login(userUSNChangeNviCuratorInstitution);
  titleRoot = titleScientificToNonScientificUnidentfiedToIdentified;
  cy.wrap(titleRoot).as('titleRoot');
});
