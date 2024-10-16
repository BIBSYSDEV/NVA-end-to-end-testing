Feature: Creator selects Resource type Contribution to journal

    @test
    Scenario: Creator navigates to the Resource Type tab and see list of Journal types
        Given Creator begins registering a Registration in the Wizard
        When they navigate to the Resource Type tab
        Then they can select Journal Resource types:
            # Vitenskapelig artikkel (AcademicArticle)
            | Academic article           |
            # Vitenskapelig oversiktsartikkel (AcademicLiteratureReview)
            | Academic literature review |
            # Kasuistikk (CaseReport)
            | Case report                |
            # Studieprotokoll (StudyProtocol)
            | Study protocol             |
            # Fagartikkel (ProfessionalArticle)
            | Professional article       |
            # Populærvitenskapelig artikkel (PopularScienceArticle)
            | Popular science article    |
            # Kommentar (JournalLetter)
            | Commentary                 |
            # Bokanmeldelse (JournalReview)
            | Book review                |
            # Leder (JournalLeader)
            | Editorial                  |
            # Corrigendum (JournalCorrigendum)
            | Corrigendum                |
            # Hefte i tidsskrift (JournalIssue)
            | Journal issue              |
            # Konferanseabstrakt (ConferenceAbstract)
            | Conference abstract        |

    @test
    Scenario: Creator sees fields for Journal type
        Given Creator navigates to the Resource Type tab and see list of Journal types
        When they select either of:
            | Academic article           |
            | Academic literature review |
            | Case report                |
            | Study protocol             |
            | Professional article       |
            | Popular science article    |
            | Commentary                 |
            | Book review                |
            | Editorial                  |
            | Journal issue              |
            | Conference abstract        |
        Then they see fields:
            | Search field for Journal |
            | Volume                   |
            | Issue                    |
            | Pages from               |
            | Pages to                 |
            | Article number           |

    @test
    Scenario: Creator sees that fields for Journal article are validated
        Given Creator sees fields for Journal type
        And they enter numbers for "Pages from" and "Pages to"
        And the number for "Pages from" is greater than the number for "Pages to"
        When they click the Save button
        Then they can see "Mandatory" error messages for fields:
            | Search field for Journal |
        And they can see error messages for fields "Pages from" and "Pages to"

    @test
    Scenario: Creator sees fields for Resource subtype "Corrigendum"
        Given Creator navigates to the Resource Type tab and see list of Journal types
        When they select the Resource type "Corrigendum"
        Then they see fields:
            | Search field for Journal article |
            | Volume                           |
            | Issue                            |
            | Pages from                       |
            | Pages to                         |
            | Article number                   |
        And they see a disabled field for Journal based on selected Journal article

    @test
    Scenario: Creator sees that fields for Resource subtype "Corrigendum" are validated
        Given Creator sees fields for Resource subtype "Corrigendum"
        And the number for "Pages from" is greater than the number for "Pages to"
        When they click the Save button
        Then they can see "Mandatory" error messages for fields:
            | Search field for Journal article |
        And they can see error messages for fields "Pages from" and "Pages to"

    @test
    Scenario Outline: Creator sees extra fields for Norwegian Science Index (NVI) compatible Journal types
        Given Creator navigates to the Resource Type tab and see list of Journal types
        When they select type to be "<Type>":
        Then they see the Norwegian Science Index (NVI) evaluation status
        Examples:
            | Type                       |
            | Academic article           |
            | Academic literature review |