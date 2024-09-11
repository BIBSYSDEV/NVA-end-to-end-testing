Feature: User edits Project
  In order to achieve a low mental load on the user
  As Product Owner
  I want the user to experience a high degree of recognition between the desing of Project's registration wizard and Publication’s registration wizard

  In order to manage a Project's content
  As a User
  I want to be able to manage all possible information about the Project in one place

  In most cases the Project Manager reside from the Coordinating Institution
  Vocabulary warning: Most funding organizations use the term "project" to describe (one of possible many) funding sources a project may have.

  Background:
    Given A User is logged in
    And the User got one of the following roles:
      | Registrator           |
      | Curator               |
      | Project Owner         |
      | Project Manager       |
      | Local Project Manager |
  # Rule: Any User (Registrator) can create a project, becoming origin Project Owner
  # @test
  # Scenario: User opens the Project Wizard to register a new Project
  #   When the User selects Create new Project
  #   Then they see the Project Wizard start page
  #   And they can select:
  #     | Search for Financing |
  #     | Empty registration   |
  #   #| REK Approval         |
  #   And they see a Close option
  # @test
  # Scenario: User starts to register a Project with a suggested Financing from NFR
  #   Given User opens the Project Wizard to register a new Project
  #   When they activate the search field, a list of Financings where the user has a role is presented
  #   Then they selects a Financing
  #   And the Project Wizard opens pre-filled with metadata
  # @test
  # Scenario: User opens the Project Wizard and start registering a Project without Financing selected
  #   Given User opens the Project Wizard to register a new Project
  #   When they open the Project Wizard to register a new Project
  #   And they selects Empty registration
  #   Then the Project Wizard opens with no metadata pre-filled
  # @test
  # Scenario: The User opens the Project Wizard and registers a new project
  #   Given User opens the Project Wizard to register a new Project
  #   And they open the Project Wizard to register a new Project
  #   When they selects Empty registration
  #   Then they see the Project Wizard with Description fields:
  #     | Title                               |
  #     | Scientific summary (Norwegian)      |
  #     | Scientific summary (English)        |
  #     | Popular science summary (Norwegian) |
  #     | Popular science summary (English)   |
  #     | Keywords                            |
  #     | Start date                          |
  #     | End date                            |
  #   And they see the Project Wizard with Details fields:
  #     | Coordinating institution |
  #     | Category                 |
  #   And they can add Funding
  #   And they can add Project participants
  #   And they can link to Related projects
  #   And they can Save and view the project
  # @test
  # Scenario: User adds a Project Participant
  #   Given User views the Projects Participants section
  #   When the User adds a Project manager
  #   And the User searches for a project manager
  #   And the User selects a Project manager from the search results
  #   Then they see the Person listed as Project manager
  #   When the User adds a Projects Participant
  #   And the User searches for a Project participant
  #   And the User selects a Participant from the search results
  #   Then they see the Person listed as a Project Participant with the selected role
  # # Scenario: User tries to add a duplicate Project Participant
  # Scenario: User sees that a Project is created with correct values
  #   Given User opens the Project Wizard to register a new Project
  #   When they fill inn values for Description:
  #     | Title                               |
  #     | Scientific summary (Norwegian)      |
  #     | Scientific summary (English)        |
  #     | Popular science summary (Norwegian) |
  #     | Popular science summary (English)   |
  #     | Keywords                            |
  #     | Start date                          |
  #     | End date                            |
  #   And they fill inn values for Details:
  #     | Coordinating institution |
  #     | Category                 |
  #     | Funding                  |
  #   And they add Participants
  #   And they add Connections
  #   And they save the Project
  #   Then they see all the filled inn values on the Project presentation page
  #   When they edit the Project
  #   Then they see the values on the Description page is the same that they filled in
  #     | Title                               |
  #     | Scientific summary (Norwegian)      |
  #     | Scientific summary (English)        |
  #     | Popular science summary (Norwegian) |
  #     | Popular science summary (English)   |
  #     | Keywords                            |
  #     | Start date                          |
  #     | End date                            |
  #   And they see the values on the Details page is the same that they filled in
  #     | Coordinating institution |
  #     | Category                 |
  #     | Funding                  |
  #   And they see the Participants they added
  #   And they see the Connections they added
  # @test
  # Scenario: User adds a Financing source for Project
  #   Given User views Financing tab for Project
  #   When a User adds a new Financing
  #   And the User is presented a list of Financing sources
  #   And NFR is listed first
  #   Then the User selects a Financing source for Project
  #   And the selected Financing source is listed
  # @test
  # Scenario: User selects NFR as Financing source for Project
  #   Given User adds a Financing source for Project
  #   And the Financing source for Project is NFR
  #   #https://prosjektbanken.forskningsradet.no/prosjektbanken/rest/cristin/search?query=111
  #   #https://beta.explore.openaire.eu/search/advanced/projects?q=&op=and
  #   When they activate the search field
  #   Then they selects a NFR project
  #   And the selected Financing title and ID is listed
# Scenario: User selects a non-NFR as Financing source for Project
#     Given User adds a Financing source for Project
#     And the Financing source for Project is not NFR
#     And the selected Financing source for Project is presented
#     And the User is presented following fields:
#         | Title |
#         | ID    |
#         | Value |
#     When the fieleds are filled in the Financing source ia stored
#     And the add new Financing source option is activated

  @test
  Scenario: User selects a sub-unit for a Participants
    Given User opens the Project Wizard to register a new Project
    When they add Participants for:
      | Project manager     |
      | Project participant |
    Then they can set the affiliation of the Participants to a sub-unit:
      | Project manager     |
      | Project participant |
