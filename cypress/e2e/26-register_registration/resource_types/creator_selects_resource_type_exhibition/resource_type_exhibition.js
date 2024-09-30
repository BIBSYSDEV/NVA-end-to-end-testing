import { dataTestId } from "../../../../support/dataTestIds";
import { userSaveExhibition } from '../../../../support/constants'

// Feature: Creator selects Resource tyoe "Exhibition"

const announcementFields = {
    'Title': dataTestId.registrationWizard.resourceType.outputJournalBookMediumField,
    'Issue': dataTestId.registrationWizard.resourceType.outputIssueField,
    'Page(s)': dataTestId.registrationWizard.resourceType.outputInstantDateField,
    'Date': dataTestId.registrationWizard.resourceType.outputInstantDateField,
    'Other information': dataTestId.registrationWizard.resourceType.outputDescriptionField,
    'Type': dataTestId.registrationWizard.resourceType.outputTypeField,
    'Place': dataTestId.registrationWizard.resourceType.placeField,
    'Publisher': dataTestId.registrationWizard.resourceType.publisherNameField,
    'Description': dataTestId.registrationWizard.resourceType.outputDescriptionField,
    'Date from': dataTestId.registrationWizard.resourceType.dateFromField,
    'Date to': dataTestId.registrationWizard.resourceType.dateToField,
    'Organization': dataTestId.registrationWizard.resourceType.exhibitionBasicNameField,
}


//     Scenario: Creator navigates to the Resource Type tab and selects Resource type "Exhibition"
Given('Creator starts registering a Registration', () => {
    cy.login(userSaveExhibition);
    cy.getDataTestId(dataTestId.header.newRegistrationLink).click();
    cy.getDataTestId(dataTestId.registrationWizard.new.emptyRegistrationAccordion).click();
});
When('they navigates to the Resource type tab', () => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
Then('they see a Exhibition types:', () => {
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('ExhibitionProduction'));
});
//             | ExhibitionProduction |

//     Scenario: Creator selects Resource type ExhibitionProduction
Given('Creator navigates to the Resource Type tab and selects Resource type "Exhibition"', () => {
    cy.login(userSaveExhibition);
    cy.getDataTestId(dataTestId.header.newRegistrationLink).click();
    cy.getDataTestId(dataTestId.registrationWizard.new.emptyRegistrationAccordion).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('they select Resource type ExhibitionProduction', () => {
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('ExhibitionProduction')).click();
});
Then('they can select type of exhibition as one of:', (dataTable) => {
    const subtypes = {
        'Basic exhibition': 'BasicExhibition',
        'Temporary exhibition': 'TemporaryExhibition',
        'Popup exhibition': 'PopupExhibition',
        'Ambulating exhibition': 'AmbulatingExhibition',
        'Digital exhibition': 'DigitalExhibition',
        'Historical interior': 'HistoricalInterior',
        'Other exhibition': 'ExhibitionProductionOther',
    }

    cy.getDataTestId(dataTestId.registrationWizard.resourceType.subtypeField).click();
    dataTable.rawTable.forEach(exhibitionType => {
        const subType = subtypes[exhibitionType[0]];
        cy.get(`[data-value=${subType}]`);
    });
});
//             | Basic exhibition      |
//             | Temporary exhibition  |
//             | Popup exhibition      |
//             | Ambulating exhibition |
//             | Digital exhibition    |
//             | Historical interior   |
//             | Other exhibition      |
And('the can add manifestations of types:', (dataTable) => {
    const announcements = {
        'ExhibitionBasic': dataTestId.registrationWizard.resourceType.addExhibitionBasicButton,
        'ExhibitionCatalog': dataTestId.registrationWizard.resourceType.addExhibitionCatalogButton,
        'ExhibitionMentionInPublication': dataTestId.registrationWizard.resourceType.addPublicationMentionButton,
        'ExhibitionOtherPresentation': dataTestId.registrationWizard.resourceType.addExhibitionOtherPresentationButton,
    }
    cy.get(`[data-value=BasicExhibition]`).click();
    cy.testDataTestidList(dataTable, announcements);
});
//             | ExhibitionCatalog              |
//             | ExhibitionBasic                |
//             | ExhibitionMentionInPublication |
//             | ExhibitionOtherPresentation    |

//     Scenario: Creator adds ExhibitionMentionInPublication to an ExhibitionProduction
Given('Creator selects Resource type ExhibitionProduction', () => {
    cy.login(userSaveExhibition);
    cy.getDataTestId(dataTestId.header.newRegistrationLink).click();
    cy.getDataTestId(dataTestId.registrationWizard.new.emptyRegistrationAccordion).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('ExhibitionProduction')).click();
});
When('the add an ExhibitionMentionInPublication', () => {
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.addPublicationMentionButton).click();
});
Then('they can add information of type:', (dataTable) => {
    cy.testDataTestidList(dataTable, announcementFields);
});
//             | Title             |
//             | Issue             |
//             | Page(s)           |
//             | Date              |
//             | Other information |

//     Scenario: Creator adds ExhibitionOtherPresentation to an ExhibitionProduction
Given('Creator selects Resource type ExhibitionProduction', () => { });
When('the add an ExhibitionOtherPresentation', () => {
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.addExhibitionOtherPresentationButton).click();
});
Then('they can add information of type:', (dataTable) => { });
//             | Type        |
//             | Place       |
//             | Publisher   |
//             | Description |
//             | Date        |

//     Scenario: Creator adds ExhibitionCatalog to an ExhibitionProduction
Given('Creator selects Resource type ExhibitionProduction', () => { });
When('the add an ExhibitionCatalog', () => {
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.addExhibitionCatalogButton).click();
});
Then('they can search for, and add, an published ExhibitionCatalog', () => {
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.exhibitionCatalogSearchField);
});

//     Scenario: Creator adds ExhibitionBasic to an ExhibitionProduction
Given('Creator selects Resource type ExhibitionProduction', () => { });
When('the add an ExhibitionBasic', () => {
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.addExhibitionBasicButton).click();
});
Then('they can add information of type:', (dataTable) => { });
//             | Organization |
//             | Place        |
//             | Date         |
