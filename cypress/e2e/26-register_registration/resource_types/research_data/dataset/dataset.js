// Feature: Dataset

// In order to document my findings in journal articles
// As a User
// I want to be able to publish my own and others datasets

// In order to document my findings in journal articles
// As a User
// I want to be able to link published datasets to my published journal articles

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
And ('they select Dataset as subtype', () =>{
    cy.get('[data-testid=publication-instance-type]').click();      
    cy.get('[data-testid="publication-instance-type-DataSet"]').click();
}); 

// end common steps




    // @TEST_NP-13251
    // @9141
    // Scenario: User sees information about types of data that are illegal to publish on this service
        When ('the User has selected to register a Dataset', () =>{
            
        }); 
        Then ('the User sees information about types of data that are illegal to publish on this service', () =>{
            cy.get('[data-testid=accept-button]').should('be.visible');
            cy.get('[data-testid=cancel-button]').should('be.visible');      
        }); 




    // @TEST_NP-13252
    // @9141
    // Scenario: User confirms to register data that are legal to publish on this service
        Given ('User sees information about types of data that are illegal to publish on this service', () =>{
            cy.get('[data-testid=cancel-button]').should('be.visible');
        }); 
        When ('they confirm that the data intended to be published complies with the terms of the service', () =>{
            cy.get('[data-testid=cancel-button]').click();
        }); 
        Then ('the dialog is closed', () =>{
            cy.get('[data-testid=cancel-button]').should('not.exist');
        }); 

    // @TEST_NP-13253
    // @9141
    // Scenario: User confirms to register data that is illegal to publish on this service
        Given ('User sees information about types of data that are illegal to publish on this service', () =>{
            cy.get('[data-testid=accept-button]').should('be.visible');
        });
        When ('the User confirms that the data intended to be published is illegal', () =>{
            cy.get('[data-testid=accept-button]').click();
        });
        Then ('the User is prohibited from publishing the Registration', () =>{
            cy.get('[data-testid=publication-instance-type]').should('be.empty');
        });
        And ('any registered data is stored as a draft', () =>{
        });
        And ('the User sees the standard user support dialog where the user can ask for assistance', () =>{
        });

    // @TEST_NP-13254
    // @9140
    // Scenario: User is informed about further support and registration process
        Given ('User sees information about types of data that are illegal to publish on this service', () =>{
            cy.get('[data-testid=accept-button]').should('be.visible');
        });
        When ('the User has submitted a user support request', () =>{
            cy.get('[data-testid=accept-button]').click();
            cy.get('[data-testid=open-support-button]').click();
            cy.get('[data-testid=message-field]').should('be.visible');
            cy.get('[data-testid=message-field]').type('This is a message from me to Support.');
            cy.get('[data-testid=send-button]').click();
        });
        Then ('the User is informed that the registration is stored', () =>{



        });
        And ('can be completed at any later stage', () =>{
        });
        And ('answers to user support requests will be visible on "My page"', () =>{
        });

    // @TEST_NP-13255
    // @9140
    // Scenario: User adds zero or more geographical data to the dataset
        Given ('User confirms to register data that are legal to publish on this service', () =>{
            cy.get('[data-testid=cancel-button]').should('be.visible');
            cy.get('[data-testid=cancel-button]').click();
        });
        When ('the User writes some free-text geographical data', () =>{
            cy.get('[data-testid=geographic-description-field]').should('be.visible');
            cy.get('[data-testid=geographic-description-field]').type('Trondheim, Norway');


        });
        // # Future: Add support for land, region, county and map reference (line, rectangle, point)
        Then ('it is stored', () =>{


        });

    // @TEST_NP-13256
    // @9140
    // Scenario: User adds zero or more use-references to resource published in NVA
        Given ('User confirms to register data that are legal to publish on this service', () =>{
            cy.get('[data-testid=cancel-button]').should('be.visible');
            cy.get('[data-testid=cancel-button]').click();
        });
        When ('the User searches for published Registrations', () =>{
            cy.get('[data-testid=related-registration-field]').type('Antologi');
            cy.wait(3000);
            cy.get('[data-testid=related-registration-field]').type('{downArrow}{enter}');
        });
        Then ('the User can store any search result as a use-reference', () =>{
            cy.get('[data-testid^=related-registration-link-]').first().within(()=>{
                cy.contains('Antologi');
            });
            cy.get('[data-testid^=remove-relation-button]').should('be.visible');
        });

    // @TEST_NP-13257
    // @9140
    // Scenario: User adds zero or more related-references to resource published in NVA
        Given ('User confirms to register data that are legal to publish on this service', () =>{
        });
        When ('the User searches for published Registrations', () =>{
        });
        Then ('the User can store any search result as a related-reference', () =>{
        });
        // # future scenario will allow use of external IRI, not only internal

    // @TEST_NP-13258
    // @9140
    // Scenario: User adds zero or more comply-to-references to a DMP resource published in NVA
        Given ('User confirms to register data that are legal to publish on this service', () =>{
        });
        When ('the User searches for published DMPs', () =>{
        });
        Then ('the User can store any search result as a comply-to-reference', () =>{
        });

    // @TEST_NP-13259
    // @9142
    // Scenario: User sees their own published resources in NVA as default matching list
        Given ('User adds zero or more use-references to resources published in NVA', () =>{
        });
        When ('the User selects the input field to search for a resource in NVA', () =>{
        });
        Then ('zero to five published results, sorted newest first, are displayed for selection', () =>{
        });
        And ('a list of search matches will replace this list', () =>{
        });

    // @TEST_NP-13260
    // @9145
    // Scenario: User confirms publishing the dataset resource
        Given ('User is previewing a Landing Page for a Dataset', () =>{
        });
        And ('all required fields are filled', () =>{
        });
        When ('the User clicks the Publish button', () =>{
        });
        Then ('the User is warned about the implications of publishing sensitive data', () =>{
        });
        And ('the User has an option to contact user support', () =>{
        });

    // @TEST_NP-13261
    // @9146
    // Scenario: User sees Landing Page for Dataset
        When ('User opens Landing Page for a Dataset', () =>{
        });
        Then ('the User sees geographical information', () =>{
        });
        And ('the User sees publications that use this dataset', () =>{
        });
        And ('the User sees projects assosiated with this dataset', () =>{
        });
        And ('the User sees DMPs this dataset complay to', () =>{
        });
        And ('the User sees other related resources', () =>{
        });
