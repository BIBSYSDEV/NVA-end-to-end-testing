Feature: Tests for closed NVI-periods

  @test
  Scenario: A curator tries to change NVI status
    Given an NVI-candidate reported in a closed NVI-period
    When an NVI-curator tries to change NVI reporting status
    Then they are not able to change that


# @test
# Scenario: A user changes the metadata for the NVI-candidate
#   Given an NVI-candidate reported in a closed NVI-period
#   When a user changes the metadata for the NVI-candidate
#   Then the NVI-status is not changed