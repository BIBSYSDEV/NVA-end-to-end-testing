import { Given, Before, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { mockUser } from '../../../testfiles/mock_feide_user';

const authorizedUser = { ...mockUser, 'custom:affiliation': '[member, employee, staff]', email: 'ost@unit.no' };

Before(() => {
    console.log('Add new user data to Cognito? Or reset user data in Cognito?');
});

Given('that the user has valid Feide credentials', () => {
    console.log('login Feide')
});
Given('they have NOT logged in with Feide before', () => {
    cy.visit('https://frontend.dev.nva.aws.unit.no/')
    cy.get('[data-testid=menu-login-button');
})
Given('they are on the Start page', () => {
    cy.get('[data-testid=description_link]');
    cy.get('[data-testid=order_information_link');
});

When('they click Log in', () => {
    console.log('Click on login button');
//    cy.get('[data-testid=menu-login-button').click();
})
When('they are redirected to Feide', () => {
    console.log('Redirect to Feide');
});
When('they enter their Feide credentials', () => {
    console.log('Enter Feide credentials');
});
When('they approve sharing of data with the NVA application regarding', () => {
    console.log('Approve sharing of data');
});
//  | Username            |
//  | Email address       |
//  | Real name           |
//  | Affiliation         |
//  | Organization number |

Then('they are redirected back to the Start page', () => {
    cy.get('[data-testid=description_link]');
    cy.get('[data-testid=order_information_link');
})
Then('they see their name in the Menu', () => {
    cy.get('Test Testesen');
});
Then('they see the Connect Author dialog', () => {

});