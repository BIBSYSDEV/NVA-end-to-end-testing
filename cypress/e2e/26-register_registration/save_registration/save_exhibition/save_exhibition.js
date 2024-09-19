import { userSaveExhibition } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';
import { v4 as uuidv4 } from 'uuid';

// Feature: Save registration for Exhibition
//     Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Exhibition

const fields = [
  resourceTypeFields.exhibitionProductionSubtype,
  resourceTypeFields.exhibitionProductionBasic,
  resourceTypeFields.exhibitionProductionMention,
  resourceTypeFields.exhibitionProductionOtherPresentation,
  // resourceTypeFields.exhibitionProductionCatalog,
];

const exhibitionContributorRoles = [
  'ProjectLeader',
  'Curator',
  'Conservator',
  'Registrar',
  'MuseumEducator',
  'CollaborationPartner',
  'ExhibitionDesigner',
  'Designer',
  'Writer',
  'Photographer',
  'AudioVisualContributor',
  'RoleOther',
];

Given('Author begins registering a Registration', () => {
  const titleId = uuidv4();
  cy.wrap(titleId).as('titleId');
  cy.login(userSaveExhibition);
  cy.startWizardWithEmptyRegistration();
});
And('selects {string}', (resourceType) => {
  cy.wrap(resourceType).as('resourceType');
});
And('fill in values for all fields', () => {
  cy.get('@resourceType').then((resourceType) => {
    cy.fillInResourceType(resourceType, fields);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.fillInContributors(exhibitionContributorRoles);
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
    fields.forEach((field) => {
      cy.checkField(field);
    });
    cy.checkContributors(exhibitionContributorRoles);
  });
});

//         Examples:
//             | Subtype               |
//             | Exhibition production |
