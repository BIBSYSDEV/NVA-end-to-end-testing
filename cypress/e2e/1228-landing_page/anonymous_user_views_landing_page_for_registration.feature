Feature: Anonymous User views Landing Page for Registration

    @test
    Scenario: NVA contains Reigstration
        Given there is a published Registration in NVA

    @test
    Scenario: Anonymous User views Landing Page for Registration
        When an Anonymous user navigates to a Landing Page for a Resource
        Then they see
            # | Title                           |
            | Abstract                        |
            | Keywords                        |
            | Publication date                |
            | Primary language                |
            | Projects                        |
            | Fields corresponding to subtype |
            | Contributors                    |
            | Files                           |
            | License                         |
        And they see sharing Buttons for:
            | Email    |
            | LinkedIn |
            | Facebook |
            | Twitter  |
