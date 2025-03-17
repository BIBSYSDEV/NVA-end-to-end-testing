import { userSaveResearchData } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';
import { v4 as uuidv4 } from 'uuid';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

const fields = {
  'DataManagementPlan': [
    resourceTypeFields.publisher,
    resourceTypeFields.relatedRegistrations,
    resourceTypeFields.externalLink,
  ],
  'DataSet': [
    resourceTypeFields.publisher,
    resourceTypeFields.geographicDescription,
    resourceTypeFields.relatedRegistrations,
    resourceTypeFields.relatedDMPs,
    resourceTypeFields.externalLink,
  ],
};

const commonContributorRoles = [
  'DataCollector',
  'DataCurator',
  'DataManager',
  'Distributor',
  'ContactPerson',
  'Editor',
  'RelatedPerson',
  'Researcher',
  'RightsHolder',
  'Supervisor',
  'RoleOther',
];

const researchContributorRoles = {
  'DataManagementPlan': ['Creator', ...commonContributorRoles],
  'DataSet': [...commonContributorRoles],
};

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Research data
Given('Author begins registering a Registration', () => {
  const titleId = uuidv4();
  cy.wrap(titleId).as('titleId');
  cy.login(userSaveResearchData);
});
Given('selects {string}', (resourceType: string) => {
  if (resourceType === 'DataManagementPlan') {
    cy.createPublishedRegistration(`Test Antologi ${uuidv4()}`, 'BookAnthology');
    cy.wait(10000);
    cy.createPublishedRegistration(`Test registration DMP ${uuidv4()}`, 'DataManagementPlan');
  }
  cy.startWizardWithEmptyRegistration();
  cy.wrap(resourceType).as('resourceType');
});
Given('fill in values for all fields', () => {
  cy.get('@resourceType').then((type) => {
    const resourceType = type.toString();
    cy.fillInResourceType(resourceType, fields[resourceType]);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    const contributorRoles = researchContributorRoles[resourceType];
    cy.fillInContributors(contributorRoles);
  });
  cy.fillInCommonFields();
});
When('they saves Registration', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('be.enabled');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
});
Then('they can see the values on the Registration Landing Page', () => {
  cy.checkLandingPage();
});
Then('they can see the values in the Registration Wizard', () => {
  cy.get('[data-testid=button-edit-registration]').click();
  Object.keys(registrationFields).forEach((key) => {
    cy.get(`[data-testid=${registrationFields[key].tab}]`).click();
    Object.keys(registrationFields[key]).forEach((subkey) => {
      if (subkey !== 'tab' && subkey !== 'version') {
        const field = registrationFields[key][subkey];
        cy.checkField(field);
      }
    });
  });
  cy.get('@resourceType').then((type) => {
    const subtype = type.toString();
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    fields[subtype].forEach((field) => {
      cy.checkField(field);
    });
    cy.checkContributors(researchContributorRoles[subtype]);
  });
});
