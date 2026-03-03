// Feature: Changing values in a NVI-candidate

import { NVI_PENDING } from '../../../support/commands';
import {
  CategoryTypes,
  ContributorTypes,
  userName,
  userUSNChangeNviCuratorInstitution,
  userUSNNviInstitution,
} from '../../../support/constants';
import {
  ContributorType,
  createPublicationUsingAPI,
  findContributorByName,
  NviLevels,
  RegistrationData,
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
  cy.login(userUSNNviInstitution).then(() => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    findContributorByName(unidentifiedContributor, ContributorTypes.CREATOR, true).then((unidentifiedUser) => {
      findContributorByName(NVIContributor, ContributorTypes.CREATOR).then((nviUser) => {
        findContributorByName(NVAContributor, ContributorTypes.CREATOR).then((nvaUser) => {
          findContributorByName(externalContributor, ContributorTypes.CREATOR, true).then((externalUser) => {
            titleRoots.forEach((titleRoot) => {
              titles[titleRoot] = [];
              collaborations.forEach((collaboration) => {
                const title = `${titleRoot} Manual ${collaboration} ${uuid()}`;
                titles[titleRoot][collaboration] = title;
                const category =
                  titleRoot === titleNonScientificToScientificUnidentifiedToIdentified
                    ? CategoryTypes.JOURNAL_REVIEW
                    : CategoryTypes.ACADEMIC_ARTICLE;
                const builder = createPublicationUsingAPI(
                  title,
                  category,
                  userName[userUSNNviInstitution],
                  NviLevels.LEVEL_1
                );
                cy.wrap(builder).as('registrationBuilder');
                cy.get('@registrationBuilder').then((regBuilder: unknown) => {
                  const builder = regBuilder as RegistrationData;
                  builder.entityDescription.contributors[0] = unidentifiedUser;
                  switch (collaboration) {
                    case NVICollaboration:
                      builder.addContributor(nviUser);
                      break;
                    case NVACollaboration:
                      builder.addContributor(nvaUser);
                      break;
                    case externalCollaboration:
                      builder.addContributor(externalUser);
                      break;
                  }
                  builder.update().then();
                });
              });
            });
          });
        });
      });
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
    cy.openNVIWorklist();
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
