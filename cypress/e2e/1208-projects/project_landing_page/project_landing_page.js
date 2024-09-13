// // Feature: Project Landing Page

import { userCurator, userProjectManager } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

const panelHeadings = {
  'Participants': 'Project participants',
  'Associated Projects': 'Related projects',
};

const users = {
  'Project Manager': userProjectManager,
};

const panelIds = {
  'Summary': dataTestId.projectLandingPage.scientificSummaryAccordion,
  'Participants': dataTestId.projectLandingPage.participantsAccordion,
  'Results': dataTestId.projectLandingPage.resultsAccordion,
  'Associated Projects': dataTestId.projectLandingPage.relatedProjectsAccordion,
}

const projectTitle = 'Test project 16617fb0-3c7a-470e-83bf-e5a55e005d74';
const selectProject = (user) => {
  cy.login(user);
  cy.contains('Result').click();
  cy.get('[data-value=project]').click();
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${projectTitle}{enter}`);
  cy.contains(projectTitle).click();
};

// Scenario: An Anonymous User searches for a Project
Given('An Anonymous User is on the NVA start page', () => {
  cy.setLocalStorage('i18nextLng', 'eng');
  cy.setLocalStorage('previouslyLoggedIn', 'true');
  cy.visit('/', {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
});
When('the Anonymous User navigates to the Project search page', () => {
  cy.contains('Result').click();
  cy.get('[data-value=project]').click();
});
And('enters a search term for a Project', () => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${projectTitle}{enter}`);
});
Then('a search result with the Project is displayed', () => {
  cy.get('li').filter(`:contains(${projectTitle})`);
});

//     Scenario: User opens Landing Page for Project
When("A Anonymous User opens a Project's Landing Page", () => {
  cy.setLocalStorage('i18nextLng', 'eng');
  cy.setLocalStorage('previouslyLoggedIn', 'true');
  cy.visit('/', {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
  cy.contains('Result').click();
  cy.get('[data-value=project').click();
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${projectTitle}{enter}`);
  cy.contains(projectTitle).click();
});
Then('the Anonymous User see:', (fields) => {
  const fieldHeadings = {
    'Project Title': 'Project',
    'Financing': 'Funding',
  };
  cy.get('main > div > div')
    .first()
    .within(() => {
      fields.rawTable.forEach((field) => {
        if (field[0] === 'Project Title') {
          cy.get('h1').should('have.text', projectTitle);
        } else {
          cy.contains(fieldHeadings[field[0]] ?? field[0], { matchCase: false });
        }
      });
    });
});
//             | Project Title            |
//             | Coordinating Institution |
//             | Project Manager          |
//             | Project Period           |
//             | Financing                |
//             | PRoject Category         |
And('the Anonymous User see expandable panels for:', (panels) => {
  panels.rawTable.forEach(panel => cy.getDataTestId(panelIds[panel[0]]));
});
//             | Summary             |
//             | Participants        |
//             | Results             |
//             # | Data Management Plan |
//             | Associated Projects |
And('the Anonymous User see counts of:', (counts) => {
  counts.rawTable.forEach((count) => {
    cy.getDataTestId(panelIds[count[0]]).within(() => {
      cy.contains('(');
      cy.contains(')');
    })
  });
});
//             | Participants        |
//             | Results             |
//             | Associated Projects |

//     Scenario Outline: Privileged user sees Edit button for Project
Given('User opens Landing Page for Project', () => { });
When('the User has the {string} role for the project', (role) => {
  if (users[role]) {
    selectProject(users[role]);
  }
});
Then('they can see an Edit button', () => {
  cy.getDataTestId(dataTestId.projectLandingPage.editProjectButton).should('be.visible');
});
//         Examples:
//             | Role                  |
//             | Curator               |
//             | Project Owner         |
//             | Project Manager       |
//             | Local Project Manager |

//     Scenario Outline: Privileged user sees Delete button for Project
Given('User opens Landing Page for Project', () => { });
When('the User has the {string} role for the project', () => { });
Then('they can see a Delete button', () => { });
//         Examples:
//             | Role            |
//             | Curator         |
//             | Project Owner   |
//             | Project Manager |

//     Scenario: Privileged user clicks the Delete Button for a Project
Given('Privileged user sees Delete button for Project', () => { });
When('they click the Delete Button', () => { });
Then('they see a Confirm Dialog', () => { });

//     Scenario: Privileged user deletes a Project
Given('Privileged user clicks the Delete Button for a Project', () => { });
When('they Confirm the action', () => { });
Then('the Confirm Dialog is closed', () => { });
And('the Project is marked deleted', () => { });
And('The Project is removed from the Projects list', () => { });

//     Scenario: User expand Summary for a Project
Given('User opens Landing Page for Project', () => { });
When('they expand "Summary"', () => {
  selectProject(userProjectManager);
  cy.getDataTestId(dataTestId.projectLandingPage.scientificSummaryAccordion).click();
});
Then('they see "Scientific summary"', () => {
  cy.getDataTestId(dataTestId.projectLandingPage.scientificSummaryAccordion).within(() => {
    cy.contains('Scientific summary', { matchCase: false });
  });
});
And('they see "Popular science summary"', () => {
  cy.getDataTestId(dataTestId.projectLandingPage.scientificSummaryAccordion).within(() => {
    cy.contains('Popular science summary', { matchCase: false });
  });
});

//     Scenario: User expand Participants for a Project
Given('User opens Landing Page for Project', () => { });
When('they expand "Participants"', () => {
  selectProject(userProjectManager);
  cy.getDataTestId(dataTestId.projectLandingPage.participantsAccordion).click();
});
Then('they see a list of Participants and their:', (participantInfo) => {
  const participantValues = {
    'Name': 'Project manager TestUser',
    'Role': 'Project manager',
    'Affiliation': 'Unit – The Norwegian Directorate for ICT and Joint Services in Higher Education and Research',
  };

  participantInfo.rawTable.forEach((info) => {
    cy.getDataTestId(dataTestId.projectLandingPage.participantsAccordion).within(() => {
      cy.contains(participantValues[info[0]], { matchCase: false });
    });
  });
});
//             | Name        |
//             | Role        |
//             | Affiliation |

//     Scenario: User sees Project Manager for a Project
Given('User expand Participants for a Project', () => {
  selectProject(userProjectManager);
  cy.getDataTestId(dataTestId.projectLandingPage.participantsAccordion).click();
});
When('they see a Project Manager', () => {
  cy.getDataTestId(dataTestId.projectLandingPage.participantsAccordion).filter(':contains("Project manager")');
  cy.getDataTestId(dataTestId.projectLandingPage.participantsAccordion).filter(':contains("Project manager TestUser")');
});
Then('they see fields:', () => {
  cy.getDataTestId(dataTestId.projectLandingPage.generalInfoBox).filter(':contains("2024")');
});
//             | Start Date |

//     Scenario: User expand Results for a Project
Given('User opens Landing Page for Project', () => { });
When('they expand "Results"', () => {
  selectProject(userProjectManager);
  cy.getDataTestId(dataTestId.projectLandingPage.resultsAccordion).click();
});
Then('they see a list of Results', () => {
  cy.getDataTestId(dataTestId.projectLandingPage.resultsAccordion);
});
