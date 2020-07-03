Feature: User menu with application administrator role

    Scenario: User sees the menu for Application administrator
        Given that the user is logged in
        And they have the role of Application administrator
        When they look at any page in NVA
        Then they see a menu containing
            | My profile   |
            | Institutions |
            | Log out      |