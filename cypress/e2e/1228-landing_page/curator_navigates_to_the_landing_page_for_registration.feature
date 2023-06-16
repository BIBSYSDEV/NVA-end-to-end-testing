Feature: Curator navigates to the Landing Page for Registration

    @test
    @file_restrictions
    Scenario: Curator Approves a Publishing Request
        Given a Curator opens the Landing Page of a Registration
        And the Registration has a Publishing Request
        When they approve the Publishing Request
        Then the Registration is Published
        And all files are Published

    @test
    @file_restrictions
    Scenario Outline: Curator Rejects a Publishing Request
        Given a Curator from a customer with Workflow "<Workflow>"
        And they opens the Landing Page of a Registration
        And the Registration has a Publishing Request
        When they reject the Publishing Request
        Then the Registration is "<RegistrationStatus>"
        And all files are "<FileStatus>"
        Examples:
            | Workflow                              | RegistrationStatus | FileStatus  |
            | Registrator can only publish metadata | Published          | Unpublished |
            # | Only Curator can publish              | Draft              | Unpublished |

    @test
    @no_restriction
    Scenario: Curator opens a Registration from a DOI Request
        Given that a Curator views their Worklist
        And they have selected the DOI Requests tab
        And they have expanded an Message
        When they click "Go to registration"
        Then they see the Landing Page for the DOI Request's Registration
        And the Create DOI button is enabled
        And the Decline DOI button is enabled


    @test
    @no_restriction
    @doi_request
    Scenario: Curator Approves a DOI Request
        Given a Curator opens the Landing Page of a Registration
        And the Registration is Published
        And the Registration has a DOI Request
        When they approve the DOI Request
        Then the DOI is findable

    @test
    @no_restriction
    @doi_request
    Scenario: Curator Rejects a DOI Request
        Given a Curator opens the Landing Page of a Registration
        And the Registration is Published
        And the Registration has a DOI Request
        When they reject the DOI Request
        Then the reserved DOI is removed from the Registration