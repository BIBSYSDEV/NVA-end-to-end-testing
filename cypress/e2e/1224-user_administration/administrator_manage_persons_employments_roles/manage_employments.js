import { userSecondInstAdminWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Background:
Given('an Administrator is logged in', () => {
  cy.login(userSecondInstAdminWithAuthor);
});

const userName = 'Eirik Nilsen';
// Scenario: Create or edit a Person and his emplyment and roles
When('the Administrator wish to edit or add a new Person', () => {
  cy.getDataTestId(dataTestId.header.basicDataLink).click();
  cy.get('[datatest-id=person-register-search-bar]').type(`{selectall}${userName}`);
  cy.getDataTestId('EditIcon').should('have.length', 1);
  cy.getDataTestId('EditIcon').first().click();
});
Then('the Administrator sees the Person s name and Person Number', () => {
  cy.get('[role=dialog]').within(() => {
    cy.getDataTestId(dataTestId.basicData.personAdmin.firstName).should('be.visible');
    cy.getDataTestId(dataTestId.basicData.personAdmin.lastName).should('be.visible');
    cy.getDataTestId(dataTestId.basicData.nationalIdentityNumberField).should('be.visible');
  });
});
And('the Person Number is displayed as date of birth followed by 5 stars', () => {
  cy.getDataTestId(dataTestId.basicData.nationalIdentityNumberField).within(() => {
    cy.get('input').should(($input) => {
      const val = $input.val();
      expect(val).to.include('*****');
      expect(val).to.have.length(11);
    });
  });
});
And('there is an option to view the last 5 digits of the Person Number', () => {
  cy.getDataTestId(dataTestId.basicData.nationalIdentityNumberField).within(() => {
    cy.getDataTestId('VisibilityOffIcon').should('be.visible');
  });
});
And('possible other employments at other institutions are briefly documented', () => {
  cy.contains('Other active employments');
});
And(
  'the employment at current institution is shown with affiliation, employment-position and -fraction, start- and end-date',
  () => {
    cy.getDataTestId(dataTestId.basicData.personAdmin.position).should('be.visible');
    cy.getDataTestId(dataTestId.basicData.personAdmin.positionPercent).should('be.visible');
    cy.getDataTestId(dataTestId.basicData.personAdmin.startDate).should('be.visible');
    cy.getDataTestId(dataTestId.basicData.personAdmin.endDate).should('be.visible');
  }
);
And('there is an option to view other employments at current institution', () => {
  cy.getDataTestId('NavigateNextIcon');
});
And('there is an option to add a new employment', () => {});
And('the Persons different roles at this institution is listed', () => {
  cy.getDataTestId(dataTestId.basicData.personAdmin.roleSelector).should('be.visible');
});
And('the Roles may be toggled on or off', () => {
  cy.getDataTestId(dataTestId.basicData.personAdmin.roleSelector)
    .first()
    .within(() => {
      cy.get('input').each(($input) => {
        cy.wrap($input).get('[type=checkbox]');
      });
    });
});
And('there is an option to close this dialog', () => {
  cy.get('[role=dialog]').within(() => {
    cy.get('button').filter(':contains("Cancel")').should('be.visible');
  });
});
And('there is an option to save the changes', () => {
  cy.get('[role=dialog]').within(() => {
    cy.get('button').filter(':contains("Save")').should('be.visible');
  });
});

// Scenario: Administrator views other employments at current Institution
Given('the Person viewed got multiple employments at current Institution', () => {
  cy.getDataTestId(dataTestId.header.basicDataLink).click();
  cy.get('[datatest-id=person-register-search-bar]').type(`{selectall}${userName}`);
  cy.getDataTestId('EditIcon').should('have.length', 1);
  cy.getDataTestId('EditIcon').first().click();
});
When('the Administrator scrolls through the multiple employments', () => {
  cy.getDataTestId('NavigateNextIcon').click();
});
Then('details about each employment is displayed', () => {
  cy.getDataTestId(dataTestId.basicData.personAdmin.positionPercent).within(() => {
    cy.get('input').should('have.value', 100);
  });
});
And('other details about the Person and his roles are static', () => {
  cy.getDataTestId(dataTestId.basicData.personAdmin.firstName).within(() => {
    cy.get('input').should('have.value', 'Eirik');
  });
  cy.getDataTestId(dataTestId.basicData.personAdmin.lastName).within(() => {
    cy.get('input').should('have.value', 'Nilsen');
  });
  cy.getDataTestId(dataTestId.basicData.nationalIdentityNumberField).within(() => {
    cy.get('input').should('have.value', '081267*****');
  });
});

// Scenario: Administrator adds another employment
When('the Administrator uses option to add a new employment', () => {
  cy.getDataTestId(dataTestId.header.basicDataLink).click();
  cy.getDataTestId(dataTestId.basicData.addEmployeeLink).click();
});
Then('a form with following fields are displayed', (dataTable) => {
  const fieldList = {
    'employment position': dataTestId.basicData.personAdmin.position,
    'employment fraction': dataTestId.basicData.personAdmin.positionPercent,
    'start-date': dataTestId.basicData.personAdmin.startDate,
    'end-date': dataTestId.basicData.personAdmin.endDate,
  };
  cy.testDataTestidList(dataTable, fieldList);
});
// | employment position |
// | employment fraction |
// | start-date          |
// | end-date            |

// Scenario: Administrator grants or removes a Persons roles
const roleChecks = {
  'Curator': 'Curator',
  'Editor': 'Editor',
  'Administrator': 'Institution-admin',
};

Given('Administrator edit a Person at his institution', () => {
  cy.getDataTestId(dataTestId.header.basicDataLink).click();
  cy.get('[datatest-id=person-register-search-bar]').type(`{selectall}${userName}`);
  cy.getDataTestId('EditIcon').should('have.length', 1);
  cy.getDataTestId('EditIcon').first().click();
});
When('the Administrator toggles on or off one of the following roles', (dataTable) => {
  cy.wrap(dataTable.rawTable).as('checks');
  dataTable.rawTable.forEach((value) => {
    cy.get(`[value=${roleChecks[value[0]]}]`).should('be.checked');
    cy.get(`[value=${roleChecks[value[0]]}]`).click();
  });
});
// | Curator       |
// | Editor        |
// | Administrator |
Then('the role is added or removed from the Person', () => {
  cy.get('@checks').then((checks) => {
    checks.forEach((check) => {
      cy.get(`[value=${roleChecks[checks[0]]}]`).should('not.be.checked');
    });
  });
});
And('the role Registrator cannot be removed', () => {
  cy.get('[value=Creator]').should('be.disabled');
});

// Scenario: Administrator close the edit Person dialog
Given('Administrator edit a Person at his institution', () => {});
And('the Administrator has added or changed information in the dialog', () => {
  cy.getDataTestId(dataTestId.basicData.personAdmin.positionPercent).type('{selectall}50');
});
When('the Administrator uses one of the close options', () => {
  cy.get('[role=dialog]').within(() => {
    cy.get('button').filter(':contains("Cancel")').click();
  });
});
Then('a dialog informing about loss of data is displayed', () => {});
And('the Administrator can choose to close or abort the close action', () => {});

// Scenario: Administrator saves the changes to a Person
Given('Administrator edit a Person at his institution', () => {});
And('the Administrator has added or changed information in the dialog', () => {});
And('the save option is activated', () => {});
When('the Administrator uses the save options', () => {
  cy.get('[role=dialog]').within(() => {
    cy.get('button').filter(':contains("Save")').click();
  });
  cy.get('[role=dialog]').should('not.exist');
});
Then('all changes are stored', () => {
  cy.get('[datatest-id=person-register-search-bar]').type(`{selectall}${userName}`);
  cy.getDataTestId('EditIcon').should('have.length', 1);
  cy.getDataTestId('EditIcon').first().click();
  cy.getDataTestId(dataTestId.basicData.personAdmin.positionPercent).within(() => {
    cy.get('input').should('have.value', 50);
  });
  cy.getDataTestId(dataTestId.basicData.personAdmin.positionPercent).type('{selectall}100');
  cy.get('[role=dialog]').within(() => {
    cy.get('button').filter(':contains("Save")').click();
  });
  cy.get('[role=dialog]').should('not.exist');
});

// Scenario: Administrator uses search to locate person
Given ('Default start screen on Basic data', () => {
  cy.getDataTestId(dataTestId.header.basicDataLink).click();
})
When ('the Administrator fills inn the search field', () => {
  cy.get(`[data-testid^=${dataTestId.basicData.personAdmin.cristinId('')}]`).then(resultList => {
    cy.wrap(resultList.length).as('results');
  });
  cy.get('[datatest-id=person-register-search-bar]').type(`{selectall}${userName}`);
})
Then ('the list is updated accordingly regarding person name', () => {
  cy.get(`[data-testid^=${dataTestId.basicData.personAdmin.cristinId('')}]`).should('have.length', 1);
  cy.get(`[data-testid^=${dataTestId.basicData.personAdmin.name('')}]`).filter(`:contains(${userName})`).should('have.length', 1);
})
