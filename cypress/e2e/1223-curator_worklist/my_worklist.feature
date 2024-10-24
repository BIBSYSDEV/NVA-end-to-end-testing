Feature: Curator opens My Worklist

  Rules:
  - The Curator role serve all users at the Institution
  - A Editor may define a Curators responsibility to one or more subunits at the Institution
  - A Curator sees default all Requests that is part of his Editor defined area of responsibility
  - A Curator may at will change his current area of responsibility, to assist other Curators

  - A Registrar belongs at an Institution (defiend by the active IDP or by selection)
  - A Registrar may be Affilliated to a subunit at his Institution (defined by his employment)
  - A Registrar creates Resources (thus becomes it's Owner)

  - A Resource has 0 or more Requests

  - A Request has a Submitter (the Owner or a Curator)
  - A Request has a date of creation
  - A Request is of a Type (Approval, Support, DOI or Ownership)
  - A Request is pending or assigned a Curator
  - A Request has a Status
  - A Request has a date of status change
  - A Request have 0 or more Messages

  - A Message has a Submitter (the Owner or a Curator)
  - A Request has a Receiver (the non-submitter)
  - A Message has a date of creation

  The Possible values of the Requests Status:
  - New <--> Active --> [Conclusion]
  - The Conclusion value is decided by the Request Type:
  - Request Type Support : Conclusion == Answered
  - Other Request Types  : Conclusion is Approved or Declined
  - It's still pending if a final resting value is needed, like Archived and/or Deleted

  Future stuff:
  - The Custodian needs to be notified when a Request is updated (a new Message or someone adopts it)
  - There is a need to allow Curators at two Institutions to comunicate

  Background:

  @test
  Scenario Outline: Curator opens their Worklist
    When the "<Curator>" opens their Worklist
    Then the Curator see that the Worklist is Scoped
    And the Worklist contains Requests of type "<Type>"
    Examples:
      | Curator            | Type     |
      | Publishing-Curator | Approval |
      | Support-Curator    | Support  |
      | Doi-Curator        | DOI      |
      | Nvi-Curator        | NVI      |
  # | Ownership-Curator | Ownership |

  # Scenario: Curator change Scope of their Worklist
  #   When the Curator change Scope to the whole Institution or one or more subunits
  #   Then the listed Requests is updated to match the new Scope

  @test
  Scenario Outline: Curator views all Requests of a type
    When "<Curator>" clicks on Requests of type "<Type>"
    Then Curator see a list of Requests displayed with:
      | Request status         |
      | Registration title     |
      # | Submitter name            |
      | Request Submitter Date |
    # | Beginning of last message |
    # | Owner name                |
    And they see that each Request can be opened
    Examples:
      | Curator            | Type     |
      | Publishing-Curator | Approval |
      | Support-Curator    | Support  |
      | Doi-Curator        | DOI      |
      | Nvi-Curator        | NVI      |
  # | Ownership |

  @test
  Scenario Outline: Curator opens a unassigned Request
    When the "<Curator>" open a unassigned Request of type "<Type>"
    Then the Curator is assigned the Request
    And the Request Status is set to "Active"
    Examples:
      | Curator            | Type     |
      | Publishing-Curator | Approval |
      | Support-Curator    | Support  |
      | Doi-Curator        | DOI      |
      | Nvi-Curator        | NVI      |

  @test
  Scenario Outline: Curator unassigns a Request
    When the "<Curator>" selects "Mark request unread" on a request of type "<Type>"
    Then the Request Status is set to "New"
    And the Request is unassigned the Curator
    Examples:
      | Curator            | Type     |
      | Publishing-Curator | Approval |
      | Doi-Curator        | DOI      |
      | Nvi-Curator        | NVI      |

  # Scenario Outline: Curator open a assigned Request
  #   When the "<Curator>" selects a Request of type "<Type>"
  #   Then the Request is expanded
  #   And the assigned Curator is viewed
  #   And previous messages are displayed chronologically with:
  #     | Submitter name          |
  #     | Submitter Date and Time |
  #     | The full message        |
  #   And the Curator can reply to a message
  #   And the Curator can open the Requests Resource
  #   And the Curator can change the Status of the Request
  #   Examples:
  #     | Curator            | Type     |
  #     | Publishing-Curator | Approval |
  #     | Support-Curator    | Support  |
  #     | Doi-Curator        | DOI      |
  #     | Nvi-Curator        | NVI      |

  @test
  Scenario Outline: Curator open the Request's Resource
    Given the "<Curator>" receives a Request of type "<Type>"
    When the Curator opens the Requests Resource
    Then the Landing Page of the Resource is viewed
    And the Curator has the option to "<Action>"
    Examples:
      | Curator            | Type     | Action             |
      | Publishing-Curator | Approval | Publish Files      |
      | Publishing-Curator | Approval | Reject publishing  |
      | Support-Curator    | Support  | Answer Message     |
      | Doi-Curator        | DOI      | Mint DOI           |
      | Doi-Curator        | DOI      | Reject DOI request |
      | Nvi-Curator        | NVI      | Approve Candidate  |
      | Nvi-Curator        | NVI      | Reject Candidate   |
  # | Ownership | Change owner |

  @test
  Scenario: User gets an answer to a Support Request
    When the Curator sends an answer of type "Support"
    Then the Request status is set to "Answered"
    And the User can read the answer in My Messages

# Scenario: User gets an answer to a Request
#   When the Curator writes an answer
#   And sends it to the User
#   And the Request Type is:
#     | Approval  |
#     | DOI       |
#     # | Ownership |
#   Then the User can see the answer in My Messages

# Scenario Outline: Curator change Status on a Request
#   When Curator selects a new status "<Status>" on a Request
#   Then the status of the Request is set to "<Status>"
#   Examples:
#     | Status   |
#     | Archived |
#     | Deleted  |

# Scenario: Curator receives assignment of responses to requests they have previously responded to
#   When the Curator:
#     | Sends an answer          |
#     | Publishes a resource     |
#     | Mints a DOI              |
#     | Declines a DOI           |
#     # | Changes Owner            |
#     # | Declines change of owner |
#   Then the Curator is Assigned the Request

# Scenario: Curator receives Requests in their scope
#   Given the Request is of type:
#     | Approval |
#     | Support  |
#     | DOI      |
#   When the Requests' Submitter is Affilliated within the Curators Scope
#   Then the Request is part of the Curators Worklist

# Scenario: Curator receives Requests they have been assigned from outside their scope
#   Given the Request is of type:
#     | Approval |
#     | Support  |
#     | DOI      |
#   When the Curator is assigned the Request
#   Then the Request is part of the Curators Worklist

# Scenario: Curator receives Ownership requests within their scope
#   Given the Request is of type "Ownership"
#   When the Affilliation of the Owner of the Resource associated with the Request is within Curators Scope
#   Then the Request is part of the Curators Worklist

# Scenario: Curator receives Ownership requests they have been assigned from outside their scope
#   Given the Request is of type "Ownership"
#   When the Curator is assigned the Request
#   Then the Request is part of the Curators Worklist
