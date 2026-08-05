Feature: User sees menu

  @test
  Scenario: Unauthenticated User sees menu
    Given that the User is not logged in
    When they look at any page in NVA
    Then they see the Log in Button
    And they see the Language selector

  @test
  Scenario: User have option to log out
    Given a user is logged in
    When they look at any page in NVA
    Then they have an option to log out

  @test
  Scenario: User without any role sees menu
    Given a user without any NVA role is logged in
    When they look at any page in NVA
    Then they see Menu items:
      | My page |
    And they see the Language selector

  @test
  Scenario: User sees the menu for Creator
    Given a user with the "Creator" role is logged in
    When they look at any page in NVA
    Then they see Menu items:
      | My page |
    And they see the Language selector

  @test
  Scenario: User sees the menu for Curator
    Given a user with the "Curator" role is logged in
    When they look at any page in NVA
    Then they see Menu items:
      | Worklist |
      | My page  |
    And they see the Language selector

  @test
  Scenario: User sees the menu for Institution-admin
    Given a user with the "Institution-admin" role is logged in
    When they look at any page in NVA
    Then they see Menu items:
      | Basic data |
      | My page    |
    And they see the Language selector

  @test
  Scenario: User sees the menu for Editor
    Given a user with the "Editor" role is logged in
    When they look at any page in NVA
    Then they see Menu items:
      | My page |
    And they see the Language selector

  @test
  Scenario: User sees the menu for Application administrator
    Given a user with the "App-admin" role is logged in
    When they look at any page in NVA
    Then they see Menu items:
      | Basic data |
      | My page    |
    And they see the Language selector
