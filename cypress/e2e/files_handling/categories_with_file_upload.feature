Feature: Setting categories with File Upload

    Institutions can restrict file upload to categories
    Users can not upload file to categories without file upload

    # Scenario: Administrator sets categories for file upload
    #     Given a logged in Administrator
    #     When they open the institutions administration page
    #     Then they see an option to set categories with File Upload

    # Scenario: Administrator sets categories with file upload
    #     Given a logged in Administrator
    #     When they open the institutions administration page
    #     And they remove the option to upload files to a category
    #     Then a User can not upload files to Registrations in the chosen category

    # Scenario: User start registration with file upload and is not able to chose a category with no file upload
    #     Given a User starts Registration with uploading file
    #     When they view the categories in the Wizard
    #     Then they are not able to choose a category with no file upload