Feature: NVI candidate evaluation for Anthology related publications

  @test
  Scenario: Change Anthology from non-scientific to scientific
    Given publication with publicationInstance type AcademicChapter
    And publication has publicationContext refering to Anthology which is not NVI candidate
    When Anthology is updated and becomes NVI candidate
    Then AcademicChapter should also be evaluated as NVI candidate
#   Scenario: Change Anthology from scientific to non-scientific
#     Given publication with publicationInstance type AcademicChapter
#     And publication has publicationContext refering to Anthology which is NVI candidate
#     When Anthology is updated and becomes non NVI candidate
#     Then AcademicChapter should also be evaluated as non NVI candidate
#   Scenario: Anthology is moved to correction list for "Antholoy without chapter" when chapter is removed
#     Given publication with publicationInstance type AcademicMonograph
#     And publication is NVI candidate
#     And publication has AcademicChapter refering to the AcademicMonograph
#     When AcademicChapter is updated to refer to another Book
#     Then AcademicMonograph should appear in correction list for "Antholoy without chapter"
#   Scenario: Anthology is removed from correction list for "Antholoy without chapter" when chapter is added
#     Given publication with publicationInstance type AcademicMonograph
#     And publication is NVI candidate
#     And publication has no AcademicChapters refering to it
#     And AcademicMonograph is present in correction list for "Antholoy without chapter"
#     When adding AcademicChapter that refers to that AcademicMonograph
#     Then AcademicMonograph should disappear from correction list for "Antholoy without chapter"
