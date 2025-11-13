Feature: Valid NVI candidates 

    Background:
        Given a user with an affiliation from an NVI-institution


	@test
    Scenario Outline: A user with multiple norwegian institutions registrers an NVI-candidate publication
	   	When the user registrers a publication that is an NVI-candidate with category "<Category>"
        And the user adds a contributor with multiple institution affiliations
	   	Then the publication is listed as an NVI-candidate for all institutions the user is affiliated with

    Examples:
        | Category           |
        | Scientific Article |
        | Monograph          |
        | AcademicChapter    |

    # @test
    # Scenario Outline: A user with a foreign institution registrers an NVI-candidate publication
    #     When the user registrers a publication that is an NVI-candidate with category "<Category>"
    #     And the user adds a contributor with a norwegian and a foreign institution affiliation
    #     Then the publication is listed as an NVI-candidate for the norwegian institutions the user is affiliated with

    # Examples:
    #     | Category           |
    #     | Scientific Article |
    #     | Monograph          |
    #     | AcademicChapter    |

    # @test
    # Scenario Outline: A user registrers a publication with a contributor from a foreign institution
    #     When the user registrers a publication that is an NVI-candidate with category "<Category>" 
    #     And the user adds a contributor from a foreign institution affiliation
    #     Then the publication is listed as an NVI-candidate for the norwegian institution the user is affiliated with

    # Examples:
    #     | Category           |
    #     | Scientific Article |
    #     | Monograph          |
    #     | AcademicChapter    |
