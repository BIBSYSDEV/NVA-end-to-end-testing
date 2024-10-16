Feature: Save registration for Artistic result
    @test
    Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Artistic result
        Given Author begins registering a Registration
        And selects "<Subtype>"
        And fill in values for all fields
        When they saves Registration
        Then they can see the values on the Registration Landing Page
        And they can see the values in the Registration Wizard

        Examples:
            | Subtype          |
            # | ArtisticDesign   |
            # | Architecture     |
            # | PerformingArts   |
            # | MovingPicture    |
            # | MusicPerformance |
            # | VisualArts       |
            | LiteraryArts     |
