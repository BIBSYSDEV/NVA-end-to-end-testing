import { userCuratorWithAuthor, userEditRegistration, userEditor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature; User edit registrations where they are not owner

const registrationTitle = 'Edit registration not owner';

// Scenario: Curator see option to edit a Registration from own institution
Given('User is logged in as Curator', () => {
    cy.login(userCuratorWithAuthor);
});
When('they open the landing page for a Registration from own institution', () => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
    cy.contains(registrationTitle);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().within(() => {
        cy.get('p > a').first().click();
    })
});
And('they are not owner of the Registration', () => { });
Then('they have the option to edit the Registration', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).should('be.visible');
});

// Scenario: Editor see option to edit a Registration
Given('User is logged in as Editor', () => {
    cy.login(userEditor);
});
When('they open the landing page for a Registration', () => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
    cy.contains(registrationTitle);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().within(() => {
        cy.get('p > a').first().click();
    })
});
And('they are not owner of the Registration', () => { });
Then('they have the option to edit the Registration', () => { });

// Scenario: Curator edit a Registration from own institution
Given('Curator open landing page for a Registration from own institution', () => {
    cy.login(userCuratorWithAuthor);
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
    cy.contains(registrationTitle);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().within(() => {
        cy.get('p > a').first().click();
    })
});
When('they edit the Registration', () => {
    cy.location('pathname').then(pathname => {
        const id = pathname.replace('/registration/', '');
        cy.wrap(id).as('id');
    })
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
});
Then('the Registration is opened in the Registration wizard', () => {
    cy.get('@id').then((id) => {
        cy.location('pathname').should('equal', `/registration/${id}/edit`);
        cy.getDataTestId(dataTestId.registrationWizard.description.titleField)
            .should('be.visible');
    });
});

// Scenario: Editor edit a Registration
Given('Editor open landing page for a Registration', () => {
    cy.login(userEditor);
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
    cy.contains(registrationTitle);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().within(() => {
        cy.get('p > a').first().click();
    })
});
When('they edit the Registration', () => { });
Then('the Registration is opened in the Registration wizard', () => { });

// Scenario: User see option to edit a Registration where they are Contributor
Given('a User is logged in', () => {
    cy.login(userEditRegistration);
});
And('they are not Curator or Editor', () => { });
When('they open the landing page for a Registration where they are registred as a Contributor', () => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
    cy.contains(registrationTitle);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().within(() => {
        cy.get('p > a').first().click();
    })
});
And('they are not owner of the Registration', () => { });
Then('they have the option to edit the Registration', () => { });


// Scenario: User edit registration where they are registred as Contributer
Given('a User open landing page for Registration where they are registred as a Contributor', () => {
    cy.login(userEditRegistration);
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
    cy.contains(registrationTitle);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().within(() => {
        cy.get('p > a').first().click();
    })
});
And('they are not Curator or Editor', () => { });
When('they edit the Registration', () => { });
Then('the Registration is opened in the Registration wizard', () => { });

