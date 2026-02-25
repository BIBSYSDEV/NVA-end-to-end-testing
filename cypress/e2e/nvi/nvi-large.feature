Feature: Evaluate large NVI candidates

  @test
  Scenario: Evaluate publication with 10 000 contributors as NVI candidate
    Given a publication that fulfills all criteria for NVI reporting
    And the publication has 10 000 foreign contributors affiliated with a non-NVI organization
    When the publication is evaluated as an NVI candidate
    Then the evaluation completes within 300 seconds
