Feature: Project Landing Page

    In order to know about a project
    As an anonymous User
    I want an overview of the projects details

    In order to publish validated information about a project
    As a logged in User
    I want to get an preview of my project, before I make it public

    In order to correct a project that is misleading
    As a logged in User with relevant access
    I want to be able to manage a published project

    In order to understand the Research Graph
    As an anonymous User
    I want to experience a high recognition between the Projects and the Outputs Landing Pages desing's

    In order to navigate the Research Graph
    As an anonymous User
    I want to get all relevant navigation options for further discovery of the project's outputs, participants, finances and approvals

    Rules:
    - A project has a persistent identifier, enabling correct citation and coining it as a entity in the Research Graph

    This file is not reviewed, yet.
    Jan Erik 14. sep.

    @test
    Scenario: An Anonymous User searches for a Project
        Given An Anonymous User is on the NVA start page
        When the Anonymous User navigates to the Project search page
        And enters a search term for a Project
        Then a search result with the Project is displayed

    @test
    Scenario: User opens Landing Page for Project
        When A Anonymous User opens a Project's Landing Page
        Then the Anonymous User see:
            # | Project Title            |
            | Coordinating Institution |
            | Project Manager          |
            | Project Period           |
            | Financing                |
            | Project Category         |
        And the Anonymous User see expandable panels for:
            | Summary             |
            | Participants        |
            | Results             |
            # | Data Management Plan |
            | Associated Projects |
        And the Anonymous User see counts of:
            | Participants        |
            | Results             |
            | Associated Projects |

    @test
    Scenario Outline: Privileged user sees Edit button for Project
        Given User opens Landing Page for Project
        When the User has the "<Role>" role for the project
        Then they can see an Edit button
        Examples:
            | Role                  |
            # | Curator               |
            # | Project Owner         |
            | Project Manager       |
            # | Local Project Manager |

    # Scenario Outline: Privileged user sees Delete button for Project
    #     Given User opens Landing Page for Project
    #     When the User has the "<Role>" role for the project
    #     Then they can see a Delete button
    #     Examples:
    #         | Role            |
    #         | Curator         |
    #         | Project Owner   |
    #         | Project Manager |

    # Scenario: Privileged user clicks the Delete Button for a Project
    #     Given Privileged user sees Delete button for Project
    #     When they click the Delete Button
    #     Then they see a Confirm Dialog

    # Scenario: Privileged user deletes a Project
    #     Given Privileged user clicks the Delete Button for a Project
    #     When they Confirm the action
    #     Then the Confirm Dialog is closed
    #     And the Project is marked deleted
    #     And The Project is removed from the Projects list

    @test
    Scenario: User expand Summary for a Project
        Given User opens Landing Page for Project
        When they expand "Summary"
        Then they see "Scientific summary"
        And they see "Popular science summary"

    @test
    Scenario: User expand Participants for a Project
        Given User opens Landing Page for Project
        When they expand "Participants"
        Then they see a list of Participants and their:
            | Name        |
            | Role        |
            | Affiliation |

@test
Scenario: User sees Project Manager for a Project
    Given User expand Participants for a Project
    When they see a Project Manager
    Then they see fields:
        | Start Date |

@test
Scenario: User expand Results for a Project
    Given User opens Landing Page for Project
    When they expand "Results"
    Then they see a list of Results
