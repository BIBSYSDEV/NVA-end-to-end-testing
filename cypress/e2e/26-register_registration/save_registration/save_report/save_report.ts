import { userUnitSaveReport } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';
import { v4 as uuidv4 } from 'uuid';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

const commonFields = [
  resourceTypeFields.publisher,
  resourceTypeFields.isbn,
  resourceTypeFields.pages,
  resourceTypeFields.seriesTitle,
  resourceTypeFields.seriesNumber,
];

const fields = {
  'ReportResearch': [...commonFields],
  'ReportPolicy': [...commonFields],
  'ReportWorkingPaper': [...commonFields],
  'ReportBookOfAbstract': [...commonFields],
  'ConferenceReport': [...commonFields],
  'ReportBasic': [...commonFields],
};

const commonContributorRoles = ['Creator', 'ContactPerson', 'RightsHolder', 'RoleOther'];

const reportContributorRoles = {
  'ReportResearch': [...commonContributorRoles],
  'ReportPolicy': [...commonContributorRoles],
  'ReportWorkingPaper': [...commonContributorRoles],
  'ReportBookOfAbstract': [...commonContributorRoles],
  'ConferenceReport': [...commonContributorRoles],
  'ReportBasic': [...commonContributorRoles],
};

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Report
Given('Author begins registering a Registration', () => {
  const titleId = uuidv4();
  cy.wrap(titleId).as('titleId');
  cy.login(userUnitSaveReport);
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
    const contributorRoles = reportContributorRoles[resourceType];
    cy.fillInContributors(contributorRoles);
  });
  cy.fillInCommonFields();
});
When('they saves Registration', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
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
      if (subkey !== 'tab' && subkey !== 'version') {
        const field = registrationFields[key][subkey];
        cy.checkField(field);
      }
    });
  });
  cy.get('@resourceType').then((type) => {
    const subtype = type.toString();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    fields[subtype].forEach((field) => {
      cy.checkField(field);
    });
    cy.checkContributors(reportContributorRoles[subtype]);
  });
});

// Examples:
// | Subtype              |
// | ReportResearch       |
// | ReportPolicy         |
// | ReportWorkingPaper   |
// | ReportBookOfAbstract |
// | ReportBasic          |
