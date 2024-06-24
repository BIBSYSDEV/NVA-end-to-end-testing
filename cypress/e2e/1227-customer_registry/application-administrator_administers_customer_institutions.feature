Feature: Application Administrator administers Customer Institutions

  @test
  Scenario: Application Administrator opens Institutions
    Given that the user is logged in as Application Administrator
    When they click the menu item Institutions
    Then they see the page Institutions
    And they see a table of all Customer Institutions
    And they see the table contains the fields
      | Name |
      | Date |
    And they see a button Edit that is enabled for each Institution
    And they see a button Add institution that is enabled

  @test
  Scenario: Application Administrator adds a Customer Institution
    Given that the user is logged in as Application Administrator
    And they click the menu item Institutions
    When they click Add Institution
    Then they see the Add Institution page
    And they can search for institution
    And they see information for
      | Norwegian name |
      | English name   |
      | Short name     |
      | Code           |
    And they see fields:
      | Feide Organization ID |
      | ROR ID                |
    And they see Sector options:
      | University and college          |
      | Health sector                   |
      | Institute sector                |
      | Archives, Libraries and Museums |
      | Other                           |
    And they see options for NVI reporting
    And a button Create that is enabled

  @test
  Scenario: Application Administrator opens a Customer Institution
    Given that the user is logged in as Application Administrator
    When they open a Customer Institution
    Then they see information for
      | Norwegian name |
      | English name   |
      | Short name     |
      | Code           |
    And they see fields:
      | Feide Organization ID |
      | ROR ID                |
    And they see Sector options:
      | University and college          |
      | Health sector                   |
      | Institute sector                |
      | Archives, Libraries and Museums |
      | Other                           |
    And they see options for NVI reporting
    And they see the Save button
    And they see the list of current Institution Administrators
    And every Institution Administrator has a Remove button
    And they see button to add a new Institution Administrator
