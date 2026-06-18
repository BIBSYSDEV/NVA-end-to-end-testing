Feature: reference in right-hand menu on NVA landing page
  As a user of NVA
  I want to see a ready-to-use reference on every presentation page
  So that I can copy it directly into Word or a reference manager without manual formatting

  Background:
    Given I am viewing a resource presentation page on NVA






  @test
  Scenario Outline: Citation is formatted correctly for supported resource types (KR-02)
    Given a resource of type "<resourceType>"
    When the reference is generated
    Then the output follows the "<template>" for "<resourceType>"

    Examples:
      | resourceType       |  template |
      | JournalArticle     |  authors; year; title; journalName; volume; pages; PID          |
      | Book               |  authors; year; title; PID; publisher                           | 
      | BookChapter        |  authors; year; title; PID; chapterPages; publisher; editor; bookTitle | 
      | Report             |  authors; year; title; PID; institution; reportNumber           |

  @test
  Scenario: Unsupported resource type falls back to generic APA template (KR-02)
    Given a resource of an unsupported type "DegreeBachelor"
    When the reference is generated
    Then the output follows the generic APA fallback template
  #
  #
  # # ─── Author list formatting (KR-03) ──────────────────────────────────────────
  #
  # Scenario: Authors are taken only from contributors with role Creator (KR-03)
  #   Given a resource with contributors of mixed roles including "Creator" and "Editor"
  #   When the reference is generated
  #   Then only contributors with role "Creator" appear in the author list
  #   And each author is formatted as "Surname, I."
  #
  # Scenario: All authors are listed when there are 20 or fewer (KR-03)
  #   Given a resource with 20 contributors with role "Creator"
  #   When the reference is generated
  #   Then all 20 authors appear in the citation
  #
  # Scenario: Author list is truncated when there are more than 20 authors (KR-03)
  #   Given a resource with more than 20 contributors with role "Creator"
  #   When the reference is generated
  #   Then the first 19 authors are listed
  #   And "..." appears after the 19th author
  #   And the last author appears after "..."
  #
  #
  # # ─── Missing fields handled silently (KR-04) ──────────────────────────────────
  #
  # Scenario: Missing optional metadata fields are omitted silently (KR-04)
  #   Given a journal article resource without "volume" and "pages" in its metadata
  #   When the reference is generated
  #   Then the citation is produced without error messages
  #   And the "volume" and "pages" segments are absent from the output string
  #
  # Scenario: PID is included when present (KR-04)
  #   Given a resource with a PID in its metadata
  #   When the reference is generated
  #   Then the PID appears in the citation string
  #
  # Scenario: Handle is used as fallback when DOI is absent (KR-04)
  #   Given a resource without a DOI but with a handle in its metadata
  #   When the reference is generated
  #   Then the handle appears in the citation string
  #
  # Scenario: Neither DOI nor handle appears when both are absent (KR-04)
  #   Given a resource without DOI and without handle
  #   When the reference is generated
  #   Then the citation contains no URL or identifier segment
  #
  #
  # # ─── Sentence case on title (KR-05) ──────────────────────────────────────────
  #
  # Scenario: Title in ALL CAPS is converted to sentence case (KR-05)
  #   Given a resource whose mainTitle is "AN INTRODUCTION TO MACHINE LEARNING"
  #   When the reference is generated
  #   Then the title in the citation reads "An introduction to machine learning"
  #
  # Scenario: Title in Title Case is converted to sentence case (KR-05)
  #   Given a resource whose mainTitle is "An Introduction to Machine Learning"
  #   When the reference is generated
  #   Then the title in the citation reads "An introduction to machine learning"
  #
  # Scenario: Title already in sentence case is preserved as-is (KR-05)
  #   Given a resource whose mainTitle is "An introduction to machine learning"
  #   When the reference is generated
  #   Then the title in the citation reads "An introduction to machine learning"
  #
  #
  # # ─── Output format (KR-06) ───────────────────────────────────────────────────
  #
  # Scenario: The formatting function returns plain text (KR-06)
  #   Given a resource with complete metadata
  #   When the reference is generated
  #   Then the return value is a single plain-text string
  #   And the string contains no HTML tags
  #
  #
  # # ─── UI component placement (KR-07) ──────────────────────────────────────────
  #
  # Scenario: Citation is visible (KR-07)
  #   Given I am on a resource presentation page
  #   When the page has finished loading
  #   Then a citation is present 
  #
  # # ─── Read-only preview box (KR-08) ───────────────────────────────────────────
  #
  # Scenario: Citation text is displayed as read-only
  #   Given I am on a resource presentation page with a long reference
  #   When I view the citation
  #   Then the citation text is shown as read-only 
  #
  #
  # # ─── Copy button (KR-09) ─────────────────────────────────────────────────────
  #
  # Scenario: Copy function writes citation to clipboard (KR-09)
  #   Given I am on a resource presentation page
  #   When I use the copy function for the citation 
  #   Then the formatted citation string is written to the clipboard 
  #
  # Scenario: Copy function gives visual confirmation after copying (KR-09)
  #   Given I am on a resource presentation page
  #   When I use the copy function
  #   Then a visual confirmation is shown
  #   And the confirmation disappears after a short delay
  #
  #
