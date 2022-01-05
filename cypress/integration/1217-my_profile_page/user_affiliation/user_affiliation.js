import {
  userAddInstitution,
  userInstitutionSubunit,
  userWithAuthor,
  userWithInstitutionRemoveInstitution,
} from '../../../support/constants';
import { mockInstitution, mockDepartment } from '../../../support/mock_data';
import { Before } from 'cypress-cucumber-preprocessor/steps';

// Feature: User adds and removes organization

Before(() => {
  cy.mockInstitution();
  cy.mockDepartments();
});

// @405
// Scenario: User sees a Subunit from My Profile
Given('User opens Add Institution from My Profile', () => {
  cy.login(userAddInstitution);
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
});

When('they enter an Institution name', () => {
  cy.get('[data-testid=organization-search-field]').type('Mock institution');
});
And('they select an Institution', () => {
  cy.contains(mockInstitution[2]).click();
});
Then('they see Subunit dropdown containing all the subunits at their Institution', () => {
  cy.contains('Department').should('be.visible');
  cy.get('[data-testid=sub-organization-search-field]').last().click();
  cy.contains(mockDepartment[0]).should('be.visible');
});

// @407
// Scenario: User selects a Subunit from My Profile
Given('user sees a Subunit from My Profile', () => {
  cy.login(userInstitutionSubunit);
  cy.mockInstitution();
  cy.mockDepartments();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
  cy.get('[data-testid=organization-search-field]').type(mockInstitution[2]);
  cy.contains(mockInstitution[2]).click({ force: true });
  cy.contains('Department').should('be.visible');
});

When('they select a Subunit from the Subunit dropdown', () => {
  cy.get('[data-testid=sub-organization-search-field]').click();
  cy.contains(mockDepartment[0]).click({ force: true });
});
And('they click on a subunit', () => {
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
Then('they see the new Institution and subunit in My Profile', () => {
  cy.contains(mockInstitution[2]);
  cy.contains(mockDepartment[0]);
});

// @410
// Scenario: User opens Add Institution from My Profile
Given('user opens the page My Profile', () => {
  cy.login(userWithAuthor);
  cy.mockInstitution();
  cy.mockDepartments();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
});

When('they click Add Institution', () => {
  cy.get('[data-testid=add-new-institution-button]').should('be.visible');
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click({ force: true });
});
Then('they see the Autosearch box for Institutions', () => {
  cy.get('[data-testid=organization-search-field]').should('be.visible');
});

// @411
// Scenario: User adds an Institution from My Profile
Given('User opens Add Institution from My Profile', () => {
  cy.login(userAddInstitution);
  cy.mockInstitution();
  cy.mockDepartments();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
});

When('they enter an Institution name', () => {
  cy.get('[data-testid=organization-search-field]').type(mockInstitution[2]);
});
And('they select an Institution', () => {
  cy.contains(mockInstitution[2]).click({ force: true });
});
And('they see a button Add that is enabled for the new Institution', () => {
  cy.get('[data-testid=institution-add-button]').should('be.visible');
});
And('they see a button Cancel that is enabled for the new Institution', () => {
  cy.get('[data-testid=institution-cancel-button]').should('be.visible');
});
And('they click Add', () => {
  cy.get('[data-testid=sub-organization-search-field]').should('be.visible');
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
Then('they see the new Institution in My Profile', () => {
  cy.contains(mockInstitution[2]);
});
And('they see a button Remove that is enabled for the new Institution', () => {
  cy.get('[data-testid^=button-delete-institution]').should(($delete) => {
    expect($delete).to.have.length(2);
  });
});

// @551
// Scenario: User removes an Institution from My Profile
Given('User sees an Institution from My Profile', () => {
  cy.login(userWithInstitutionRemoveInstitution);
  cy.mockInstitution();
  cy.mockDepartments();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
  cy.get('[data-testid=organization-search-field]').type(mockInstitution[2]);
  cy.contains(mockInstitution[2]).click({ force: true });
  cy.get('[data-testid=institution-add-button]').should('not.be.disabled');
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
When('they click Remove', () => {
  cy.get('[data-testid^=button-delete-institution]').should('have.length', 2);
  cy.get(
    `[data-testid="button-delete-institution-https://api.dev.nva.aws.unit.no/cristin/organization/3333333333.0.0.0"]`
  ).click();
});
And('they see a Remove affiliation dialog', () => {
  cy.contains('Remove affiliation?');
});
And('the click on the Yes button', () => {
  cy.get('[data-testid=accept-button]').click({ force: true });
});
Then('they no longer see the institution from My Profile', () => {
  cy.get('[data-testid^=button-delete-institution]').should('have.length', 1);
  cy.contains(mockInstitution[2]).should('not.exist');
});
