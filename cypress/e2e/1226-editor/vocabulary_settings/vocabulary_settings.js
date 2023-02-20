import { userEditor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: Editor decide on institutions Vocabulary settings

//     In order to enable Registrators to use vocabulary
//     As an Editor
//     I want to see supported Vocabularies

//     In order to enable Registrators to use vocabulary
//     As an Editor
//     I want to activate or hide supported Vocabularies

const vocabularies = {
    'HRCS Activity': 'hrcs-activity-button-group',
    'HRCS Category': 'hrcs-category-button-group'
}

const vocabularyStatus = {
    'Disabled': dataTestId.editor.vocabularyDisabled,
    'Allowed': dataTestId.editor.vocabularyAllowed,
    'Default': dataTestId.editor.vocabularyDefault,
}

//     Background:
Given('a logged in Editor', () => {
    cy.locing(userEditor);
})

// Scenario Outline: Editor sees fields for Vocabulary settings
Given('Editor opens Editor Administration', () => {
    cy.getDataTestId(dataTestId.header.editorLink).click();
})
And('they see Vocabulary settings', () => {
    cy.getDataTestId(dataTestId.editor.vocabularyLinkButton).click();
})
Then('they a list of Vocabularies:', (dataTable) => {
    dataTable.rawTable.forEach(vocabulary => {
        cy.getDataTestId(vocabularies[vocabulary[0]]);
    })
})
//     | HRCS Activity |
//     | HRCS Category |
Then('they can set a Vocabulary to be one of:', (dataTable) => {
    dataTable.rawTable.forEach(value => {
        Object.values(vocabularies).forEach(vocabulary => {
            cy.getDataTestId(vocabulary).within(() => {
                cy.get(vocabularyStatus[value[0]]);
            })
        })
    })
})
// | Disabled |
// | Allowed  |
// | Default  |
