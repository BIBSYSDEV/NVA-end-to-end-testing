Feature: Creator selects Publication in Journal and Peer Review Details are hidden

    @1409
    Scenario Outline: Creator selects Publication in Journal and Peer Review Details are hidden
        Given that a Creator navigates to the Reference tab
        And they select type Publication in Journal
        When they select "<Subtype>"
        Then they see that the Peer Review Details are hidden
        Examples:
            | Subtype              |
            | Editorial            |
            | Letter to the editor |
            | Book review          |