Feature: User navigates back to previous page

    Scenario: User navigates back to previous page
        Given the user has navigated to any other page than Start Page
        And they see a "Back" button
        When they click "Back"
        Then they see the previous page