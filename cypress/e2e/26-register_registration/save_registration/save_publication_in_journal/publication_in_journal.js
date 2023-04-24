import { userSaveJournal } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';

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

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Publication in Journal
Given('Author begins registering a Registration', () => {
  cy.login(userSaveJournal);
  cy.startWizardWithEmptyRegistration();
});
And('selects {string}', (resourceType) => {
  cy.wrap(resourceType).as('resourceType');
});
And('fill in values for all fields', () => {
  cy.get('@resourceType').then((resourceType) => {
    cy.fillInResourceType(resourceType, fields[resourceType]);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.fillInContributors(contributorRoles);
    const hasFileVersion = resourceType === 'AcademicArticle';
    cy.fillInCommonFields(hasFileVersion);
  });
});
When('they saves Registration', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
});
Then('they can see the values on the Registration Landing Page', () => {
  cy.get('@resourceType').then((subtype) => {
    cy.checkLandingPage(subtype);
  });
});
And('they can see the values in the Registration Wizard', () => {
  cy.get('[data-testid=button-edit-registration]').click();
  Object.keys(registrationFields).forEach((key) => {
    cy.get(`[data-testid=${registrationFields[key].tab}]`).click();
    Object.keys(registrationFields[key]).forEach((subkey) => {
      if (subkey !== 'tab') {
        cy.get('@resourceType').then((resourceType) => {
          const field = registrationFields[key][subkey];
          if (subkey !== 'version' || resourceType === 'AcademicArticle') {
            cy.checkField(field);
          }
        });
      }
    });
  });
  cy.get('@resourceType').then((subtype) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    fields[subtype].forEach((field) => {
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
