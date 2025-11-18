Feature: NVI points calculations

  @test
  Scenario Outline: Verify NVI points calculations for different NVI candidates
    Given a curator looks at a NVI candidate with Category "<Category>" and NVI level "<NVILevel>"
    And "<Contributors>" local contributors and "<InternationalContributors>" international contributors with "<totalContributors>" total contributors
    When the curator reviews the NVI candidate
    Then the NVI points should be calculated as "<ExpectedPoints>"

    Examples:
      | Category                 | NVILevel | Contributors | InternationalContributors | totalContributors | ExpectedPoints |
      | AcademicMonograph        | Level 1  |            1 | no                        |                 1 |              5 |
      | AcademicMonograph        | Level 2  |            1 | no                        |                 1 |              8 |
      | AcademicMonograph        | Level 1  |            1 | yes                       |                 2 |           4.59 |
      | AcademicMonograph        | Level 2  |            1 | yes                       |                 2 |           7.35 |
      | AcademicArticle          | Level 1  |            1 | no                        |                 1 |            1.0 |
      | AcademicArticle          | Level 2  |            1 | no                        |                 1 |            3.0 |
      | AcademicArticle          | Level 1  |            1 | yes                       |                 2 |            0.9 |
      | AcademicArticle          | Level 2  |            1 | yes                       |                 2 |            2.8 |
      | AcademicLiteratureReview | Level 1  |            1 | no                        |                 1 |              1 |
