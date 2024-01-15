Feature: Performance testing

    @test
    Scenario: Startpage
        Given an anonymous user
        When they open the Startpage
        Then the startpage should be presented in less than 3 seconds

    @test
    Scenario: Startpage logged in user
        Given an authorized user
        When they are logged in
        Then the startpage with their username should be presented in less than 3 seconds

    @test
    Scenario: Search performance for default search results
        Given a user on the startpage
        When they first open the startpage
        Then the default search results should be presented in less than 3 seconds

    @test
    Scenario: Search performance
        Given a user already on the startpage
        When they search for a registration
        Then the search results should be presented in less than 3 seconds

    @test
    Scenario: Logged in user creates empty Registration
        Given a logged in user
        When they start an empty Registration
        Then they are presented the Registration wizard in less than 5 seconds

    @test
    Scenario: Logged in user saves Registration
        Given a logged in user
        When they start registering a Registration
        And they save the Registration
        Then they are presented the Registration landing page in less than 5 seconds