// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

import { DataTable } from "@badeball/cypress-cucumber-preprocessor";

export {}

declare global {
    namespace Cypress {
      interface Chainable {
            login(userId: string): Chainable<Element>;
            connectAuthor(): Chainable<Element>;
            skipOrcid(): Chainable<Element>;
            setLanguage(): Chainable<Element>;
            checkMenu(table: DataTable): Chainable<Element>;
            getDataTestId(dataTestId: string): Chainable<Element>;
            startRegistrationWithFile(fileName: string): Chainable<Element>;
            startWizardWithFile(fileName: string): Chainable<Element>;
            startRegistrationWithLink(doiLink: string): Chainable<Element>;
            startWizardWithLink(dioLink: string): Chainable<Element>;
            startWizardWithEmptyRegistration(): Chainable<Element>;
            openMyRegistrations(): Chainable<Element>;
            createValidRegistration(fileName: string): Chainable<Element>;
            testDataTestidList(dataTable: DataTable, values: Record<string, string>): Chainable<Element>;
            selectRegistration(title: string, type: string): Chainable<Element>;
            addFeideId(username: string): Chainable<Element>;
            addMockOrcid(username: string): Chainable<Element>;
            mockPersonSearch(userId: string): Chainable<Element>;
            mockProjectSearch(): Chainable<Element>;
            mockInstitution(): Chainable<Element>;
            mockDepartments(): Chainable<Element>;
            mockJournalSearch(): Chainable<Element>;
            changeUserInstitution(institution: string): Chainable<Element>;
            checkField(field: Record<string, any>): Chainable<Element>;
            checkContributors(contributorRoles: string[]): Chainable<Element>;
            fillInCommonFields(): Chainable<Element>;
            fillInResourceType(subtype: string, fields: string[]): Chainable<Element>;
            fillInContributors(contributorRoles: any): Chainable<Element>;
            checkLandingPage(subtype: string): Chainable<Element>;
            chooseDatePicker(selector: string, value: string): Chainable<Element>;
        }
    }
  }