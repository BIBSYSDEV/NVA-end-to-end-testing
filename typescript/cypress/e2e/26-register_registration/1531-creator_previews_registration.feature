Feature: Creator previews Registration

    @test
    Scenario: Creator previews Registration
        Given that a Creator views a Registration
        And they navigate to the Files and License tab
        When they click Save and Present
        Then they see the Landing Page for the Registration