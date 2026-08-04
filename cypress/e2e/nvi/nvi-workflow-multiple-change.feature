Feature: Changing multiple values in a NVI-candidate

  @test
  Scenario Outline: Category changes from non-scientific to scientific, contributor changes from unidentified to identified
    Given a curator opens a non-scientific Result that is a NVI-candidate with unidentified contributor
    And the Result is "<Source>" registration
    And the Result is "<Collaboration>"
    When the curator changes the Category from non-scientific to scientific
    And the curator changes a contributor from unidentified to identified
    And saves the changes
    Then the Result is a NVI-candidate

    Examples:
      | Source | Collaboration                      |
      | Manual | no Collaboration                   |
      | Manual | NVI institution Collaboration      |
      | Manual | NVA institution Collaboration      |
      | Manual | external institution Collaboration |

  @test
  Scenario Outline: Category changes from scientific to non-scientific, contributor changes from unidentified to identified
    Given a curator opens a scientific Result that is a NVI-candidate with unidentified contributor
    And the Result is "<Source>" registration
    And the Result is "<Collaboration>"
    When the curator changes the Category from scientific to non-scientific
    And the curator changes a contributor from unidentified to identified
    And saves the changes
    Then the Result is not a NVI-candidate

    Examples:
      | Source | Collaboration                      |
      | Manual | no Collaboration                   |
      | Manual | NVI institution Collaboration      |
      | Manual | NVA institution Collaboration      |
      | Manual | external institution Collaboration |
