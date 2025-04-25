import { signIn, signOut } from 'aws-amplify/auth';
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { Amplify, ResourcesConfig } from 'aws-amplify';

const region = Cypress.env('AWS_REGION') ?? 'eu-west-1';
const userPoolId = Cypress.env('AWS_USER_POOL_ID');
const clientId = Cypress.env('AWS_CLIENT_ID');
const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');

const globalConfig = {
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  sessionToken: awsSessionToken,
};


const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: clientId,
      userPoolId: userPoolId,
      loginWith: {
        username: true,
      },
    },
  },
};

// Amplify.configure(amplifyConfig);

const identityServiceProvider = new CognitoIdentityProviderClient({
  region: region,
  credentials: globalConfig,
});
const secretsManager = new SecretsManagerClient({
  region: region,
  credentials: globalConfig,
});


const loginCognito = (userId: string) => {
  return new Cypress.Promise((resolve, reject) => {
    Amplify.configure(amplifyConfig);
    const secretsManagerParams = {
      SecretId: 'TestUserPassword',
    };
    const command = new GetSecretValueCommand(secretsManagerParams);
    let testUserPassword = '';
    secretsManager.send(command).then((passwordResponse) => {
      if (passwordResponse) {
        testUserPassword = passwordResponse.SecretString;

        const authorizeUser = {
          AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
          ClientId: clientId,
          AuthParameters: {
            USERNAME: userId,
            PASSWORD: testUserPassword,
          },
        };

        const command = new InitiateAuthCommand(authorizeUser);

        identityServiceProvider.send(command).then((authorizeResponse) => {
          if (authorizeResponse) {
            if (!authorizeResponse.ChallengeName) {
              try {
                signOut().then(() => {
                  signIn({ username: userId, password: testUserPassword }).then(() => {
                    resolve(authorizeResponse.AuthenticationResult.IdToken);
                  });
                });
              } catch (e) {
                console.log('fail... sign in');
                console.log(e);
                reject();
              }
            } else {
              console.log('fail.. challenge');
              console.log(authorizeResponse.ChallengeName);
            }
          } else {
            console.log('fail.. init auth');
            reject();
          }
        });
      }
    });
  });
};