// Feature: My page navigation from the header

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// Scenario: User without unread dialogue notifications lands on their research profile
Given('a logged-in user with no unread dialogue notifications', () => {});
When('the user clicks "My page" in the header', () => {});
Then('they are taken to their research profile', () => {});

// Scenario: User with unread dialogue notifications lands on Dialogue
Given('a logged-in user with at least one unread dialogue notification', () => {});
// When ('the user clicks "My page" in the header', () => {});
Then('they are taken to the Dialogue page', () => {});
Then('the message list shows only unread messages', () => {});
