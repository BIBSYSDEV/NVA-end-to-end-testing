import { Before, DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, TestUsers, userName } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { createPublicationUsingAPI, NviLevels } from '../../../support/create_registration';

Before({ tags: '@openVerifyDialog' }, () => {
  cy.wrap('button-set-unverified-contributor-').as('button');
  cy.login(TestUsers.features.contributors);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_MONOGRAPH)).click();
});
Before({ tags: '@verifyUser' }, () => {
  cy.wrap(dataTestId.registrationWizard.contributors.selectUserButton).as('button');
});

// Feature: Creator navigates to Contributors tab
// Common steps
Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(TestUsers.features.contributors);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(
    dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_MONOGRAPH)
  ).click();
});
When('they navigate to the Contributors tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
});

When('they see the "Add Creator" Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).should('be.visible');
});
When('they click "Add Creator"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
});

When('they see the "Add Creator" Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).should('be.visible');
});
When('they click "Add Creator"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
});

// End common steps

//   @417
//   Scenario: Creator navigates to Contributors tab
Then('they see "Add Contributor" Button is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).should('be.enabled');
});
Then('they see the tab Description is clickable', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.descriptionStepButton).should('be.enabled');
});
Then('they see the tab Resource Type is clickable', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).should('be.enabled');
});
Then('they see the tab Contributors is selected', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).should(
    'have.attr',
    'aria-current',
    'step'
  );
});
Then('they see the tab Files and License is clickable', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).should('be.enabled');
});
Then('they see Previous is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.previousTabButton).should('be.enabled');
});
Then('they see Next is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.nextTabButton).should('be.enabled');
});
Then('they see Save is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});

//   @1837
//   Scenario: Creator adds themselves to the list of Creators
When('they see the "Add Author" Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).should('be.visible');
});
When('they click "Add Author"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
});
When('they see the Author Search Dialog', () => {
  cy.get('[data-testid=contributor-modal]').should('be.visible');
});
When('they click "Add me as Author"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectContributorType);
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
});
Then('their Author identity is added to the list of Authors', () => {
  cy.getDataTestId(`"${dataTestId.registrationWizard.contributors.removeContributorButton('Contributor TestUser')}"`);
});
Then('their current Affiliations are listed', () => {
  cy.contains('Unit');
});

// Scenario Outline: Creator see buttons to add Contributors
Given('Creator navigates to Contributors tab', () => {
  cy.get('body').then(($body) => {
    if (!$body.find(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).length) {
      cy.login(TestUsers.features.contributors);
      cy.startWizardWithEmptyRegistration();
    }
  });
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
Given('the Registration has Registration Subtype {string}', (subtype: string) => {
  cy.wrap(subtype).as('registrationType');
  if (subtype !== CategoryTypes.ACADEMIC_MONOGRAPH) {
    cy.getDataTestId(
      dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_MONOGRAPH)
    ).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(subtype)).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  }
});
Then('they see buttons {string}', (contributorTypes: string) => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectContributorType).click();
  const types = contributorTypes.split(', ');
  types.forEach((contributorType) => {
    cy.get(`[data-value=${contributorTypes[contributorType]}]`).should('be.visible');
  });
});

//   @419
//   Scenario: Creator adds an Author to the list of Authors
When('they search for Author in the Author Search Dialog', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('TestUser, Contributor');
});
When('they select an Author identity', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
});
When('they click "Add"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
});
Then('the selected Author identity is added to the list of Authors', () => {
  cy.contains('Contributor TestUser');
});

//   Scenario: Creator adds an Creator to the list of Creators for Resource Type Book, Monograph
Given('they navigate to the Resources tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
Given('they select Resource Type "Book"', () => {});
Given('they select Registration Subtype "Monograph"', () => {});

//   Scenario: Creator adds an Creator to the list of Creators for Resource Type Chapter
Given('they select the Resource Type', (dataTable: DataTable) => {});
Given('they select the Registration Subtype "Chapter in anthology"', () => {
  cy.getDataTestId(
    dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_MONOGRAPH)
  ).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_CHAPTER)).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});

//   @2203
//   Scenario: Creator adds an Editor to the list of Editors for Resource Type Book, Anthology
Given('they select Registration Subtype "Anthology"', () => {
  cy.getDataTestId(
    dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_MONOGRAPH)
  ).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.BOOK_ANTHOLOGY)).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
When('they see the "Add Editor" Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectContributorType).click();
  cy.get(`[data-value=Editor]`).should('be.visible');
});
When('they click "Add Editor"', () => {
  cy.get(`[data-value=Editor]`).click();
});
When('they search for Editor in the Author Search Dialog', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('TestUser Contributor');
});
Then('the selected Author identity is added to the list of Editors', () => {
  cy.contains('Contributor TestUser');
});

