Feature: Embargo of files

    Registrar can set embargo date for files
    Registrar can add a note to emargoed files
    Files are not available for download before embargo date

    Scenario: User sets embargo date for files
        Given User registers a registration
        When they view files in the Wizard
        Then they can set an embargo date for files
        And add a note for legal clarification

    Scenario: User view a Registration with embargoed files, embargo date in the future
        Given a User view the landing page for a Registration with embargoed files
        When the embargo date is in the future
        Then they see a message that the files will be available at the embargo date
        And they see the not for legal clarification

    Scenario: User view a Registration with embargoed files, embargo date current date or in the past
        Given a User view the landing page for a Registration with embargoed files
        When the embargo date is the current date or in the future
        Then they can view the embargoed files
        And they see the not for legal clarification


