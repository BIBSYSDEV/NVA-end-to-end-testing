Feature: Performance test Basic data

  @test
  Scenario: Institution admin views Person Register
    Given a logged in Institution admin
    When they navigate to Basic data
    And select Person Register
    Then a list of Persons are presented within 3 seconds

  @test
  Scenario: Institution admin views Institutions
    Given a logged in App admin
    When they navigate to Basic data
    And select Institutions
    Then a list of Institutions are presented within 3 seconds

  @test
  Scenario: Institution admin views NVI
    Given a logged in App admin
    When they navigate to Basic data
    And select NVI
    Then NVI registration period is presented within 3 seconds
