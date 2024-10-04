Feature: Curator tasks and message flow

  @test
  Scenario Outline: Curator unassigned task numbers
    Given a User with role "<Role>"
    When they view the main page for NVA
    Then they see the number of unassigned tasks
    When they view the Tasks page
    Then they see the number of dialogs without curator

    Examples:
      | Role            |
      | Publish-curator |
      | DOI-curator     |
      | Support-curator |

  @test
  Scenario Outline: Updating message numbers
    Given a User with role "<Role>"
    When they see the number of unassigned tasks
    And a User with the role Creator send a "<Type>" request
    Then the User with role "<Role>" see that the number of unassigned tasks are increased

    Examples:
      | Role            | Type         |
      | Publish-curator | Publish      |
      | DOI-curator     | Allocate DOI |
      | Support-curator | Support      |

  @test
  Scenario Outline: User dialog with curator
    Given a User with the role Creator sends a "<Type>" request
    When they send a message with the "<Type>" request
    And a curator with role "<Role>" responds to the message
    Then the Creator can read the message on the landing page of the Registration

    Examples:
      | Role            | Type         |
      | Publish-curator | Publish      |
      | DOI-curator     | Allocate DOI |
      | Support-curator | Support      |
