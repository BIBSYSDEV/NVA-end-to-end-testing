Feature: NVI candidates for publications in series

  Background:
    Given a user with an affiliation from an NVI-institution

  @test
  Scenario Outline: A user registrers a monograph in a series that is an NVI-candidate
    When the user registrers a monograph with series "<Series>" and publisher "<Publisher>"
    Then the publication is listed as an NVI-candidate for the institution the user is affiliated with

    Examples:
      | Series         | Publisher         |
      | isNviSeries    | isNviPublisher    |
      | isNviSeries    | isNotNviPublisher |
      | isNotNviSeries | isNviPublisher    |

    @test
    Scenario Outline: A user registrers an academic chapter in a anthology that is an NVI-candidate
      When the user registrers an academic chapter with anthology in "<Series>" and publisher "<Publisher>"
      Then the publication is listed as an NVI-candidate for the institution the user is affiliated with

      Examples:
        | Series         | Publisher         |
        | isNviSeries    | isNviPublisher    |
        | isNviSeries    | isNotNviPublisher |
        | isNotNviSeries | isNviPublisher    |