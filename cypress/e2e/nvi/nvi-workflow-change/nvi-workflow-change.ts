// Feature: Changing values in a NVI-candidate

import { userChangeNviCuratorInstitutionA, userNviInstitutionA } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';

const unidentifiedContributor = 'Change User NVI-institution A TestUser';
const NVIContributor = 'Change User NVI-institution B TestUser';
const NVAContributor = 'Change User NVA-institution C TestUser';
const externalContributor = 'External User';

const noCollaboration = 'No collaboration';
const NVICollaboration = 'NVI institution Collaboration';
const NVACollaboration = 'NVA institution Collaboration';
const externalCollaboration = 'external institution Collaboration';

const contributors = {
  'No collaboration': '',
  'NVI institution Collaboration': NVIContributor,
  'NVA institution Collaboration': NVAContributor,
  'external institution Collaboration': externalContributor,
};

let titleRoot = '';

const changeToUnidentifiedUser = () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.get(`[data-testid^=${dataTestId.registrationWizard.contributors.removeContributorButton('')}]`)
    .first()
    .click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.startPage.searchField).type(unidentifiedContributor);
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
};

const addContributor = (contributor: string) => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.startPage.searchField).type(contributor);
  if (contributor === externalContributor) {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  } else {
    cy.get('[role=dialog]').within(() => {
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor)
        .parent()
        .filter(`:contains(${contributor})`)
        .within(() => {
          cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
        });
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    });
  }
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
};

// Scenario Outline: Contributor changes from unidentified to identified
Given('a curator opens a Result that is a NVI-candidate with an unidentified contributor', () => {
  titleRoot = 'Change from unidentified to identified';
  cy.wrap('AcademicArticle').as('category');
});
Given('the Result is {string} registration', (source) => {
  cy.wrap(source).as('source');
});
Given('the Result is {string}', (collaboration: string) => {
  cy.get('@source').then((source) => {
    cy.get('@category').then((category) => {
      const title: string = `${titleRoot} ${source} ${collaboration} ${uuid()}`;
      cy.wrap(title).as('title');
      cy.login(userNviInstitutionA);
      cy.createPublishedRegistration(title, category.toString());
      changeToUnidentifiedUser();
      if (collaboration !== 'no Collaboration') {
        addContributor(contributors[collaboration]);
      }

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
    cy.getNVIWorklistItem(title.toString());
  });
});

// Examples:
//     | Source | Collaboration                      |
//     | Manual | no Collaboration                   |
//     | Import | no Collaboration                   |
//     | Manual | NVI institution Collaboration      |
//     | Import | NVI institution Collaboration      |
//     | Manual | NVA institution Collaboration      |
//     | Import | NVA institution Collaboration      |
//     | Manual | external institution Collaboration |
//     | Import | external institution Collaboration |

// Scenario Outline: Category changes from non-scientific to scientific
Given('a curator opens a non-scientific Result that is a NVI-candidate', () => {
  cy.login(userChangeNviCuratorInstitutionA);
  titleRoot = 'Change from non-scientific to scientific';
  cy.wrap('JournalReview').as('category');
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
  titleRoot = 'Change from scientific to non-scientific';
  cy.wrap('AcademicArticle').as('category');
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
  cy.login(userChangeNviCuratorInstitutionA);
  titleRoot = 'Change from non-scientific to scientific, unidentified to identified';
  cy.wrap('JournalReview').as('category');
});

// Scenario Outline: Category changes from scientific to non-scientific, contributor changes from unidentified to identified
Given('a curator opens a scientific Result that is a NVI-candidate with unidentified contributor', () => {
  cy.login(userChangeNviCuratorInstitutionA);
  titleRoot = 'Change from scientific to non-scientific, unidentified to identified';
  cy.wrap('AcademicArticle').as('category');
});
