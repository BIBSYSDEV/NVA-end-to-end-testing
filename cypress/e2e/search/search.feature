Feature: Scenarios for search

    @test
    Scenario: An anonymous Aser opens start page and sees search results
        Given an anonymous User
        When they open the start page
        Then they see a list of Registratons

    @test
    Scenario: A User sees search results
        Given a User has searched for Registrations
        When they see the search result list
        Then they can see values for:
            | Resource Type    |
            | Publication date |
            | Title            |
            | Contributors     |
            | Abstract         |

    @test
    Scenario: A User select a search result
        Given a User has searched for Registrations
        When they select one of the Registrations
        Then they see the landing page for the Registration

    @test
    Scenario Outline: A User uses facets to filter search results
        Given a User searches for Registrations
        When they select the facet for "<Facet>":
        Then they see Registrations filtered with the chosen facet
        Examples:
            | Facet         |
            | Resource type |
            | Institution   |
            | Contributor   |

    @test
    Scenario: A User adds a filter to search results
        Given a User searches for Registrations
        When they select the option to add a filter
        Then they they can add filter for fields:
            | Title            |
            # | Abstract         |
            # | Keywords         |
            | Contributor      |
            # | Publication Year |
        And they can use the operators:
            | Contains         |
            | Does not contain |

    @test
    Scenario: A User filters a search result
        Given a User searches for Registrations
        And they add a filter to the search
        When they invoke the filter
        Then they see a search result list with filtered search results

