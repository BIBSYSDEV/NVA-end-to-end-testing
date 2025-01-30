// Feature: Scenarios for Result portifolio

import { userEditor, userWithAuthor } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";
import { v4 as uuid } from 'uuid';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

const portifolios = new Map([
    ['Published Results', dataTestId.editor.resultsPortfolioPublishedCheckbox],
    ['Unpublished Results', dataTestId.editor.resultsPortfolioUnpublishedCheckbox],
    ['Deleted Results', dataTestId.editor.resultsPortfolioDeletedCheckbox],
]);

const fileName = 'example.txt';

const selectPortifolio = (portifolio: Object) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    Object.keys(portifolios).forEach(key => {
        cy.getDataTestId(portifolios.get(key)).then($element => {
            if (key === portifolio) {
                if ($element.find('[data-testid="CheckBoxOutlineBlankIcon"]').length > 0) {
                    cy.getDataTestId(portifolios.get(key)).click();
                }
            } else {
                if ($element.find('[data-testid="CheckBoxIcon"]').length > 0) {
                    cy.getDataTestId(portifolios.get(key)).click();
                }
            }
        });
        cy.wait(1000);
    });
}

// Scenario: Editor views Result portifolio
Given('an Editor', () => {
    cy.login(userEditor);
});
When('they view the Result portifolio', () => {
    cy.getDataTestId(dataTestId.header.editorLink).click();
    cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).click();

});
Then('they can see:', (table: DataTable) => {
    table.raw().forEach(data => {
        selectPortifolio(data[0]);
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
    })
});
// | Published Results   |
// | Unpublished Results |
// | Deleted Results     |

const publishedTitle = `Portfolio published result ${uuid()}`

// Scenario: Published Result is added to portifolio
Given('a User publishes a Result', () => {
    cy.login(userWithAuthor);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(fileName, publishedTitle);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
    cy.wait(3000);
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).then($panel => {
        if ($panel.find(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton}]`).length > 0) {
            cy.wait(10000);
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
        }
    })
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
        cy.contains('Metadata published');
    });
});
When('an Editor views the Result portifolio for Published Results', () => {
    cy.login(userEditor);
    cy.getDataTestId(dataTestId.header.editorLink).click();
    cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).click();
    selectPortifolio('Published Results');
});
Then('they can see the published Result', () => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${publishedTitle}{enter}`);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${publishedTitle})`);
});

const unpublishedTitle = `Portfolio unpublished result ${uuid()}`

// Scenario: Unublished Result is added to portifolio
Given('a User unpublish a Result', () => {
    cy.login(userWithAuthor);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(null, unpublishedTitle);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
    cy.wait(3000);
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).then($panel => {
        if ($panel.find(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton}]`).length > 0) {
            cy.wait(10000);
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
        }
    })
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
        cy.contains('Metadata published');
    });
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.morePublishingActionsButton).click();
    cy.getDataTestId(dataTestId.unpublishActions.openUnpublishModalButton).click();
    cy.getDataTestId(dataTestId.unpublishActions.unpublishJustificationTextField).type('Justification');
    cy.getDataTestId(dataTestId.unpublishActions.confirmUnpublishCheckbox).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
When('an Editor views the Result portifolio for Unpublished Results', () => {
    cy.login(userEditor);
    cy.getDataTestId(dataTestId.header.editorLink).click();
    cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).click();
    selectPortifolio('Unpublished Results');
});
Then('they can see the unpublished Result', () => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${unpublishedTitle}{enter}`);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${unpublishedTitle})`);
});

const deletedTitle = `Portfolio unpublished result ${uuid()}`

// Scenario: Deleted Result is added to portifolio
Given('a User deletes an unpublished Result', () => {
    cy.login(userWithAuthor);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(null, deletedTitle);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
    cy.wait(3000);
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).then($panel => {
        if ($panel.find(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton}]`).length > 0) {
            cy.wait(10000);
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
        }
    })
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
        cy.contains('Metadata published');
    });
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.morePublishingActionsButton).click();
    cy.getDataTestId(dataTestId.unpublishActions.openUnpublishModalButton).click();
    cy.getDataTestId(dataTestId.unpublishActions.unpublishJustificationTextField).type('Justification');
    cy.getDataTestId(dataTestId.unpublishActions.confirmUnpublishCheckbox).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();

    cy.login(userEditor);
    cy.getDataTestId(dataTestId.header.editorLink).click();
    cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).click();
    selectPortifolio('Unpublished Results');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${deletedTitle}{enter}`);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${deletedTitle})`).click();


    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.morePublishingActionsButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.terminateRegistrationButton).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
When('an Editor views the Result portifolion for Deleted Results', () => {
    cy.getDataTestId(dataTestId.header.editorLink).click();
    cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).click();
    selectPortifolio('Deleted Results');
});
Then('they can see the deleted Result', () => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${deletedTitle}{enter}`);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${deletedTitle})`);
});