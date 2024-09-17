# NVA-end-to-end-testing

To start creating tests create a directory with the same name as the feature file under the subdirectory with the feature file. Cypress will look in `.js` files in that subdirectory for cucumber tags.

Example: for `./cypress/integration/1221-my_publication/354-creator_opens_my_publications.feature` create the subdirectory `./cypress/integration/1221-my_publication/354-creator_opens_my_publications`

Before running tests, create testdata using `https://github.com/BIBSYSDEV/NVA-test-data` and run

    python create_test_data.py
