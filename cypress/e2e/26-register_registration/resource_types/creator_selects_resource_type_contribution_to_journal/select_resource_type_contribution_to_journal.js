import { Before } from 'cypress-cucumber-preprocessor/steps';
import { userResourceTypeJournal } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { journalSubtypes, journalFields, journalContentTypes } from '../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Contribution to journal

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';

Before(() => {
  cy.wrap('').as('subtype');
  cy.wrap(false).as('link');
})

// Common steps
Given('Creator begins registering a Registration in the Wizard with a Link', () => {
  cy.login(userResourceTypeJournal);
  cy.startWizardWithLink(doiLink);
  cy.wrap(true).as('link');
});
Given('Creator begins registering a Registration in the Wizard with a File', () => {
  cy.login(userResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
});
When('they navigate to the Resource Type tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
And('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click();
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
  cy.get('[data-testid=button-next-tab]').click();
  cy.get('[data-testid=button-previous-tab]').click();
});
And('they select the Resource type "Contribution to journal"', () => {
  cy.get('[data-testid=publication-context-type]').type(' ').click({ force: true });
  cy.get('[data-testid=publication-context-type-Journal]').click();
});
And('they select Resource subtype Journal article', () => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get('[data-testid=publication-instance-type-JournalArticle]').click();
});
And('they enter an invalid value in fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${journalFields[field]}]`).type('{selectall}{del}invalid');
  });
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  cy.get('[data-testid^=snackbar]').should('not.exist');
  const fields = { ...journalFields }
  cy.get('@subtype').then((subtype) => {
    if (subtype === 'Corrigendum') {
      fields['Search box for Journal'] = dataTestId.registrationWizard.resourceType.corrigendumForField;
    }
    dataTable.rawTable.forEach((field) => {
      cy.get(`[data-testid=${fields[field[0]]}]`).within(() => {
        cy.get('p').should('have.class', 'Mui-error');
        cy.get('p').should('have.class', 'Mui-required');
      });
    });
  });
});
And('they can see "Invalid format" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${journalFields[field[0]]}]`).within(() => {
      cy.get('input').focus().blur();
      cy.wrap(field).get('p').should('have.class', 'Mui-error');
    });
  });
});
And('they see fields:', (dataTable) => {
  const fields = { ...journalFields };
  cy.get('@subtype').then((subtype) => {
    if (subtype === 'Corrigendum') {
      fields['Search box for Journal'] = dataTestId.registrationWizard.resourceType.corrigendumForField;
    }
    cy.testDataTestidList(dataTable, fields);
  })
});
And('they select the Resource subtype "Corrigendum"', () => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${journalSubtypes['Corrigendum']}]`).click({ force: true });
  cy.get('@link').then((link) => {
    link && cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
  })
});
// End common steps

// @274
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Contribution to journal"
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, journalSubtypes);
});
// | Journal article |
// | Feature article |
// | Comment         |
// | Book review     |
// | Leader          |
// | Corrigendum     |
// | Booklet         |

// @1656
// Scenario: Creator sees fields for Journal article
And('they see a dropdown for Content Type with options:', (dataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentField}]`).type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, journalContentTypes);
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentValue('academicarticle')}]`).click();
});
//     // | Academic article           |
//     // | Academic literature review |
//     // | Case report                |
//     // | Study protocol             |
//     // | Professional article       |
//     // | Popular science article    |
And('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.nviFailed}]`).should('be.visible');
});

// Scenario: Creator sees that fields for Journal article are validated

// @1625
// Scenario: Creator sees fields for Resource subtype "Corrigendum"
And('they see a disabled field for Journal based on selected Journal article', () => {
  cy.get('[data-testid=corrigendum-for-field]').within(() => {
    cy.get('input').type('Test article corrigendum');
  });
  cy.contains('Test article corrigendum').click({ force: true });
  cy.get('[data-testid=journal-chip]').contains('Test article corrigendum');
});

// Scenario: Creator sees that fields for Resource subtype "Corrigendum" are validated

// Scenario: Creator sees extra fields for Norwegian Science Index (NVI) compatible Journal article
Given('Creator sees fields for Journal article', () => {
  cy.login(userResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Journal]').click({ force: true });
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get('[data-testid=publication-instance-type-JournalArticle]').click({ force: true });
});
When('they set Content Type to {string}:', (contentType) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentField}]`).type(' ').click({ force: true });
  cy.get(`[data-testid=${journalContentTypes[contentType]}]`).click({ force: true });
})
// | Academic article           |
// | Academic literature review |
// And they see the Norwegian Science Index (NVI) evaluation status


// @1659
// Scenario Outline: Creator sees fields for Norwegian Science Index (NVI) incompatible Resource subtype
And('they select Resource subtype {string}', (subtype) => {
  cy.wrap(subtype).as('subtype');
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.get(`[data-testid=${journalSubtypes[subtype]}]`).click({ force: true });
  cy.get('@link').then((link) => {
    link && cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
  })
});
// Examples:
//     | Subtype         |
//     | Feature article |
//     | Comment         |
//     | Book review     |
//     | Leader          |
//     | Corrigendum     |
//     | Booklet         |

// Scenario Outline: Creator sees that fields for Norwegian Science Index (NVI) incompatible Resource subtype are validated
