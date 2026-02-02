import { Given, When, Then, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, TestUsers, userName } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { currentYear } from '../../../support/commands';
import {
  createChapterInAnthologyUsingAPI,
  createPublicationUsingAPI,
  NviLevels,
  RegistrationData,
} from '../../../support/create_registration';

// Shared state
const year = currentYear;
const USN_USER = userName[TestUsers.nvi.usn.institution];
const USN_USER_CHANGE = userName[TestUsers.nvi.usn.change];
const SINTEF_AKADEMSIK_FORLAG_URI = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/publisher/D4AA649E-CB53-4CA0-89EC-F68FB02CFB96/${year}`;
const SPRINGER_NATURE_URI = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/publisher/DC752087-7122-4D3A-9E4F-382AA2F39D2C/${year}`;

// Scenario 1: Change Anthology from non-scientific to scientific
Given('publication with publicationInstance type AcademicChapter', () => {
  cy.login(TestUsers.nvi.usn.institution).then(() => {
    const anthologyTitle = `Non-Scientific Anthology ${uuid()}`;
    cy.wrap(anthologyTitle).as('anthologyTitle');
    const scientificChapterTitle = `NVI Chapter ${uuid()}`;
    cy.wrap(scientificChapterTitle).as('scientificChapterTitle');
    createChapterInAnthologyUsingAPI(scientificChapterTitle, anthologyTitle, USN_USER, NviLevels.LEVEL_1);
    cy.get('@anthologyBuilder').then((builder: unknown) => {
      const anthologyBuilder = builder as RegistrationData;
      anthologyBuilder.entityDescription.reference.publicationContext.publisher.id = SINTEF_AKADEMSIK_FORLAG_URI;
      anthologyBuilder.update();
    });
  });
});
Given('publication has publicationContext refering to Anthology which is not NVI candidate', () => {
  // Verify chapter is not an NVI candidate
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();
  cy.get('@scientificChapterTitle').then((scientificChapterTitle: unknown) => {
    cy.searchFor(scientificChapterTitle as string);
  });
  cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).should('not.exist');
});

When('Anthology is updated and becomes NVI candidate', () => {
  cy.getDataTestId('logo').click();
  cy.getDataTestId(dataTestId.frontPage.registrationsLink).click();
  cy.get('@anthologyTitle').then((anthology: unknown) => {
    cy.searchFor(anthology as string);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.contains(anthology as string).click();
  });

  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('springer nature');
  cy.contains('Springer Nature').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  // cy.wait(5000);
});

Then('AcademicChapter should also be evaluated as NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();

  // Wait and reload pattern for async NVI processing
  cy.get('main').then((doc) => {
    if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length < 1) {
      cy.wait(30000);
      cy.reload();
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    }
  });

  cy.get('@scientificChapterTitle').then((scientificChapterTitle: unknown) => {
    cy.searchFor(scientificChapterTitle as string);
    cy.contains(scientificChapterTitle as string).should('exist');
  });
});

// Scenario 2: Change Anthology from scientific to non-scientific
Given('publication has publicationContext refering to Anthology which is NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.institution).then(() => {
    const scientificAnthologyTitle = `Scientific Anthology ${uuid()}`;
    cy.wrap(scientificAnthologyTitle).as('scientificAnthologyTitle');

    const scientificChapterTitle = `NVI Chapter Scientific ${uuid()}`;
    cy.wrap(scientificChapterTitle).as('scientificChapterTitle');

    createChapterInAnthologyUsingAPI(scientificChapterTitle, scientificAnthologyTitle, USN_USER, NviLevels.LEVEL_1);
    cy.get('@anthologyBuilder').then((builder: unknown) => {
      const anthologyBuilder = builder as RegistrationData;
      anthologyBuilder.entityDescription.reference.publicationContext.publisher.id = SPRINGER_NATURE_URI;
      anthologyBuilder.update();
    });
  });

  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();

  cy.get('main').then((doc) => {
    if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length < 1) {
      cy.wait(30000);
      cy.reload();
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    }
  });
  cy.get('@scientificChapterTitle').then((chapterTitle: unknown) => {
    console.log(`Chapter ${chapterTitle}`);

    cy.getNVIWorklistItem(chapterTitle as string).should('exist');
  });
});

