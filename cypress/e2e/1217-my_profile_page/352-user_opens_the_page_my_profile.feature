Feature: User opens the page My Profile

    @test
    Scenario: User opens the page My Profile
        Given that the user is logged in
        When they click the menu item My user profile
        Then they see My Profile
        And they see their Profile page which includes information for
            | Real name |
            # | Feide ID  |
            | Email     |
            | ORCID     |
            | Roles     |
            # | Organizations |
            # | Language  |