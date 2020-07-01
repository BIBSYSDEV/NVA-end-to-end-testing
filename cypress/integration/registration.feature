Feature: Creating a registration

    Scenario: Creator opens New Registration
        Given that the user is logged in as Creator
        When they click the menu item New Registration
        Then they see the New Registration page
        Then they see options:
            | Upload file            |
            | Link                   |
            | Suggestions from ORCID |