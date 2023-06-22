const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'a6w1e7',
  env: {
    TAGS: 'not @ignore and @test',
  },
  defaultCommandTimeout: 20000,
  viewportWidth: 1600,
  viewportHeight: 1200,
  video: true,
  reporter: '../node_modules/mochawesome/src/mochawesome.js',
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    specPattern: 'cypress/e2e/**/*.feature',
  },
});
