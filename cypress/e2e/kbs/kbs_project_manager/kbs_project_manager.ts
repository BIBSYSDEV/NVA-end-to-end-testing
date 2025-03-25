// Feature: Scenarios for project manager - KBS
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Scenario: Notification of KBS candidate

Given('a user is a project manager', () => {
    // login project manager
});
Given('an open KBS reporting period', () => {
    // open KBS reporting period
});
When('a project, where the user is project manager, is labeled as a KBS candidate', () => {
    // label a prject as a KBS candidate
});
Then('the user should be notified on MyPage that the project must be included/excluded from KBS reporting', () => {
    // view MyPage, project marked as included/excluded from KBS reporting
});

// Scenario: Notification of reporting of total number of inclusions required

Given('a user is a project manager', () => { });
Given('an open KBS reporting period', () => { });
When('a project, where the user is project manager, is marked for KBS reporting', () => {
    // project marked for KBS reporting
});
Then('the user should be notified on MyPage that the project requires reporting of the total number of inclusions in current reporting period', () => {
    // inclusions = number of patients pr year
});

// Scenario: Marking a project for KBS reporting

Given('a user that is project manager', () => { });
Given('an open KBS reporting period', () => { });
When('a project, where the user is project manager, is labeled as a KBS candidate', () => { });
Then('the user should be able to include or exclude the project from current KBS reporting period', () => {
    // include/exclude project from KBS reporting
});

// Scenario: Reporting total number of inclusions for the period

Given('a user that is project manager', () => { });
Given('an open KBS reporting period', () => { });
When('a project, where the user is project manager, is marked for KBS reporting', () => { });
Then('the user should be able to report the total number of inclusions for that period', () => {
    // report the total number of inclusions (automatic?)
});

// Scenario: Enter date of first inclusion

Given('a user that is project manager', () => { });
Given('an open KBS reporting period', () => { });
When('a project, where the user is project manager, is marked for KBS reporting', () => { });
Then('the user should be able to set the date of first inclusion of a patient', () => {
    // set date for first inclusion
});

// Scenario: Enter date of last inclusion

Given('a user that is project manager', () => { });
Given('an open KBS reporting period', () => { });
When('a project, where the user is project manager, is marked for KBS reporting', () => { });
Then('the user should be able to set the date of last inclusion of a patient', () => {
    // set date for last inclusion
});

// Scenario: Mark the KBS reporting as the last one (no more inlcusions)

Given('a user that is project manager', () => { });
Given('an open KBS reporting period', () => { });
When('a project, where the user is project manager, is marked for KBS reporting', () => { });
Then('the user should be able to mark the KBS reporting as the last one', () => {
    // mark KBS project as this is the last reporting year(?)
});
Then('the project should not be considered a KBS candidate following periods', () => {
    // check next year (is this possible?)
});

// Scenario: Number of inclusions per local manager

Given('a user that is project manager', () => { });
Given('an open KBS reporting period', () => { });
When('a project, where the user is project manager, is marked for KBS reporting', () => { });
Then('the user should be able to see the number of inclusions per local manager', () => {
    // number of inclusions per local manager
});