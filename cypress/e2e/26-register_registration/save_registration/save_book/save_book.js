import { userSaveBook } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';
import { v4 as uuidv4 } from 'uuid';

const fields = [
  resourceTypeFields.publisher,
  resourceTypeFields.scientificField,
  resourceTypeFields.isbn,
  resourceTypeFields.pages,
  resourceTypeFields.seriesTitle,
  resourceTypeFields.seriesNumber,
];

const commonContributorRoles = ['ContactPerson', 'RightsHolder', 'RoleOther'];

const bookContributorRoles = {
  'AcademicMonograph': ['Creator', ...commonContributorRoles],
  'NonFictionMonograph': ['Creator', ...commonContributorRoles],
  'PopularScienceMonograph': ['Creator', ...commonContributorRoles],
  'Textbook': ['Creator', ...commonContributorRoles],
  'Encyclopedia': ['Creator', ...commonContributorRoles],
  'ExhibitionCatalog': ['Creator', ...commonContributorRoles],
  'BookAnthology': ['Editor', ...commonContributorRoles],
};

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Book
Given('Author begins registering a Registration', () => {
  const titleId = uuidv4();
  cy.wrap(titleId).as('titleId');
  cy.login(userSaveBook);
  cy.startWizardWithEmptyRegistration();
});
And('selects {string}', (resourceType) => {
  cy.wrap(resourceType).as('resourceType');
});
And('fill in values for all fields', () => {
  cy.get('@resourceType').then((resourceType) => {
    cy.fillInResourceType(resourceType, fields);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    const contributorRoles = bookContributorRoles[resourceType];
    cy.fillInContributors(contributorRoles);
  });
  const hasFileVersion = true;
  cy.fillInCommonFields(hasFileVersion);
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
    cy.checkContributors(bookContributorRoles[subtype]);
  });
});

// Examples:
// | Subtype       |
// | AcademicMonograph |
// | BookAnthology |
