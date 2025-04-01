import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import http from 'node:http2';

const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
const region = Cypress.env('AWS_REGION') ?? 'eu-west-1';
const clientId = Cypress.env('AWS_CLIENT_ID');
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

