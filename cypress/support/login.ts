import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

const cognitoUri = Cypress.env('COGNITO_URI');
const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
const region = Cypress.env('AWS_REGION') ?? 'eu-west-1';
const clientId = Cypress.env('AWS_CLIENT_ID');
const scopes = 'openid email phone profile https://api.nva.unit.no/scopes/frontend aws.cognito.signin.user.admin';
const redirectUri = 'https://e2e.nva.aws.unit.no';
const tokenUri = 'https://o8f47ax77k.execute-api.eu-west-1.amazonaws.com/Prod/exchange';
const params = `client_id=${clientId}&response_type=code&scope=${encodeURIComponent(
  scopes
)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

let secretPasssword = 'P_43842e09-f674-44b3-81a4-4b719941b433';

const readPassword = new Promise((res, rej) => {
  const globalConfig = {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    sessionToken: awsSessionToken,
  };

  const secretsManager = new SecretsManagerClient({
    region: region,
    credentials: globalConfig,
  });

  let password = '';
  const secretsManagerParams = {
    SecretId: 'TestUserPassword',
  };
  const command = new GetSecretValueCommand(secretsManagerParams);
  secretsManager.send(command).then((passwordResponse) => {
    password = passwordResponse.SecretString;
    res(password);
  });
});

export const login = (userId: string) => {
  if (!secretPasssword) {
    readPassword.then((password: string) => {
      secretPasssword = password;
    });
  }

  loginCognito(userId, secretPasssword).then(() => {
    cy.location('search').then((query) => {
      const code = query.replace('?code=', '');
      cy.request(`${tokenUri}${query}`).then((response) => {
        const accessTokenKey = `CognitoIdentityServiceProvider.${clientId}.${userId}.accessToken`;
        const idTokenKey = `CognitoIdentityServiceProvider.${clientId}.${userId}.idToken`;
        const refreshTokenKey = `CognitoIdentityServiceProvider.${clientId}.${userId}.refreshToken`;
        const lastAuhtUser = `CognitoIdentityServiceProvider.${clientId}.LastAuthUser`;
        const signInDetails = `CognitoIdentityServiceProvider.${clientId}.${userId}.signInDetails`;
        cy.setLocalStorage(accessTokenKey, response.body['access_token']);
        cy.setLocalStorage(idTokenKey, response.body['id_token']);
        cy.setLocalStorage(refreshTokenKey, response.body['refresh_token']);
        cy.setLocalStorage(lastAuhtUser, userId);
        cy.setLocalStorage(signInDetails, `{"loginId":"${userId}","authFlowType":"USER_SRP_AUTH"}`);
        cy.reload();
        console.log(response.body);
      });
    });
  });
};

const loginCognito = (userId: string, password: string) => {
  return new Cypress.Promise((resolve, reject) => {
    cy.intercept({ url: '*', times: 15 }, (req) =>
      req.on('response', (res) => {
        const setCookies = res.headers['set-cookie'];
        res.headers['set-cookie'] = (Array.isArray(setCookies) ? setCookies : [setCookies])
          .filter((x) => x)
          .map((headerContent) => headerContent.replace(/samesite=(lax|strict)/gi, 'secure; samesite=none'));
      })
    );

    cy.origin(cognitoUri, { args: { userId, password, params } }, ({ userId, password, params }) => {
      cy.visit(`/login?${params}`);
      cy.get('input[name=username]:visible').type(userId);
      cy.get('input[name="password"]:visible').type(password, { log: false });
      cy.get('input[name=signInSubmitButton]:visible').click({});
    });
    resolve();
  });
};
