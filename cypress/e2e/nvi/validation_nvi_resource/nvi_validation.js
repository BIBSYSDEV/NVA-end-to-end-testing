import { userNviCurator } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';

const filename = 'example.json';
const registrationTitle = `New NVI candidate ${uuidv4()}`

// Background:
Given('an logged-in Curator at an NVI-Institution', () => {
  cy.login(userNviCurator);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(filename, registrationTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.wait(10000);
});

// Scenario: Curator views NVI-report status at own Institution
When('a Curator uses the option to view the NVI-Report status at own Institution', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
});
Then('the Curator sees a visualization of current progress compared with last year', () => { });
And('it contains number of Validated Resources', () => {
});
And('it contains number of Nominated Resources', () => { });
And('it contains number of Candidate Resources', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter.pendingRadio).within(() => {
    cy.contains('(');
    cy.contains('(0)').should('not.exist');
  });
});

// Scenario: Curator views list of Resources Validated for NVI-reporting
When('a Curator uses the option to view the list of Validated Resources', () => { });
Then('the Curator sees a list of Resources that are Validated by all Institutions that are affiliated to the Resource by Authors', () => { });


// Scenario: Curator views a NVI-candidate
When('the Curator views the list of Candidates', () => { });
And('select one of the Candidates', () => { });
Then('the Curator can see the details of the Candidate', () => { });
And('the calculated number of points for the Candidate', () => { });
And('the Curator have an option to approve the Candidate', () => { });

// Scenario: Curator approves NVI-candidate
When('a Curator views a NVI-candidate', () => { });
And('uses the option to approve the NVI-candidate', () => { });
Then('the NVI candidate is removed from the list of Candidate Resources', () => { });
And('is added to the list of approved Resources', () => { });


// Scenario: Curator view to-do list of Resources Nominated to be part of the NVI-report
When('a Curator uses the option to view the list of Nominated Resources', () => { });
Then('the Curator sees a list of Resources that are Validated by at least one other Institution, but not their Institution', () => { });
And('there is an option to inspect the Resource', () => { });
And('there is an option to Validate each Resource on behalf of their Institution', () => { });


// Scenario: Curator views complete list of Resources Nominated to be part of the NVI-report
When('a Curator uses the option to view the list Nominated Resources', () => { });
And('the Curator asserts that Resources Validated by own Institution should be listed', () => { });
Then('the Curator sees a list of all Resources that are Validated by at least one other Institution, including their own Institution', () => { });
And('there is an option to inspect the Resource', () => { });
And('there is an option to Validate each Resource on behalf of their Institution', () => { });


// Scenario: Curator views list of NVI-report Candidates
When('a Curator uses the option to view the list Candidate Resources', () => { });
Then('the Curator sees a list of Resources that fulfill the criteria to be NVI Resources', () => { });
And("the Resources have authors that are affiliated with the Curator's Institution", () => { });
And('no other Institution has Validated the Resource', () => { });


// Scenario: Curator inspects a Resource from the list of Nominated Resources
Given('a Curator views the list of Resources Nominated to be part of the NVI-Report', () => { });
When('the Curator uses the option to view details about a Resource', () => { });
Then('the Curator sees a list with Validation statuses for all affiliated Institutions', () => { });
And('there is an option to Validate the Resource on behalf of their Institution', () => { });
