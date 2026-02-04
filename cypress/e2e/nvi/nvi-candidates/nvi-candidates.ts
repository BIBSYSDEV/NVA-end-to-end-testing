// Feature: Valid NVI candidates

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { ContributorTypes, TestUsers, userName } from '../../../support/constants';
import { v4 as uuid } from 'uuid';
import { CategoryTypes } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import {
  createChapterInAnthologyUsingAPI,
  createPublicationUsingAPI,
  NviLevels,
  RegistrationData,
} from '../../../support/create_registration';

const addContributor = (name: string) => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`${name}{enter}`);
  cy.get('td')
    .filter(`:contains("${name}")`)
    .first()
    .parent()
    .within(() => {
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
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
When('the user registrers a publication that is an NVI-candidate with category {string}', (category: unknown) => {
  const categories = {
    'Scientific Article': CategoryTypes.ACADEMIC_ARTICLE,
    'Monograph': CategoryTypes.ACADEMIC_MONOGRAPH,
    'AcademicChapter': CategoryTypes.ACADEMIC_CHAPTER,
  };

  const title = `NVI Candidate ${category} ${uuid()}`;
  cy.wrap(title).as('registrationTitle');

  switch (categories[category as string]) {
    case CategoryTypes.ACADEMIC_ARTICLE:
    case CategoryTypes.ACADEMIC_MONOGRAPH:
      createPublicationUsingAPI(
        title,
        categories[category as string],
        userName[TestUsers.nvi.usn.institution],
        NviLevels.LEVEL_1
      ).then();
      break;
    case CategoryTypes.ACADEMIC_CHAPTER:
      const anthologyTitle = `Anthology for NVI Candidate Anthology ${uuid()}`;
      createChapterInAnthologyUsingAPI(
        title,
        anthologyTitle,
        userName[TestUsers.nvi.usn.institution],
        NviLevels.LEVEL_1
      );
      break;
  }
});
When('the user adds a contributor with multiple institution affiliations', () => {
  cy.get('@registrationTitle').then((title: unknown) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.get('a')
      .filter(`:contains(${title as string})`)
      .click();
    addContributor('Multiple institutions TestUser');
  });
});
Then('the publication is listed as an NVI-candidate for all institutions the user is affiliated with', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.get<string>('@registrationTitle').then((title) => {
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.openNVIWorklist();
    cy.selectNVICandidate(title);
    cy.login(TestUsers.curators.basicnvi);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.openNVIWorklist();
    cy.selectNVICandidate(title);
  });
});

// Examples:
//     | Category           |
//     | Scientific Article |
//     | Monograph          |
//     | AcademicChapter    |

// Scenario Outline: A user with a foreign institution registrers an NVI-candidate publication
// When('the user registrers a publication that is an NVI-candidate with category {string}', (category) => {});
When('the user adds a contributor with a norwegian and a foreign institution affiliation', () => {
  cy.get('@registrationTitle').then((title: unknown) => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.get('a')
      .filter(`:contains(${title as string})`)
      .click();
    addContributor('Multiple institutions TestUser');
  });
});
Then('the publication is listed as an NVI-candidate for the norwegian institutions the user is affiliated with', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.get<string>('@registrationTitle').then((title) => {
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.openNVIWorklist();
    cy.selectNVICandidate(title);
  });
});

// Examples:
//     | Category           |
//     | Scientific Article |
//     | Monograph          |
//     | AcademicChapter    |

// Scenario Outline: A user registrers a publication with a contributor from a foreign institution
Given('a user with an affiliation to a norwegian institution', () => {
  cy.login(TestUsers.nvi.usn.institution);
});
// When('the user registrers a publication that is an NVI-candidate with category {string}', (category) => {});
When('the user adds a contributor from a foreign institution affiliation', () => {
  cy.get('@registrationTitle').then((title: unknown) => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.get('a')
      .filter(`:contains(${title as string})`)
      .click();
    addContributor('Multiple institutions TestUser');
  });
});
// Then(
//   'the publication is listed as an NVI-candidate for the norwegian institutions the user is affiliated with',
//   () => {

//   });

// Examples:
//     | Category           |
//     | Scientific Article |
//     | Monograph          |
//     | AcademicChapter    |

// Scenario: A monograph without ISBN/ISSN is not an NVI-candidate
When('the user registrers a monograph without ISBN or ISSN', () => {
  const title = `Non NVI monograph without ISBN/ISSN ${uuid()}`;
  cy.wrap(title).as('registrationTitle');
  createPublicationUsingAPI(
    title,
    CategoryTypes.ACADEMIC_MONOGRAPH,
    userName[TestUsers.nvi.usn.institution],
    NviLevels.LEVEL_1
  ).then((registration) => {
    registration.entityDescription.reference.publicationContext.isbnList = [];
    registration.update().then();
  });
});

Then('the publication is not listed as an NVI-candidate for the institution the user is affiliated with', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.get<string>('@registrationTitle').then((title) => {
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.openNVIWorklist();
    cy.searchFor(title);
    cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).should('not.exist');
  });
});

// Scenario: An academic chapter without ISBN/ISSN is not an NVI-candidate
When('the user registrers an academic chapter without ISBN or ISSN', () => {
  const anthologyTitle = `Anthology for Non NVI chapter without ISBN/ISSN ${uuid()}`;
  const chapterTitle = `Non NVI chapter without ISBN/ISSN ${uuid()}`;
  cy.wrap(chapterTitle).as('registrationTitle');
  createChapterInAnthologyUsingAPI(
    chapterTitle,
    anthologyTitle,
    userName[TestUsers.nvi.usn.institution],
    NviLevels.LEVEL_1
  );
  cy.get('@anthologyBuilder').then((builder: unknown) => {
    const anthology = builder as RegistrationData;
    anthology.entityDescription.reference.publicationContext.isbnList = [];
    anthology.update().then();
  });
});
// Then ('the publication is not listed as an NVI-candidate for the institution the user is affiliated with', () => {});

// Scenario: A monograph with only editor as contributor is not an NVI-candidate
When('the user registrers a monograph with only editor as contributor', () => {
  const title = `Non NVI monograph with only editor ${uuid()}`;
  cy.wrap(title).as('registrationTitle');

  createPublicationUsingAPI(
    title,
    CategoryTypes.ACADEMIC_MONOGRAPH,
    userName[TestUsers.nvi.usn.institution],
    NviLevels.LEVEL_1
  ).then((builder) => {
    builder.entityDescription.contributors[0].role.type = ContributorTypes.EDITOR;
    builder.update().then();
  });
});
// Then ('the publication is not listed as an NVI-candidate for the institution the user is affiliated with', () => {});
