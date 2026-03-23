import { CategoryTypes, userName, userUnitSaveJournal } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';
import { v4 as uuidv4 } from 'uuid';
import { Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import {
  createPublicationUsingAPI,
  NviLevels,
  registrationBuilder,
  RegistrationData,
} from '../../../../support/create_registration';

const commonFields = [
  resourceTypeFields.volume,
  resourceTypeFields.issue,
  resourceTypeFields.pagesFrom,
  resourceTypeFields.pagesTo,
  resourceTypeFields.articleNumber,
];

const fields = {
  'AcademicArticle': [...commonFields, resourceTypeFields.journal],
  'AcademicLiteratureReview': [...commonFields, resourceTypeFields.journal],
  'JournalLetter': [...commonFields, resourceTypeFields.journal],
  'JournalReview': [...commonFields, resourceTypeFields.journal],
  'JournalLeader': [...commonFields, resourceTypeFields.journal],
  'JournalCorrigendum': [...commonFields, resourceTypeFields.articleTitle],
  'JournalIssue': [...commonFields, resourceTypeFields.journal],
  'ConferenceAbstract': [...commonFields, resourceTypeFields.journal],
  'CaseReport': [...commonFields, resourceTypeFields.journal],
  'StudyProtocol': [...commonFields, resourceTypeFields.journal],
  'ProfessionalArticle': [...commonFields, resourceTypeFields.journal],
  'PopularScienceArticle': [...commonFields, resourceTypeFields.journal],
};

const contributorRoles = ['Creator', 'ContactPerson', 'RightsHolder', 'RoleOther'];

const initData = () => {
  cy.login(userUnitSaveJournal).then(() => {
    const originalPublication = `Original publication for corrigendum ${uuidv4()}`;
    createPublicationUsingAPI(
      originalPublication,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitSaveJournal],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const corrigendumBuilder = builder as RegistrationData;
      const corrigendumTitle = `Test article corrigendum ${uuidv4()}`;
      createPublicationUsingAPI(
        corrigendumTitle,
        CategoryTypes.JOURNAL_CORRIGENDUM,
        userName[userUnitSaveJournal],
        NviLevels.LEVEL_1,
        NviLevels.LEVEL_0,
        corrigendumBuilder.identifier
      ).then(() => {});
    });
    const articleForCorrigendumTitle = `Test article corrigendum ${uuidv4()}`;
    createPublicationUsingAPI(
      articleForCorrigendumTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitSaveJournal],
      NviLevels.LEVEL_1
    ).then(() => {});
  });
};

BeforeAll(() => initData());

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Publication in Journal
Given('Author begins registering a Registration', () => {
  const titleId = uuidv4();
  cy.wrap(titleId).as('titleId');
  cy.login(userUnitSaveJournal);
  cy.startWizardWithEmptyRegistration();
});
Given('selects {string}', (resourceType) => {
  cy.wrap(resourceType).as('resourceType');
});
Given('fill in values for all fields', () => {
  cy.get('@resourceType').then((type) => {
    const resourceType = type.toString();
    cy.fillInResourceType(resourceType, fields[resourceType]);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.fillInContributors(contributorRoles);
    const hasFileVersion = true;
    cy.fillInCommonFields(hasFileVersion);
  });
});
When('they saves Registration', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('be.enabled');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
});
Then('they can see the values on the Registration Landing Page', () => {
  cy.checkLandingPage();
});
Then('they can see the values in the Registration Wizard', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  Object.keys(registrationFields).forEach((key) => {
    cy.getDataTestId(registrationFields[key].tab).click();
    Object.keys(registrationFields[key]).forEach((subkey) => {
      if (subkey !== 'tab') {
        cy.get('@resourceType').then((type) => {
          const resourceType = type.toString();
          const field = registrationFields[key][subkey];
          if (
            subkey !== 'version' ||
            resourceType === CategoryTypes.ACADEMIC_ARTICLE ||
            resourceType === 'AcademicLiteratureReview'
          ) {
            cy.checkField(field);
          }
        });
      }
    });
  });
  cy.get('@resourceType').then((subtype) => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    fields[subtype.toString()].forEach((field) => {
      cy.checkField(field);
    });
    cy.checkContributors(contributorRoles);
  });
});

// Examples:
//     | Subtype            |
//     | AcademicArticle     |
//     | JournalLetter      |
//     | JournalReview      |
//     | JournalLeader      |
//     | JournalCorrigendum |
//     | JournalIssue       |
//     | ConferenceAbstract |
