// // Cypress.Commands.add('startRegistrationWithFile', (fileName) => {
// export const registrationWithFile = (fileName) => {
//   cy.getDataTestId(dataTestId.header.newRegistrationLink).click({ force: true });
//   cy.getDataTestId(dataTestId.registrationWizard.new.fileAccordion).click({ force: true });
//   cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
// }

// export const wizardWithFile = (fileName) => {
//   registrationWithFile(fileName);
//   cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').should('be.enabled');
//   cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').click({ force: true });
// }

// export const registrationWithLink = (doiLink) => {
//   cy.getDataTestId(dataTestId.header.newRegistrationLink).click({ force: true });
//   cy.getDataTestId(dataTestId.registrationWizard.new.linkAccordion).click({ force: true });
//   cy.get('[data-testid=new-registration-link-field]').within((linkField) => {
//     cy.wrap(linkField).get('input').type(doiLink);
//   });
//   cy.get('[data-testid=doi-search-button]').click({ force: true });
// }

// export const wizardWithLink = (doiLink) => {
//   registrationWithLink(doiLink);
//   cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').should('be.enabled');
//   cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').click({ force: true });
// }

// export const wizardWithEmptyRegistration = () => {
//   cy.getDataTestId(dataTestId.header.newRegistrationLink).first().click({ force: true });
//   cy.getDataTestId(dataTestId.registrationWizard.new.emptyRegistrationAccordion).click();
// }
