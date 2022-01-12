Feature: Creator sees registration is saved with correct values presented on landing page

  @test
  Scenario Outline: Creator sees correct values on Registration Landing Page
    Given Author begins registering a registration
    And selects "<Resource Type>" and "<Subtype>"
    And fill in values for all fields
    When they saves registration
    Then they can see the values on the Registration Landing Page
    Examples:
    | Resource Type           | Subtype         |
    | Contribution to journal | Journal article |