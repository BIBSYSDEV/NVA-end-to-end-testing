Feature: Login using Cognito

    Scenario: Login

        Given A user have logged in using Cognito
        When the user navigates to the front page
        Then the user sees that they are logged in

    Scenario: Login with existing author

        Given that a User has a valid Feide ID and password
        And they do not have a Feide ID in their ARP entry
        And there are entries in ARP
            | User, Test |
        When they log in
        Then they see a list containing <Author name> and <Last publication> for each ARP entry matching their <Name>
        And a Create New Author Button
