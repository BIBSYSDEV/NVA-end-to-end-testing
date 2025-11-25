Feature: test for metadata and file publishing

  # @test
  Scenario Outline: Verify that a publication with files can be published and is listed as NVI candidate
    Given a creator is logged in
    When the creator creates and publishes an AcademicArticle with with files
    Then the file is shown in the log as published and not retracted

    Examples:
      | Count |
      |     1 |
      |     2 |
      |     3 |
      |     4 |
      |     5 |
      |     6 |
      |     7 |
      |     8 |
      |     9 |
      |    10 |
      |     1 |
      |     2 |
      |     3 |
      |     4 |
      |     5 |
      |     6 |
      |     7 |
      |     8 |
      |     9 |
      |    10 |
