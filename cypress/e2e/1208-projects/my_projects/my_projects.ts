import { userUnitProjectManager } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// Feature: User My Projects

// Background:
Given('A User is logged in', () => {});
Given('the User got one of the following roles:', () => {
  cy.login(userUnitProjectManager);
});
// | Registrator           |
// | Project Owner         |
// | Project Manager       |
// | Local Project Manager |
// | Participants          |

// Scenario: User navigate to My Page and selects Project registrations
When('a User navigate to My Page and selects Project registrations', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
});
Then('the User sees all active projects where the User has one of the following roles:', () => {
  cy.get('li').should('have.length.above', 0);
});
// | Project Owner         |
// | Project Manager       |
// | Local Project Manager |
// | Participants          |
Then('the User has an option to create a new project', () => {
  cy.getDataTestId(dataTestId.myPage.createProjectButton);
});
Then('the User see a search field to locate projects', () => {});
Then('the User can select a list of Active Projects', () => {});
Then('the User can select a list of Concluded Projects', () => {});
Then('the User can select a list of Draft Projects', () => {});

// Scenario: User inspects a listed Project
Given('User navigate to My Page and selects Project registrations', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.myProjectsLink).click();
});
When('the User inspects a listed project', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.get('ul > li > div').first().as('project');
});
Then("the User see can see each Project's:", (info: DataTable) => {
  const projectInfo = {
    'Title': 'E2E test project',
    'Project participants': 'Project manager TestUser',
    'Coordinating Institution': 'Sikt - Norwegian Agency for Shared Services in Education and Research',
  };
  cy.get('@project').within(() => {
    info.raw().forEach((element) => {
      cy.contains(projectInfo[element[0]]);
    });
  });
});
// | Title                    |
// | Project participants     |
// | Coordinating Institution |
Then('each Project can be edited if the User has one of the following roles:', () => {});
// | Project Owner         |
// | Project Manager       |
// | Local Project Manager |
Then('the list can be sorted by:', () => {});
// | Title                    |
// | Coordinating Institution |
// | Project category         |

// Scenario: User opens a Project's Landing Page
When("the User selects a Project's presentation", () => {
  cy.get('ul > li > div > div > p > a').first().click();
});
Then('the User is presented the Landing Page for the Project', () => {
  cy.location('pathname').should('contain', 'projects');
});

// Scenario: User Edits a Project in the Project Wizard
When('the User activate the option to Edit a project', () => {
  cy.get(`[data-testid^=edit-project-button]`).first().click();
});
Then('the Project is opend in the Project Wizard', () => {
  cy.location('pathname').should('contain', '/edit');
});

// Scenario: User search in My Projects
When('a User enter a search term in the search field on My Projects', () => {});
Then("the User see Projects matching the search term in the Project's:", () => {});
// | Title                    |
// | Coordinating Institution |
// | Participants             |
