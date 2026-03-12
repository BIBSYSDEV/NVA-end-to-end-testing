Feature: Scenario for NVI curator reports

@test
  Scenario: An NVI-curator examines the status reports
    Given an NVI-curator
    When they open the NVI status reports
    Then they see
