Feature: Owner navigates to the Landing Page for their Resource

    @test
    Scenario: Owner Requests a DOI
        Given the owner opens the Landing Page of their Registration
        And the Registration has no DOI
        When they request a DOI
        Then they can see a reserved DOI

    @test
    @no_restriction
    Scenario: Owner wants to publish Resource
        When the Owner previews the Resource's Landing Page
        And the Registration has "Draft" Status
        Then they see a "Publish" option

    @test
    @file_restrictions
    Scenario: Owner wants to publish their Resource, pending Approval
        When the Owner previews the Resource's Landing Page
        And the Registration has "Draft" Status
        And there is a pending Approval Request on the Resource
        Then they see a "Publishing pending" notice
        And the user is informed that progress can be viewed in My Messages

    # @test
    # @all_restrictions
    # Scenario: Owner wants to publish Resource, all restrictions
    #     Given Institutions publications policy is "Only Curator can publish"
    #     When the Owner uses the Publish option
    #     Then the Owner see a Landing Page with an Unpublished Resource
    #     And an Approval Request is sent to his Curator
    #     And the Owner is notified that an Approval Request is sent to his Curator and progress can be viewed in My Messages

    @test
    @file_restrictions
    Scenario: Owner wants to publish Resource, file restrictions
        Given Institutions publications policy is "Registrator can only publish metadata"
        When the Owner uses the Publish option
        Then the Owner sees a Landing Page with a Published Resource
        And the Resource's status is "Published"
        And the Resource's files, license and embargo date are locked with a pending approval notification
        And the number of files is visible
        And an Approval Request is sent to the Curator
        And the Owner is notified that an Approval Request is sent to the Curator and progress can be viewed in My Messages


    @test
    Scenario: Owner uses the Publish option on Langing Page
        Given Institutions publications policy is "Registrator has full publishing rights"
        When the Owner uses the Publish option
        Then the Resource's status is "Published"
        And the Owner sees a Landing Page with a Published Resource

    @test
    Scenario: Owner navigates to the Landing Page for their draft Resource with Validation Errors
        When the Creator navigates to the Landing Page
        And the Resource has Validation Errors
        And the Resource is a draft
        Then they see a List of all Validation Errors for the Resource
        And they see a "Edit registration" button

# Scenario: Owner sees the option to transfer Ownership of a Resource
#     When the Owner views the Landing Page
#     Then the Owner sees a option to transfer Ownership of Resource

# Scenario: Owner transfers Ownership of a Resource
#     When the Owner uses the option to transfer Ownership of current Resource
#     Then the Owner must acknowledges that this is a final action
#     And the Owner must select a new Owner
#     And the ownership is transfered to new Owner