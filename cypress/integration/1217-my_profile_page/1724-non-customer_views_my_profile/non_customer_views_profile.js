import {Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
import {} from '../../../support/'

        Given that a User is logged in with Feide
        And their Institution is not a Customer of NVA
        When they navigate to My Profile
        Then they see that they have no roles
        And they see an information text explaining why they have no roles
        And they see their Institution name
        And they see their Feide Organization ID