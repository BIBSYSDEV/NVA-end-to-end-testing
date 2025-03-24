import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
  projectId: 'a6w1e7',
  env: {
    TAGS: 'not @ignore and @test',
  },
  reporter: '../node_modules/mochawesome/src/mochawesome.js',
  video: true,
  retries: 1,
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true,
    showSkipped: false,
  },
 defaultCommandTimeout: 30000,
  viewportWidth: 1600,
  viewportHeight: 1200,
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
