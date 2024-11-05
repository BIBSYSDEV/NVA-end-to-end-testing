Feature: NVI workflow

    @test
    Scenario Outline: Publication NVI status - contributor
        Given a Curator views the NVI-tasklist
        When a Publication is a "<Category>"
        And the Publication has status "<PublicationStatus>"
        And the Publication is collaborating with "<IsCollaboration>"
        And the Publication is "<TypeOfRegistration>"
        Then the Publication has NVI status "<IsNviPublication>"

        Examples:
            | Category           | PublicationStatus | IsCollaboration      | TypeOfRegistration  | IsNviPublication    |
            | Scientific Article | Published         | No one               | Manual Registration | NVI Publication     |
            | Scientific Article | Published         | No one               | Import              | NVI Publication     |
            | Scientific Article | Draft             | No one               | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | No one               | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | No one               | Import              | Not NVI Publication |
            | Scientific Article | Published         | NVI-insitution       | Manual Registration | NVI Publication     |
            | Scientific Article | Published         | NVI-insitution       | Import              | NVI Publication     |
            | Scientific Article | Draft             | NVI-insitution       | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | NVI-insitution       | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | NVI-insitution       | Import              | Not NVI Publication |
            | Scientific Article | Published         | NVA-insitution       | Manual Registration | NVI Publication     |
            | Scientific Article | Published         | NVA-insitution       | Import              | NVI Publication     |
            | Scientific Article | Draft             | NVA-insitution       | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | NVA-insitution       | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | NVA-insitution       | Import              | Not NVI Publication |
            | Scientific Article | Published         | external institution | Manual Registration | NVI Publication     |
            | Scientific Article | Published         | external institution | Import              | NVI Publication     |
            | Scientific Article | Draft             | external institution | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | external institution | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | external institution | Import              | Not NVI Publication |

