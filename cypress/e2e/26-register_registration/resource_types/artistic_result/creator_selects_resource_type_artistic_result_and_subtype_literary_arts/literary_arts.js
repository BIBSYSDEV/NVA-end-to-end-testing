// Feature: Creator selects Resource type Artistic Result and subtype Literary Arts

import { userLiteraryArts } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import {
    literaryArtsAnnouncements,
    literaryArtsBookFields,
    literaryArtsPerformanceFields,
    literaryArtsWebFields,
    literaryArtsAudioVisualFields,
} from '../../../../../support/data_testid_constants';

//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
    cy.login(userLiteraryArts);
    cy.startWizardWithEmptyRegistration();
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('they select Resource Subtype "Literary Arts"', () => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.resourceTypeChip('LiteraryArts')}]`).click();
});
Then('they see fields:', () => { });
//   | More information |
And('they see field for Type Work with options:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticTypeField}]`).click();
    dataTable.rawTable.forEach((value) => {
        cy.get(`[data-value=${value}]`).should('be.visible');
    });
});
//   | Novel        |
//   | Poetry       |
//   | Novella      |
//   | ShortFiction |
//   | Essay        |
//   | Translation  |
//   | Retelling    |
//   | Play         |
//   | Other        |
And('they can add Announcements of type:', (dataTable) => {
    cy.testDataTestidList(dataTable, literaryArtsAnnouncements);
});
//   | Monograph                |
//   | Web Publication          |
//   | Performance              |
//   | Audio/Visual Publication |

//   Scenario: Creator adds an Monograph
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"', () => {
    cy.login(userLiteraryArts);
    cy.startWizardWithEmptyRegistration();
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.resourceTypeChip('LiteraryArts')}]`).click();
});
When('they add a Monograph with details for:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addBookButton}]`).click();
    dataTable.rawTable.forEach((field) => {
        cy.get(`[data-testid=${literaryArtsBookFields[field]['field']}]`).type(literaryArtsBookFields[field]['value']);
    });
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
//   | Publisher   |
//   | Year        |
//   | ISBN        |
//   | Total pages |
Then('the Monograph is listed under Announcements', () => {
    cy.contains(literaryArtsBookFields['Publisher']['value']);
});
And('they can edit the Monograph', () => {
    cy.contains('Show/Edit');
});
And('they can remove the Monograph', () => {
    cy.contains('Remove');
});

//   Scenario: Creator adds an Web Publication
// Given('Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"', () => { })
When('they add a Web Publication with details for:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addWebPublicationButton}]`).click();
    dataTable.rawTable.forEach((field) => {
        cy.get(`[data-testid=${literaryArtsWebFields[field]['field']}]`).type(literaryArtsWebFields[field]['value']);
    });
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
//   | Link      |
//   | Publisher |
//   | Year      |
Then('the Web Publication is listed under Announcements', () => {
    cy.contains(literaryArtsWebFields['Publisher']['value']);
});
And('they can edit the Web Publication', () => {
    cy.contains('Show/Edit');
});
And('they can remove the Web Publication', () => {
    cy.contains('Remove');
});

//   Scenario: Creator adds an Performance
// Given('Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"', () => { })
When('they add a Performance with details for:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addPerformanceButton}]`).click();
    dataTable.rawTable.forEach((field) => {
        if (field[0] === 'Type of Performance') {
            cy.get(`[data-testid=${literaryArtsPerformanceFields[field[0]]['field']}]`).click();
            cy.get(`[data-value=${literaryArtsPerformanceFields[field[0]]['value']}]`).click();
        } else if (field[0] === 'Date') {
            cy.chooseDatePicker(literaryArtsPerformanceFields[field[0]]['field'], literaryArtsPerformanceFields[field[0]]['value']);
        } else {
            cy.get(`[data-testid=${literaryArtsPerformanceFields[field[0]]['field']}]`).type(
                literaryArtsPerformanceFields[field[0]]['value']
            );
        }
    });
});
//   | Type of Performance |
//   | Place               |
//   | Date                |
And('Type of Performance can be one of:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticSubtype}]`).click();
    dataTable.rawTable.forEach(type => {
        cy.get(`[data-value=${type}]`);
    })
    cy.get(`[data-value=${literaryArtsPerformanceFields['Type of Performance']['value']}]}]`).click()
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
})
//   | Reading |
//   | Play    |
//   | Other   |
Then('the Performance is listed under Announcements', () => {
    cy.contains(literaryArtsPerformanceFields['Type of Performance']['value']);
});
And('they can edit the Performance', () => {
    cy.contains('Show/Edit');
});
And('they can remove the Performance', () => {
    cy.contains('Remove');
});

//   Scenario: Creator adds an Audio/Visual Publication
// Given('Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"', () => { })
When('they add an Audio/Visual Publication with details for:', () => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addAudioVideoButton}]`).click();
    dataTable.rawTable.forEach((field) => {
        if (field[0] === 'Type of audio/visual publication') {
            cy.get(`[data-testid=${literaryArtsAudioVisualFields[field[0]]['field']}]`).click();
            cy.get(`[data-value=${literaryArtsAudioVisualFields[field[0]]['value']}]`).click();
        } else {
            cy.get(`[data-testid=${literaryArtsAudioVisualFields[field[0]]['field']}]`).type(
                literaryArtsAudioVisualFields[field[0]]['value']
            );
        }
    });
});
//   | Type of audio/visual publication |
//   | Publisher                        |
//   | Year                             |
//   | ISBN                             |
//   | Duration                         |
And('Type of Type of audio/visual publication can be one of:', () => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticSubtype}]`).click();
    dataTable.forEach((type) => {
        cy.get(`[data-value=${type[0]}]`);
    });
    cy.get(`[data-value=${literaryArtsAudioVisualFields['Type of audio/visual publication']['value']}]}]`).click();
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
//   | Audiobook |
//   | RadioPlay |
//   | ShortFilm |
//   | Podcast   |
//   | Other     |
Then('the Audio/Visual Publication is listed under Announcements', () => {
    cy.contains(literaryArtsAudioVisualFields['Type of audio/visual publication']['value']);
});
And('they can edit the Audio/Visual Publication', () => {
    cy.contains('Show/Edit');
});
And('they can remove the Audio/Visual Publication', () => {
    cy.contains('Remove');
});
