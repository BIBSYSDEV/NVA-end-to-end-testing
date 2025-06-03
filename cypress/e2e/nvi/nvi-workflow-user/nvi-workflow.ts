// Feature: NVI workflow

import { dataTestId } from '../../../support/dataTestIds';
import { userNviCuratorInstitutionA, userNviInstitutionA } from '../../../support/constants';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';
import { NVI_PENDING } from '../../../support/commands';

const PUBLISHED = 'Published';
const DRAFT = 'Draft';
const NVI_INSTITUTION = 'NVI-institution';
const NVA_INSTITUTION = 'NVA-institution';
const EXTERNAL_INSTITUTION = 'external institution';
const NO_ONE = 'No one';

const NVI_USER = 'Change User NVI-institution B TestUser';
const NVA_USER = 'Change User NVA-institution C TestUser';
const EXTERNAL_USER = 'External User';

// Scenario Outline: Create testdata for NVI workflow - user
Given(
  'there is testdata for a NVI candidate with {string}, {string}, {string}, {string}, {string}',
  (
    category: string,
    publicationStatus: string,
    isCollaboration: string,
    typeOfRegistration: string,
    isNviPublication: string
  ) => {
    const title = `User ${typeOfRegistration} ${category} ${publicationStatus} ${isCollaboration} ${uuid()}`;
    cy.login(userNviInstitutionA);
    if (publicationStatus === PUBLISHED) {
      cy.createPublishedRegistration(title);
    } else {
      cy.startWizardWithEmptyRegistration();
      cy.createValidRegistration(null, title);
      cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
      cy.getSuccess();
      cy.getSuccessDone();
    }
    if (isCollaboration !== NO_ONE) {
      cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      if (isCollaboration === NVI_INSTITUTION) {
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${NVI_USER}`);
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor)
          .parent()
          .filter(`:contains(${NVI_USER})`)
          .getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor)
          .click();
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
      } else if (isCollaboration === NVA_INSTITUTION) {
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${NVA_USER}`);
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor)
          .parent()
          .filter(`:contains(${NVA_USER})`)
          .getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor)
          .click();
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
      } else if (isCollaboration === EXTERNAL_INSTITUTION) {
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${EXTERNAL_USER}`);
        cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
      }
      cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    }
  }
);

// Scenario Outline: Publication NVI status - user
Given('a Curator views the NVI-tasklist', () => {
  cy.login(userNviCuratorInstitutionA);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.selectNVIStatus(NVI_PENDING);
});
When('a Publication is a {string}', (category) => {
  cy.wrap(category).as('category');
});
When('the Publication has status {string}', (publicationStatus) => {
  cy.wrap(publicationStatus).as('publicationStatus');
});
When('the Publication is collaborating with {string}', (isCollaboration) => {
  cy.wrap(isCollaboration).as('isCollaboration');
});
When('the Publication is {string}', (typeOfRegistration) => {
  cy.wrap(typeOfRegistration).as('typeOfRegistration');
});
Then('the Publication has NVI status {string}', (isNviPublication) => {
  cy.get('@category').then((category) => {
    cy.get('@publicationStatus').then((publicationStatus) => {
      cy.get('@isCollaboration').then((isCollaboration) => {
        cy.get('@typeOfRegistration').then((typeOfRegistration) => {
          const title = `User ${typeOfRegistration} ${category} ${publicationStatus} ${isCollaboration}`;
          cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
          cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
          cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
          if (isNviPublication === 'NVI Publication') {
            cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).filter(`:contains(${title})`);
          } else {
            cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).should('not.exist');
          }
        });
      });
    });
  });
});

// Examples:
// | Category           | PublicationStatus | IsCollaboration      | TypeOfRegistration  | IsNviPublication    |
// | Scientific Article | Published         | No one               | Manual Registration | NVI Publication     |
// | Scientific Article | Published         | No one               | Import              | NVI Publication     |
// | Scientific Article | Draft             | No one               | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | No one               | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | No one               | Import              | Not NVI Publication |
// | Scientific Article | Published         | NVI-insitution       | Manual Registration | NVI Publication     |
// | Scientific Article | Published         | NVI-insitution       | Import              | NVI Publication     |
// | Scientific Article | Draft             | NVI-insitution       | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | NVI-insitution       | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | NVI-insitution       | Import              | Not NVI Publication |
// | Scientific Article | Published         | NVA-insitution       | Manual Registration | NVI Publication     |
// | Scientific Article | Published         | NVA-insitution       | Import              | NVI Publication     |
// | Scientific Article | Draft             | NVA-insitution       | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | NVA-insitution       | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | NVA-insitution       | Import              | Not NVI Publication |
// | Scientific Article | Published         | external institution | Manual Registration | NVI Publication     |
// | Scientific Article | Published         | external institution | Import              | NVI Publication     |
// | Scientific Article | Draft             | external institution | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | external institution | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | external institution | Import              | Not NVI Publication |
