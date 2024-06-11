Feature: User sees menu

    @test
    Scenario: Unauthenticated User sees menu
        Given that the User is not logged in
        When they look at any page in NVA
        Then they see the Log in Button
        And they see the Language selector

    # @test
    Scenario: User have option to log out
        Given that the user is logged in
        When they look at any page in NVA
        Then they have an option to log out

    @test
    Scenario: User without any role sees menu
        Given that the user is logged in
        And they have no NVA role
        When they look at any page in NVA
        Then they see Menu items:
            | My page |
        And they see the Language selector

    @test
    Scenario: User sees the menu for Creator
        Given that the user is logged in
        And they have the "Creator" role
        When they look at any page in NVA
        Then they see Menu items:
            | My page |
        And they see the Language selector

    @test
    Scenario: User sees the menu for Curator
        Given that the user is logged in
        And they have the "Curator" Role
        When they look at any page in NVA
        Then they see Menu items:
            | Worklist |
            | My page  |
        And they see the Language selector

    @test
    Scenario: User sees the menu for Institution-admin
        Given that the user is logged in
        And they have the "Institution-admin" role
        When they look at any page in NVA
        Then they see Menu items:
            | Basic data |
            | My page    |
        And they see the Language selector

    @test
    Scenario: User sees the menu for Editor
        Given that the user is logged in
        And they have the "Editor" role
        When they look at any page in NVA
        Then they see Menu items:
            | My page    |
        And they see the Language selector

    @test
    Scenario: User sees the menu for Application administrator
        Given that the user is logged in
        And they have the "App-admin" role
        When they look at any page in NVA
        Then they see Menu items:
            | Basic data |
            | My page    |
        And they see the Language selector
