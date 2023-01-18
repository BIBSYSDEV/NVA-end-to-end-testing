// Feature: Curator navigates to the Landing Page for Registration

import { userCurator, userPublishRegistration } from "../../../support/constants";
import { dataTestId } from '../../../support/dataTestIds';

const fileName = 'example.txt';
const title = 'Curator published registration';

//   Scenario: Curator Approves a Publishing Request
Given('a Curator opens the Landing Page of a Registration', () => {
    cy.login(userPublishRegistration);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(fileName, title);
    cy.getDataTestId('button-save-registration').click();
    cy.getDataTestId('button-publish-registration', { timeout: 20000 }).click();
    cy.login(userCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
})
And('the Registration has a Publishing Request', () => {
    
 })
When('they approve the Publishing Request', () => { })
Then('the Registration is Published', () => { })
And('all files are Published', () => { })

//   Scenario: Curator Rejects a Publishing Request
Given('a Curator opens the Landing Page of a Registration', () => { })
And('the Registration has a Publishing Request', () => { })
When('they reject the Publishing Request', () => { })
Then('the Registration is "<RegistrationStatus>"', () => { })
And('all files are "<FileStatus>"', () => { })
// Examples:
//   | Workflow                              | RegistrationStatus | FileStatus  |
//   | Registrator can only publish metadata | Published          | Unpublished |
//   | Only Curator can publish              | Draft              | Unpublished |

//   Scenario: Curator Approves a DOI Request
Given('a Curator opens the Landing Page of a Registration', () => { })
And('the Registration is Published', () => { })
And('the Registration has a DOI Request', () => { })
When('they approve the DOI Request', () => { })
Then('the DOI is findable', () => { })

//   Scenario: Curator Rejects a DOI Request
Given('a Curator opens the Landing Page of a Registration', () => { })
And('the Registration is Published', () => { })
And('the Registration has a DOI Request', () => { })
When('they reject the DOI Request', () => { })
Then('the reserved DOI is removed from the Registration', () => { })