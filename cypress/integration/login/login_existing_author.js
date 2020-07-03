import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('that a User has a valid Feide ID and password', () => {});
And('they do not have a Feide ID in their ARP entry', () => {});
And('there are entries in ARP', () => {}) | User, Test | When('they log in', () => {});
Then(
  'they see a list containing <Author name> and <Last publication> for each ARP entry matching their <Name>',
  () => {}
);
And('a Create New Author Button', () => {});
