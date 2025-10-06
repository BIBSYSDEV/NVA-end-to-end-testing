import {
  userUnitCurator,
  userUnitEditRegistration,
  userUnitEditor5,
  userUnitWithAuthor,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Feature; User edit registrations where they are not owner

const registrationTitle = `Edit registration not owner ${uuid()}`;

// Scenario: Curator see option to edit a Registration from own institution
Given('User is logged in as Curator', () => {
  cy.login(userUnitWithAuthor);
  cy.createPublishedRegistration(registrationTitle);
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.reload();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type('Edit registration TestUser{enter}');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor)
    .parent()
    .parent()
    .parent()
    .filter(':contains("Edit registration TestUser")')
    .within(() => {
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
    });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.wait(10000);
  cy.login(userUnitCurator);
});
When('they open the landing page for a Registration from own institution', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
  cy.contains(registrationTitle);
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains('${registrationTitle}')`)
    .within(() => {
      cy.get('p > a').first().click();
    });
});
When('they are not owner of the Registration', () => {});
Then('they have the option to edit the Registration', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).should('be.visible');
});

// Scenario: Editor see option to edit a Registration
Given('User is logged in as Editor', () => {
  cy.login(userUnitEditor5);
});
When('they open the landing page for a Registration', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
  cy.contains(registrationTitle);
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains('${registrationTitle}')`)
    .within(() => {
      cy.get('p > a').first().click();
    });
});

// Scenario: Curator edit a Registration from own institution
Given('Curator open landing page for a Registration from own institution', () => {
  cy.login(userUnitCurator);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
  cy.contains(registrationTitle);
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains('${registrationTitle}')`)
    .within(() => {
      cy.get('p > a').first().click();
    });
});
When('they edit the Registration', () => {
  cy.location('pathname').then((pathname) => {
    const id = pathname.replace('/registration/', '');
    cy.wrap(id).as('id');
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
});
Then('the Registration is opened in the Registration wizard', () => {
  cy.get('@id').then((id) => {
    cy.location('pathname').should('equal', `/registration/${id}/edit`);
    cy.getDataTestId(dataTestId.registrationWizard.description.titleField).should('be.visible');
  });
});

// Scenario: Editor edit a Registration
Given('Editor open landing page for a Registration', () => {
  cy.login(userUnitEditor5);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
  cy.contains(registrationTitle);
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains('${registrationTitle}')`)
    .within(() => {
      cy.get('p > a').first().click();
    });
});

// Scenario: User see option to edit a Registration where they are Contributor
Given('a User is logged in', () => {
  cy.login(userUnitEditRegistration);
});
Given('they are not Curator or Editor', () => {});
When('they open the landing page for a Registration where they are registred as a Contributor', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
  cy.contains(registrationTitle);
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains('${registrationTitle}')`)
    .within(() => {
      cy.get('p > a').first().click();
    });
});

// Scenario: User edit registration where they are registred as Contributer
Given('a User open landing page for Registration where they are registred as a Contributor', () => {
  cy.login(userUnitEditRegistration);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
  cy.contains(registrationTitle);
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains('${registrationTitle}')`)
    .within(() => {
      cy.get('p > a').first().click();
    });
});
