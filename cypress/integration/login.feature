Feature: Login using Cognito

    Scenario: Login

        Given A user have a valid access token
        When the user navigates to the front page
        Then the user sees that they are logged in

