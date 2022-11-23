Feature: Creator navigates to Contributors tab

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
    When the Registration has Registration Type "<RegistrationType>"
    And the Registration has Registration Subtype "<RegistrationSubtype>"
    Then they see buttons "<AddContributorButtons>"
    Examples:
      | RegistrationType | RegistrationSubtype | AddContributorButtons                               |
      | Book             | BookAnthology       | Add Editor                                          |
      | Book             | BookMonograph       | Add Author                                          |
      | Chapter          | ChapterArticle      | Add Author                                          |
      # | Chapter          | ChapterConferenceAbstract | Add Author                 |
      | Degree           | DegreeBachelor      | Add Author, Add Supervisor                          |
      | Degree           | DegreeMaster        | Add Author, Add Supervisor                          |
      | Degree           | DegreePhd           | Add Author, Add Supervisor                          |
      # | Degree           | DegreeLicentiate          | Add Author, Add Supervisor |
      | Degree           | OtherStudentWork    | Add Author, Add Supervisor                          |
      # | Journal          | FeatureArticle      | Add Author                 |
      | Journal          | JournalArticle      | Add Author                                          |
      | Journal          | JournalCorrigendum  | Add Author                                          |
      | Journal          | JournalLeader       | Add Author                                          |
      | Journal          | JournalLetter       | Add Author                                          |
      | Journal          | JournalReview       | Add Author                                          |
      # | Journal          | JournalBooklet            | Add Author                 |
      # | Journal          | JournalConferenceAbstract | Add Author                 |
      | Report           | ReportBasic         | Add Author                                          |
      | Report           | ReportPolicy        | Add Author                                          |
      | Report           | ReportResearch      | Add Author                                          |
      # | Report           | ReportAbstractCollection  | Add Author                 |
      | Report           | ReportWorkingPaper  | Add Author                                          |
      | Presentation     | ConferenceLecture   | Add Author                                          |
      | Presentation     | ConferencePoster    | Add Author                                          |
      | Presentation     | Lecture             | Add Author                                          |
      | Presentation     | OtherPresentation   | Add Author                                          |
      | Artistic         | ArtisticDesign      | Add Designer, Add Curator/organizer, Add Consultant |
  # | Media            | Interview                 | Add Author                 |
  # | Media            | Blog                      | Add Author                 |
  # | Media            | Podcast                   | Add Contributor                             |
  # | Media            | ProgrammeManagement       | Add Contributor                             |
  # | Media            | ProgrammeParticipation    | Add Contributor                             |

  @TEST_NP-4005
  @test
  @1837
  Scenario: Creator adds themselves to the list of Authors
    Given Creator begins registering a Registration in the Wizard
    When they navigate to the Contributors tab
    And they see the "Add Author" Button
    And they click "Add Author"
    And they see the Author Search Dialog
    And they click "Add me as Author"
    Then their Author identity is added to the list of Authors
    And their current Affiliations are listed

  @TEST_NP-4000
  @test
  @419
  Scenario: Creator adds an Author to the list of Authors
    Given Creator begins registering a Registration in the Wizard
    When they navigate to the Contributors tab
    And they see the "Add Author" Button
    And they click "Add Author"
    And they search for Author in the Author Search Dialog
    And they select an Author identity
    And they click "Add"
    Then the selected Author identity is added to the list of Authors
    And their current Affiliations are listed

  @TEST_NP-4007
  @test
  Scenario: Creator adds an Author to the list of Authors for Resource Type Book, Monograph
    Given Creator begins registering a Registration in the Wizard
    And they navigate to the Resources tab
    And they select Resource Type "Book"
    And they select Registration Subtype "Monograph"
    When they navigate to the Contributors tab
    And they see the "Add Author" Button
    And they click "Add Author"
    And they search for Author in the Author Search Dialog
    And they select an Author identity
    And they click "Add"
    Then the selected Author identity is added to the list of Authors
    And their current Affiliations are listed

  @TEST_NP-4010
  @test
  Scenario: Creator adds an Author to the list of Authors for Resource Type Chapter
    Given Creator begins registering a Registration in the Wizard
    And they navigate to the Resources tab
    And they select the Resource Type
      | Part of book/report |
    And they select the Registration Subtype "Chapter in anthology"
    When they navigate to the Contributors tab
    And they see the "Add Author" Button
    And they click "Add Author"
    And they search for Author in the Author Search Dialog
    And they select an Author identity
    And they click "Add"
    Then the selected Author identity is added to the list of Authors
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
    And they search for Editor in the Author Search Dialog
    And they select an Author identity
    And they click "Add"
    Then the selected Author identity is added to the list of Editors
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
    And they see the "Add Author" Button
    And they see the "Add Supervisor" Button
    And they click "Add Supervisor"
    And they search for Supervisor in the Author Search Dialog
    And they select an Author identity
    And they click "Add"
    Then the selected Author identity is added to the list of Supervisors
    And their current Affiliations are listed

  @TEST_NP-4006
  @test
  @788
  Scenario: Creator creates a new Author in the Author dialog
    Given Creator begins registering a Registration in the Wizard
    And they navigate to the Contributors tab
    And they see the "Add Author" Button
    And they click "Add Author"
    And they see a button for creating a new Author
    When they click the button for creating a new Author
    Then they see field for Author name
    And they see the a button for adding a new Author in the Create new Author Dialog

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
