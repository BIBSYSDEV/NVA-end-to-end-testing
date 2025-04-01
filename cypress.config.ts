/// <reference types="cypress" />
import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import http from 'node:http2';
import Cypress from 'cypress';

let clientId = '';
let cognitoUri = '';
const tokenUrl = `${cognitoUri}/oauth2/token`;
const scopes = 'openid https://api.nva.unit.no/scopes/frontend aws.cognito.signin.user.admin';
const redirectUri = 'http://localhost:3000/callback';
const params = `client_id=${clientId}&response_type=code&scope=${encodeURIComponent(
  scopes
)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

const getAuth: any = async (authorizationCode: string) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientId);
  params.append('redirect_uri', redirectUri);
  params.append('code', authorizationCode);

  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code: authorizationCode,
    };
    cy.request({
      method: 'POST',
      url: tokenUrl,
      form: true,
      body: body,
    }).then((response) => {
      if (response.status === 200) {
        return response.body;
      } else {
        console.error('Unexpected response status:', response.status);
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    });
  } catch (err) {
    console.error('Error exchanging authorization code for access token:', err);
    if (err.response) {
      console.error('Error response data:', err.response.data);
    }
    throw err;
  }
};

export const login = async (userId: string) => {
  console.log('server start');
  const port = 3000;

  const server = http.createServer(async (req, res) => {
    try {
      if (req.url.startsWith('/callback')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const authorizationCode = url.searchParams.get('code');

        if (!authorizationCode) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Authorization code not found');
          server.close(() => {
            server.emit('goaway');
            console.log('Server closed');
          });
          return;
        }

        try {
          const tokens = await getAuth(authorizationCode);
          console.log(tokens);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Authorization code exchanged for access token');

          // Close the server after responding
          server.close(() => {
            server.emit('goaway');
            console.log('Server closed');
          });
          return tokens.access_token;
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error exchanging authorization code for access token');
          server.close(() => {
            server.emit('goaway');
            console.log('Server closed');
          });
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        server.close(() => {
          server.emit('goaway');
          console.log('Server closed');
        });
      }
    } catch (err) {
      server.emit('goaway');
      server.close();
    }
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // You can initiate the authorization flow here if needed
  });
};

export default defineConfig({
  projectId: 'a6w1e7',
  env: {
    TAGS: 'not @ignore and @test',
  },
  defaultCommandTimeout: 30000,
  viewportWidth: 1600,
  viewportHeight: 1200,
  defaultBrowser: 'chrome',

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
      on('task', {
        loginCognito(userId) {
          clientId = config.env['AWS_CLIENT_ID'];
          cognitoUri = config.env['COGNITO_URI'];
          console.log(clientId);

          login(userId).then((accessTokens) => accessTokens);
        },
      });
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
