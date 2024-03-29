Feature: Creator selects Resource tyoe "Exhibition"

    @test
    Scenario: Creator navigates to the Resource Type tab and selects Resource type "Exhibition"
        Given Creator starts registering a Registration
        When they navigates to the Resource type tab
        Then they see a Exhibition types:
            | ExhibitionProduction |

    @test
    Scenario: Creator selects Resource type ExhibitionProduction
        Given Creator navigates to the Resource Type tab and selects Resource type "Exhibition"
        When they select Resource type ExhibitionProduction
        Then they can select type of exhibition as one of:
            | Basic exhibition      |
            | Temporary exhibition  |
            | Popup exhibition      |
            | Ambulating exhibition |
            | Digital exhibition    |
            | Historical interior   |
            | Other exhibition      |
        And the can add manifestations of types:
            | ExhibitionCatalog              |
            | ExhibitionBasic                |
            | ExhibitionMentionInPublication |
            | ExhibitionOtherPresentation    |

    @test
    Scenario: Creator adds ExhibitionMentionInPublication to an ExhibitionProduction
        Given Creator selects Resource type ExhibitionProduction
        When the add an ExhibitionMentionInPublication
        Then they can add information of type:
            | Title             |
            | Issue             |
            # | Page(s)           |
            | Date              |
            | Other information |

    @test
    Scenario: Creator adds ExhibitionOtherPresentation to an ExhibitionProduction
        Given Creator selects Resource type ExhibitionProduction
        When the add an ExhibitionOtherPresentation
        Then they can add information of type:
            | Type        |
            | Place       |
            | Publisher   |
            | Description |
            | Date        |

    @test
    Scenario: Creator adds ExhibitionCatalog to an ExhibitionProduction
        Given Creator selects Resource type ExhibitionProduction
        When the add an ExhibitionCatalog
        Then they can search for, and add, an published ExhibitionCatalog

    @test
    Scenario: Creator adds ExhibitionBasic to an ExhibitionProduction
        Given Creator selects Resource type ExhibitionProduction
        When the add an ExhibitionBasic
        Then they can add information of type:
            | Organization |
            | Place        |
            | Date from    |
            | Date to      |
