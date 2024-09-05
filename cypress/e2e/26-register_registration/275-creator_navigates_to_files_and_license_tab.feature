Feature: Creator navigates to Files and License tab

  @test
  Scenario: Creator navigates to Files and License tab
    Given Creator begins registering a Registration in the Wizard
    When they navigate to the Files and License tab
    Then they see the File upload widget
    And they see an Input Field for Linked Resources
    And they have the option to mark that the Resource has no File or Linked Resource
    And they see the tab Description is clickable
    And they see the tab Resource Type is clickable
    And they see the tab Contributors is clickable
    And they see the tab Files and License is selected
    And they see Previous is enabled
    And they see Save is enabled

  @test
  Scenario: Creator marks that a Resource has no File or Linked Resource
    Given Creator navigates to Files and License tab
    When they wish to mark that a Resource have no File or Linked Resource
    Then they see a warning message that the Resource will have no File or Linked Resource
    And they see they can cancel marking the Resource

  @test
  Scenario: Creator marks a File with Administrative Agrement
    Given Creator navigates to Files and License tab
    When they upload a File
    And they mark the File with Administrative Agreement
    Then the File is not presented on the Landing Page

  @test
  Scenario: Creator adds a file
    Given Creator navigates to Files and License tab
    When they add a file to the File upload widget
    Then they can see the file in the list of files

  @test
  Scenario: Creator sees information about file
    Given Creator adds a file
    When they see the file in the list of files
    Then they can see information about:
      # | Version      |
      | Terms of use |

  @test
  Scenario: Creator removes a file
    Given Creator open a Registration with a file
    And navigates to Files and License tab
    When they remove a file
    Then they no longer see the file in the list of files
