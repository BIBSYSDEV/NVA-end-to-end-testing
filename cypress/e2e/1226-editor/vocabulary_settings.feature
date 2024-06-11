Feature: Editor decide on institutions Vocabulary settings

    In order to enable Registrators to use vocabulary
    As an Editor
    I want to see supported Vocabularies

    In order to enable Registrators to use vocabulary
    As an Editor
    I want to activate or hide supported Vocabularies

    Background:
        Given a logged in Editor

    @test
    Scenario: Editor sees fields for Vocabulary settings
        Given Editor opens Editor Administration
        And they see Vocabulary settings
        Then they a list of Vocabularies:
            | HRCS Activity |
            | HRCS Category |
        And they can set a Vocabulary to be one of:
            | Disabled |
            | Allowed  |
            | Default  |
