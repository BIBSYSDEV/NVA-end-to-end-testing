Feature: Creator selects Resource type Book

    @test
    Scenario: Creator navigates to the Resource Type tab and sees Resource types for "Book"
        Given Creator navigates to Resource Type tab
        When they select the Resource type "Book"
        Then they see a list of subtypes:
            | Anthology                 |
            | Academic Monograph        |
            | Non-fiction Monograph     |
            | Popular Science Monograph |
            | Textbook                  |
            | Encyclopedia              |
            | Exhibition catalog        |

    @test
    Scenario: Creator sees fields for Book
        Given Creator navigates to the Resource Type tab and sees Resource types for "Book"
        When they select any Book type
        And they see fields:
            | Publisher             |
            | NPI discipline        |
            | ISBN                  |
            | Total number of pages |
            | Series                |
            | Series number         |

    @test
    Scenario: Creator sees that fields for Book are validated on Resource Type tab
        Given Creator sees fields for Book
        When they click the Save button
        Then they can see "Mandatory" error messages for fields:
            | Publisher      |
            | NPI discipline |

    @test
    Scenario: Creator selects Resource subtype Academic Monograph
        Given Creator navigates to the Resource Type tab and sees Resource types for "Book"
        When they select type "Academic Monograph"
        Then they see the Norwegian Science Index (NVI) evaluation status