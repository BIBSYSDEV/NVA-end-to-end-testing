import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { v4 as uuid } from 'uuid';

const cognitoUri = Cypress.env('COGNITO_URI');
const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
const region = Cypress.env('AWS_REGION') ?? 'eu-west-1';
const clientId = Cypress.env('AWS_CLIENT_ID');
const redirectUri = 'https://e2e.nva.aws.unit.no';

let passwordPromise: Promise<string> | undefined;

/**
 * Fetches the shared test user password from AWS Secrets Manager.
 * Lazy and memoized: specs that run entirely on cached sessions never call
 * Secrets Manager and therefore do not need valid AWS credentials.
 * A failed fetch clears the memo so the next login attempt retries.
 */
const readPassword = () => {
  if (!passwordPromise) {
    passwordPromise = new Promise((resolve, reject) => {
      const secretsManager = new SecretsManagerClient({
        region: region,
        credentials: {
          accessKeyId: awsAccessKeyId,
          secretAccessKey: awsSecretAccessKey,
          sessionToken: awsSessionToken,
        },
      });
      const command = new GetSecretValueCommand({ SecretId: 'TestUserPassword' });
      secretsManager.send(command).then((passwordResponse) => {
        resolve(passwordResponse.SecretString);
      }, reject);
    });
    passwordPromise.catch(() => {
      passwordPromise = undefined;
    });
  }
  return passwordPromise;
};

const storageKey = (suffix: string) => `CognitoIdentityServiceProvider.${clientId}.${suffix}`;

/** The localStorage key holding the Cognito access token for the given user. */
export const accessTokenKey = (userId: string) => storageKey(`${userId}.accessToken`);

/**
 * Loads the app at /filter behind the dev basic auth.
 * Needed after cy.session, which always leaves the browser on a blank page,
 * and at the start of session setup, which begins on about:blank.
 */
export const visitApp = () => {
  cy.visit('/filter', {
    auth: {
      username: 'osteloff',
      password: 'osteloff',
    },
    failOnStatusCode: false,
  });
};

/**
 * cy.session setup: runs the full Cognito OAuth flow and stores the resulting
 * authentication state in localStorage. Only runs on session cache misses.
 * Visits the app first so the localStorage writes land on the baseUrl origin,
 * since cy.session snapshots storage per origin.
 */
export const sessionLoginSetup = (userId: string) => {
  visitApp();
  cy.wrap(readPassword(), { log: false })
    .then((password: string) => getCode(userId, password))
    .then((code: string) => exchangeCodeForTokens(code))
    .then((response) => storeAuthenticationState(userId, response.body));
};

/** Exchanges an OAuth authorization code for Cognito tokens. */
const exchangeCodeForTokens = (code: string) => {
  return cy.request({
    url: `${cognitoUri}/oauth2/token`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      'grant_type': 'authorization_code',
      'client_id': clientId,
      'redirect_uri': redirectUri,
      'code': code,
    },
    followRedirect: false,
  });
};

/**
 * Writes the localStorage state the SPA reads on startup to treat the user as
 * logged in: the Amplify CognitoIdentityServiceProvider keys plus app flags.
 * Clears storage first to drop keys the app wrote during the setup visit.
 */
const storeAuthenticationState = (userId: string, tokens: Record<string, string>) => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.localStorage.setItem(accessTokenKey(userId), tokens['access_token']);
    win.localStorage.setItem(storageKey(`${userId}.idToken`), tokens['id_token']);
    win.localStorage.setItem(storageKey(`${userId}.refreshToken`), tokens['refresh_token']);
    win.localStorage.setItem(storageKey('LastAuthUser'), userId);
    win.localStorage.setItem(storageKey(`${userId}.signInDetails`), `{"loginId":"${userId}","authFlowType":"USER_SRP_AUTH"}`);
    win.localStorage.setItem('i18nextLng', 'eng');
    win.localStorage.setItem('previouslyLoggedIn', 'false');
    win.localStorage.setItem('beta', 'true');
  });
};

const TOKEN_EXPIRY_BUFFER_SECONDS = 600;

/**
 * Decodes the payload of a JWT. The segments are base64url-encoded, so '-' and
 * '_' must be mapped to standard base64 before atob can handle them.
 */
export const decodeJwtPayload = (token: string) =>
  JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));

/**
 * The origin of the configured baseUrl. cy.getAllLocalStorage keys its result
 * by bare origin, while baseUrl may carry a trailing slash.
 */
const baseUrlOrigin = () => new URL(Cypress.config('baseUrl')).origin;

/**
 * cy.session validate: passes only if a cached access token exists for the user
 * and does not expire within the buffer. A throw makes cy.session run the setup
 * again instead of restoring a stale session.
 */
export const validateSession = (userId: string) => {
  cy.getAllLocalStorage().then((storage) => {
    const token = storage[baseUrlOrigin()]?.[accessTokenKey(userId)] as string | undefined;
    if (!token) {
      throw new Error(`No cached access token for ${userId}`);
    }
    const payload = decodeJwtPayload(token);
    if (payload.exp * 1000 < Date.now() + TOKEN_EXPIRY_BUFFER_SECONDS * 1000) {
      throw new Error(`Cached token for ${userId} is expiring; re-authenticating`);
    }
  });
};

/**
 * Repopulates Cypress.env('accessToken') and Cypress.env('CURRENT_USER') from
 * the restored localStorage. Cypress.env does not survive spec boundaries while
 * the session cache does, so this must run on every login, including cache hits.
 */
export const exposeAccessToken = (userId: string) => {
  cy.window().then((win) => {
    const accessToken = win.localStorage.getItem(accessTokenKey(userId));
    if (!accessToken) {
      throw new Error(`No access token in localStorage after session restore for ${userId}`);
    }
    Cypress.env('accessToken', accessToken);
    Cypress.env('CURRENT_USER', userId);
  });
};

/**
 * Posts username and password to the Cognito hosted login and yields the
 * authorization code from the 302 redirect. Fails when the login does not
 * redirect, e.g. on a wrong password or a Cognito error page.
 */
const getCode = (userName: string, password: string) => {
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

  return cy
    .request({
      url: url,
      method: 'POST',
      headers: headers,
      body: data,
      followRedirect: false,
    })
    .then((response) => {
      const location = response.status === 302 ? response.redirectedToUrl : undefined;
      if (!location) {
        throw new Error(`Cognito login did not redirect with an authorization code (status ${response.status})`);
      }
      return location.replace('https://e2e.nva.aws.unit.no/?code=', '');
    });
};

/** Builds the Cognito hosted-UI login URL for the authorization code flow. */
const generateUrl = () => {
  const baseUrl = `${cognitoUri}/login`;
  const queryString = `client_id=${encodeURIComponent(clientId)}&response_type=code&scope=${encodeURIComponent(
    'aws.cognito.signin.user.admin email https://api.nva.unit.no/scopes/frontend openid phone profile'
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  return `${baseUrl}?${queryString}`;
};
