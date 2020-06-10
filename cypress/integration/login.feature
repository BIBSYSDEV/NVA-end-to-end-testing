Feature: Login

  @351
  Scenario: A user logs in with Feide for the first time
    Given that the user has valid Feide credentials
    And they have NOT logged in with Feide before
    And they are on the Start page
    When they click Log in
    And they are redirected to Feide
    And they enter their Feide credentials
    And they approve sharing of data with the NVA application regarding
      | Username            |
      | Email address       |
      | Real name           |
      | Affiliation         |
      | Organization number |
    Then they are redirected back to the Start page
    And they see their name in the Menu
    And they see the Connect Author dialog