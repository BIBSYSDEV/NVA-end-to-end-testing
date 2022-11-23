Feature: Creator navigates to Contributors tab
  Creator
  @TEST_NP-4003
  @test
  @417
  Scenario: Creator navigates to Contributors tab
    Given Creator begins registering a Registration in the Wizard
    When they navigate to the Contributors tab
    Then they see the tab Description is clickable
    And they see the tab Resource Type is clickable
    And they see the tab Contributors is selected
    And they see the tab Files and License is clickable
    And they see Previous is enabled
    And they see Next is enabled
    And they see Save is enabled

  @test
  @TEST_NP-4002
  Scenario Outline: Creator see buttons to add Contributors
    Given Creator navigates to Contributors tab
    When the Registration has Registration Subtype "<RegistrationSubtype>"
    Then they see buttons "<ContributorTypes>"
    Examples:
      | RegistrationSubtype           | ContributorTypes                                                                                                                                                   |
      | BookAnthology                 | Editor, ContactPerson, RightsHolder                                                                                                                                |
      | BookMonograph                 | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ChapterArticle                | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ChapterConferenceAbstract     | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | DegreeBachelor                | Creator, Supervisor, ContactPerson, RightsHolder                                                                                                                   |
      | DegreeMaster                  | Creator, Supervisor, ContactPerson, RightsHolder                                                                                                                   |
      | DegreePhd                     | Creator, Supervisor, ContactPerson, RightsHolder                                                                                                                   |
      | DegreeLicentiate              | Creator, Supervisor, ContactPerson, RightsHolder                                                                                                                   |
      | OtherStudentWork              | Creator, Supervisor, ContactPerson, RightsHolder                                                                                                                   |
      | JournalArticle                | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | JournalCorrigendum            | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | JournalLeader                 | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | JournalLetter                 | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | JournalReview                 | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | JournalIssue                  | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ConferenceAbstract            | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ReportResearch                | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ReportPolicy                  | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ReportWorkingPaper            | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ReportBookOfAbstract          | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ReportBasic                   | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ConferenceLecture             | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ConferencePoster              | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | Lecture                       | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | OtherPresentation             | Creator, ContactPerson, RightsHolder                                                                                                                               |
      | ArtisticDesign                | Designer, CuratorOrganizer, Consultant                                                                                                                             |
      | Architecture                  | Architect, LandscapeArchitect, InteriorArchitect, ArchitecturalPlanner                                                                                             |
      | PerformingArts                | Dancer, Actor, Choreographer, Director, Scenographer, CostumeDesigner, Producer, ArtisticDirector, Dramatist, Librettist, Dramaturge, SoundDesigner, LightDesigner |
      | MovingPicture                 | Director, Photographer, Producer, ProductionDesigner, Screenwriter, SoundDesigner, VfxSupervisor, VideoEditor                                                      |
      | MusicPerformance              | Soloist, Conductor, Musician, Composer, Organizer, Writer                                                                                                          |
      | VisualArts                    | Artist, Curator, Consultant                                                                                                                                        |
      | LiteraryArts                  | Creator, TranslatorAdapter, Editor                                                                                                                                 |
      | MediaFeatureArticle           | Creator                                                                                                                                                            |
      | MediaReaderOpinion            | Creator                                                                                                                                                            |
      | MediaInterview                | Journalist, InterviewSubject                                                                                                                                       |
      | MediaBlogPost                 | Creator                                                                                                                                                            |
      | MediaPodcast                  | ProgrammeLeader, ProgrammeParticipant                                                                                                                              |
      | MediaParticipationInRadioOrTv | ProgrammeLeader, ProgrammeParticipant                                                                                                                              |

  @TEST_NP-4005
  @test
  @1837
  Scenario: Creator adds themselves to the list of Creators
    Given Creator begins registering a Registration in the Wizard
    When they navigate to the Contributors tab
    And they see the "Add Creator" Button
    And they click "Add Creator"
    And they see the Creator Search Dialog
    And they click "Add me as Creator"
    Then their Creator identity is added to the list of Creators
    And their current Affiliations are listed

  @TEST_NP-4000
  @test
  @419
  Scenario: Creator adds an Creator to the list of Creators
    Given Creator begins registering a Registration in the Wizard
    When they navigate to the Contributors tab
    And they see the "Add Creator" Button
    And they click "Add Creator"
    And they search for Creator in the Creator Search Dialog
    And they select an Creator identity
    And they click "Add"
    Then the selected Creator identity is added to the list of Creators
    And their current Affiliations are listed

  @TEST_NP-4007
  @test
  Scenario: Creator adds an Creator to the list of Creators for Resource Type Book, Monograph
    Given Creator begins registering a Registration in the Wizard
    And they navigate to the Resources tab
    And they select Resource Type "Book"
    And they select Registration Subtype "Monograph"
    When they navigate to the Contributors tab
    And they see the "Add Creator" Button
    And they click "Add Creator"
    And they search for Creator in the Creator Search Dialog
    And they select an Creator identity
    And they click "Add"
    Then the selected Creator identity is added to the list of Creators
    And their current Affiliations are listed

  @TEST_NP-4010
  @test
  Scenario: Creator adds an Creator to the list of Creators for Resource Type Chapter
    Given Creator begins registering a Registration in the Wizard
    And they navigate to the Resources tab
    And they select the Resource Type
      | Part of book/report |
    And they select the Registration Subtype "Chapter in anthology"
    When they navigate to the Contributors tab
    And they see the "Add Creator" Button
    And they click "Add Creator"
    And they search for Creator in the Creator Search Dialog
    And they select an Creator identity
    And they click "Add"
    Then the selected Creator identity is added to the list of Creators
    And their current Affiliations are listed

  @TEST_NP-4004
  @test
  @2203
  Scenario: Creator adds an Editor to the list of Editors for Resource Type Book, Anthology
    Given Creator begins registering a Registration in the Wizard
    And they navigate to the Resources tab
    And they select Resource Type "Book"
    And they select Registration Subtype "Anthology"
    When they navigate to the Contributors tab
    And they see the "Add Editor" Button
    And they click "Add Editor"
    And they search for Editor in the Creator Search Dialog
    And they select an Creator identity
    And they click "Add"
    Then the selected Creator identity is added to the list of Editors
    And their current Affiliations are listed

  @TEST_NP-4011
  @test
  @2204
  Scenario: Creator adds a Supervisor to the list of Supervisors for Resource Type Student Thesis
    Given Creator begins registering a Registration in the Wizard
    And they navigate to the Resources tab
    And they select Resource Type "Student Thesis"
    And they select any Registration Subtype
    When they navigate to the Contributors tab
    And they see the "Add Creator" Button
    And they see the "Add Supervisor" Button
    And they click "Add Supervisor"
    And they search for Supervisor in the Creator Search Dialog
    And they select an Creator identity
    And they click "Add"
    Then the selected Creator identity is added to the list of Supervisors
    And their current Affiliations are listed

  @TEST_NP-4006
  @test
  @788
  Scenario: Creator creates a new Creator in the Creator dialog
    Given Creator begins registering a Registration in the Wizard
    And they navigate to the Contributors tab
    And they see the "Add Creator" Button
    And they click "Add Creator"
    And they see a button for creating a new Creator
    When they click the button for creating a new Creator
    Then they see field for Creator name
    And they see the a button for adding a new Creator in the Create new Creator Dialog

  @test
  @TEST_NP-4001
  Scenario: Creator sees Button to Verify Contributor
    Given Creator navigates to Contributors tab
    When the Registration has an Unverified Contributor
    Then they see a Button to Verify the Contributor

  @test
  @TEST_NP-4008
  Scenario: Creator opens Dialog to Verify Contributor
    Given Creator sees Button to Verify Contributor
    When they click the Button to Verify Contributor
    Then they see the Verify Contributor Dialog
    And they see a search field prefilled with the selected Contributor's name
    And they see a list of Persons matching the search

  @test
  @TEST_NP-4009
  @2467
  Scenario: Creator verifies Contributor
    Given Creator opens Dialog to Verify Contributor
    When they select a Person from the Search Results
    And they click the Button to Verify Contributor
    Then the Dialog is closed
    And they see the Contributor is now verified
    And all current Affiliations are listed for the Contributor
