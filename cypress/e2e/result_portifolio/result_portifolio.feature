Feature: Scenarios for Result portifolio

  @init
  @test
  Scenario: Editor views Result portifolio
    Given an Editor
    When they view the Result portifolio
    Then they can see:
      | Published Results   |
      | Unpublished Results |
      | Deleted Results     |

  @test
  Scenario: Published Result is added to portifolio
    Given a User publishes a Result
    When an Editor views the Result portifolio for Published Results
    Then they can see the published Result

  @test
  Scenario: Unublished Result is added to portifolio
    Given a User unpublish a Result
    When an Editor views the Result portifolio for Unpublished Results
    Then they can see the unpublished Result

  @test
  Scenario: Deleted Result is added to portifolio
    Given a User deletes an unpublished Result
    When an Editor views the Result portifolion for Deleted Results
    Then they can see the deleted Result
