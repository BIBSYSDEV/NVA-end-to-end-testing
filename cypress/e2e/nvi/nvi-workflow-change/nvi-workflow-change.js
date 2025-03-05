// Feature: Changing values in a NVI-candidate

import { userChangeNviCuratorInstitutionA } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

const unidentifiedContributor = 'Change User NVI-institution A TestUser'
let titleRoot = ''

// Scenario Outline: Contributor changes from unidentified to identified
Given('a curator opens a Result that is a NVI-candidate with an unidentified contributor', () => {
    cy.login(userChangeNviCuratorInstitutionA)
    titleRoot = 'Change from unidentified to identified'
});
And('the Result is {string} registration', (source) => {
    cy.wrap(source).as('source');
});
And('the Result is {string}', (collaboration) => {
    cy.get('@source').then((source) => {
        const title = `${titleRoot} ${source} ${collaboration}`;
        cy.wrap(title).as('title');
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).within(() => {
            cy.get('a').filter(`:contains(${title})`).click();
        });
        cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    });
});
When('the curator changes a contributor from unidentified to identified', () => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.get(`[data-testid="${dataTestId.registrationWizard.contributors.verifyContributorButton(unidentifiedContributor)}"]`).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.get('[role=dialog]').within(() => {
        cy.get('td > div').filter(`:contains(${unidentifiedContributor})`).within(() => {
            cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
        });
    });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
});
And('saves the changes', () => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('not.exist');
})
Then('the Result is a NVI-candidate', () => {
    cy.get('@title').then((title) => {
        cy.getDataTestId(dataTestId.header.tasksLink).click();
        cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getNVIWorklistItem(title);
    });
});

// Examples:
//     | Source | Collaboration                      |
//     | Manual | no Collaboration                   |
//     | Import | no Collaboration                   |
//     | Manual | NVI institution Collaboration      |
//     | Import | NVI institution Collaboration      |
//     | Manual | NVA institution Collaboration      |
//     | Import | NVA institution Collaboration      |
//     | Manual | external institution Collaboration |
//     | Import | external institution Collaboration |

// Scenario Outline: Category changes from non-scientific to scientific
Given('a curator opens a non-scientific Result that is a NVI-candidate', () => {
    cy.login(userChangeNviCuratorInstitutionA)
    titleRoot = 'Change from non-scientific to scientific'
});
When('the curator changes the Category from non-scientific to scientific', () => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('JournalReview')).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});

// Scenario Outline: Category changes from scientific to non-scientific
Given('a curator opens a scientific Result that is a NVI-candidate', () => {
    cy.login(userChangeNviCuratorInstitutionA)
    titleRoot = 'Change from scientific to non-scientific'
});
When('the curator changes the Category from scientific to non-scientific', () => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('JournalReview')).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
Then('the Result is not a NVI-candidate', () => {
    cy.get('@title').then((title) => {
        cy.getDataTestId(dataTestId.header.tasksLink).click();
        cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`)
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.get('main').then(doc => {
            if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length > 0) {
              cy.wait(30000);
              cy.reload();
            }
            if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length > 0) {
              cy.wait(30000);
              cy.reload();
            }
          });
        cy.get('li').filter(`:contains(${title})`).should('not.exist');
    });
});


// Scenario Outline: Category changes from non-scientific to scientific, contributor changes from unidentified to identified
Given('a curator opens a non-scientific Result that is a NVI-candidate with unidentified contributor', () => {
    cy.login(userChangeNviCuratorInstitutionA)
    titleRoot = 'Change from non-scientific to scientific, unidentified to identified'

});

// Scenario Outline: Category changes from scientific to non-scientific, contributor changes from unidentified to identified
Given('a curator opens a scientific Result that is a NVI-candidate with unidentified contributor', () => {
    cy.login(userChangeNviCuratorInstitutionA)
    titleRoot = 'Change from scientific to non-scientific, unidentified to identified'
});

