// Feature: Curator tasks and message flow

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { userDOICuratorMessages, userDOIMessages, userPublicationCuratorMessages, userPublicationMessages, userSupportCuratorMessages, userSupportMessages } from '../../../support/constants';
import { v4 as uuidv4 } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';

const PUBLISHING_CURATOR = 'Publishing-curator';
const DOI_CURATOR = 'DOI-curator';
const SUPPORT_CURATOR = 'Support-curator';
const PUBLISHING_REQUEST = 'Publish';
const DOI_REQUEST = 'Allocate DOI';
const SUPPORT_REQUEST = 'Support';

const curatorUsers = {
    [PUBLISHING_CURATOR]: userPublicationCuratorMessages,
    [DOI_CURATOR]: userDOICuratorMessages,
    [SUPPORT_CURATOR]: userSupportCuratorMessages,
};

const users = {
    [PUBLISHING_REQUEST]: userPublicationMessages,
    [DOI_REQUEST]: userDOIMessages,
    [SUPPORT_REQUEST]: userSupportMessages,
}

const fileName = 'example.txt';

// Scenario Outline: Curator unassigned task numbers
Given('a User with role {string}', (user) => {
    cy.login(curatorUsers[user]);
});
When('they view the main page for NVA', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).should('be.visible');
});
Then('they see the number of unassigned tasks', () => {
    cy.wait(30000);
    cy.getDataTestId(dataTestId.header.tasksLink).within(() => {
        cy.get('span > span > span').should('exist');
        cy.get('span > span > span').filter(':contains("0")').should('not.exist');
        cy.get('span > span > span').then(($it) => cy.wrap($it.text()).as('taskNumbers'));
    });
});
When('they view the Tasks page', () => {
    cy.getDataTestId(dataTestId.header.tasksLink).click();
});
Then('they see the number of dialogs without curator', () => {
    cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).within(() => {
        cy.get('span > span > span').should('exist');
        cy.get('@taskNumbers').then(taskNumber => {
            cy.get('span > span > span').filter(`:contains("${taskNumber}")`);
        })
    });
});

// Examples:
//     | Role               |
//     | Publishing-curator |
//     | DOI-curator        |
//     | Support-curator    |


// Scenario Outline: Updating message numbers
Given('a User with role {string}', (role) => { });
When('they see the number of unassigned tasks', () => { })
And('a User with the role Creator send a {string} request', (type) => {
    const title = `Messages ${type} ${uuidv4()}`
    cy.wrap(title).as('title');
    cy.login(users[type]);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(fileName, title);
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    switch (type) {
        case PUBLISHING_REQUEST:
            break;
        case DOI_REQUEST:
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
            break;
        case SUPPORT_REQUEST:
            cy.getDataTestId(dataTestId.tasksPage.messageField).type('Support message{enter}');
            break;
    }
});
Then('the User with role {string} see that the number of unassigned tasks are increased', (role) => {
    cy.login(curatorUsers[role]);
    cy.get('@taskNumbers').then(taskNumbers => {
        const value = Number(taskNumbers) + 1;
        cy.getDataTestId(dataTestId.header.tasksLink).within(() => {
            cy.get('span > span > span').should('exist');
            cy.get('span > span > span').filter(':contains("0")').should('not.exist');
            cy.get('span > span > span').filter(`:contains("${value.toString()}")`);
        });
    });
});

// Examples:
//     | Role               | Type         |
//     | Publishing-curator | Publish      |
//     | DOI-curator        | Allocate DOI |
//     | Support-curator    | Support      |

// Scenario Outline: User dialog with curator
Given('a User with the role Creator sends a {string} request', (type) => {
    const title = `Messages ${type} ${uuidv4()}`
    cy.wrap(title).as('title');
    cy.login(users[type]);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(fileName, title);
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    switch (type) {
        case PUBLISHING_REQUEST:
            break;
        case DOI_REQUEST:
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
            break;
        case SUPPORT_REQUEST:
            cy.getDataTestId(dataTestId.tasksPage.messageField).type('Support message{enter}');
            break;
    }
});
When('they send a message with the {string} request', (type) => { });
And('a curator with role {string} responds to the message', (role) => { });
Then('the Creator can read the message on the landing page of the Registration', () => { });

// Examples:
//     | Role               | Type         |
//     | Publishing-curator | Publish      |
//     | DOI-curator        | Reserve DOI  |
//     | DOI-curator        | Allocate DOI |
//     | DOI-curator        | Assign DOI   |
//     | DOI-curator        | Reject DOI   |
//     | Support-curator    | Support      |
