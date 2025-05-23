// Feature: Validation of an NVI resource

import { BeforeAll, DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userNviCuratorInstitutionB, userNviCuratorInstitutionA, userNviCurator } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';

const nviFields = {
  'Search': dataTestId.startPage.searchField,
  'Curator': dataTestId.tasksPage.curatorSelector,
  'Area of responsibility': dataTestId.tasksPage.areaOfResponsibilitySelector,
  'Exclude subunits': dataTestId.tasksPage.nvi.excludeSubunitsCheckbox,
  'Year': dataTestId.tasksPage.nvi.yearSelect,
  'List of candidates': dataTestId.tasksPage.nvi.candidatesList,
};

const titles = {
  'Candidate Candidate No status': '',
  'Candidate - Waiting for your institution Candidate Approved': '',
  'Being checked Being checked No status': '',
  'Being checked - Waiting for your institution Being checked Approved': '',
  'Approved Approved No status': '',
  'Approved - Waiting for other institution Approved Being checked': '',
  'Rejected Rejected No status': '',
  'Rejected - Waiting for other institution Rejected Candidate or Being checked': '',
  'Dispute Rejected Approved': '',
  'Dispute Approved Rejected': '',
  'Dispute Candidate Dispute': '',
};

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const nviYear = currentMonth < 4 ? currentYear - 1 : currentYear;

const curatorInstitutionA = 'Curator NVI-institution A TestUser';
const curatorInstitutionB = 'Curator NVI-institution B TestUser';

const userNVIB = 'Change User NVI-institution B TestUser';
const userNVIC = 'Access Verified contributor TestUser';

const approveCandidate = (title: string) => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`{selectall}{del}${title}{enter}`);
  cy.selectNVICandidate(title);
  cy.getDataTestId(dataTestId.tasksPage.nvi.approveButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.get('[title=Tasks]').click();
};

const checkingCandidate = (title: string, curator: string) => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`{selectall}{del}${title}{enter}`);
  cy.selectNVICandidate(title);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeSearchField).type(curator);
  cy.get('.MuiAutocomplete-option').click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.get('[title=Tasks]').click();
};

const rejectCandidate = (title: string) => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`{selectall}{del}${title}{enter}`);
  cy.selectNVICandidate(title);
  cy.getDataTestId(dataTestId.tasksPage.nvi.rejectButton).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.rejectionModalTextField).type('Reason for rejection');
  cy.getDataTestId(dataTestId.tasksPage.nvi.rejectionModalRejectButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.get('[title=Tasks]').click();
};

BeforeAll(() => {
  cy.login(userNviCuratorInstitutionA);

  Object.keys(titles).forEach((key) => {
    const NVItitle = `${key} ${uuid()}`;
    titles[key] = NVItitle;
    cy.createPublishedRegistration(NVItitle);
    if (!key.endsWith('No status')) {
      cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
      cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
      cy.addContributor(userNVIB);
      if (key.endsWith('Dispute')) {
        cy.addContributor(userNVIC);
      }
      cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
      cy.getSuccess();
      cy.getSuccessDone();
      if (!key.startsWith('Candidate')) {
        cy.getDataTestId(dataTestId.header.tasksLink).click();
        cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
        if (key.startsWith('Approved') || key === 'Dispute Approved Rejected') {
          approveCandidate(NVItitle);
        } else if (key.startsWith('Being checked')) {
          checkingCandidate(NVItitle, curatorInstitutionA);
        } else if (key.startsWith('Rejected') || key === 'Dispute Rejected Approved') {
          rejectCandidate(NVItitle);
        }
      }
    }
  });

  cy.login(userNviCuratorInstitutionB);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  Object.keys(titles).forEach((key) => {
    const title = titles[key];
    if (key.endsWith('Approved') || key === 'Dispute Candidate Dispute') {
      approveCandidate(title);
    } else if (key.endsWith('Rejected')) {
      rejectCandidate(title);
    } else if (key.endsWith('Being checked')) {
      checkingCandidate(title, curatorInstitutionB);
    }
  });

  cy.login(userNviCurator);
  const disputeTitle = titles['Dispute Candidate Dispute'];
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  rejectCandidate(disputeTitle);
});

// Background:
Given('a logged-in User', () => {
  cy.login(userNviCuratorInstitutionA);
  cy.getDataTestId(dataTestId.common.skeleton);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
});
Given('the User has the role "NVI-Curator" at an NVI-Institution', () => {});
Given('the User has navigated to the NVI section from the Tasks option in the main menu', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
});

