Feature: Curator navigates to the Landing Page for Registration

    @test
    Scenario: Curator Approves a Publishing Request
        Given a Curator opens the Landing Page of a Registration
        And the Registration has a Publishing Request
        When they approve the Publishing Request
        Then the Registration is Published
        And all files are Published

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
            | Only Curator can publish              | Draft              | Unpublished |

    @test
    Scenario: Curator Approves a DOI Request
        Given a Curator opens the Landing Page of a Registration
        And the Registration is Published
        And the Registration has a DOI Request
        When they approve the DOI Request
        Then the DOI is findable

    @test
    Scenario: Curator Rejects a DOI Request
        Given a Curator opens the Landing Page of a Registration
        And the Registration is Published
        And the Registration has a DOI Request
        When they reject the DOI Request
        Then the reserved DOI is removed from the Registration