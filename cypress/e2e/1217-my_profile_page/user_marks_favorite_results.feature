Feature: User marks results as favorites

  @test
  Scenario: User sees own results on their User profile
    Given a user sees their User profile
    When they view their results
    Then they see all the results where they are registered as a Contributor
    And they have an option to mark them as a favorite

  @test
  Scenario: User marks a result as a favorite
    Given the User sees own results on their User profile
    When they mark a result as a favorite
    Then they see the result is marked as a favorite
    And the favorite results are displayed at the top of the list of results

  @test
  Scenario: User unmarks a result as a favorite
    Given the User sees own results on their User profile
    And they have results marked as favorites
    When they unmark a favorite result
    Then the result is not marked as favorite
    And the result is not displayed at the top of the list of results

