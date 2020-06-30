    Scenario: User connects Author
        Given that the user logs in with Feide for the first time
        When they click OK in the Connect Author dialog
        Then the Connect Author dialog closes
        And they see the Connect Orcid dialog

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

    Scenario: A user is already authenticated with Feide (single sign on)
        Given that the user is already authenticated with Feide
        When they navigate to the Start page
        And they click Log in
        And they are redirected to Feide
        And they click on the identity they wish to proceed with in the Feide interface
        Then they are redirected back to the Start page
        And they see their name in the Menu

    @353
    Scenario: A user logs out
        Given that the user is already logged in
        When they click on the Menu
        And they click Log out
        Then they are logged out of the NVA application