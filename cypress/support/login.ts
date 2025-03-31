import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { Server, IncomingMessage, ServerResponse } from 'http';
import http from 'http';

const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
const region = Cypress.env('AWS_REGION') ?? 'eu-west-1';
const userPoolId = Cypress.env('AWS_USER_POOL_ID');
const clientId = Cypress.env('AWS_CLIENT_ID');
const stage = Cypress.env('STAGE') ?? 'e2e';
const cognitoUri = Cypress.env('COGNITO_URI');
const tokenUrl = `${cognitoUri}/oauth2/token`;
const scopes = 'openid https://api.nva.unit.no/scopes/frontend aws.cognito.signin.user.admin';
const redirectUri = 'http://localhost:3000/callback';
const params = `client_id=${clientId}&response_type=code&scope=${encodeURIComponent(
  scopes
)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

const globalConfig = {
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  sessionToken: awsSessionToken,
};

const secretsManager = new SecretsManagerClient({
  region: region,
  credentials: globalConfig,
});

let password = 'P_43842e09-f674-44b3-81a4-4b719941b433';
const secretsManagerParams = {
  SecretId: 'TestUserPassword',
};
const command = new GetSecretValueCommand(secretsManagerParams);
secretsManager.send(command).then((passwordResponse) => {
  password = passwordResponse.SecretString;
});

const loginUrl = `${cognitoUri}`;

const loginCognito = (username: string) => {
  cy.intercept('*', (req) =>
    req.on('response', (res) => {
      const setCookies = res.headers['set-cookie'];
      res.headers['set-cookie'] = (Array.isArray(setCookies) ? setCookies : [setCookies])
        .filter((x) => x)
        .map((headerContent) => headerContent.replace(/samesite=(lax|strict)/gi, 'secure; samesite=none'));
    })
  );
  cy.origin(loginUrl, { args: { username, password, params } }, ({ username, password, params }) => {
    cy.visit(`/login?${params}`);
    cy.get('input[name=username]:visible').type(username);
    cy.get('input[name="password"]:visible').type(password, { log: false });
    cy.get('input[name=signInSubmitButton]:visible').click();
  });
};

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

// export const login = async (userId: string) => {
//   return new Cypress.Promise((resolve, reject) => {
//     const app = express();
//     const port = 3000;
//     let server: Server<any, any>;

//     app.get('/callback', async (req: any, res: any) => {
//       const authorizationCode: string = req.query.code.toString();

//       if (!authorizationCode) {
//         return res.status(400).send('Authorization code not found');
//       }

//       try {
//         const tokens = await getAuth(authorizationCode);
//         const accessToken = tokens.access_token;
//         console.log(tokens);
//         res.send('Authorization code exchanged for access token');

//         // Close the server after responding
//         server.close(() => {
//           console.log('Server closed');
//           resolve(accessToken);
//         });
//       } catch (err) {
//         res.status(500).send('Error exchanging authorization code for access token');
//         reject(err);
//       }
//     });

//     server = app.listen(port, async () => {
//       console.log(`Server running at http://localhost:${port}`);

//       try {
//         loginCognito(userId);
//       } catch (err) {
//         console.error('Error:', err);
//         reject(err);
//       }
//     });
//   });
// };

export const login = async (userId: string) => {
  return new Cypress.Promise((resolve, reject) => {
    const port = 3000;

    const server = http.createServer(async (req, res) => {
      if (req.url.startsWith('/callback')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const authorizationCode = url.searchParams.get('code');

        if (!authorizationCode) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Authorization code not found');
          return;
        }

        try {
          const tokens = await getAuth(authorizationCode);
          const accessToken = tokens.access_token;
          console.log(tokens);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Authorization code exchanged for access token');

          // Close the server after responding
          server.close(() => {
            console.log('Server closed');
            resolve(accessToken);
          });
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error exchanging authorization code for access token');
          reject(err);
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      // You can initiate the authorization flow here if needed
    });
  });
};
