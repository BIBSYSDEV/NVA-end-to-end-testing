import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin, afterSpecHandler } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
  projectId: 'a6w1e7',
  env: {
    tags: 'not @ignore',
  },
  defaultCommandTimeout: 30000,
  viewportWidth: 1600,
  viewportHeight: 1200,
  defaultBrowser: 'chrome',

  e2e: {
    baseUrl: 'https://e2e.nva.aws.unit.no/',
    specPattern: 'cypress/e2e/**/*.feature',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config, { omitAfterSpecHandler: true });

      on('after:spec', async (spec, results) => {
        try {
          await afterSpecHandler(config, spec, results);
        } catch (error) {
          // A failed BeforeAll/AfterAll leaves the preprocessor in the "run-hook-started" state,
          // making afterSpecHandler throw and crash the plugins process before spec results reach
          // Cypress Cloud, which then shows the spec as "running" until pipeline timeout.
          // Swallow the error so the spec is reported as a normal failure instead.
          console.error(`cucumber afterSpecHandler failed for ${spec.relative}:`, error);
        }
      });

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