When('Anthology is updated and becomes non NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.institution);

  cy.get('@scientificAnthologyTitle').then((anthology: unknown) => {
    cy.searchFor(anthology as string);
    cy.contains(anthology as string).click();
  });

  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('sintef akademisk forlag');
  cy.contains('SINTEF akademisk forlag').click();

  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  // cy.wait(15000);
});

Then('AcademicChapter should also be evaluated as non NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.openNVIWorklist();

  // cy.wait(10000);

  cy.get('@scientificChapterTitle').then((scientificChapterTitle: unknown) => {
    cy.searchFor(scientificChapterTitle as string);
    cy.contains(scientificChapterTitle as string).should('not.exist');
  });
});

// Scenario 3: Anthology is moved to correction list when chapter is removed
Given('publication with publicationInstance type Anthology', () => {
  const anthologyTitle = `Anthology ${uuid()}`;
  cy.wrap(anthologyTitle).as('anthologyTitle');
});

Given('publication is NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.change).then(() => {
    cy.get('@anthologyTitle').then((anthology: unknown) => {
      const builder = createPublicationUsingAPI(
        anthology as string,
        CategoryTypes.BOOK_ANTHOLOGY,
        USN_USER,
        NviLevels.LEVEL_1
      );
      cy.wrap(builder).then(() => {
        cy.wrap(builder.identifier).as('anthologyId');
      });
    });
  });
});

Given('publication has AcademicChapter refering to the Anthology', () => {
  cy.then(() => {
    const scientificChapterTitle = `Chapter for Anthology ${uuid()}`;
    createPublicationUsingAPI(scientificChapterTitle, CategoryTypes.ACADEMIC_CHAPTER, USN_USER, NviLevels.LEVEL_1);
    cy.wrap(scientificChapterTitle).as('chapterTitle');
  });
});

When('AcademicChapter is updated to refer to another Book', () => {
  // Create another book
  cy.then(() => {
    const anotherBookTitle = `Another Book ${uuid()}`;
    createPublicationUsingAPI(anotherBookTitle, CategoryTypes.BOOK_ANTHOLOGY, USN_USER_CHANGE, NviLevels.LEVEL_1);
    cy.searchFor(anotherBookTitle);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.contains(anotherBookTitle).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('sintef akademisk forlag');
    cy.contains('SINTEF akademisk forlag').click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccessDone();

    cy.getDataTestId('logo').click();
    cy.getDataTestId(dataTestId.frontPage.registrationsLink).click();
    cy.get('@chapterTitle').then((scientificChapterTitle: unknown) => {
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${scientificChapterTitle}{enter}`);
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.contains(scientificChapterTitle as string).click();
    });

    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(anotherBookTitle.toLowerCase());
    cy.contains(anotherBookTitle).click();

    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccessDone();
  });
});

When('the Anthology has no AcademicChapter refering to it', () => {});

Then('Anthology should appear in correction list for "Anthology without chapter"', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.correctionListAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.anthologyWithoutChapterButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year.toString()).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  cy.get('@anthologyTitle').then((anthology: unknown) => {
    cy.contains(anthology as string).should('exist');
  });
});

// Scenario 4: Anthology is removed from correction list when chapter is added
Given('publication has no AcademicChapters refering to it', () => {
  cy.login(TestUsers.nvi.usn.change);
  const anthologyTitle = `Anthology Without Chapters ${uuid()}`;
  cy.createPublishedRegistration(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);
  cy.wrap(anthologyTitle).as('anthologyTitle');
});

Given('Anthology is present in correction list for "Anthology without chapter"', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.correctionListAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.anthologyWithoutChapterButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year.toString()).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  cy.get('@anthologyTitle').then((anthology: unknown) => {
    cy.contains(anthology as string).should('exist');
  });
});

When('adding AcademicChapter that refers to that Anthology', () => {
  cy.get('@anthologyTitle').then((anthology) => {
    const anthologyTitle = anthology.toString();
    const scientificChapterTitle = `New Chapter for Anthology ${uuid()}`;
    cy.createPublishedChapter(scientificChapterTitle, anthologyTitle);

    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(anthologyTitle.toLowerCase());
    cy.contains(anthologyTitle).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccessDone();
  });
});

Then('Anthology should disappear from correction list for "Anthology without chapter"', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.correctionListAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.anthologyWithoutChapterButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.contains(year.toString()).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  cy.get('@anthologyTitle').then((anthology: unknown) => {
    cy.contains(anthology as string).should('not.exist');
  });
});
