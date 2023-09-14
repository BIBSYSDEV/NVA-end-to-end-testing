Feature: Creator deletes an item in My Registrations list

    @test
    Scenario: Creator deletes an item in My Registrations list
        Given Creator opens My Registrations
        When they click Delete on an item
        And they see a confirmation pop-up is opened
        And they select Yes
        Then they see that the Registration is deleted

    @test
    Scenario: Creator deletes all Draft Registrations
        Given Creator opens My Registrations
        When they select "Delete all drafts"
        And they confirm that they want to Delete all drafts
        Then all Draft Registration are deleted