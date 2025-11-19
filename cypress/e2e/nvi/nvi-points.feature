Feature: NVI points calculations

  @test
  Scenario Outline: Verify NVI points calculations for different NVI candidates
    Given a curator looks at a NVI candidate with Category "<Category>" and NVI level "<NVILevel>"
    And "<Contributors>" local contributors and "<InternationalContributors>" international contributors with "<totalContributors>" total contributors
    When the curator reviews the NVI candidate
    Then the NVI points should be calculated as "<ExpectedPoints>"

    Examples:
      | Category                 | NVILevel | Contributors | InternationalContributors | totalContributors | ExpectedPoints |
      | AcademicArticle          | Level 1  |            1 | no                        |                 1 |            1.0 |
      | AcademicArticle          | Level 2  |            1 | no                        |                 1 |            3.0 |
      | AcademicArticle          | Level 1  |            1 | no                        |                 2 |            0.7 |
      | AcademicArticle          | Level 2  |            1 | no                        |                 2 |            2.1 |
      | AcademicArticle          | Level 1  |            1 | one or more               |                 2 |            0.9 |
      | AcademicArticle          | Level 2  |            1 | one or more               |                 2 |            2.8 |
      | AcademicMonograph        | Level 1  |            1 | no                        |                 1 |            5.0 |
      | AcademicMonograph        | Level 2  |            1 | no                        |                 1 |            8.0 |
      | AcademicMonograph        | Level 1  |            1 | no                        |                 2 |            3.5 |
      | AcademicMonograph        | Level 2  |            1 | no                        |                 2 |            5.7 |
      | AcademicMonograph        | Level 1  |            1 | one or more               |                 2 |            4.6 |
      | AcademicMonograph        | Level 2  |            1 | one or more               |                 2 |            7.4 |
      | AcademicLiteratureReview | Level 1  |            1 | no                        |                 1 |            1.0 |

  @test
  Scenario Outline: Verify NVI points calculations for academic chapters
    Given a curator looks at a NVI candidate with Category AcademicChapter in an Anthology with publisher at NVI level "<Publisher>"
    And NVI level "<Series>" series
    And "<Contributors>" local contributors and "<InternationalContributors>" international contributors with "<totalContributors>" total contributors
    When the curator reviews the NVI candidate
    Then the NVI points should be calculated as "<ExpectedPoints>"

    Examples:
      | Publisher | Series      | Contributors | InternationalContributors | totalContributors | ExpectedPoints |
      | Level 1   | Unconfirmed |            1 | no                        |                 1 |            0.7 |
      | Level 2   | Unconfirmed |            1 | no                        |                 1 |              1 |
      | Level 1   | Unconfirmed |            1 | one or more               |                 2 |            0.6 |
      | Level 2   | Unconfirmed |            1 | one or more               |                 2 |            0.9 |
      | Level 1   | Level 1     |            1 | no                        |                 1 |              1 |
      | Level 1   | Level 2     |            1 | no                        |                 1 |            3.0 |
      | Level 1   | Level 1     |            1 | one or more               |                 2 |            0.9 |
      | Level 1   | Level 2     |            1 | one or more               |                 2 |            2.8 |

  @test
  Scenario: Verify NVI points calculation for AcademicMonograph with level 1 publisher and level 2 series
    Given a curator looks at a NVI candidate with Category AcademicMonograph, level 1 publisher and level 2 series
    When the curator reviews the NVI candidate
    Then the NVI points should be calculated as "8.0"
