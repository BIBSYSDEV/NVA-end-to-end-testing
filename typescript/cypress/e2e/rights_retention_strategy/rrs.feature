Feature: Rights retention strategy

  @test
  Scenario: Editor sees the option to activate Righs retention strategy
    Given User is Editor
    When they open the settings Page
    And choose Publishing strategy
    Then they have the option to activate Rights retention strategy

  @test
  Scenario: Editor sets Rights retention strategy
    Given Editor sees the option to activate Rights retention strategy
    When they activate Rights retention strategy
    Then they need to add a link to the institutions page about rights policy
    And they can set that Registrars can waive RRS
    And save the Rights retention strategy

  @test
  Scenario: User sets version to accepted for file with RRS activated
    Given User registers Registration with RRS activated
    When they set the file version to Accepted
    Then License is set to CC-by

  @test
  Scenario: User sets version to published for file with RRS activated
    Given User registers Registration with RRS activated
    When they set the file version to Published
    Then License is not automatically set

@test
  Scenario Outline: User changes version for file
    Given User registers Registration with RRS activated
    And the file version is set to "<Initial version>"
    When they set the file version to "<Final version>"
    Then license is set to "<License>"

    Examples: 
      | Initial version | Final version | License |
      | Accepted        | Published     | None    |
      | Published       | Accepted      | CC-BY   |
