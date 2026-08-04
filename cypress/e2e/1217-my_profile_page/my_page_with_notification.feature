Feature: My page navigation from the header

  @test
  Scenario: User without unread dialogue notifications lands on their research profile
    Given a logged-in user with no unread dialogue notifications
    When the user clicks "My page" in the header
    Then they are taken to their research profile

  @test
  Scenario: User with unread dialogue notifications lands on Dialogue
    Given a logged-in user with at least one unread dialogue notification
    When the user clicks "My page" in the header
    Then they are taken to the Dialogue page
    And the message list shows only unread messages