Feature: Creator selects Resource type Artistic Result and subtype Music

  @test
  Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Music"
    Given Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"
    When they select Resource Subtype "Music"
    And they can add Exhibitions of type:
      | Concert                  |
      | Audio/visual publication |
      | Music score              |
      | Other performance        |
    And they can edit existing Exhibitions
    And they can delete existing Exhibitions

  @test
  Scenario: Creator adds a Concert to a Music result
    Given Creator navigates to the Resource Type tab and selects Resource subtype "Music"
    When they add a Concert with details for:
      # | Part of a series/tour |
      | Place  |
      | Date   |
      | Extent |
      | Works  |
    And each Work has details for:
      | Title    |
      | Composer |
      | Premiere |
    Then the Concert is listed under Exhibitions

  @test
  Scenario: Creator selects that a Concert is part of a series/tour
    Given Creator navigates to the Resource Type tab and selects Resource subtype "Music"
    When they select "Multiple performances"
    Then they see field:
      | Date from |
      | Date end  |

  @test
  Scenario: Creator adds a Audio/visual publication to a Music result
    Given Creator navigates to the Resource Type tab and selects Resource subtype "Music"
    When they add a Audiovisual publication with details for:
      | Format           |
      | Publisher        |
      | Catalogue number |
      | ISRC             |
      | Track list       |
    And Format can be any of:
      | CD        |
      | DVD       |
      | Streaming |
      | Download  |
      | LP/EP     |
      | Other     |
    And each Track list item has details for:
      | Title    |
      | Composer |
      | Extent   |
    Then the Audiovisual publication is listed under Exhibitions

  @test
  Scenario: Creator adds a Music score to a Music result
    Given Creator navigates to the Resource Type tab and selects Resource subtype "Music"
    When they add a Music score with details for:
      | Ensemble  |
      | Movements |
      | Extent    |
      | Publisher |
      | ISMN      |
    Then the Music score is listed under Exhibitions

  @test
  Scenario: Creator adds a Other performance to a Music result
    Given Creator navigates to the Resource Type tab and selects Resource subtype "Music"
    When they add a Other performance with details for:
      | Type              |
      | Place             |
      | Extent            |
      | Other performance |
    And each Other performance has details for:
      | Title    |
      | Composer |
    Then the Other performance is listed under Exhibitions