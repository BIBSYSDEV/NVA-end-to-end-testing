Feature: Reports from navigate

  @test
  Scenario Outline: An administrator looks at reporting status
    Given an administrtor opens the NVI status page in master data
    When they open the reporting status for the current year
    When they look at the data for "<Institution>"
    Then they see numbers for "<Candidates>", "<Under control>", "<Approved>", "<Rejected>", "<Twists>", "<Total>", "<Controlled>":

    Examples:
      | Institution | Candidates | Under control | Approved | Rejected | Twists | Total | Controlled |
      | Nord        |          6 |             2 |        3 |        3 |      2 |    14 |         43 |
#   @test
#   Scenario: An administrator looks at publication points status
#     Given an administrtor opens the NVI status page in master data
#     When they open the publication points status for the current year
#     And look at the data for "<Institution>"
#     Then they see numbers for "<Candidates>", "<Approved>", "<Publication points>", "<Controlled>":
#     Examples:
#       | Institution                        | Candidates | Approved | Publication points | Controlled |
#       | University of South-Eastern Norway |          7 |        0 |                  1 |         85 |
#   @test
#   Scenario: An curator exports file for NVI reporting status
#     Given a curator in an NVI Institution
#     When they open the NVI reporting status
#     And export the NVI reporting status
#     Then they get a file with the NVI reporting status in CSV-format with the correct data
#   @test
#   Scenario: An curator exports file for NVI publication points status
#     Given a curator in an NVI Institution
#     When they open the NVI publication points status
#     And export the NVI publication points status
#     Then they get a file with the NVI reporting status in CSV-format with the correct data
