import { And } from 'cypress-cucumber-preprocessor/steps';
import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import {
  contributors,
  contributorsCommon,
  registrationFields,
  resourceTypes,
} from '../../../support/save_registration';

// Feature: Creator sees registration is saved with correct values presented on landing page

// Scenario Outline:
Given('Author begins registering a registration', () => {
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
});
And('selects {string} and {string}', (type, subType) => {
  cy.wrap(type).as('type');
  cy.wrap(subType).as('subtype');
});
And('fill in values for all fields', () => {
  cy.get('@type').then((type) => {
    cy.get('@subtype').then((subtype) => {
      cy.fillInResourceType(type, subtype);
      cy.fillInContributors(type, subtype);
    });
  });
  cy.fillInCommonFields();
});
When('they saves registration', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
  cy.get('[data-testid="button-save-registration"]').click();
});
Then('they can see the values on the Registration Landing Page', () => {
  cy.checkLandingPage();
});
And('they can see the values in the registration wizard', () => {
  cy.get('[data-testid=button-edit-registration]').click();
  Object.keys(registrationFields).forEach((key) => {
    cy.get(`[data-testid=${registrationFields[key]['tab']}]`).click();
    Object.keys(registrationFields[key]).forEach((subkey) => {
      if (subkey !== 'tab') {
        const field = registrationFields[key][subkey];
        cy.checkField(field);
      }
    });
  });
  cy.get('@type').then((type) => {
    cy.get('@subtype').then((subtype) => {
      cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
      Object.keys(resourceTypes[type][subtype]).forEach((key) => {
        const field = resourceTypes[type][subtype][key];
        cy.checkField(field);
      });
      cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
      let fields = {};
      if (type in contributors) {
        fields = contributors[type];
      } else if (subtype in contributors) {
        fields = contributors[subtype];
      } else {
        fields = contributorsCommon;
      }
      Object.keys(fields).forEach((key) => {
        const field = fields[key];
        cy.get(`[data-testid=${field['fieldTestId'].replace('add-', '')}]`).within(() => {
          cy.contains(field['value']);
        });
      });
    });
  });
});
// | Resource Type | Subtype            |
// | Book          | BookMonograph      |
// | Book          | BookAnthology      |
// | Report        | ReportResearch     |
// | Report        | ReportPolicy       |
// | Report        | ReportWorkingPaper |
// | Report        | ReportBasic        |
// | Journal       | JournalArticle     |
// | Journal       | FeatureArticle     |
// | Journal       | JournalLetter      |
// | Journal       | JournalReview      |
// | Journal       | JournalLeader      |
// | Journal       | JournalCorrigendum |
// | Degree        | DegreeBachelor     |
// | Degree        | DegreeMaster       |
// | Degree        | DegreePhd          |
// | Degree        | OtherStudentWork   |
// | Chapter       | ChapterArticle     |
// | Event         | ConferenceLecture  |
// | Event         | ConferencePoster   |
// | Event         | Lecture            |
// | Event         | OtherPresentation  |
// | Artistic      | ArtisticDesign     |
