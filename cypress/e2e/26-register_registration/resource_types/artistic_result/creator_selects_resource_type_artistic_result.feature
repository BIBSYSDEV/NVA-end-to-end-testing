Feature: Creator selects Resource type Artistic Result

    @test
    Scenario: Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"
        Given Creator begins registering a Registration in the Wizard with a File
        When Creator navigates to Resource Type tab
        When they select the Resource type "Artistic Result"
        Then they see a list of subtypes:
            | Artistic result - Architecture   |
            | Artistic result - Design         |
            | Artistic result - Film           |
            | Artistic result - Music          |
            | Artistic result - Performing art |
    # | Artistic result - Writing art    |
    # | Artistic result - Visual art     |

    # # @test
    # Scenario: Creator selects Other type of work for Resource Type "Artistic result"
    #     Given Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"
    #     And they select any Subtype
    #     When they select Other as Type Work
    #     Then they see a new field where they can enter actual Type
