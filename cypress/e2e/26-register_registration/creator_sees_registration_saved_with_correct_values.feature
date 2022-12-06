Feature: Creator sees registration is saved with correct values presented on landing page

  @TEST_NP-4032
  @test
  Scenario Outline: Creator sees registration is saved with correct values presented on landing page
    Given Author begins registering a Registration
    And selects "<Subtype>"
    And fill in values for all fields
    When they saves Registration
    Then they can see the values on the Registration Landing Page
    And they can see the values in the Registration Wizard

    Examples:
      | Subtype        |
      | JournalArticle |
# | JournalLetter                 |
# | JournalReview                 |
# | JournalLeader                 |
# | JournalCorrigendum            |
# | JournalIssue                  |
# | ConferenceAbstract            |
# | BookMonograph                 |
# | BookAnthology                 |
# | ReportResearch                |
# | ReportPolicy                  |
# | ReportWorkingPaper            |
# | ReportBookOfAbstract          |
# | ReportBasic                   |
# | DegreeBachelor                |
# | DegreeMaster                  |
# | DegreePhd                     |
# | DegreeLicentiate              |
# | OtherStudentWork              |
# | ChapterArticle                |
# | ChapterInReport               |
# | ChapterConferenceAbstract     |
# | ConferenceLecture             |
# | ConferencePoster              |
# | Lecture                       |
# | OtherPresentation             |
# | ArtisticDesign                |
# | Architecture                  |
# | PerformingArts                |
# | MovingPicture                 |
# | MusicPerformance              |
# | MusicPerformance              |
# | VisualArts                    |
# | LiteraryArts                  |
# | MediaFeatureArticle           |
# | MediaReaderOpinion            |
# | MediaInterview                |
# | MediaBlogPost                 |
# | MediaPodcast                  |
# | MediaParticipationInRadioOrTv |
# | DataManagementPlan            |
# | DataSet                       |
