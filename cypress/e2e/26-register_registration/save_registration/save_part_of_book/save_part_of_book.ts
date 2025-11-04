import { CategoryTypes, userUnitSavePartOfBook } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';
import { v4 as uuidv4 } from 'uuid';
import { Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';

const fields = [
  resourceTypeFields.partOf,
  resourceTypeFields.scientificField,
  resourceTypeFields.pagesFrom,
  resourceTypeFields.pagesTo,
];

const contributorRoles = ['Creator', 'ContactPerson', 'RightsHolder', 'RoleOther'];

const initData = () => {
  cy.login(userUnitSavePartOfBook);
  cy.createPublishedRegistration(`Antologi ${uuidv4()}`, CategoryTypes.BOOK_ANTHOLOGY);
  cy.createPublishedRegistration(`Antologi ${uuidv4()}`, CategoryTypes.RESEARCH_REPORT);
  cy.createPublishedRegistration(`Antologi ${uuidv4()}`, CategoryTypes.REPORT_BOOK_OF_ABSTRACT);
  cy.wait(20000);
};

BeforeAll(() => initData());

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Part of book
Given('Author begins registering a Registration', () => {
  const titleId = uuidv4();
  cy.wrap(titleId).as('titleId');
  cy.login(userUnitSavePartOfBook);
});
Given('selects {string}', (resourceType) => {
  cy.startWizardWithEmptyRegistration();
  cy.wrap(resourceType).as('resourceType');
});
Given('fill in values for all fields', () => {
  cy.get('@resourceType').then((resourceType) => {
    cy.fillInResourceType(resourceType.toString(), fields);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
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
  cy.get('@resourceType').then(() => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    fields.forEach((field) => {
      cy.checkField(field);
    });
    cy.checkContributors(contributorRoles);
  });
});

// | Subtype                   |
// | AcademicChapter            |
// | ChapterInReport           |
// | ChapterConferenceAbstract |
