import { Given } from '@badeball/cypress-cucumber-preprocessor';
import {
  findContributorByName,
  registrationBuilder,
  createEntityDescription,
  uploadFileToRegistration,
} from '../../../support/create_registration';
import { CategoryTypes, ContributorTypes, TestUsers, userName } from '../../../support/constants';
import { v4 as uuid } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';

Given('I create a new registration', () => {
  cy.login(TestUsers.creators.basic).then(() => {
    registrationBuilder()
      .create()
      .then((builder) => {
        findContributorByName(userName[TestUsers.creators.basic], ContributorTypes.CREATOR).then((contributor) => {
          const category: CategoryTypes = CategoryTypes.ACADEMIC_ARTICLE;
          const entity = createEntityDescription(`Test ${category} ${uuid()}`, category, '1003');
          builder.addEntityDescription(entity).addContributor(contributor);
          builder.update().then();
          uploadFileToRegistration(builder.identifier, 'example.txt').then((fileUpload) => {
            builder.addFile(fileUpload);
            builder.update().then();
            cy.then(() => {
              builder.publish();
              cy.then(() => {
                cy.wait(3000); // Wait for 3 seconds to ensure the registration is processed
                cy.reload();
              });
            });
          });
        });
      });
      cy.searchFor('Publication');
  });
});
