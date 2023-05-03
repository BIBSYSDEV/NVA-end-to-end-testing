// // Feature: Project Landing Page

import { dataTestId } from "../../../support/dataTestIds";

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
    fields.rawTable.forEach(field => {
        cy.log(field[0]);
    });
});
//             | Project Title            |
//             | Coordinating Institution |
//             | Project Manager          |
//             | Project Period           |
//             | Financing                |
//             | PRoject Category         |
And('the Anonymous User see expandable panels for:', () => { });
//             | Summary             |
//             | Participants        |
//             | Results             |
//             # | Data Management Plan |
//             | Associated Projects |
And('the Anonymous User see counts of:', () => { });
//             | Participants        |
//             | Results             |
//             | Associated Projects |

//     Scenario Outline: Privileged user sees Edit button for Project
Given('User opens Landing Page for Project', () => { });
When('the User has the {string} role for the project', () => { });
Then('they can see an Edit button', () => { });
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
When('they expand "Summary"', () => { });
Then('they see "Scientific summary"', () => { });
And('they see "Popular science summary"', () => { });

//     Scenario: User expand Participants for a Project
Given('User opens Landing Page for Project', () => { });
When('they expand "Participants"', () => { });
Then('they see a list of Participants and their:', () => { });
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
