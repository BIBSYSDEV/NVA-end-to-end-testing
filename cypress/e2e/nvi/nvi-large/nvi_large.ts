// Feature: Evaluate large NVI candidates

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, ContributorTypes, userName, userUSNNviInstitution } from '../../../support/constants';
import {
    createDraftPublicationUsingAPI,
  createPublicationUsingAPI,
  NviLevels,
  RegistrationData,
  RegistrationPartTypes,
} from '../../../support/create_registration';
import { v4 as uuid } from 'uuid';

//   Scenario: Evaluate publication with 10 000 contributors as NVI candidate
Given('a publication that fulfills all criteria for NVI reporting', () => {
  cy.login(userUSNNviInstitution).then(() => {
    const title = `Warmup ${uuid()}`;
    createPublicationUsingAPI(
      title,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUSNNviInstitution],
      NviLevels.LEVEL_1
    ).then((builder) => {});
    const title10000 = `Publication with 10000 contributors ${uuid()}`;
    createDraftPublicationUsingAPI(
      title10000,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUSNNviInstitution],
      NviLevels.LEVEL_1
    ).then((builder: unknown) => {
      const publicationBuilder = builder as RegistrationData;
      for (let i = 0; i < 10000; i++) {
        publicationBuilder.entityDescription.contributors.push({
          identity: {
            type: RegistrationPartTypes.IDENTITY,
            id: `https://example.org/${uuid()}`,
            name: `Contributor ${i}`,
            verificationStatus: 'Verified',
          },
          affiliations: [
            {
              type: RegistrationPartTypes.ORGANIZATION,
              id: 'https://api.e2e.nva.aws.unit.no/cristin/organization/10600030.0.0.0',
            },
          ],
          sequence: i + 1,
          role: { type: ContributorTypes.CREATOR },
          correspondingAuthor: false,
          type: RegistrationPartTypes.CONTRIBUTOR,
        });
      }
      publicationBuilder.update().then((builder: unknown) => {
        const updatedBuilder = builder as RegistrationData;
        updatedBuilder.publish().then(() => {});
      });
    });
  });
});
Given('the publication has 10 000 foreign contributors affiliated with a non-NVI organization', () => {});
When('the publication is evaluated as an NVI candidate', () => {});
Then('the evaluation completes within 300 seconds', () => {});
