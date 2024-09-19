import { userSaveThesis } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';
import { v4 as uuidv4 } from 'uuid';

const commonFields = [resourceTypeFields.publisher, resourceTypeFields.pages];

const fields = {
  'DegreeBachelor': [...commonFields],
  'DegreeMaster': [...commonFields],
  'DegreePhd': [...commonFields, resourceTypeFields.isbn, resourceTypeFields.seriesTitle, resourceTypeFields.seriesNumber],
  'DegreeLicentiate': [...commonFields, resourceTypeFields.isbn, resourceTypeFields.seriesTitle, resourceTypeFields.seriesNumber],
  'OtherStudentWork': [...commonFields, resourceTypeFields.isbn],
};

const commonContributorRoles = ['Creator', 'Supervisor', 'ContactPerson', 'RightsHolder', 'RoleOther'];

const degreeContributorRoles = {
  'DegreeBachelor': [...commonContributorRoles],
  'DegreeMaster': [...commonContributorRoles],
  'DegreePhd': [...commonContributorRoles],
  'DegreeLicentiate': [...commonContributorRoles],
  'OtherStudentWork': [...commonContributorRoles],
};

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Thesis
Given('Author begins registering a Registration', () => {
  const titleId = uuidv4();
  cy.wrap(titleId).as('titleId');
  cy.login(userSaveThesis);
  cy.startWizardWithEmptyRegistration();
});
And('selects {string}', (resourceType) => {
  cy.wrap(resourceType).as('resourceType');
});
And('fill in values for all fields', () => {
  cy.get('@resourceType').then((resourceType) => {
    cy.fillInResourceType(resourceType, fields[resourceType]);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    const contributorRoles = degreeContributorRoles[resourceType];
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
  cy.get('@resourceType').then((subtype) => {
    cy.checkLandingPage(subtype);
  });
});
And('they can see the values in the Registration Wizard', () => {
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
  cy.get('@resourceType').then((subtype) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    fields[subtype].forEach((field) => {
      cy.checkField(field);
    });
    cy.checkContributors(degreeContributorRoles[subtype]);
  });
});
