// Feature: log in testuser

import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { TestUsers } from "../../../support/constants"

// Scenario: User logs in
Given ("a User logs in", () => {
  cy.login(TestUsers.curators.basicnvi);
})