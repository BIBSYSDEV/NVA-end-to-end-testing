Feature: Validation of an NVI resource

	This feature file contains scenarios related to validation of NVI-Resources as part of the NVI-process.

	In order to view the current status of the NVI-prosess
	As a Curator
	I want to see how many Resources are Validated, Nominated for Validation, and Candidates for Validation

	In order to view the current status of the NVI-prosess
	As a Curator
	I want to see the current status compared with last year's results

	In order to Validate a Nominated Resource
	As a Curator
	I want to see the list of Nominated Resources - Resources that has been Validated by some other Institution and implies my Instituion by affiliation

	In order to Validate a Candidate Resource
	As an Curator
	I want to see the list of Candidate Resources - Resources that no other Institution has Validated yet, but qualify to be NVI-Resources and implies my Institution by affiliation

	In order to inspect a Resource
	As an Curator
	I want to be able to navigate to the Resource Landing Page from all lists

	# Skal Curator også få liste med potensielle NVI-ressurser?
	#	- Regler for at ein ressurs er "potensielle NVI-ressurser" må da avklares

	Background:
		Given an logged-in Curator at an NVI-Institution

	@test
	Scenario: Curator views NVI-report status at own Institution
		When a Curator uses the option to view the NVI-Report status at own Institution
		Then the Curator sees a visualization of current progress compared with last year
		And it contains number of Validated Resources
		And it contains number of Nominated Resources
		And it contains number of Candidate Resources


	# Scenario: Curator views list of Resources Validated for NVI-reporting
	# 	When a Curator uses the option to view the list of Validated Resources
	# 	Then the Curator sees a list of Resources that are Validated by all Institutions that are affiliated to the Resource by Authors

	@test
	Scenario: Curator views a NVI-candidate
		When the Curator views the list of Candidates
		And select one of the Candidates
		Then the Curator can see the details of the Candidate
		And the calculated number of points for the Candidate
		And the Curator have an option to approve the Candidate
		And the Curator have an option to reject the Candidate
		And the Curator have an option to add a note to the Candidate

	@test
	Scenario: Curator approves NVI-candidate
		When a Curator views a NVI-candidate
		And uses the option to approve the NVI-candidate
		Then the NVI candidate is removed from the list of Candidate Resources
		And is added to the list of approved Resources

	@test
	Scenario: Curator rejects NVI-candidate
		When a Curator views a NVI-candidate
		And uses the option to reject the NVI-candidate
		Then the NVI candidate is removed from the list of Candidate Resources
		And is added to the list of rejected Resources

	# Scenario: Curator view to-do list of Resources Nominated to be part of the NVI-report
	# 	When a Curator uses the option to view the list of Nominated Resources
	# 	Then the Curator sees a list of Resources that are Validated by at least one other Institution, but not their Institution
	# 	And there is an option to inspect the Resource
	# 	And there is an option to Validate each Resource on behalf of their Institution


	# Scenario: Curator views complete list of Resources Nominated to be part of the NVI-report
	# 	When a Curator uses the option to view the list Nominated Resources
	# 	And the Curator asserts that Resources Validated by own Institution should be listed
	# 	Then the Curator sees a list of all Resources that are Validated by at least one other Institution, including their own Institution
	# 	And there is an option to inspect the Resource
	# 	And there is an option to Validate each Resource on behalf of their Institution


	# Scenario: Curator views list of NVI-report Candidates
	# 	When a Curator uses the option to view the list Candidate Resources
	# 	Then the Curator sees a list of Resources that fulfill the criteria to be NVI Resources
	# 	And the Resources have authors that are affiliated with the Curator's Institution
	# 	And no other Institution has Validated the Resource


	# Scenario: Curator inspects a Resource from the list of Nominated Resources
	# Given a Curator views the list of Resources Nominated to be part of the NVI-Report
	# When the Curator uses the option to view details about a Resource
	# Then the Curator sees a list with Validation statuses for all affiliated Institutions
	# And there is an option to Validate the Resource on behalf of their Institution

	@test
	Scenario: Remove NVI candidate on change
		Given an NVI candidate
		When one or more of the candidate-affecting fields are changed
		And the NVI candidate is no longer an NVI candidate
		Then remove the NVI candidate from the NVI candidate list.

	@test
	Scenario: Reset NVI candidate on change
		Given an NVI candidate
		When one or more of the candidate-affecting fields are changed
		And the NVI candidate is still a candidate
		Then reset the approval status for all involved institutions for the NVI candidate.
		And the points should be updated according to the new factors

	# Scenario: Creator can not change certain values in an approved NVI candidate
	# 	Given a User without Curator role
	# 	And a NVI candidate in an open NVI reporting period that is approved by all involved institutions
	# 	When they edit the NVI candidate
	# 	Then they are not allowed to change:
	# 		| Publication channel    |
	# 		| Publication date       |
	# 		| Validated contributors |