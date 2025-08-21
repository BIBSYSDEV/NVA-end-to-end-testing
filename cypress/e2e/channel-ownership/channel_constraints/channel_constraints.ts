// Feature: Channel constraints

import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

//   Scenario: Default constraints when claiming a channel
When('a channel is claimed', () => {});
Then('the policy for registering metadata is set to "everyone"', () => {});
Then('the policy for editing metadata after files are approved is set to "ownerOnly"', () => {});
Then('the scope is set to the six Degree instance types', () => {});

//   Scenario: Constraint cannot be edited
When('anyone inspects a channel constraint', () => {});
Then('no one has the option to edit the constraint', () => {});

//   Scenario: Inspect constraints for a claimed channel
When('requesting the constraints of a channel claim', () => {});
Then('the constraints of the channel claim are returned', () => {});
