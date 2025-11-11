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

const createChapter = ((title: string, anthology: string,) => {
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type(title);
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`, todayDatePicker());
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_CHAPTER)).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(anthology.toLowerCase());
  cy.contains(anthology).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.scientificSubjectField).click();
  cy.contains('Archaeology and Conservation').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getSuccessDone();
});

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

  createChapter(chapterTitle, anthologyTitle);

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

// Change Anthology from scientific to non-scientific
Given('publication has publicationContext refering to Anthology which is NVI candidate', () => {
  cy.login(TestUsers.nvi.usn.institution);

  // Create scientific anthology with series (making it NVI candidate)
  anthologyTitle = `Scientific Anthology ${uuid()}`;
  cy.createPublishedRegistration(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY);

  cy.wrap(anthologyTitle).as('anthologyTitle');

  // Create chapter
  chapterTitle = `NVI Chapter Scientific ${uuid()}`;
  createChapter(chapterTitle, anthologyTitle);
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
Given('publication with publicationInstance type AcademicMonograph', () => {
  cy.login(TestUsers.nvi.usn.institution);
  anthologyTitle = `Academic Monograph ${uuid()}`;
  cy.createPublishedRegistration(anthologyTitle, CategoryTypes.ACADEMIC_MONOGRAPH);
  cy.wrap(anthologyTitle).as('anthologyTitle');
});

Given('publication is NVI candidate', () => {
  // Add series to make it NVI candidate
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type('geoscientific model development');
  cy.contains('Geoscientific Model Development').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  cy.wait(15000);
});

Given('publication has AcademicChapter refering to the AcademicMonograph', () => {
  // Create chapter
  chapterTitle = `Chapter for Monograph ${uuid()}`;
  cy.createPublishedRegistration(chapterTitle, CategoryTypes.ACADEMIC_CHAPTER);
  cy.wrap(chapterTitle).as('chapterTitle');

  // Link chapter to monograph
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(anthologyTitle.toLowerCase());
  cy.contains(anthologyTitle).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  cy.wait(15000);
});

When('AcademicChapter is updated to refer to another Book', () => {
  cy.login(TestUsers.nvi.usn.change);

  // Create another book
  anotherBookTitle = `Another Book ${uuid()}`;
  cy.createPublishedRegistration(anotherBookTitle, CategoryTypes.ACADEMIC_MONOGRAPH);

  // Update chapter to refer to new book
  cy.visit('/');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${chapterTitle}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.contains(chapterTitle).click();

  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();

  // Clear old reference and add new one
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.partOfField}]`).within(() => {
    cy.get('button[aria-label="Clear"]').click();
  });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(anotherBookTitle.toLowerCase());
  cy.contains(anotherBookTitle).click();

  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  cy.wait(15000);
});

Then('AcademicMonograph should appear in correction list for "Antholoy without chapter"', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  // Open correction list
  cy.getDataTestId(dataTestId.tasksPage.correctionList.correctionListAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.anthologyWithoutChapterButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  // Wait for correction list to update
  cy.wait(10000);

  // Search for the monograph in correction list
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${anthologyTitle}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  // Verify it appears in the correction list
  cy.contains(anthologyTitle).should('exist');
});

// Scenario 4: Anthology is removed from correction list when chapter is added
Given('publication has no AcademicChapters refering to it', () => {
  // Monograph already created without chapters in this scenario
  cy.login(TestUsers.nvi.usn.institution);
  anthologyTitle = `Monograph Without Chapters ${uuid()}`;
  cy.createPublishedRegistration(anthologyTitle, CategoryTypes.ACADEMIC_MONOGRAPH);
  cy.wrap(anthologyTitle).as('anthologyTitle');

  // Add series to make it NVI candidate
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.seriesField).type('geoscientific model development');
  cy.contains('Geoscientific Model Development').click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  cy.wait(15000);
});

Given('AcademicMonograph is present in correction list for "Antholoy without chapter"', () => {
  // Verify it's in correction list
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  cy.getDataTestId(dataTestId.tasksPage.correctionList.correctionListAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.anthologyWithoutChapterButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  cy.wait(10000);

  cy.getDataTestId(dataTestId.startPage.searchField).type(`${anthologyTitle}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.contains(anthologyTitle).should('exist');
});

When('adding AcademicChapter that refers to that AcademicMonograph', () => {
  cy.login(TestUsers.nvi.usn.change);

  // Create chapter
  chapterTitle = `New Chapter for Monograph ${uuid()}`;
  cy.createPublishedRegistration(chapterTitle, CategoryTypes.ACADEMIC_CHAPTER);
  cy.wrap(chapterTitle).as('chapterTitle');

  // Link chapter to monograph
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(anthologyTitle.toLowerCase());
  cy.contains(anthologyTitle).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();

  cy.wait(15000);
});

Then('AcademicMonograph should disappear from correction list for "Antholoy without chapter"', () => {
  cy.login(TestUsers.nvi.usn.curator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  // Open correction list
  cy.getDataTestId(dataTestId.tasksPage.correctionList.correctionListAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.correctionList.anthologyWithoutChapterButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  // Wait for correction list to update
  cy.wait(10000);

  // Search for the monograph - it should NOT be in correction list anymore
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${anthologyTitle}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  // Verify it does NOT appear in the correction list
  cy.get('li').filter(`:contains("${anthologyTitle}")`).should('not.exist');
});
