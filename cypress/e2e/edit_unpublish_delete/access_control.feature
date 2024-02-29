Feature: Edit, unpublish or delete Registration

    @test
    Scenario Outline: User edits Registration
        Given "<User>" open landing page for Registration
        When they "<Condition>" and want to edit the Registration
        Then they have an option to edit the Registration
        And when they use the option to edit the Registration is opened in the Registration Wizard
        Examples:
            | User                     | Condition                                         |
            | verified contributor     | are a Contributor on the Registration             |
            | resource owner           | own the Registration                              |
            | Curator (institution)    | are Curator for a Contributor on the Registration |
            | Curator (resource owner) | are Curator for Resource Owner                    |
            | Editor                   | are Editor                                        |
# | Thesis Curator               | are Curator for a Thesis Registration             |

    @test
    Scenario Outline: User unpublish Registration
        Given "<User>" open landing page for Registration
        When they "<Condition>" and want to unpublish the Registration
        Then they have an option to unpublish the Registration
        And when they use the option to unpublish the Registration is no longer published
        Examples:
            | User                     | Condition                                         |
            | verified contributor     | are a Contributor on the Registration             |
            | resource owner           | own the Registration                              |
            | Curator (institution)    | are Curator for a Contributor on the Registration |
            | Curator (resource owner) | are Curator for Resource Owner                    |
            | Editor                   | are Editor                                        |
# | Thesis Curator               | are Curator for a Thesis Registration             |