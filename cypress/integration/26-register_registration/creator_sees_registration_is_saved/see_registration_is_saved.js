import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

// Feature: Creator sees Registration is saved

// @388
// Scenario: Creator sees Registration based on a Link is saved
Given('Creator begins registering with a Link', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithLink(doiLink);
});
When('they click Start', () => {});
And('they click My Registrations', () => {});
Then('they see the Registration is saved and the title is listed and marked as Draft', () => {});
And('they see that Edit is enabled', () => {});
And('they see that Delete is enabled', () => {});

// @391
// Scenario: Creator sees Registration based on file upload is saved
Given('Creator begins registration by uploading a file', () => {});
When('they click Start', () => {});
And('they click My Registrations', () => {});
Then('they see the Registration is saved and the title is "[Missing title]" and marked as Draft', () => {});
And('they see that Edit is enabled', () => {});
And('they see that Delete is enabled', () => {});
