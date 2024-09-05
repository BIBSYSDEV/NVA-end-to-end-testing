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

  @test
  Scenario: User opens the Project Wizard to register a new Project
    When the User selects Create new Project
    Then they see the Project Wizard start page
    And they can select:
      | Search for Financing |
      | Empty registration   |
    #| REK Approval         |
    And they see a Close option

  @test
  Scenario: User starts to register a Project with a suggested Financing from NFR
    Given User opens the Project Wizard to register a new Project
    When they activate the search field, a list of Financings where the user has a role is presented
    Then they selects a Financing
    And the Project Wizard opens pre-filled with metadata

  @test
  Scenario: User starts to register a Project with a located Financing from NFR
    Given User opens the Project Wizard to register a new Project
    When they activate the search field, a list of Financings where the user has a role is presented
    And they execute a search
    Then they selects a Financing
    And the Project Wizard opens pre-filled with metadata
  # Scenario: User inspects the search result from information
  #     Given User opens the Project Wizard to register a new Project
  #     When the user inspects the suggested or located Financing from NFR
  #     Then the number of existing projects using the Financing is visible
  #     And the User may inspect witch projects is connected to this Financing

  @test
  Scenario: User opens the Project Wizard and start registering a Project without Financing selected
    Given User opens the Project Wizard to register a new Project
    When they open the Project Wizard to register a new Project
    And they selects Empty registration
    Then the Project Wizard opens with no metadata pre-filled

  @test
  Scenario: The User opens the Project Wizard and registers a new project
    Given User opens the Project Wizard to register a new Project
    And they open the Project Wizard to register a new Project
    When they selects Empty registration
    Then they see the Project Wizard with Description fields:
      | Title                               |
      | Scientific summary (Norwegian)      |
      | Scientific summary (English)        |
      | Popular science summary (Norwegian) |
      | Popular science summary (English)   |
      | Keywords                            |
      | Start date                          |
      | End date                            |
    And they see the Project Wizard with Details fields:
      | Coordinating institution |
      | Category                 |
    And they can add Funding
    And they can add Project participants
    And they can link to Related projects
    And they can Save and view the project

  @test
  Scenario: User adds a Project Participant
    Given User views the Projects Participants section
    When the User adds a Project manager
    And the User searches for a project manager
    And the User selects a Project manager from the search results
    Then they see the Person listed as Project manager
    When the User adds a Projects Participant
    And the User searches for a Project participant
    And the User selects a Participant from the search results
    Then they see the Person listed as a Project Participant with the selected role
  # #Rule: The Project Owner, the Project Manager and Curator at the Coordinating Institution can grant the Project Manager role to any user, but there can only be one Project Manager at any time
  # Scenario Outline: A User adds a new Project Manager
  #     Given a User with role "<Role>" in the project
  #     When the User selects a User from a search
  #     And the User grants this User the role:
  #         | Project Manager |
  #     Then the selected User is listed as Project Manager
  #     Examples:
  #         | Role            |
  #         | Curator         |
  #         | Project Owner   |
  #         | Project Manager |
  # #Rule: A project can only have one Project Owner, Project Manager and Coordinating Institution - at any given time
  # #Rule: A project may have several sources of funding. Warning: Funding organizations consider their funding to be a project and/or a grant, but from our point of view - it's only a part of the projects total funding.
  # Scenario Outline: User views Financing tab for Project
  #     When a User with role "<Role>" on the project view the Financing tab
  #     Then the add new Financing option is "<FieldStatus>"
  #     Examples:
  #         | Role                  | FieldStatus |
  #         | Curator               | Enabled     |
  #         | Project Owner         | Enabled     |
  #         | Project Manager       | Enabled     |
  #         | Local Project Manager | Disabled    |

  @test
  Scenario: User adds a Financing source for Project
    Given User views Financing tab for Project
    When a User adds a new Financing
    And the User is presented a list of Financing sources
    And NFR is listed first
    Then the User selects a Financing source for Project
    And the selected Financing source is listed

  @test
  Scenario: User selects NFR as Financing source for Project
    Given User adds a Financing source for Project
    And the Financing source for Project is NFR
    #https://prosjektbanken.forskningsradet.no/prosjektbanken/rest/cristin/search?query=111
    #https://beta.explore.openaire.eu/search/advanced/projects?q=&op=and
    When they activate the search field
    Then they selects a NFR project
    And the selected Financing title and ID is listed
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
  # #Rule: The Projects Coordinating Institution grants it's Curators access to the project
  # Scenario: Curator edit a Project in the Project Wizard
  #     Given a Curator on the Project's Coordinating Institution
  #     When the Curator opens the Project in the Project Wizard
  #     Then the Curator can manage the Projects data
