Feature: Collaboration between institutions

    @test
    Scenario: Files are approved by Curators from file uploaders institution
        Given a Publication is created by institution A with contributors from institutions A, B and C
        When a file is uploaded from:
            | Uploader B |
            | Uploader C |
        Then the curator for institution A will not get a task to approve a publication request
        And the curator for institution B will get a task to approve the file from Uploader B and not from Uploader C
        And the curator institution C will get a task to approve the file from Uploader C and not from Uploader B


