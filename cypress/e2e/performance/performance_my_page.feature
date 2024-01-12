Feature: Performance test My page

  Scenario: User views Dialogue on My page
    Given logged in user
    When they navigate to My page
    And select Dialogue
    Then Messages to the user are presented within 3 seconds

  Scenario: User views result registrations on My page
    Given logged in user
    When they navigate to My page
    And they select Result registrations
    Then the users draft Registrations are presented within 3 seconds

  Scenario: User views result registrations on My page
    Given logged in user
    When they navigate to My page
    And they select Project registrations
    Then the users Projects are presented within 3 seconds

  Scenario: User views Research profile on My page
    Given logged in user
    When they navigate to My page
    And they select Research profile
    Then the users Research profile is presented within 3 seconds

  Scenario: User views User profile on My page
    Given logged in user
    When they navigate to My page
    And they select User profile
    Then the users User profile is presented within 3 seconds
