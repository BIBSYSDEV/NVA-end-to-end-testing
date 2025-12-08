import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { v4 as uuid } from 'uuid';

const cognitoUri = Cypress.env('COGNITO_URI');
const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
const region = Cypress.env('AWS_REGION') ?? 'eu-west-1';
const clientId = Cypress.env('AWS_CLIENT_ID');
const redirectUri = 'https://e2e.nva.aws.unit.no';
const tokenUri = 'https://o8f47ax77k.execute-api.eu-west-1.amazonaws.com/Prod/exchange';

let secretPasssword = '';

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
  return new Cypress.Promise((resolve, reject) => {
    if (!secretPasssword) {
      readPassword.then((password: string) => {
        secretPasssword = password;
        loginNva(userId);
        resolve();
      });
    } else {
      loginNva(userId);
      resolve();
    }
  });
};

const loginNva = (userId: string) => {
  cy.clearAllLocalStorage();
  cy.clearAllCookies();
  getCode(userId, secretPasssword).then((code) => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    cy.request({
      url: `${cognitoUri}/oauth2/token`,
      method: 'POST',
      headers: headers,
      body: {
        'grant_type': 'authorization_code',
        'client_id': clientId,
        'redirect_uri': redirectUri,
        'code': code,
      },
      followRedirect: false,
    }).then((response) => {
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
      cy.setLocalStorage('i18nextLng', 'eng');
      cy.setLocalStorage('previouslyLoggedIn', 'false');
      Cypress.env('accessToken', response.body['access_token']);
      cy.reload();
    });
  });
};

const getCode = (userName: string, password: string) => {
  return new Cypress.Promise((resolve, reject) => {
    const url = generateUrl();
    const randomUuid = uuid();
    const headers = {
      'Cookie': `XSRF-TOKEN=${randomUuid}`,
      'Origin': cognitoUri,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': url,
    };

    const data = {
      '_csrf': randomUuid,
      'username': userName,
      'password': password,
    };

    cy.request({
      url: url,
      method: 'POST',
      headers: headers,
      body: data,
      followRedirect: false,
    }).then((response) => {
      if (response.status === 302) {
        const location = response.redirectedToUrl;
        if (location) {
          const code = location.replace('https://e2e.nva.aws.unit.no/?code=', '');
          resolve(code);
        }
      }
    });
  });
};

const generateUrl = () => {
  const baseUrl = `${cognitoUri}/login`;
  const queryString = `client_id=${encodeURIComponent(clientId)}&response_type=code&scope=${encodeURIComponent(
    'aws.cognito.signin.user.admin email https://api.nva.unit.no/scopes/frontend openid phone profile'
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  console.log(`${baseUrl}?${queryString}`);
  return `${baseUrl}?${queryString}`;
};