//   @2204
//   Scenario: Creator adds a Supervisor to the list of Supervisors for Resource Type Student Thesis
Given('they select Resource Type "Student Thesis"', () => {});
Given('they select any Registration Subtype', () => {
  cy.getDataTestId(
    dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_MONOGRAPH)
  ).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.DEGREE_MASTER)).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
When('they see the "Add Supervisor" Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectContributorType).click();
  cy.get(`[data-value=Supervisor]`).should('be.visible');
});
When('they click "Add Supervisor"', () => {
  cy.get(`[data-value=Supervisor]`).click();
});
When('they search for Supervisor in the Author Search Dialog', () => {
  cy.get('[data-testid=search-field]').type('TestUser Contributor');
});
Then('the selected Author identity is added to the list of Supervisors', () => {
  cy.contains('Contributor TestUser');
});

//   @788
//   Scenario: Author creates a new Author in the Author dialog
Given('they see the "Create new Author" Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).should('be.visible');
});
When('they click "Create new Author"', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('New Author');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).click();
});
Then('they see fields:', (dataTable: DataTable) => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.unverifiedContributorName).should('be.visible');
});
Then('they see the "Create new Author" Button in the Create new Author Dialog', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).should('be.visible');
});

// Scenario: Creator sees Button to Verify Contributor
When('the Registration has an Unverified Contributor', () => {
  cy.mockPersonSearch(TestUsers.creators.basic);
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_MONOGRAPH)
  ).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('Unverified Creator');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
});
Then('they see a Button to Verify the Contributor', () => {
  cy.get(`[data-testid^=button-set-unverified-contributor-]`).should('be.visible');
});

// Scenario: Creator opens Dialog to Verify Contributor
Given('Creator sees Button to Verify Contributor', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('Withauthor 10 TestUser');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  cy.get(`[data-testid^=button-set-unverified-contributor-]`).should('be.visible');
});
When('they click the Button to Verify Contributor', () => {
  cy.get('@button').then((button) => {
    cy.get(`[data-testid^=${button}]`).first().click();
  });
});
Then('they see the Verify Contributor Dialog', () => {
  cy.get(`[data-testid=contributor-modal]`).should('be.visible');
});
Then("they see a search field prefilled with the selected Contributor's name", () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).should('be.visible');
});
Then('they see a list of Persons matching the search', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).should('be.visible');
});

// Scenario: Creator verifies Contributor
Given('Creator opens Dialog to Verify Contributor', () => {
  const title = `Verify contributor ${uuid()}`;
  const user = userName[TestUsers.features.contributors];

  cy.login(TestUsers.features.contributors).then(() => {
    createPublicationUsingAPI(title, CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then((builder) => {
      builder.entityDescription.contributors[0].identity.verificationStatus = 'NotVerified';
      builder.update().then(() => {});
    });
    cy.mockPersonSearch(TestUsers.features.contributors);
    cy.searchFor(title);
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('Contributors TestUser');
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    cy.get(`[data-testid^=button-set-unverified-contributor-]`).first().click();
  });
});
When('they select a Person from the Search Results', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
});
Then('the Dialog is closed', () => {
  cy.get(`[data-testid=contributor-modal]`).should('not.exist');
});
Then('they see the Contributor is now verified', () => {
  cy.get(`[data-testid^=${dataTestId.registrationWizard.contributors.verifiedAuthor('')}]`).should('be.visible');
});
Then('all current Affiliations are listed for the Contributor', () => {
  cy.contains('Unit');
});

const filename = 'example.txt';

// Scenario: Creator searches for registered Contributor
Given('a registration with several registrered Contributors', () => {
  cy.login(TestUsers.features.contributors);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(
    dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_MONOGRAPH)
  ).click();

  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  let index = 0;
  while (index < 6) {
    index++;
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(
      `withauthor ${index} testuser{enter}`
    );
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  }
});
When('a User opens the Registration wizard in the Contributor tab', () => {});
When('they search for a Contributor', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.contributorSearchField).within(() => {
    cy.get('input').type('Withauthor 3 testuser');
  });
});
Then('the Contributor is displayed in the list of Contributors', () => {
  cy.contains('Withauthor 3 TestUser').should('be.visible');

  cy.contains('Withauthor 1 TestUser').should('not.exist');
  cy.contains('Withauthor 2 TestUser').should('not.exist');
  cy.contains('Withauthor 4 TestUser').should('not.exist');
  cy.contains('Withauthor 5 TestUser').should('not.exist');
  cy.contains('Withauthor 6 TestUser').should('not.exist');
});