// Scenario: List of fields on NVI page
When('the User sees the NVI section', () => {
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).within(() => {
    cy.get('button').should('have.class', 'Mui-expanded');
  });
});
Then('the following fields are visible:', (fields: DataTable) => {
  fields.raw().forEach((field) => {
    cy.getDataTestId(nviFields[field[0]]);
  });
});
// | field                 |
// | Search                |
// | Curator               |
// | Area of responsibility|
// | Exclude subunits      |
// | Year                  |
// | List of candidates    |
Then('the Year field is set to the currently open NVI period by default', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).within(() => {
    cy.get('input').should('have.value', nviYear);
  });
});
Then('the Curator field is set to none by default', () => {
  cy.getDataTestId(dataTestId.tasksPage.curatorSelector).within(() => {
    cy.get('input').should('not.have.value');
  });
});
Then('the Area of responsibility field reflects my curator permissions', () => {});

// Scenario: Menu on NVI page
When('the User navigate to the Task page', () => {});
Then('a menu containing following objects are visable:', () => {
  cy.get('[role=progressbar');
  cy.get('[id=nvi-status-select]');
});
// | objects        |
// | a progress bar |
// | Status menu    |

const statusSelection = {
  'Candidate': dataTestId.tasksPage.nvi.statusFilter.pendingRadio,
  'Candidate - Waiting for your institution': dataTestId.tasksPage.nvi.statusFilter.pendingCollaborationRadio,
  'Being checked': dataTestId.tasksPage.nvi.statusFilter.assignedRadio,
  'Being checked - Waiting for your institution': dataTestId.tasksPage.nvi.statusFilter.assignedCollaborationRadio,
  'Approved': dataTestId.tasksPage.nvi.statusFilter.approvedRadio,
  'Approved - Waiting for other institution': dataTestId.tasksPage.nvi.statusFilter.approvedCollaborationRadio,
  'Rejected': dataTestId.tasksPage.nvi.statusFilter.rejectedRadio,
  'Rejected - Waiting for other institution': dataTestId.tasksPage.nvi.statusFilter.rejectedCollaborationRadio,
  'Dispute': dataTestId.tasksPage.nvi.statusFilter.disputeRadio,
};

// Scenario Outline:
When('the User select a status', () => {});
When("the Resources have authors that are affiliated with the Curator's Institution", () => {});
When('the authors affiliation is within the Users Area of responibiliy', () => {});
When('status for own institution is {string}', (ownInstitution) => {
  cy.wrap(ownInstitution).as('ownInstitution');
});
When('status for other institutions is {string}', (otherInstitution) => {
  cy.wrap(otherInstitution).as('otherInstitution');
});
Then('the Results are listed under {string}', (status) => {
  cy.get('@ownInstitution').then((ownInstitution) => {
    cy.get('@otherInstitution').then((otherInstitution) => {
      cy.getDataTestId(statusSelection[status.toString()]).click();
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      const titleKey = `${status} ${ownInstitution} ${otherInstitution}`;
      const title = titles[titleKey];
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).should('contain', title);
    });
  });
});

// Examples:
// | Status                                      | Own institution | Other institutions         |
// | Candidate                                   | Candidate       | No status                  |
// | Candidate - Waiting for your institution    | Candidate       | Approved                   |
// | Being checked                               | Being checked   | No status                  |
// | Being checked - Waiting for your institution| Being checked   | Approved                   |
// | Approved                                    | Approved        | No status                  |
// | Approved - Waiting for other institution    | Approved        | Being checked              |
// | Rejected                                    | Rejected        | No status                  |
// | Rejected - Waiting for other institution    | Rejected        | Candidate or Being checked |
// | Dispute                                     | Rejected        | Approved                   |
// | Dispute                                     | Approved        | Rejected                   |
// | Dispute                                     | Candidate       | Dispute                    |

// Scenario: The progress bar display the current NVI-report status
When('the User wish to see details', () => {});
Then('the User may select "Show reporting status"', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.toggleStatusLink).should('exist');
});

// Scenario: Show reporting status
When('the User select "Show reporting status"', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.toggleStatusLink).click();
});
Then('the User see a table displaying status for the current open NVI-periode by default', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).within(() => {
    cy.get('input').should('have.value', nviYear);
  });
});
Then('the columns show NVI resource statuses', () => {
  const statuses = [
    'Candidate',
    'Being checked',
    'Approved',
    'Rejected',
    'Total number',
    'Publication points',
    'Dispute',
  ];
  statuses.forEach((status) => {
    cy.get('th').should('contain', status);
  });
});
Then("the rows represent my institution's subunits", () => {});
Then('I can select to view any previous year', () => {});
Then('I has an export option', () => {
  cy.getDataTestId(dataTestId.common.exportButton).should('exist');
});
