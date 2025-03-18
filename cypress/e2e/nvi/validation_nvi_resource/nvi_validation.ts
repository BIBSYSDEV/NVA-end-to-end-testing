import { currentYear } from '../../../support/commands';
import { userNviCurator2 } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const filename = 'example.json';
const journalSearch = 'ACS chemical biology';

const year = currentYear.toString();

// Background:
Given('an logged-in Curator at an NVI-Institution', () => {
  const uuid = uuidv4();
  cy.wrap(uuid).as('uuid');
  const registrationTitle = `New NVI candidate ${uuid}`;
  cy.login(userNviCurator2);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(filename, registrationTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
  cy.wait(20000);
});

// Scenario: Curator views NVI-report status at own Institution
When('a Curator uses the option to view the NVI-Report status at own Institution', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year).click();

});
Then('the Curator sees a visualization of current progress compared with last year', () => { });
Then('it contains number of Validated Resources', () => { });
Then('it contains number of Nominated Resources', () => { });
Then('it contains number of Candidate Resources', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter.pendingRadio).within(() => {
    cy.contains('(');
    cy.contains('(0)').should('not.exist');
  });
});

// Scenario: Curator views list of Resources Validated for NVI-reporting
When('a Curator uses the option to view the list of Validated Resources', () => { });
Then(
  'the Curator sees a list of Resources that are Validated by all Institutions that are affiliated to the Resource by Authors',
  () => { }
);

// Scenario: Curator views a NVI-candidate
When('the Curator views the list of Candidates', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year).click();
});
When('select one of the Candidates', () => {
  cy.get('@uuid').then(uuid => {
    cy.getDataTestId('search-field').type(`{selectAll}${uuid}{enter}`);
    cy.get('section > ul > li > div > p > a').first().click();
  });
});
Then('the Curator can see the details of the Candidate', () => {
  cy.contains('Dialogue').should('be.visible');
});
Then('the calculated number of points for the Candidate', () => {
  cy.contains('Points')
    .parent()
    .parent()
    .parent()
    .within(() => {
      cy.contains('3.0');
    });
});
Then('the Curator have an option to approve the Candidate', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.approveButton);
});
Then('the Curator have an option to reject the Candidate', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.rejectButton);
});
Then('the Curator have an option to add a note to the Candidate', () => {
  cy.get('[data-testid=message-field]');
});

// Scenario: Curator approves NVI-candidate
When('a Curator views a NVI-candidate', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year).click();
  cy.get('@uuid').then((uuid) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`{selectAll}${uuid}{enter}`);
    cy.get('a').filter(`:contains(${uuid})`).click();
  });
});
When('uses the option to approve the NVI-candidate', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.approveButton).click();
  cy.contains('Approved');
});
Then('the NVI candidate is removed from the list of Candidate Resources', () => {
  cy.wait(5000);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter.pendingRadio).click();
  cy.get('@uuid').then((uuid) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`{selectAll}${uuid}{enter}`);
    cy.get('a').filter(`:contains(${uuid})`).should('not.exist');
  });
});
Then('is added to the list of approved Resources', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter.approvedRadio).click();
  cy.get('@uuid').then((uuid) => {
    cy.getDataTestId('search-field').type(`{selectAll}${uuid}{enter}`);
    cy.get('a').filter(`:contains(${uuid})`).should('be.visible');
  });
});

// Scenario: Curator rejects NVI-candidate
When('a Curator views a NVI-candidate', () => { });
When('uses the option to reject the NVI-candidate', () => {
  cy.get('button').filter(":contains('Reject')").click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.rejectionModalTextField).type('Candidate rejected');
  cy.getDataTestId(dataTestId.tasksPage.nvi.rejectionModalRejectButton).click();
});
Then('the NVI candidate is removed from the list of Candidate Resources', () => { });
Then('is added to the list of rejected Resources', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter.rejectedRadio).click();
  cy.get('@uuid').then((uuid) => {
    cy.get('a').filter(`:contains(${uuid})`).should('be.visible');
  });
});

