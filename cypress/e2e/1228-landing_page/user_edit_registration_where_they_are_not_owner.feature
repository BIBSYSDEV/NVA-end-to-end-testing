Feature: User edit registrations where they are not owner

    @test
    Scenario: Curator see option to edit a Registration from own institution
        Given User is logged in as Curator
        When they open the landing page for a Registration from own institution
        And they are not owner of the Registration
        Then they have the option to edit the Registration

    @test
    Scenario: Editor see option to edit a Registration
        Given User is logged in as Editor
        When they open the landing page for a Registration
        And they are not owner of the Registration
        Then they have the option to edit the Registration

    @test
    Scenario: Curator edit a Registration from own institution
        Given Curator open landing page for a Registration from own institution
        When they edit the Registration
        Then the Registration is opened in the Registration wizard

    @test
    Scenario: Editor edit a Registration
        Given Editor open landing page for a Registration
        When they edit the Registration
        Then the Registration is opened in the Registration wizard

    @test
    Scenario: User see option to edit a Registration where they are Contributor
        Given a User is logged in
        And they are not Curator or Editor
        When they open the landing page for a Registration where they are registred as a Contributor
        And they are not owner of the Registration
        Then they have the option to edit the Registration

    @test
    Scenario: User edit registration where they are registred as Contributer
        Given a User open landing page for Registration where they are registred as a Contributor
        And they are not Curator or Editor
        When they edit the Registration
        Then the Registration is opened in the Registration wizard

