Feature: Collaboration between institutions

  @test
  Scenario: Files are approved by Curators from file uploaders institution
    Given a Publication is created by institution A with contributors from institutions A, B and C
    When a file is uploaded from:
      | Collaborator B |
      | Collaborator C |
    Then the curator for institution A will not get a task to approve a publication request
    And the curator for institution B will get a task to approve the file from Uploader B and not from Uploader C
    And the curator institution C will get a task to approve the file from Uploader C and not from Uploader B

  @test
  Scenario: DOI requests when collaborating
    Given a Publication is created by institution A with contributors from institutions A, B and C
    When a DOI is requested from:
      | Collaborator A |
      | Collaborator B |
      | Collaborator C |
    Then the curators from the collaborating institutions will only see DOI request messages from collaborators from their own institution:
      | Curator A |
      | Curator B |
      | Curator C |

  @test
  Scenario: Support requests when collaborating
    Given a Publication is created by institution A with contributors from institutions A, B and C
    When a support message is sent from:
      | Collaborator A |
      | Collaborator B |
      | Collaborator C |
    Then the curators from the collaborating institutions will only see support messages from collaborators from their own institution:
      | Curator A |
      | Curator B |
      | Curator C |

  @test
  Scenario: Visibility of requests when collaborating
    Given a Publication is created by institution A with contributors from institutions A, B and C
    When a support message is sent from:
      | Collaborator A |
      | Collaborator B |
      | Collaborator C |
    And a response is sent from:
      | Curator A |
      | Curator B |
      | Curator C |
    Then the collaborators will only see messages responding to their own messages:
      | Collaborator A | Curator A |
      | Collaborator B | Curator B |
      | Collaborator C | Curator C |
