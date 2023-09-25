Feature: Non-customer views My Profile

    @test
    Scenario: Non-customer views My Profile
        Given that a User is logged in
        And their Institution is not a Customer of NVA
        When they navigate to My Profile
        Then they see that they have no roles
        And they see an information text explaining why they have no roles
        And they see their Institutions names under Affiliations
        And they see their Feide Host ID
