// export const validRegistration = (fileName, title) => {
// // Description
//   cy.getDataTestId(dataTestId.registrationWizard.stepper.descriptionStepButton).click({ force: true });
//   title = title ? `${title} ${today}` : `Title ${today}`;
//   cy.get('[data-testid=registration-title-field]').type(title, { delay: 0 });
//   cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`, '01.01.2020');

//   // Reference
//   cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });

//   cy.getDataTestId('resource-type-chip-AcademicArticle').click({ force: true });
//   cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField)
//     .click({ force: true })
//     .type('Norges byggforskningsinstitutt');
//   cy.contains('Norges byggforskningsinstitutt').click({ force: true });

//   // Contributors
//   cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click({ force: true });
//   cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click({ force: true });
//   cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
//   cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton, { timeOut: 30000 }).should('not.exist');

//   // Files and reference
//   cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click({ force: true });
//   cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
//   cy.getDataTestId(dataTestId.registrationWizard.files.version, { timeout: 30000 }).within(() => {
//     cy.get('input[type=radio]').last().click();
//   });
//   cy.get('[data-testid=uploaded-file-select-license]').scrollIntoView().click({ force: true }).type(' ');
//   cy.get('[data-testid=license-item]').first().click({ force: true });
// }
