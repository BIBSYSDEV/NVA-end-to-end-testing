Feature: Administrator manage Persons, employments, and roles
	In order to know about the existence of a Person
	As an Administrator
	I want the Person to become part of the personal register through import

	In order to know about the existence of a Person
	As an Administrator
	I want the Person to log in and accept to become part of the personal register

	In order to connect a Person to my Institution
	As an Administrator
	I want the Persons employment to be imported

	In order to connect a Person to my Institution
	As an Administrator
	I want to add an employment of a Person

	In order to manage access
	As an Administrator
	I want to have a start-date and possibly a end-date on all employments

	In order to reduce access
	As an Administrator
	I want the solution to deny access if current date is outside employment dates

	In order to reduce manual work
	As an Administrator
	I want the solution to grant the Registrator role to all current employed Persons at login

	In order to grant access to different parts of the solution
	As an Administrator
	I want to add the roles Curator, Editor and Administrator to Persons

  Background: 
    Given an Administrator is logged in

  @test
  Scenario: Default start screen on Basic data
    When an Administrator enters the Basic data menu
    Then the Administrator see a list of Persons employed at his institution
    And each Person s internal identifier, name, and external identifier is displayed
    And the external identifier is a Person Number
		# (future) or an - in case of only an ORCID
    And the Person Number is displayed as date of birth followed by 5 stars (*)
    And each Person s name is followed by the ORCID-logo if an ORCID is connected
    And each Persons employments sub-unit-affiliation at current institution is displayed
    And Persons with more than one employment at current institution has an "show more"-option
    And each Person has an option to edit
    And there is a search option to locate some persons
    And the menu has an option to filter the list
    And the menu has an option to employ a new Person
    And the column titles can be used to sort the list
	# Scenario: Administrator uses the "show more"-option on multiple employments at current Institution
	# 	When the Administrator activate the "show more"-option
	# 	Then a list of all employments at current Institutions are listed
	# 	# about 80% of the Persons has one employment
	# 	# most of the other 20% have one other employment, on some other Institution
	# 	# one Person in current database has 14 employments
	# Scenario: Administrator edit a Person at his institution
	# 	When the Administrator uses the edit option on a Person
	# 	Then Create or edit a Person and his emplyment and roles
	# Scenario: Administrator adds a new employment to a Person
	# 	Given the new Person is known by the personal register
	# 	And is not employed at current Institution
	# 	When the Administrator look up or search and selects the Person
	# 	Then Create or edit a Person and his emplyment and roles

  @test
  Scenario: Create or edit a Person and his emplyment and roles
    When the Administrator wish to edit or add a new Person
    Then the Administrator sees the Person s name and Person Number
    And the Person Number is displayed as date of birth followed by 5 stars
    And there is an option to view the last 5 digits of the Person Number
    And possible other employments at other institutions are briefly documented
    And the employment at current institution is shown with affiliation, employment-position and -fraction, start- and end-date
    And there is an option to view other employments at current institution
    And there is an option to add a new employment
    And the Persons different roles at this institution is listed
    And the Roles may be toggled on or off
    And there is an option to close this dialog
    And there is an option to save the changes

  @test
  Scenario: Administrator views other employments at current Institution
    Given the Person viewed got multiple employments at current Institution
    When the Administrator scrolls through the multiple employments
    Then details about each employment is displayed
    And other details about the Person and his roles are static

  @test
  Scenario: Administrator adds another employment
    When the Administrator uses option to add a new employment
    Then a form with following fields are displayed
      | employment position |
      | employment fraction |
      | start-date          |
      | end-date            |
	# Scenario: Administrator fills in required information about new employment
	# 	Given Administrator adds another employment
	# 	When the Administrator fills inn the form
	# 	Then a new affiliation is ready to be stored

  @test
  Scenario: Administrator grants or removes a Persons roles
    Given Administrator edit a Person at his institution
    When the Administrator toggles on or off one of the following roles
      | Publishing Curator |
      | DOI Curator        |
      | Support Curator    |
      | NVI Curator        |
      | Editor             |
      | Administrator      |
    Then the role is added or removed from the Person
    And the role Registrator cannot be removed

  @test
  Scenario: Administrator close the edit Person dialog
    Given Administrator edit a Person at his institution
    And the Administrator has added or changed information in the dialog
    When the Administrator uses one of the close options
    Then a dialog informing about loss of data is displayed
    And the Administrator can choose to close or abort the close action

  @test
  Scenario: Administrator saves the changes to a Person
    Given Administrator edit a Person at his institution
    And the Administrator has added or changed information in the dialog
    And the save option is activated
    When the Administrator uses the save options
    Then all changes are stored

  @test
  Scenario: Administrator uses search to locate person
    Given Default start screen on Basic data
    When the Administrator fills inn the search field
    Then the list is updated accordingly regarding person name
