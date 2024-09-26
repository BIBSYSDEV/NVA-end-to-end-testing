// Feature: Rights retention strategy

import { userAdminRRS, userAuthorRRS } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

const filename = 'example.txt';

//   Scenario: Editr sees the option to activate Righs retention strategy
    Given ('User is Editor', () => {
        cy.login(userAdminRRS);
    });
    When ('they open the settings Page', () => {
        cy.getDataTestId(dataTestId.header.editorLink).click();
    });
    And ('choose Publishing strategy', () => {
        cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
        cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
    });
    Then ('they have the option to activate Rights retention strategy', () => {
        cy.getDataTestId(dataTestId.editor.rrs).should('be.visible');
    });

//   Scenario: Editor sets Rights retention strategy
    Given ('Editor sees the option to activate Rights retention strategy', () => {
        cy.login(userAdminRRS);
        cy.getDataTestId(dataTestId.header.editorLink).click();
        cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
        cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
    });
    When ('they activate Rights retention strategy', () => {
        // reset Rights retention strategy
        cy.getDataTestId(dataTestId.editor.rrs).within((rrsComponent) => {
            let checked = false;
            cy.get('input').then(rrs => {
                if(rrs[0].value === 'RightsRetentionStrategy') {
                    checked = true;
                }
            }).then(() => {
                if(checked){
                    cy.get('input').parent().click();
                }
            });
        });

        cy.getDataTestId(dataTestId.editor.rrs).click();
    });
    Then ('they need to add a link to the institutions page about rights policy', () => {
        cy.getDataTestId(dataTestId.editor.rrsSaveButton).click();
        cy.getDataTestId(dataTestId.editor.rrsSaveButton).should('not.be.disabled');
        cy.getDataTestId(dataTestId.editor.rrsLink).type('http://test.no');
    });
    And ('they can set that Registrars can waive RRS', () => {
        cy.getDataTestId(dataTestId.editor.rrsOverride).should('be.visible');
    });
    And ('save the Rights retention strategy', () => {
        cy.getDataTestId(dataTestId.editor.rrsSaveButton).click();
        cy.contains('Publishing strategy updated successfully');
    })

//   Scenario: User sets version to accepted for file with RRS activated
    Given ('User registers Registration with RRS activated', () => {
        const title = 'RRS file version';
        cy.login(userAuthorRRS);
        cy.startWizardWithEmptyRegistration(filename);
        cy.createValidRegistration(filename, title, 'Not set');
    });
    When ('they set the file version to Accepted', () => {
        cy.getDataTestId(dataTestId.registrationWizard.files.version).within(() => {
            cy.get('input[type=radio]').first().click();
          });
    });
    Then ('License is set to CC-by', () => {
        cy.getDataTestId(dataTestId.registrationWizard.files.selectLicenseField).within(() => {
            cy.contains('CC BY', {matchCase: false}).should('be.visible');
        });
    });

//   Scenario: User sets version to published for file with RRS activated
    Given ('User registers Registration with RRS activated', () => {});
    When ('they set the file version to Published', () => {
        cy.getDataTestId(dataTestId.registrationWizard.files.version).within(() => {
            cy.get('input[type=radio]').last().click();
          });
    });
    Then ('License is not automatically set', () => {
        cy.getDataTestId(dataTestId.registrationWizard.files.selectLicenseField).within(() => {
            cy.contains('CC BY', {matchCase: false}).should('not.exist');
        });
    });

//   Scenario Outline: User changes version for file
    Given ('user registers Registration with RRS activated', () => {});
    And ('the file version is set to {string}', (initialVersion) => {
        cy.getDataTestId(dataTestId.registrationWizard.files.version).within(() => {
            switch (initialVersion) {
                case 'Accepted':
                    cy.get('input[type=radio]').first().click();
                    break;
                case 'Published':
                    cy.get('input[type=radio]').last().click();
                    break;
            }
        });
    });
    When ('they set the file version to {string}', (finalVersion) => {
        cy.getDataTestId(dataTestId.registrationWizard.files.version).within(() => {
            switch (finalVersion) {
                case 'Accepted':
                    cy.get('input[type=radio]').first().click();
                    break;
                case 'Published':
                    cy.get('input[type=radio]').last().click();
                    break;
            }
        });
    });
    Then ('license is set to {string}', (license) => {
        cy.getDataTestId(dataTestId.registrationWizard.files.selectLicenseField).within(() => {
            switch(license) {
                case 'CC-BY':
                    cy.contains('CC BY', {matchCase: false}).should('be.visible');
                    break;
                case 'None':
                    cy.contains('CC BY', {matchCase: false}).should('not.exist');
                    break;
            }
        });

    });

    // Examples:
    //   | Initial version | Final version | License |
    //   | Accepted        | Published     | None    |
    //   | Published       | Accepted      | CC-BY   |
