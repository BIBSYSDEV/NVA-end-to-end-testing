// Feature: Changing values in a NVI-candidate

import { userChangeNviCuratorInstitutionA, userNviInstitutionA } from '../../../support/constants';
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
  cy.login(userNviInstitutionA);
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
    console.log(title);
    cy.wrap(title).as('title');

    cy.login(userChangeNviCuratorInstitutionA);
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
    cy.getDataTestId('status-filter').click();
    cy.getDataTestId('status-filter').within(() => {
      cy.get('[data-value=pending]').click();
    })
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
  cy.login(userChangeNviCuratorInstitutionA);
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
  cy.login(userChangeNviCuratorInstitutionA);
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
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId('status-filter').click();
    cy.getDataTestId('status-filter').within(() => {
      cy.get('[data-value=pending]').click();
    })
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
