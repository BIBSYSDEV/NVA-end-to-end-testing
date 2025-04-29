Feature: Hidden and internal files

    @test
    Scenario Outline: Creator adds a non-open file
        Given Creator navigates to Files and License tab
        When they add a file to the File upload widget
        And they mark the file as "<File type>"
        Then they can see the file in the list of files
        And the file is marked as "<File type>"
        When they publish the Registration
        Then they see the file under Internal files

        Examples:
            | File type     |
            | Hidden file   |
            | Internal file |
    @test
    Scenario Outline: Curator approves non-open file
        Given a registration with a "<File type>"
        And the files need approval from a Curator
        When a Curator view the landing page of the registration
        Then they see "<Approval message>"
        When they approve the file
        Then they see the file is approved

        Examples:
            | File type     | Approval message                   |
            | Internal file | waiting for approval |

    @test
    Scenario Outline: Curator changes open file to non-open file
        Given a published registration with an open file
        And the file needs approval
        When a curator edit the registration and changes the open file to "<File type>"
        And navigates to the landing page
        Then they see the file under Internal files
        And they see "<Approval message>"
        When they approve the file
        Then they see the file is approved

        Examples:
            | File type     | Approval message                   |
            | Internal file | waiting for approval |
            | Hidden file   | waiting for approval   |
