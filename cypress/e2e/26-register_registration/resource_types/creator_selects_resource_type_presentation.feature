Feature: Creator selects Resource type Presentation

    @test
    Scenario: Creator navigates to the Resource Type tab and selects Resource type "Presentation"
        Given Creator navigates to Resource Type tab
        When they select the Resource type "Presentation"
        Then they see a list of subtypes:
            | Conference lecture |
            | Conference poster  |
            | Lecture            |
            | Other presentation |

    @test
    Scenario: Creator navigates to the Resource Type tab and selects a Resource subtype for Presentation
        Given Creator navigates to the Resource Type tab and selects Resource type "Presentation"
        When they select a Resource Subtype
        Then they see fields:
            | Title of event |
            | Place of event |
            | Date from      |
            | Date to        |
            | Organizer      |
            | Country        |
