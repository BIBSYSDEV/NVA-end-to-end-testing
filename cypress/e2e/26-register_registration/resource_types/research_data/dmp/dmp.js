// Feature: Data Management Plan (DMP)

//	#also know as Research Output Plan
//	# https://whimsical.com/nva-wireframes-YPhaVjNfbZ5wgCXgAPdpuq

//	In order to fulfil demands from funders and own institution
//	As a User (researcher)
//	I want to publish my DMP

//	In order to fulfil demands from funders and own institution
//	As a User (researcher)
//	I want to publish new versions of my DMP

import { userResearchDataDmp } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';

//	Background:

//  Common steps

Given ('User selects Resource type "Research Data"', () =>{
    cy.login(userResearchDataDmp);
    cy.startWizardWithEmptyRegistration();
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    cy.get('[data-testid=publication-context-type]').click();
    cy.get('[data-testid="publication-context-type-ResearchData"]').click();
});  
And ('they select DMP as subtype', () =>{
    cy.get('[data-testid=publication-instance-type]').click();
    cy.get('[data-testid="publication-instance-type-DataManagementPlan"]').click();
});  

// end common steps

	// @TEST_NP-13295
	// Scenario: User sees a prefilled Publisher field
		When ('the User sees the Publisher field', () =>{
            cy.get('[data-testid=publisher-search-field]').should('be.visible');
        });   
		Then ('the corresponding institution is prefilled', () =>{
            cy.get('[data-testid=publisher-search-field]').within(()=>{
                cy.contains('Unit');
            });
        }); 

	// @TEST_NP-13296
	// Scenario: User changes the prefilled Publisher
		When ('the User searches for a Publisher in the Publisher field', () =>{
            cy.get('[data-testid=publisher-search-field]').type('Norges forskningsråd');
            cy.wait(3000);
            cy.get('[data-testid=publisher-search-field]').type('{downArrow}{enter}');
        });
        Then ('the User replaces the prefilled Publisher with a Publisher from the search result', () =>{
            cy.get('[data-testid=publisher-search-field]').within(()=>{
                cy.contains('Norges forskningsråd');
            });
        });

	// @TEST_NP-13297
	// Scenario: User adds zero or more related-references to a resource published in NVA
        When ('the User searches for published Registrations in NVA', () =>{
            cy.get('[data-testid=related-registration-field]').type('Antologi');
            cy.wait(3000);
            cy.get('[data-testid=related-registration-field]').type('{downArrow}{enter}');
        });
        Then ('the User can store any search result as a related-reference', () =>{
            cy.get('[data-testid^=related-registration-link-]').first().within(()=>{
                cy.contains('Antologi');
            });
            cy.get('[data-testid^=remove-relation-button]').should('be.visible');
        });
    // # future scenario will allow use of external IRI, not only internal

	// @TEST_NP-13298
	// Scenario: User removes a related-references to resource
		Given ('User adds zero or more related-references to resource published in NVA', () =>{
            cy.get('[data-testid=related-registration-field]').type('Antologi');
            cy.wait(3000);
            cy.get('[data-testid=related-registration-field]').type('{downArrow}{enter}');
        });
		When ('the User removes a related-reference resource', () =>{
            cy.get('[data-testid^=remove-relation-button]').first().click();
            cy.get('[data-testid=accept-button]').click();           
        }); 
		Then ('the related-reference is removed', () =>{       
            cy.get('[data-testid^=related-registration-link-]').should('not.exist');
            cy.get('[data-testid^=remove-relation-button]').should('not.exist');
        });

    // @TEST_NP-16254
    // Scenario: User adds an external links to a DMP
        When ('the user types in an external link', () =>{
            cy.get('[data-testid=external-link-field]').type('https://sikt.no/');
        }); 
        And ('the user adds the link', () =>{
            cy.get('[data-testid=external-link-add-button]').click();
        });
        Then ('the user sees the saved link', () =>{
            cy.get('[data-testid=external-link]').first().within(()=>{
                cy.contains('https://sikt.no/');
            });
        });
        And ('the user has the option to remove the saved link', () =>{
            cy.get('[data-testid^=remove-relation-button]').first().should('be.visible');
        });
    
    // @TEST_NP-16255
    // Scenario: User removes an external link to a resource
        Given ('User adds an external links to a DMP', () =>{
            cy.get('[data-testid=external-link-field]').type('https://sikt.no/');
            cy.get('[data-testid=external-link-add-button]').click();
        });
        When ('the user removes an external link', () =>{
            cy.get('[data-testid^=remove-relation-button]').first().click();
            cy.get('[data-testid=accept-button]').click();    
        });
        Then ('the user sees the external link is removed', () =>{
            cy.get('[data-testid=external-link]').should('not.exist');
            cy.get('[data-testid^=remove-relation-button]').should('not.exist');
        });
