Feature: Editor tasks

In order to inform about the institution's configurations
As an Editor
I want to see institution names, codes, and institutional author

In order to see who is responsible for which parts of the institution
As an Editor
I want to see a list of all curators and there area of responsibility

In order to decide who is responsible for which parts of the institution
As an Editor
I want to manage which curators is responsible for which parts of the institution

In order to inform about the institution's DOI configurations
As an Editor
I want to see information about my institutions DOI configuration

In order to decide the publishing policy at an Institution
As an Editor
I want to choose between different options

Background:
    Given a logged in Editor

@firstEditor
@test
Scenario: Editor opens institutions configuration
    When the Editor opens the institution's configuration menu item
    Then the Editor sees one or many registered official names in Bokmål, English, Nynorsk or Northern Sámi
    And they see all of
        | Institution's short name       |
        | Institution's ROR              |
        | Institution's author intentity |
    And they may also see
        | Institution's Feide domain |
    And the Editor sees a menu with following options
        | Institution name         |
        | Vocabulary settings      |
        | Publishing strategi      |
        | DOI configuration        |
        | Curator's responsibility |
    #        | change owner of registration |
    #        | Sletting av publikasjoner    |
    # | NVI-rapportering           |
    #        | Lisenser og filer            |
    And "Institution name" is the active choice

@firstEditor
@test
Scenario: Editor views curators and area of responsibility
    Given the Institusion have Curators registered
    When the Editor opens the institution's responsibility menu item
    Then the Editor sees a list that contains
        | Curator's name                          |
        | Curator's ORCID symbol (if present)     |
        | Curator's affiliation                   |
        | Curator's area of responsibility        |
        | Option to add an area of responsibility |
    And an option to add rights to edit thesis

@secondEditor
@test
Scenario: Editor opens institutions DOI configuration
    Given the Institution don't have an DOI configuration
    When the Editor opens the institution's DOI configuration menu item
    Then the Editor sees a link to Sikt to order DOI service
    And some other text informing about the DOI service

@test
Scenario: Editor opens institutions DOI configuration
    Given the Institution has an DOI configuration
    When the Editor opens the institution's DOI configuration menu item
    Then the Editor sees following information
        | DataCite Member ID |
        | Institutions DOI prefix |
        And some other text informing about the DOI service


	# - this scenario might be a duplicate to @1424
@firstEditor
Scenario: The logged-in User is a Registrator
    Given an Institution with one or more Editor roles
    When a User is logged-in through Feide
    And the Users Feide profile contains one of the following roles:
        | Scientific employees               |
        | Technical administrative employees |
    Then the User is a Registrator

@firstEditor
@test
Scenario: Default publishing rights
    Given an Institution with one or more Editor roles
    When the Editor of an Institution hasn’t chosen a policy
    Then the publications policy is:
        | Registrator has full publishing rights |

@firstEditor
@test
Scenario Outline: Editor defines publishing rights
    Given a Editor views the Editor page
    When the Editor chooses "<PublishStrategy>":
    Then the Institutions publications policy is changed accordingly
    And the Editor is notified that a new policy is activated
    Examples:
        | PublishStrategy                        |
        | Registrator has full publishing rights |
        | Registrator can only publish metadata  |
# | Only Curator can publish               |
# The policys are used in owner_navigates_to_the_landing_page_for_their_registration.feature