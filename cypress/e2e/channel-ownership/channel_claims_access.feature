Feature: Permissions given claimed publisher
    As a system user
    I want publication permission to be enforced based on publication, user role and channel claim
    So that only authorized users can perform operation

  Scenario Outline: Verify operation when user is not from the same organization as claimed publisher
    Given a "published" publication
    And publication is a degree
    And publication has claimed publisher
    When the user have the role "<UserRole>"
    Then the user is "<partial-update>" to partial update
    And the user is "<update>" to update
    And the user is "<unpublish>" to unpublish

    Examples:
      | UserRole                          | partial-update | update      | unpublish   |
      | Everyone else                     | Not Allowed    | Not Allowed | Not Allowed |
      | External client                   | Not Allowed    | Not Allowed | Not Allowed |
      | Publication owner                 | Allowed        | Not Allowed | Not Allowed |
      | Contributor                       | Allowed        | Not Allowed | Not Allowed |
      | File, support, doi or nvi curator | Allowed        | Not Allowed | Not Allowed |
      | Editor                            | Allowed        | Not Allowed | Not Allowed |
      | Related external client           | Allowed        | Not Allowed | Not Allowed |
      | Degree file curator               | Allowed        | Allowed     | Allowed     |



  Scenario Outline: Verify update operation when user is from the same organization as claimed publisher and publication has no approved files
    Given a "published" publication
    And publication has no approved files
    And publication is a degree
    And publication has claimed publisher
    And publisher is claimed by organization
    When the user have the role "<UserRole>"
    And the user is from the same organization as claimed publisher
    And the user attempts to "update"
    Then the action outcome is "<Outcome>"

    Examples:
      | UserRole                          | Outcome     |

      | Everyone else                     | Not Allowed |
      | External client                   | Not Allowed |
      | Publication owner                 | Allowed     |
      | Contributor                       | Allowed     |
      | File, support, doi or nvi curator | Allowed     |
      | Editor                            | Allowed     |
      | Degree file curator               | Allowed     |
      | Related external client           | Allowed     |


  Scenario Outline: Verify permission when user is from the same organization as claimed publisher
    Given a "published" publication
    And publication is a degree
    And publication has claimed publisher
    And publisher is claimed by organization
    When the user have the role "<UserRole>"
    And the user is from the same organization as claimed publisher
    Then the user is "<update>" to update
    And the user is "<unpublish>" to unpublish
    And the user is "<approve-files>" to approve files

    Examples:
      | UserRole                          | update      | unpublish   | approve-files |
      | Everyone else                     | Not Allowed | Not Allowed | Not Allowed   |
      | External client                   | Not Allowed | Not Allowed | Not Allowed   |
      | Publication owner                 | Not Allowed | Not Allowed | Not Allowed   |
      | Contributor                       | Not Allowed | Not Allowed | Not Allowed   |
      | File, support, doi or nvi curator | Not Allowed | Not Allowed | Not Allowed   |
      | Editor                            | Allowed     | Allowed     | Not Allowed   |
      | Related external client           | Allowed     | Allowed     | Not Allowed   |
      | Degree file curator               | Allowed     | Allowed     | Allowed       |
