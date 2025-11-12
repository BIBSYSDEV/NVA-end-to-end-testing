import { Given, When, Then, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, TestUsers } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { NVI_PENDING, currentYear, todayDatePicker } from '../../../support/commands';

// Shared state
let anthologyTitle: string;
let chapterTitle: string;
let anotherBookTitle: string;
const year = currentYear;

BeforeAll(() => {
  cy.login(TestUsers.nvi.usn.institution);
  anthologyTitle = `Non-Scientific Anthology ${uuid()}`;
  cy.createPublishedRegistration(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('sintef akademisk forlag');
  cy.contains('SINTEF akademisk forlag').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();
  cy.wrap(anthologyTitle).as('anthologyTitle');
});

// Scenario 1: Change Anthology from non-scientific to scientific
Given('publication with publicationInstance type AcademicChapter', () => {
  cy.login(TestUsers.nvi.usn.institution);
  chapterTitle = `NVI Chapter ${uuid()}`;
  cy.wrap(chapterTitle).as('chapterTitle');
});

Given('publication has publicationContext refering to Anthology which is not NVI candidate', () => {
  cy.createPublishedChapter(chapterTitle, anthologyTitle);

  // Verify chapter is not an NVI candidate
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.selectNVIStatus(NVI_PENDING);
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.get(`[data-value=${year}]`).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.searchFor(chapterTitle);
  cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).should('not.exist');
});

When('Anthology is updated and becomes NVI candidate', () => {
  cy.getDataTestId('logo').click();
  cy.getDataTestId(dataTestId.frontPage.registrationsLink).click();
  cy.searchFor(anthologyTitle);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.contains(anthologyTitle).click();

  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('springer nature');
  cy.contains('Springer Nature').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  // Wait for NVI processing
  cy.wait(15000);
});

Then('AcademicChapter should also be evaluated as NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.selectNVIStatus(NVI_PENDING);
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.get(`[data-value=${year}]`).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  // Wait and reload pattern for async NVI processing
  cy.get('main').then((doc) => {
    if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length < 1) {
      cy.wait(30000);
      cy.reload();
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    }
  });

  cy.searchFor(chapterTitle);
  cy.contains(chapterTitle);
});

// Scenario 2: Change Anthology from scientific to non-scientific
Given('publication has publicationContext refering to Anthology which is NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.institution);

  // Create scientific anthology with series (making it NVI candidate)
  anthologyTitle = `Scientific Anthology ${uuid()}`;
  cy.createPublishedRegistration(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);

  cy.wrap(anthologyTitle).as('anthologyTitle');

  // Create chapter
  chapterTitle = `NVI Chapter Scientific ${uuid()}`;
  cy.createPublishedChapter(chapterTitle, anthologyTitle);
  cy.wrap(chapterTitle).as('chapterTitle');

  cy.wait(15000);

  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.selectNVIStatus(NVI_PENDING);
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.get(`[data-value=${year}]`).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  cy.get('main').then((doc) => {
    if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length < 1) {
      cy.wait(30000);
      cy.reload();
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    }
  });

  cy.getNVIWorklistItem(chapterTitle).should('exist');
});

When('Anthology is updated and becomes non NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.institution);

  cy.searchFor(anthologyTitle);
  cy.contains(anthologyTitle).click();

  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('sintef akademisk forlag');
  cy.contains('SINTEF akademisk forlag').click();

  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  cy.wait(15000);
});

Then('AcademicChapter should also be evaluated as non NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.selectNVIStatus(NVI_PENDING);
  cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
  cy.get(`[data-value=${year}]`).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  cy.wait(10000);

  cy.searchFor(chapterTitle);
  cy.contains(chapterTitle).should('not.exist');
});

// Scenario 3: Anthology is moved to correction list when chapter is removed
Given('publication with publicationInstance type Anthology', () => {
  cy.login(TestUsers.nvi.usn.change);
  anthologyTitle = `Anthology ${uuid()}`;
  cy.wrap(anthologyTitle).as('anthologyTitle');
});

Given('publication is NVI candidate', () => {
  cy.createPublishedRegistration(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);
});

Given('publication has AcademicChapter refering to the Anthology', () => {
  // Create chapter
  chapterTitle = `Chapter for Anthology ${uuid()}`;
  cy.createPublishedChapter(chapterTitle, anthologyTitle);
  cy.wrap(chapterTitle).as('chapterTitle');
});

When('AcademicChapter is updated to refer to another Book', () => {

  // Create another book
  anotherBookTitle = `Another Book ${uuid()}`;
  cy.createPublishedRegistration(anotherBookTitle, CategoryTypes.BOOK_ANTHOLOGY);
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('sintef akademisk forlag');  
  cy.contains('SINTEF akademisk forlag').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  cy.getDataTestId('logo').click();
  cy.getDataTestId(dataTestId.frontPage.registrationsLink).click();
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${chapterTitle}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.contains(chapterTitle).click();

  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(anotherBookTitle.toLowerCase());
  cy.contains(anotherBookTitle).click();

  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();
});

When('the Anthology has no AcademicChapter refering to it', () => {
});

Then('Anthology should appear in correction list for "Anthology without chapter"', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.correctionListAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.anthologyWithoutChapterButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  // cy.searchFor(anthologyTitle);

  cy.contains(anthologyTitle).should('exist');
});

// Scenario 4: Anthology is removed from correction list when chapter is added
Given('publication has no AcademicChapters refering to it', () => {
  cy.login(TestUsers.nvi.usn.change);
  anthologyTitle = `Anthology Without Chapters ${uuid()}`;
  cy.createPublishedRegistration(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);
  cy.wrap(anthologyTitle).as('anthologyTitle');
});

Given('Anthology is present in correction list for "Anthology without chapter"', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.correctionListAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.anthologyWithoutChapterButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  // cy.searchFor(anthologyTitle);
  cy.contains(anthologyTitle).should('exist');
});

When('adding AcademicChapter that refers to that Anthology', () => {
  cy.get('@anthologyTitle').then((anthology) => {
    const anthologyTitle = anthology.toString();
    chapterTitle = `New Chapter for Anthology ${uuid()}`;
    cy.createPublishedChapter(chapterTitle, anthologyTitle);
    cy.wrap(chapterTitle).as('chapterTitle');

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

  // cy.searchFor(anthologyTitle);

  cy.contains(anthologyTitle).should('not.exist');
});
