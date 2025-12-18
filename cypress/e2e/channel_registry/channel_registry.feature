Feature: Test channel registry

    @test
    Scenario: Add publisher to registration
        Given I create a registration
        When I add a publisher to the registration
        Then the registration should have the publisher set

    @test
    Scenario: Add journal to registration
        Given I create a registration
        When I add a journal to the registration
        Then the registration should have the journal set

    @test
    Scenario: Add series to registration
        Given I create a registration
        When I add a series to the registration
        Then the registration should have the series set
        