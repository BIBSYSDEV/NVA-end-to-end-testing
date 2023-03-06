import { userProject } from "../../../support/constants"
import { dataTestId } from "../../../support/dataTestIds";

// Feature: User My Projects

Background:
Given('A User is logged in', () => {
    cy.login(userProject);
 })

// Scenario: User opens My Projects
When('a User navigate to My Projects Page', () => {
    cy.getDataTestId(dataTestId.header.myPageLink).click();
    cy.getDataTestId(dataTestId.myPage.myProjectsLink).click();
})
Then('the User see a option to create a new project', () => {
    // TODO
})
And('the User see a search field', () => {
    // TODO
})
And('the User see a list of Active Projects', () => {
    // TODO
})
And('the User see a collapsed list of Concluded Projects', () => { })
And('the lists contains Projects where the User has one of the following roles:', () => { })
// | Project Owner         |
// | Project Manager       |
// | Local Project Manager |
// | Participants          |
And("the User can see each Project's:", (dataTable) => { })
// | Title                    |
// | Coordinating Institution |
// | Project Manager          |
And('each Project can be edited if the User has one of the following roles:', (dataTable) => { })
// | Project Owner         |
// | Project Manager       |
// | Local Project Manager |
And('the list can be sorted by:', (dataTable) => { })
// | Title                    |
// | Coordinating Institution |
// | Project Manager          |
And('the User can navigate through the possibly long list of Concluded Projects', () => { })

// Scenario: User opens a Project's Landing Page
Given('User opens My Projects', () => {
    cy.getDataTestId(dataTestId.header.myPageLink).click();
    cy.getDataTestId(dataTestId.myPage.myProjectsLink).click();
})
When("the User click a Project's Title", () => { })
Then('the User see the Landing Page for the Project', () => { })

// Scenario: User Edits a Project in the Project Wizard
Given('a User with one of the following roles:', () => {
    cy.getDataTestId(dataTestId.header.myPageLink).click();
    cy.getDataTestId(dataTestId.myPage.myProjectsLink).click();
})
// | Project Owner         |
// | Project Manager       |
// | Local Project Manager |
When('the User edits a project from My Projects', () => {
    cy.get('ul').within(() => {
        cy.get('button').first().click();
    })
 })
Then('they see the Project in the Project Wizard', () => {
    cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.titleField);
})

// Scenario: User search in My Projects
When('a User enter a search term in the search field on My Projects', () => {})
Then("the User see Projects matching the search term in the Project's:", () => { })
            // | Title                    |
            // | Coordinating Institution |
            // | Participants             |