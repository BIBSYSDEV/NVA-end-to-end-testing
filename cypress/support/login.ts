import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

const cognitoUri = Cypress.env('COGNITO_URI');
const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
const region = Cypress.env('AWS_REGION') ?? 'eu-west-1';
const clientId = Cypress.env('AWS_CLIENT_ID');
const scopes = 'openid https://api.nva.unit.no/scopes/frontend aws.cognito.signin.user.admin';
const redirectUri = 'http://localhost:3000/callback';
const params = `client_id=${clientId}&response_type=code&scope=${encodeURIComponent(
  scopes
)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

const readPassword = async () => {
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
  return password;
};

export const login = (userId: string) => {
  readPassword().then((password) => {
    const accessTokens = loginCognito(userId, password);
    console.log(accessTokens['accessToken']);
    const tokenKey = `CognitoIdentityServiceProvider.${clientId}.${userId}`;
    window.localStorage.setItem(`${tokenKey}.accessToken`, accessTokens['accessToken']);
    window.localStorage.setItem(`${tokenKey}.idToken`, accessTokens['idToken']);
    window.localStorage.setItem(`${tokenKey}.refreshToken`, accessTokens['refreshToken']);
  });
};

const loginCognito = (userId: string, password: string) => {
  //   cy.intercept('*', (req) =>
  //     req.on('response', (res) => {
  //       const setCookies = res.headers['set-cookie'];
  //       res.headers['set-cookie'] = (Array.isArray(setCookies) ? setCookies : [setCookies])
  //         .filter((x) => x)
  //         .map((headerContent) => headerContent.replace(/samesite=(lax|strict)/gi, 'secure; samesite=none'));
  //     })
  //   );
  cy.origin(cognitoUri, { args: { userId, password, params } }, ({ userId, password, params }) => {
    cy.visit(`/login?${params}`);
    cy.get('input[name=username]:visible').type(userId);
    cy.get('input[name="password"]:visible').type(password, { log: false });
    cy.get('input[name=signInSubmitButton]:visible').click();

    cy.intercept(`${redirectUri}*`, (req) => {
      req.on('response', (res) => {
        const responseBody = res.body;
        return responseBody;
      });
    });
  });
};
