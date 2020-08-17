Feature: Login using Cognito

    Scenario: Login

        Given A user have logged in using Cognito
        When the user navigates to the front page
        Then the user sees that they are logged in

    Scenario: A user logs in with Feide not for the first time
        Given that the user has valid Feide credentials
        And they have logged in with Feide before
        And they have not connected ORCID
        And they are on the Start page
        When they click Log in
        And they are redirected to Feide
        And they enter their Feide credentials
        Then they are redirected back to the Start page
        And they see their name in the Menu
        And they see the Connect ORCID dialog

    @ignore
    Scenario: Login with existing author

        Given that a User has a valid Feide ID and password
        And they do not have a Feide ID in their ARP entry
        And there are entries in ARP
            | User, Test |
        When they log in
        Then they see a list containing <Author name> and <Last publication> for each ARP entry matching their <Name>
        And a Create New Author Button

