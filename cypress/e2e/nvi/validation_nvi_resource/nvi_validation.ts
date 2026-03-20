// Feature: Validation of an NVI resource

import { BeforeAll, DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import {
  userBIBSYSNviCuratorInstitution,
  userUSNNviCuratorInstitution,
  userNtnuNviCurator,
  ContributorTypes,
  CategoryTypes,
  userName,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { NVI_APPROVED, NVI_ASSIGNED, NVI_DISPUTE, NVI_PENDING, NVI_REJECTED } from '../../../support/commands';
import {
  createEntityDescription,
  createPublicationUsingAPI,
  findContributorByName,
  NviLevels,
  registrationBuilder,
} from '../../../support/create_registration';

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
  // 'Candidate - Waiting for your institution Candidate Approved': '',
  'Being checked Being checked No status': '',
  // 'Being checked - Waiting for your institution Being checked Approved': '',
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
const nviYear = currentYear;

const curatorInstitutionA = 'Curator NVI-institution A TestUser';
const curatorInstitutionB = 'Curator NVI-institution B TestUser';

const userNVIB = 'Change User NVI-institution B TestUser';
const userNVIC = 'Access Verified contributor TestUser';

const approveCandidate = (title: string) => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.selectNVICandidate(title);
  cy.getDataTestId(dataTestId.tasksPage.nvi.approveButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.get('[title=Tasks]').click();
};

const checkingCandidate = (title: string, curator: string) => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.selectNVICandidate(title);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeSearchField).within(() =>
    cy.get('input').should('be.enabled')
  );
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeSearchField).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeSearchField).type(curator);
  cy.get('.MuiAutocomplete-option').click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.get('[title=Tasks]').click();
};

const rejectCandidate = (title: string) => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.selectNVICandidate(title);
  cy.getDataTestId(dataTestId.tasksPage.nvi.rejectButton).click();
  cy.getDataTestId(dataTestId.tasksPage.nvi.rejectionModalTextField).type('Reason for rejection');
  cy.getDataTestId(dataTestId.tasksPage.nvi.rejectionModalRejectButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.get('[title=Tasks]').click();
};

BeforeAll(() => {
  cy.login(userUSNNviCuratorInstitution).then(() => {
    Object.keys(titles).forEach((key) => {
      const NVItitle = `${key} ${uuid()}`;
      titles[key] = NVItitle;

      createPublicationUsingAPI(
        NVItitle,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userUSNNviCuratorInstitution],
        NviLevels.LEVEL_1
      ).then((builder) => {
        findContributorByName(curatorInstitutionA, ContributorTypes.CREATOR).then((contributorNVIA) => {
          findContributorByName(curatorInstitutionB, ContributorTypes.CREATOR).then((contributorNVIB) => {
            builder.addContributor(contributorNVIB).addContributor(contributorNVIA);
            if (key.endsWith('Dispute')) {
              findContributorByName(curatorInstitutionB, ContributorTypes.CREATOR).then((contributorNVIC) => {
                builder.addContributor(contributorNVIC);
              });
            }
            builder.update().then(() => {});
          });
        });
      });

      if (!key.startsWith('Candidate')) {
        cy.getDataTestId(dataTestId.header.tasksLink).click();
        cy.openNVIWorklist();
        if (key.startsWith('Approved') || key === 'Dispute Approved Rejected') {
          approveCandidate(NVItitle);
        } else if (key.startsWith('Being checked')) {
          checkingCandidate(NVItitle, curatorInstitutionA);
        } else if (key.startsWith('Rejected') || key === 'Dispute Rejected Approved') {
          rejectCandidate(NVItitle);
        }
      }
    });
  });

  cy.login(userBIBSYSNviCuratorInstitution);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();
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

  cy.login(userNtnuNviCurator);
  const disputeTitle = titles['Dispute Candidate Dispute'];
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();
  rejectCandidate(disputeTitle);
});

// Background:
Given('a logged-in User', () => {
  cy.login(userUSNNviCuratorInstitution);
  cy.getDataTestId(dataTestId.common.skeleton);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
});
Given('the User has the role "NVI-Curator" at an NVI-Institution', () => {});
Given('the User has navigated to the NVI section from the Tasks option in the main menu', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();
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
  cy.getDataTestId('status-filter');
});
// | objects        |
// | a progress bar |
// | Status menu    |

const statusSelection = {
  'Candidate': NVI_PENDING,
  'Candidate - Waiting for your institution': NVI_PENDING,
  'Being checked': NVI_ASSIGNED,
  'Being checked - Waiting for your institution': NVI_ASSIGNED,
  'Approved': NVI_APPROVED,
  'Approved - Waiting for other institution': NVI_APPROVED,
  'Rejected': NVI_REJECTED,
  'Rejected - Waiting for other institution': NVI_REJECTED,
  'Dispute': NVI_DISPUTE,
};

const availabilityFilter = {
  'Candidate - Waiting for your institution': 'pendingCollaboration',
  'Being checked - Waiting for your institution': 'assignedCollaboration',
  'Approved - Waiting for other institution': 'approvedCollaboration',
  'Rejected - Waiting for other institution': 'rejectedCollaboration',
};

// Scenario Outline: Check correct status
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
      cy.selectNVIStatus(statusSelection[status.toString()]);
      if (status.toString().endsWith('Waiting for your institution')) {
        cy.getDataTestId('availability-filter').click();
        cy.getDataTestId('availability-filter').within(() => {
          cy.get(`[data-value=${availabilityFilter[status.toString()]}]`).click();
        });
      }
      const titleKey = `${status} ${ownInstitution} ${otherInstitution}`;
      const title = titles[titleKey];
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchField).within(() => {
        cy.get('input').type(`{selectall}{del}${title}{enter}`);
      });
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
  cy.getDataTestId('show-reporting-status-button').should('exist');
});

// Scenario: Show reporting status
When('the User select "Show reporting status"', () => {
  cy.getDataTestId('show-reporting-status-button').click();
});
Then('the User see a table displaying status for the current open NVI-periode by default', () => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).within(() => {
    cy.get('input').should('have.value', nviYear);
  });
});
Then('the columns show NVI resource statuses', () => {
  const statuses = ['Candidate', 'Being checked', 'Approved', 'Rejected', 'Total number'];
  statuses.forEach((status) => {
    cy.get('th').should('contain', status);
  });
});
Then("the rows represent my institution's subunits", () => {});
Then('I can select to view any previous year', () => {});
Then('I has an export option', () => {
  cy.getDataTestId(dataTestId.common.exportButton).should('exist');
});
