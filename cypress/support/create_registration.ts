import { formatedToday, today } from './commands';
import { dataTestId } from './dataTestIds';

export const createValidRegistrationWithType = (title: string, type?: string, fileName?: string, fileVersion?: string, fileType?: string) => {
    // Description
    cy.getDataTestId(dataTestId.registrationWizard.stepper.descriptionStepButton).click({ force: true });
    title = title ? `${title} ${today}` : `Title ${today}`;
    cy.get('[data-testid=registration-title-field]').type(title, { delay: 0 });
    cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`, formatedToday);

    // Reference
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(type)).click();
    addCategoryData(type);

    // Contributors
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click({ force: true });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click({ force: true });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton, { timeOut: 30000 }).should('not.exist');

    // Files and reference
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click({ force: true });
    if (fileName) {
        cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
        const accessabilityType = fileType ? 'Open file' : fileType;
        if (fileType !== 'None') {
            cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
            cy.contains(accessabilityType).click();
        }
        if (accessabilityType === 'Open file') {
            cy.getDataTestId(dataTestId.registrationWizard.files.version, { timeout: 30000 }).within(() => {
                if (fileVersion === 'Accepted') {
                    cy.get('input[type=radio]').first().click();
                } else if (fileVersion !== 'Not set') {
                    cy.get('input[type=radio]').last().click();
                }
            });
            cy.get('[data-testid=uploaded-file-select-license]').scrollIntoView().click({ force: true }).type(' ');
            cy.get('[data-testid=license-item]').first().click({ force: true });
        }
    }

};

const addCategoryData = (type: string) => {
    switch (type) {
        case 'BookAnthology':
        case 'ReportBookOfAbstract':
        case 'ReportResearch':
        case 'DataManagementPlan':
            cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('ntnu samfunnsforskning', { delay: 1 });
            cy.contains('NTNU Samfunnsforskning').click();
            break;
        case 'ConferenceAbstract':
            cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('acs chemical');
            cy.contains('ACS Chemical Biology').click();
            break;
        case 'JournalCorrigendum':
            cy.getDataTestId(dataTestId.registrationWizard.resourceType.corrigendumForField).type('original publication for corrigendum');
            cy.contains('Original publication for corrigendum').click();
            break;
        }
};

export const changeContributor = (userFrom: string, userTo: string): void => {
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.getDataTestId(`"${dataTestId.registrationWizard.contributors.removeContributorButton(userFrom)}"`).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccess();
    cy.getSuccessDone();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.startPage.searchField).type(userTo);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccess();
};
