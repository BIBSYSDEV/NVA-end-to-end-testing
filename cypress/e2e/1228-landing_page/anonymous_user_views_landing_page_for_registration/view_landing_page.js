import { today } from '../../../support/commands';
import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { landingPageFields, landingPageShareButtons } from '../../../support/data_testid_constants';
import { v4 as uuid } from 'uuid';

const landing_page_registration_title = `View Landing Page ${uuid()}`;
const fileName = 'example.txt';

// Scenario: NVA contains Reigstration
Given('there is a published Registration in NVA', () => {
  cy.login(userWithAuthor);
  cy.createPublishedRegistration(landing_page_registration_title, null, fileName);
  cy.wait(5000);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.descriptionStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.tagField).type('Keyword{enter}');
  cy.getDataTestId(dataTestId.registrationWizard.description.languageField).click();
  cy.contains('Norwegian, bokmål').click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.description.projectSearchField).type('project for testing 20230512');
  cy.contains('Project for testing 20230512').click();

  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.wait(5000);
});


// @881
// Scenario: Anonymous User views Landing Page for Registration
When('an Anonymous user navigates to a Landing Page for a Resource', () => {
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.get(`[data-testid=${dataTestId.startPage.searchField}]`).type(`${landing_page_registration_title}{enter}`);
  cy.get('[data-testid=result-list-item]').filter(`:contains(${landing_page_registration_title})`).should('be.visible');
  cy.get('[data-testid=result-list-item]')
    .filter(`:contains(${landing_page_registration_title})`)
    .first()
    .within((result) => {
      cy.wrap(result).get('a').filter(`:contains(${landing_page_registration_title})`).click();
    });
});
Then('they see', (dataTable) => {
  cy.contains(landing_page_registration_title);
  cy.testDataTestidList(dataTable, landingPageFields);
});
// | Title                           |
// | Abstract                        |
// | NPI                             |
// | Keywords                        |
// | Publication date                |
// | Primary language                |
// | Projects                        |
// | Registration subtype            |
// | Fields corresponding to subtype |
// | Contributors                    |
// | Files                           |
// | DOI link                        |
// | Related Registrations           |
// | License                         |
And('they see sharing Buttons for:', (dataTable) => {
  // cy.testDataTestidList(dataTable, landingPageShareButtons);
});
// | Email    |
// | LinkedIn |
// | Facebook |
// | Twitter  |
