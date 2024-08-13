Feature: Curator tasks and message flow

    Scenario Outline: Curator unassigned task numbers
        Given a User with role "<Role>"
        When they view the main page for NVA
        Then they see the number of unassigned tasks
        When they view the Tasks page
        Then they see the number of dialogs without curator

        Examples:
            | Role               |
            | Publishing-curator |
            | DOI-curator        |
            | Support-curator    |


    Scenario Outline: Updating message numbers
        Given a User with role "<Role>"
        When they see the number of unassigned tasks
        And a User with the role Creator send a "<Type>" request
        Then the User with role "<Role>" see that the number of unassigned tasks are increased

        Examples:
            | Role               | Type         |
            | Publishing-curator | Publish      |
            | DOI-curator        | Reserve DOI  |
            | DOI-curator        | Allocate DOI |
            | DOI-curator        | Assign DOI   |
            | DOI-curator        | Reject DOI   |
            | Support-curator    | Support      |

    Scenario Outline: User dialog with curator
        Given a User with the role Creator
        When they send a message with a "<Type>" request
        And a curator with role "<Role>" responds to the message
        Then the Creator can read the message on the landing page of the Registration

        Examples:
            | Role               | Type         |
            | Publishing-curator | Publish      |
            | DOI-curator        | Reserve DOI  |
            | DOI-curator        | Allocate DOI |
            | DOI-curator        | Assign DOI   |
            | DOI-curator        | Reject DOI   |
            | Support-curator    | Support      |
