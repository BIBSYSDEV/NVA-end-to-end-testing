Feature: Creator registers Corresponding Author

    @1214
    Scenario: Creator registers Corresponding Author
        Given Creator begins registering a Registration in the Wizard
        And they navigate to the Contributors tab
        And they see an Author
        When they check the Corresponding checkbox
        Then they see the Corresponding Author Email field
        And they enter the Author's email