// Feature: Valid NVI candidates

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { TestUsers } from '../../../support/constants';
import { v4 as uuid } from 'uuid';
import { CategoryTypes } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

const addContributor = (name: string) => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`${name}{enter}`);
  cy.get('td')
    .filter(`:contains("${name}")`)
    .parent()
    .within(() => {
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
    });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();
};

// Scenario Outline: A user with multiple norwegian institutions registrers an NVI-candidate publication
Given('a user with an affiliation from an NVI-institution', () => {
  cy.login(TestUsers.nvi.usn.institution);
});
When('the user registrers a publication that is an NVI-candidate with category {string}', (category) => {
  const categories = {
    'Scientific Article': CategoryTypes.ACADEMIC_ARTICLE,
    'Monograph': CategoryTypes.ACADEMIC_MONOGRAPH,
    'AcademicChapter': CategoryTypes.ACADEMIC_CHAPTER,
  };

  const title = `NVI Candidate ${category} ${uuid()}`;
  cy.wrap(title).as('registrationTitle');

  switch (category.toString()) {
    case 'Scientific Article':
    case 'Monograph':
      cy.createPublishedRegistration(title, categories[category.toString()]);
      break;
    case 'AcademicChapter':
      const anthologyTitle = `Anthology for NVI Candidate Anthology ${uuid()}`;
      cy.createPublishedRegistration(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);
      cy.createPublishedChapter(title, anthologyTitle);
      break;
  }
});
When('the user adds a contributor with multiple institution affiliations', () => {
    addContributor('Multiple institutions TestUser');
});
Then('the publication is listed as an NVI-candidate for all institutions the user is affiliated with', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.get<string>('@registrationTitle').then((title) => {
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.selectNVICandidate(title);
    cy.login(TestUsers.curators.basicnvi);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.selectNVICandidate(title);
  });
});

// Examples:
//     | Category           |
//     | Scientific Article |
//     | Monograph          |
//     | AcademicChapter    |

// Scenario Outline: A user with a foreign institution registrers an NVI-candidate publication
Given('a user with affiliations to multiple institutions including a foreign institution', () => {
  cy.login(TestUsers.nvi.usn.multipleInstitutionsForeign);
});
// When('the user registrers a publication that is an NVI-candidate with category {string}', (category) => {});
Then(
  'the publication is listed as an NVI-candidate for the norwegian institutions the user is affiliated with',
  () => {}
);

// Examples:
//     | Category           |
//     | Scientific Article |
//     | Monograph          |
//     | AcademicChapter    |

// Scenario Outline: A user registrers a publication with a contributor from a foreign institution
Given('a user with an affiliation to a norwegian institution', () => {
  cy.login(TestUsers.nvi.usn.institution);
});
When(
  'the user registrers a publication with category {string} that is an NVI-candidate with a contributor from a foreign institution',
  (category) => {}
);
Then(
  'the publication is listed as an NVI-candidate for the norwegian institution the user is affiliated with',
  () => {}
);

// Examples:
//     | Category           |
//     | Scientific Article |
//     | Monograph          |
//     | AcademicChapter    |
