import { And, Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { userResourceTypeJournal } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { journalSubtypes, journalFields } from '../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Contribution to journal

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';

Before(() => {
  cy.wrap('').as('subtype');
  cy.wrap(false).as('link');
})

// Common steps
And('they click the Save button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});
And('they select the Resource type "Contribution to journal"', () => {
});
And('they select Resource subtype Journal article', () => {
  cy.get('[data-testid=resource-type-chip-AcademicArticle]').click();
});
And('they enter an invalid value in fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${journalFields[field]}]`).type('{selectall}{del}invalid');
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
      fields['Search field for Journal'] = dataTestId.registrationWizard.resourceType.corrigendumForField;
    }
    cy.testDataTestidList(dataTable, fields);
  })
});
And('they select the Resource subtype "Corrigendum"', () => {
  cy.get(`[data-testid=${journalSubtypes['Corrigendum']}]`).click({ force: true });
  cy.get('@link').then((link) => {
    link && cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
  })
});
// End common steps

// @274
// Scenario: Creator navigates to the Resource Type tab and see list of Journal types
Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
});
When('they navigate to the Resource Type tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
Then('they can select Journal Resource types:', (dataTable) => {
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
// Scenario: Creator sees fields for Journal type
Given('Creator navigates to the Resource Type tab and see list of Journal types', () => {
  cy.login(userResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
})
When('they select either of:', (dataTable) => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
})

// Scenario: Creator sees that fields for Journal article are validated
Given('Creator sees fields for Journal type', () => {
  cy.login(userResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
})
And('they enter numbers for "Pages from" and "Pages to"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.pagesFromField}]`).type('10');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.pagesToField}]`).type('9');
})
And('the number for "Pages from" is greater than the number for "Pages to"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.pagesFromField}] > div > input`).type('10');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.pagesToField}] > div > input`).type('9');
})
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
And('they can see error messages for fields "Pages from" and "Pages to"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.pagesFromField}]`)
    .within(() => {
      cy.get('p').should('have.class', 'Mui-error');
    })
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.pagesToField}]`)
    .within(() => {
      cy.get('p').should('have.class', 'Mui-error');
    })
})

// @1625
// Scenario: Creator sees fields for Resource subtype "Corrigendum"
When('they select the Resource type "Corrigendum"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('JournalCorrigendum')).click();
})
And('they see a disabled field for Journal based on selected Journal article', () => {
  cy.get('[data-testid=corrigendum-for-field]').within(() => {
    cy.get('input').type('Test article corrigendum');
  });
  cy.contains('Test article corrigendum').click({ force: true });
  cy.get('[data-testid=journal-chip]').contains('Test article corrigendum');
});

// Scenario: Creator sees that fields for Resource subtype "Corrigendum" are validated
Given('Creator sees fields for Resource subtype "Corrigendum"', () => {
  cy.login(userResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('JournalCorrigendum')).click();
})


// Scenario: Creator sees extra fields for Norwegian Science Index (NVI) compatible Journal article
Given('Creator sees fields for Journal article', () => {
  cy.login(userResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
  cy.get('[data-testid=resource-type-chip-AcademicArticle]').click({ force: true });
});
When('they select type to be {string}:', (type) => {
  const elements = [];
  type.split(' ').forEach(element => {
    elements.push(element.charAt(0).toUpperCase() + element.slice(1));
  });
  const resourceType = elements.join('');
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(resourceType)).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('ACS Chemical Biology');
  cy.contains('ACS Chemical Biology').last().click();
})
Then('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.nviSuccess}]`).should('be.visible');
});
// | Academic article           |
// | Academic literature review |
