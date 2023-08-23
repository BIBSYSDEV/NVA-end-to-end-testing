// // Feature: Project Landing Page

import { userCurator, userProjectManager } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

const panelHeadings = {
    'Participants': 'Project participants',
    'Associated Projects': 'Related projects',
};

const users = {
    'Project Manager': userProjectManager,
}

const selectProject = (user) => {
    cy.login(user);
    cy.get('section > div > div > button').filter(':contains("Project")').click();
    cy.getDataTestId(dataTestId.startPage.searchField).type('Project for testing 20230512{enter}');
    cy.contains('Project for testing').click();
}

const projectTitle = 'Project for testing 20230512';

// Scenario: An Anonymous User searches for a Project
Given('An Anonymous User is on the NVA start page', () => {
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.setLocalStorage('beta', 'true');
    cy.visit('/', {
        auth: {
            username: Cypress.env('DEVUSER'),
            password: Cypress.env('DEVPASSWORD'),
        },
    });
});
When('the Anonymous User navigates to the Project search page', () => {
    cy.get('button').filter(':contains("Project")').click();
});
And('enters a search term for a Project', () => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${projectTitle}{enter}`);
});
Then('a search result with the Project is displayed', () => {
    cy.get('li').filter(`:contains(${projectTitle})`)
});


//     Scenario: User opens Landing Page for Project
When("A Anonymous User opens a Project's Landing Page", () => {
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.setLocalStorage('beta', 'true');
    cy.visit('/', {
        auth: {
            username: Cypress.env('DEVUSER'),
            password: Cypress.env('DEVPASSWORD'),
        },
    });
    cy.get('button').filter(':contains("Project")').click();
    cy.get('ul > li > div > p > a').first().click();
});
Then('the Anonymous User see:', (fields) => {
    const fieldHeadings = {
        'Project Title': 'Project',
        'Financing': 'Funding',
    };
    cy.get('main > div > div').first().within(() => {

        fields.rawTable.forEach((field) => {
            if(field[0] === 'Project Title'){
                cy.get('h1').should('have.text');
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
    cy.get('main > div > div').first().within(() => {
        panels.rawTable.forEach((panel) => {
            cy.contains(panelHeadings[panel[0]] ?? panel[0], { matchCase: false });
        });
    });
});
//             | Summary             |
//             | Participants        |
//             | Results             |
//             # | Data Management Plan |
//             | Associated Projects |
And('the Anonymous User see counts of:', (counts) => {
    cy.get('main > div > div').first().within(() => {
        counts.rawTable.forEach((count) => {
            cy.contains(panelHeadings[count[0]] ?? count[0], { matchCase: false }).parent().within(() => {
                cy.contains('(');
                cy.contains(')');
            })
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
    cy.getDataTestId(dataTestId.projectLandingPage.editProjectButton).should('be.enabled');
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
    })
});
And('they see "Popular science summary"', () => {
    cy.getDataTestId(dataTestId.projectLandingPage.scientificSummaryAccordion).within(() => {
        cy.contains('Popular science summary', { matchCase: false });
    })
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
    }

    participantInfo.rawTable.forEach(info => {
        cy.getDataTestId(dataTestId.projectLandingPage.participantsAccordion).within(() => {
            cy.contains(participantValues[info[0]], { matchCase: false });
        })
    })
});
//             | Name        |
//             | Role        |
//             | Affiliation |

//     Scenario: User sees Project Manager for a Project
Given('User expand Participants for a Project', () => { });
When('they see a Project Manager', () => { });
Then('they see fields:', () => { });
//             | Start Date |

//     Scenario: User expand Results for a Project
Given('User opens Landing Page for Project', () => { });
When('they expand "Results"', () => { });
Then('they see a list of Results', () => { });

//     Scenario Outline: User Publish a Draft Project
Given('User opens Landing Page for a Draft Project', () => { });
And('it has all required fields:', () => { });
//             | Title                    |
//             | Coordinating Institution |
//             | Start Date               |
//             | Project Manager          |
And('User has role {string} in the project', () => { });
When('the User clicks on the Publish Button', () => { });
Then('the project status is Published', () => { });
And('the Landing Page is publicly accessible', () => { });
//         Examples:
//             | Role            |
//             | Curator         |
//             | Project Owner   |
//             | Project Manager |
