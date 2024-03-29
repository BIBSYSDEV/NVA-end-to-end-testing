Feature: Save registration for Publication in journal
    @test
    Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Publication in journal
        Given Author begins registering a Registration
        And selects "<Subtype>"
        And fill in values for all fields
        When they saves Registration
        Then they can see the values on the Registration Landing Page
        And they can see the values in the Registration Wizard

        Examples:
            | Subtype                  |
            | AcademicArticle          |
            | AcademicLiteratureReview |
            | JournalLetter            |
            | JournalReview            |
            | JournalLeader            |
            | JournalCorrigendum       |
            | JournalIssue             |
            | ConferenceAbstract       |
            | CaseReport               |
            | StudyProtocol            |
            | ProfessionalArticle      |
            | PopularScienceArticle    |