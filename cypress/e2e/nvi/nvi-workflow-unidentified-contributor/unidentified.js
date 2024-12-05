// Feature: NVI-candidates with unidentified users

import { userChangeNviCuratorInstitutionA } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";
import { v4 as uuid } from "uuid";
import { todayDatePicker } from "../../../support/commands";

// Scenario: Identify publication as NVI candidate

const fileName = 'example.txt';

Given('a publication of {string} published in the active period', (type) => {
    cy.login(userChangeNviCuratorInstitutionA);
    cy.wrap(type).as('type');
 });
And('the publication has at least one publication channel of type {string} with scientific level of one or two', (channel) => {
    cy.wrap(channel).as('channel');
});
And('the publication has at least one Author affiliated with an NVI institution', () => {
    cy.startWizardWithFile(fileName);
    cy.get('@type').then(type => {
        cy.get('@channel').then(channel => {
            const title = `NVI-candidate ${type} ${channel} ${uuid()}`
            cy.wrap(title).as('title');
            cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type(`${title}`)
            cy.chooseDatePicker(dataTestId.registrationWizard.description.datePublishedField, todayDatePicker());
            cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
            switch (channel) {
                case 'AcademicArticle':
                    cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('acs chemical');
                    cy.contains('ACS Chemical Biology').click();
                    break;
                case 'AcademicChapter':
                    break;
                case 'AcademicLiteratureReview':
                    break;
                case 'AcademicMonograph':
                    break;
                case 'AcademicCommentary':
                    break;
            }
            cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
            cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
            cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
        });
    });
});
And('the publication is not previously reported', () => { });
Then('the publication is identified as an NVI candidate', () => { });

// Examples:
//   | Type                                     | Channel   |
//   | AcademicArticle                          | journal   |
//   | AcademicChapter (published in Anthology) | publisher |
//   | AcademicChapter (published in Anthology) | series    |
//   | AcademicLiteratureReview                 | journal   |
//   | AcademicMonograph                        | publisher |
//   | AcademicMonograph                        | series    |
//   | AcademicCommentary                       | publisher |
//   | AcademicCommentary                       | series    |


// Scenario: Institution can approve/reject when all their contributors are identified

Given('a publication identified as an NVI candidate', () => { });
And('Institution A is an NVI institution', () => { });
And('all Authors affiliated with Institution A are identified', () => { });
Then('Institution A can approve or reject the candidate', () => { });


// Scenario: Institution cannot approve/reject when they have any non-identified contributors

Given('a publication identified as an NVI candidate', () => { });
And('Institution A is an NVI institution', () => { });
And('Institution A has at least one non-identified Author', () => { });
Then('Institution A cannot approve or reject the candidate', () => { });


// Scenario: NVI points per institution include only identified contributors

Given('a publication identified as an NVI candidate', () => { });
And('Institution A is an NVI institution', () => { });
And('Institution A has both identified and non-identified Authors', () => { });
Then('the calculated NVI points for Institution A will include the shares of their identified contributors', () => { });
And('will not include the shares of their non-identified contributors', () => { });


// Scenario: NVI points are recalculated when the number of identified contributors changes

Given('a publication identified as an NVI candidate', () => { });
And('Institutions A and B are NVI institutions', () => { });
And('Institution B has at least one identified Author', () => { });
When('the number of identified Authors affiliated with Institution A changes', () => { });
Then('the NVI points for Institution A are recalculated accordingly', () => { });
And('the NVI points for Institution B remain unchanged', () => { });


// Scenario: Handle deadlocks when period closes

Given('a publication identified as an NVI candidate', () => { });
And('Institutions A and B are NVI institutions', () => { });
And('all Authors affiliated with Institution A are identified', () => { });
And('Institution B has at least one unidentified Author', () => { });
When('the active period closes and NVI points are reported', () => { });
Then('Institution A is awarded NVI-points', () => { });
And('Institution B is not awarded NVI-points', () => { });
