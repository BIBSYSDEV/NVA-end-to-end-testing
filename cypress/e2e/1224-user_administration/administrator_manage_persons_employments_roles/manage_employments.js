import { userInstAdminWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Background:
Given('an Administrator is logged in', () => {
  cy.login(userInstAdminWithAuthor);
});

// Scenario: Create or edit a Person and his emplyment and roles
When('the Administrator wish to edit or add a new Person', () => {
  cy.getDataTestId(dataTestId.header.basicDataLink).click();
  cy.get('[datatest-id=person-register-search-bar]').type('Eirik Nilsen');
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
And('there is an option to view other employments at current institution', () => {});
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
