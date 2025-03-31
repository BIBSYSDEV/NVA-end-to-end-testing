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
      | Request Submitter Date |
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