// Scenario: Curator view to-do list of Resources Nominated to be part of the NVI-report
When('a Curator uses the option to view the list of Nominated Resources', () => { });
Then(
  'the Curator sees a list of Resources that are Validated by at least one other Institution, but not their Institution',
  () => { }
);
Then('there is an option to inspect the Resource', () => { });
Then('there is an option to Validate each Resource on behalf of their Institution', () => { });

// Scenario: Curator views complete list of Resources Nominated to be part of the NVI-report
When('a Curator uses the option to view the list Nominated Resources', () => { });
When('the Curator asserts that Resources Validated by own Institution should be listed', () => { });
Then(
  'the Curator sees a list of all Resources that are Validated by at least one other Institution, including their own Institution',
  () => { }
);
Then('there is an option to inspect the Resource', () => { });
Then('there is an option to Validate each Resource on behalf of their Institution', () => { });

// Scenario: Curator views list of NVI-report Candidates
When('a Curator uses the option to view the list Candidate Resources', () => { });
Then('the Curator sees a list of Resources that fulfill the criteria to be NVI Resources', () => { });
Then("the Resources have authors that are affiliated with the Curator's Institution", () => { });
Then('no other Institution has Validated the Resource', () => { });

// Scenario: Curator inspects a Resource from the list of Nominated Resources
Given('a Curator views the list of Resources Nominated to be part of the NVI-Report', () => { });
When('the Curator uses the option to view details about a Resource', () => { });
Then('the Curator sees a list with Validation statuses for all affiliated Institutions', () => { });
Then('there is an option to Validate the Resource on behalf of their Institution', () => { });

// Scenario: Remove NVI candidate on change
Given('an NVI candidate', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year).click();
  cy.get('@uuid').then((uuid) => {
    cy.getDataTestId('search-field').type(`{selectAll}${uuid}{enter}`);
    cy.get('a').filter(`:contains(${uuid})`).click();
  });
  cy.getDataTestId(dataTestId.tasksPage.nvi.approveButton).click();
  cy.contains('Approved');
});
When('one or more of the candidate-affecting fields are changed', () => {
  cy.getDataTestId('EditIcon').click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('the NVI candidate is no longer an NVI candidate', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalChip).within(() => {
    cy.getDataTestId('CancelIcon').click();
  });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('aftenposten');
  cy.contains('Aftenposten').last().click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalChip);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.contains('Registration updated successfully');
  cy.wait(5000);
});
Then('remove the NVI candidate from the NVI candidate list.', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter.approvedRadio).click();
  cy.get('@uuid').then((uuid) => {
    cy.get('a').filter(`:contains(${uuid})`).should('not.exist');
  });
});

// Scenario: Reset NVI candidate on change
Given('an NVI candidate', () => { });
When('one or more of the candidate-affecting fields are changed', () => { });
When('the NVI candidate is still a candidate', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalChip).within(() => {
    cy.getDataTestId('CancelIcon').click();
  });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('ACM Journal of Data and Information Quality');
  cy.contains('ACM Journal of Data and Information Quality (Print ISSN: 1936-1955, Online ISSN: 1936-1963)').last().click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalChip);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.contains('Registration updated successfully');
  cy.wait(10000);
});
Then('reset the approval status for all involved institutions for the NVI candidate.', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year).click();
  cy.get('@uuid').then((uuid) => {
    cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter.approvedRadio).click();
    cy.getDataTestId('search-field').type(`{selectAll}${uuid}{enter}`);
    cy.get('a').filter(`:contains(${uuid})`).should('not.exist');
    cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter.pendingRadio).click();
    cy.getDataTestId('search-field').type(`{selectAll}${uuid}{enter}`);
    cy.getDataTestId('nvi-candidates-list').within(() => {
      cy.get('a').filter(`:contains(${uuid})`).click();
    });
  });
});
Then('the points should be updated according to the new factors', () => {
  cy.contains('1.0');
});
