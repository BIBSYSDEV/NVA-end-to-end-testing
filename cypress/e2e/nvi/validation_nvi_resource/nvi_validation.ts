// Feature: Validation of an NVI resource

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userNviCurator } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Background:
Given('a logged-in User', () => {
  cy.login(userNviCurator);
});
Given('the User has the role "NVI-Curator" at an NVI-Institution', () => {});
Given('the User has navigated to the NVI section from the Tasks option in the main menu', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
});

// Scenario: List of fields on NVI page
When('the User sees the NVI section', () => {});
Then('the following fields are visible:', () => {});
// | field                 |
// | Search                |
// | Curator               |
// | Area of responsibility|
// | Exclude subunits      |
// | Year                  |
// | List of candidates    |
Then('the Year field is set to the currently open NVI period by default', () => {});
Then('the Curator field is set to none by default', () => {});
Then('the Area of responsibility field reflects my curator permissions', () => {});

// Scenario: Menu on NVI page
When('the User navigate to the Task page', () => {});
Then('a menu containing following objects are visable:', () => {});
// | objects        |
// | a progress bar |
// | Status menu    |

// Scenario Outline:
When('the User select a status', () => {});
When("the Resources have authors that are affiliated with the Curator's Institution", () => {});
When('the authors affiliation is within the Users Area of responibiliy', () => {});
When('status for own institution is {string}', (ownInstitution) => {});
When('status for other institutions is {string}', (otherInstitution) => {});
Then('the Results are listed under {string}', (status) => {});

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
Then('the User may select "Show reporting status"', () => {});

// Scenario: Show reporting status
When('the User select "Show reporting status"', () => {});
Then('the User see a table displaying status for the current open NVI-periode by default', () => {});
Then('the columns show NVI resource statuses', () => {});
Then("the rows represent my institution's subunits", () => {});
Then('I can select to view any previous year', () => {});
Then('I has an export option', () => {});
