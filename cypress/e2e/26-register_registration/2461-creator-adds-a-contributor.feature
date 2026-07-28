Feature: Creator adds a Contributor

    @test
    Scenario Outline: Creator opens the Add Contributor Dialog
        Given Creator navigates to Contributors tab
        And the Registration has Registration Type "<RegistrationType>"
        When they click "Add Contributor"
        Then they see the "Add Contributor" Dialog
        And they see a dropdown with Contributor Types "<ContributorTypes>"
        And they see a "Close" Button
        And they see a "Create new Contributor" Button
        And they see a "Add me as Contributor" Button
        And they see a disabled "Add" Button
        Examples:
            | RegistrationType              | ContributorTypes                                                                                                                                                              |
            | BookAnthology                 | Editor, Contact person, Rights holder, Other                                                                                                                                  |
            | AcademicMonograph             | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | NonFictionMonograph           | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | PopularScienceMonograph       | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | Textbook                      | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | Encyclopedia                  | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ExhibitionCatalog             | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | AcademicChapter               | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | NonFictionChapter             | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | PopularScienceChapter         | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | TextbookChapter               | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | EncyclopediaChapter           | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | Introduction                  | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ExhibitionCatalogChapter      | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ChapterInReport               | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ChapterConferenceAbstract     | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | DegreeBachelor                | Author, Supervisor, Contact person, Rights holder, Other                                                                                                                      |
            | DegreeMaster                  | Author, Supervisor, Contact person, Rights holder, Other                                                                                                                      |
            | DegreePhd                     | Author, Supervisor, Contact person, Rights holder, Other                                                                                                                      |
            | DegreeLicentiate              | Author, Supervisor, Contact person, Rights holder, Other                                                                                                                      |
            | OtherStudentWork              | Author, Supervisor, Contact person, Rights holder, Other                                                                                                                      |
            | AcademicArticle               | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | AcademicLiteratureReview      | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | JournalLetter                 | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | JournalReview                 | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | JournalLeader                 | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | JournalCorrigendum            | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | JournalIssue                  | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ConferenceAbstract            | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | CaseReport                    | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | StudyProtocol                 | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ProfessionalArticle           | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | PopularScienceArticle         | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ReportBasic                   | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ReportPolicy                  | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ReportResearch                | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ReportAbstractCollection      | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ReportWorkingPaper            | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ConferenceLecture             | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ConferencePoster              | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | Lecture                       | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | OtherPresentation             | Author, Contact person, Rights holder, Other                                                                                                                                  |
            | ArtisticDesign                | Designer, Curator/Organizer, Consultant, Other                                                                                                                                |
            | Architecture                  | Architect, Landscape architect, Interior architect, Architectural planner, Other                                                                                              |
            | PerformingArts                | Dancer, Actor, Choreographer, Director, Scenographer, Costume designer, Producer, Artistic director, Dramatist, Librettist, Dramaturge, Sound designer, Light designer, Other |
            | MovingPicture                 | Director, Screenwriter, Producer, Photographer, Production designer, Video editor, Sound design, VFX Supervisor, Other                                                        |
            | MusicPerformance              | Soloist, Conductor, Musician, Composer, Organizer, Writer, Other                                                                                                              |
            | LiteraryArts                  | Author, Translator, Editor, Other                                                                                                                                             |
            | VisualArts                    | Artist, Curator, Consultant, Other                                                                                                                                            |
            | MediaFeatureArticle           | Other                                                                                                                                                                         |
            | MediaReaderOpinion            | Other                                                                                                                                                                         |
            | MediaInterview                | Journalist, Interviewee, Other                                                                                                                                                |
            | MediaBlogPost                 | Other                                                                                                                                                                         |
            | MediaPodcast                  | Program host, Participant, Other                                                                                                                                              |
            | MediaParticipationInRadioOrTv | Program host, Participant, Other                                                                                                                                              |
            | DataManagementPlan            | Data collector, Data curator, Data manager, Distributor, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                 |
            | Dataset                       | Data collector, Data curator, Data manager, Distributor, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                 |
            | Map                           | Contact person, Rights holder, Other                                                                                                                                          |

    @test
    Scenario: Creator selects a Contributor Type
        Given Creator opens the Add Contributor Dialog
        When they select a Contributor Type
        Then they see a search field

    @test
    Scenario: Creator searches for a Contributor
        Given Creator selects a Contributor Type
        When they enter a search term
        Then they see a List of Contributors matching the search term
        And they see number of hits and the search term
        And they see Previous Publications by the Contributors
        And they see the Primary Institution for the Contributors

    @test
    Scenario: Creator selects a Contributor from search
        Given Creator searches for a Contributor
        When they click on a Contributor from the search result
        Then they see the "Add" Button is enabled

    @test
    Scenario: Creator adds a Contributor to the List of Contributors
        Given Creator selects a Contributor from search
        When they click the "Add" Button
        Then the Dialog is closed
        And the selected Contributor is added to the List of Contributors