Feature: Login using Cognito

    Scenario: Login

        Given A user have logged in using Cognito
        When the user navigates to the front page
        Then the user sees that they are logged in

    Scenario: User connects Author
        Given that the user logs in with Feide for the first time
        When they click OK in the Connect Author dialog
        Then the Connect Author dialog closes
        And they see the Connect Orcid dialog

