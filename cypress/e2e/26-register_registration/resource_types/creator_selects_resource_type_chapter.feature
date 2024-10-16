Feature: Creator selects Resource type Chapter

    @test
    Scenario: Creator navigates to the Resource Type tab and selects Resource type "Chapter"
        Given Creator navigates to Resource Type tab
        When they select the Resource type "Chapter"
        Then they see a list of subtypes:
            | Chapter in Anthology |
            | Chapter in Report    |
            | Conference abstract  |

    @test
    Scenario Outline: Creator sees fields for Chapter subtypes
        Given Creator navigates to the Resource Type tab and selects Resource type "Chapter"
        When they select the Resource Subtype "<ChapterType>"
        Then they see an information box describing that a Container report must be published first
        And they see a field "<ContainerField>"
        And they see fields:
            # | DOI        |
            | Pages from |
            | Pages to   |
        Examples:
            | ChapterType          | ContainerField                                |
            | Chapter of Anthology | Search box for published Anthologies          |
            | Chapter in Report    | Search box for published Reports              |
            | Conference abstract  | Search box for published Abstract Collections |

    @test
    Scenario: Creator sees fields for Resource subtype "Chapter in Anthology"
        Given Creator navigates to the Resource Type tab and selects Resource type "Chapter"
        When they select the Resource Subtype "Chapter in Anthology"
        Then they see Content type field with options:
            | Academic Chapter           |
            | Non-fiction Chapter        |
            | Popular Science Chapter    |
            | Textbook Chapter           |
            | Encyclopedia Chapter       |
            | Introduction               |
            | Exhibition Catalog Chapter |

    @test
    Scenario: Creator selects Resource subtype "Chapter in Anthology" and Content type "Academic chapter"
        Given Creator sees fields for Resource subtype "Chapter in Anthology"
        When they select Content type "Academic chapter"
        And they see the Norwegian Science Index (NVI) evaluation status
