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

    @test
    Scenario: User view list of publications
        Given that the user is logged in
        When they view their research profile
        Then they see a list of their publications
        Then the list of publications is sorted by newest first

    # @test
    # Scenario: User sort list of publications
    #     Given User view list of publications
    #     When they sort the list by oldest first
    #     Then the list show publications sorted by oldest first