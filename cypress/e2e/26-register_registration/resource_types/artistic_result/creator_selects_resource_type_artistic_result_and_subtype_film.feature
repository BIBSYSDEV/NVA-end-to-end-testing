Feature: Creator selects Resource type Artistic Result and subtype Film

  @test
  Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Film"
    Given Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"
    When they select Resource Subtype "Film"
    Then they see fields:
      | More information |
    And they see field for Type Work with options:
      | Film             |
      | Short film       |
      | Serial film      |
      | Interactive film |
      | AR/VR film       |
      | Other            |
    And they can add Exhibitions of type:
      | Broadcast         |
      | Cinematic release |
      | Other release     |
    And they can edit existing Exhibitions
    And they can delete existing Exhibitions

  @test
  Scenario: Creator adds a Broadcast to a Film
    Given Creator navigates to the Resource Type tab and selects Resource subtype "Film"
    When they add a Broadcast with details for:
      | Publisher |
      | Date      |
    Then the Broadcast is listed under Exhibitions

  @test
  Scenario: Creator adds an Cinematic release to a Film
    Given Creator navigates to the Resource Type tab and selects Resource subtype "Film"
    When they add a Cinematic release with details for:
      | Place |
      | Date  |
    Then the Cinematic release is listed under Exhibitions

  @test
  Scenario: Creator adds an Other release to a Film
    Given Creator navigates to the Resource Type tab and selects Resource subtype "Film"
    When they add a Other release with details for:
      | Type of release     |
      | Place               |
      | Publisher/Organizer |
      | Date                |
    Then the Other release is listed under Exhibitions

