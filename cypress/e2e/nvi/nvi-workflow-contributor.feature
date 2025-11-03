Feature: NVI workflow - contributor

    @test
  Scenario Outline: Create testdata for NVI workflow - user
    Given there is testdata for a NVI candidate with "<Category>", "<PublicationStatus>", "<IsCollaboration>", "<TypeOfRegistration>", "<IsNviPublication>"

    Examples:
      | Category           | PublicationStatus | IsCollaboration      | TypeOfRegistration  | IsNviPublication    |
      | Scientific Article | Published         | No one               | Manual Registration | NVI Publication     |
      | Scientific Article | Draft             | No one               | Manual Registration | Not NVI Publication |
      | Scientific Article | Unpublished       | No one               | Manual Registration | Not NVI Publication |
      | Scientific Article | Published         | NVI-institution      | Manual Registration | NVI Publication     |
      | Scientific Article | Draft             | NVI-institution      | Manual Registration | Not NVI Publication |
      | Scientific Article | Unpublished       | NVI-institution      | Manual Registration | Not NVI Publication |
      | Scientific Article | Published         | NVA-institution      | Manual Registration | NVI Publication     |
      | Scientific Article | Draft             | NVA-institution      | Manual Registration | Not NVI Publication |
      | Scientific Article | Unpublished       | NVA-institution      | Manual Registration | Not NVI Publication |
      | Scientific Article | Published         | external institution | Manual Registration | NVI Publication     |
      | Scientific Article | Draft             | external institution | Manual Registration | Not NVI Publication |
      | Scientific Article | Unpublished       | external institution | Manual Registration | Not NVI Publication |
      | Monograph          | Published         | No one               | Manual Registration | NVI Publication     |
      | Monograph          | Draft             | No one               | Manual Registration | Not NVI Publication |
      | Monograph          | Unpublished       | No one               | Manual Registration | Not NVI Publication |
      | Monograph          | Published         | NVI-institution      | Manual Registration | NVI Publication     |
      | Monograph          | Draft             | NVI-institution      | Manual Registration | Not NVI Publication |
      | Monograph          | Unpublished       | NVI-institution      | Manual Registration | Not NVI Publication |
      | Monograph          | Published         | NVA-institution      | Manual Registration | NVI Publication     |
      | Monograph          | Draft             | NVA-institution      | Manual Registration | Not NVI Publication |
      | Monograph          | Unpublished       | NVA-institution      | Manual Registration | Not NVI Publication |
      | Monograph          | Published         | external institution | Manual Registration | NVI Publication     |
      | Monograph          | Draft             | external institution | Manual Registration | Not NVI Publication |
      | Monograph          | Unpublished       | external institution | Manual Registration | Not NVI Publication |

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
            # | Scientific Article | Published         | No one               | Import              | NVI Publication     |
            | Scientific Article | Draft             | No one               | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | No one               | Manual Registration | Not NVI Publication |
            # | Scientific Article | Unpublished       | No one               | Import              | Not NVI Publication |
            | Scientific Article | Published         | NVI-institution      | Manual Registration | NVI Publication     |
            # | Scientific Article | Published         | NVI-institution      | Import              | NVI Publication     |
            | Scientific Article | Draft             | NVI-institution      | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | NVI-institution      | Manual Registration | Not NVI Publication |
            # | Scientific Article | Unpublished       | NVI-institution      | Import              | Not NVI Publication |
            | Scientific Article | Published         | NVA-institution      | Manual Registration | NVI Publication     |
            # | Scientific Article | Published         | NVA-institution      | Import              | NVI Publication     |
            | Scientific Article | Draft             | NVA-institution      | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | NVA-institution      | Manual Registration | Not NVI Publication |
            # | Scientific Article | Unpublished       | NVA-institution      | Import              | Not NVI Publication |
            | Scientific Article | Published         | external institution | Manual Registration | NVI Publication     |
            # | Scientific Article | Published         | external institution | Import              | NVI Publication     |
            | Scientific Article | Draft             | external institution | Manual Registration | Not NVI Publication |
            | Scientific Article | Unpublished       | external institution | Manual Registration | Not NVI Publication |
            # | Scientific Article | Unpublished       | external institution | Import              | Not NVI Publication |
