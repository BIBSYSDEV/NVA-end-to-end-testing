import { CategoryTypes, userName, userUnitWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { landingPageFields } from '../../../support/data_testid_constants';
import { v4 as uuid } from 'uuid';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import {
  createProject,
  createPublicationUsingAPI,
  NviLevels,
  uploadFileToRegistration,
} from '../../../support/create_registration';

const landing_page_registration_title = `View Landing Page ${uuid()}`;
const fileName = 'example.txt';

// Scenario: NVA contains Reigstration
Given('there is a published Registration in NVA', () => {
  cy.login(userUnitWithAuthor).then(() => {
    createPublicationUsingAPI(
      landing_page_registration_title,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_0
    ).then((builder) => {
      uploadFileToRegistration(builder.identifier, fileName).then((file) => {
        builder.entityDescription.abstract = 'Test abstract';
        builder.entityDescription.tags.push('Keyword');
        builder.entityDescription.language = 'http://lexvo.org/id/iso639-3/nob';
        builder
          .addProject(createProject())
          .addFile(file)
          .update()
          .then(() => {});
      });
    });
  });
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
  cy.getDataTestId(dataTestId.frontPage.registrationsLink).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.searchFor(landing_page_registration_title);
});
Then('they see', (dataTable: DataTable) => {
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
Then('they see sharing Buttons for:', (dataTable: DataTable) => {
  // cy.testDataTestidList(dataTable, landingPageShareButtons);
});
// | Email    |
// | LinkedIn |
// | Facebook |
// | Twitter  |
