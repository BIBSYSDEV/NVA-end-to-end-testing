// import * as AWS from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';
// import Amplify from 'aws-amplify';
// import { Auth } from 'aws-amplify';

// const identityServiceProvider = new AWS.CognitoIdentityServiceProvider();
// const authFlow = 'USER_PASSWORD_AUTH';
// const passwords = {};

// const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
// const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
// const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
// const region = Cypress.env('AWS_REGION') ?? 'eu-west-1';
// const userPoolId = Cypress.env('AWS_USER_POOL_ID');
// const clientId = Cypress.env('AWS_CLIENT_ID');

// AWS.config.update({
//   accessKeyId: awsAccessKeyId,
//   secretAccessKey: awsSecretAccessKey,
//   sessionToken: awsSessionToken,
//   region: region,
// });

// const amplifyConfig = {
//   Auth: {
//     region: region,
//     userPoolId: userPoolId,
//     userPoolWebClientId: clientId,
//   },
// };

// export const login = (userId) => new Cypress.Promise((resolve, reject) => {
//   Amplify.configure(amplifyConfig);
//   let randomPassword = `P%${uuidv4()}`;
//   if (!passwords[userId]) {
//     console.log('Setting password...');
//     const passwordParams = {
//       Password: randomPassword,
//       UserPoolId: userPoolId,
//       Username: userId,
//       Permanent: true,
//     };

//     passwords[userId] = randomPassword;
//     identityServiceProvider.adminSetUserPassword(passwordParams, (err, data) => {
//       if (data) {
//         const authorizeUser = {
//           AuthFlow: authFlow,
//           ClientId: clientId,
//           AuthParameters: {
//             USERNAME: userId,
//             PASSWORD: randomPassword,
//           },
//         };

//         let tries = 0;
//         let trying = false;
//         do {
//           identityServiceProvider.initiateAuth(authorizeUser, async (err, data) => {
//             if (data) {
//               if (!data.ChallengeName) {
//                 await Auth.signIn(userId, randomPassword);
//                 resolve(data.AuthenticationResult.IdToken);
//               } else {
//                 trying = true;
//                 console.log('fail.. challenge');
//                 reject(err);
//               }
//             } else {
//               trying = true;
//               console.log('fail.. init auth');
//               reject(err);
//             }
//           });
//           tries++;
//           if (tries > 3) {
//             trying = false;
//           }
//         } while (trying);
//       } else {
//         trying = true;
//         console.log('fail.. set password');
//         reject(err);
//       }
//     });
//   } else {
//     console.log('Retrieving password...');
//     randomPassword = passwords[userId];
//     const authorizeUser = {
//       AuthFlow: authFlow,
//       ClientId: clientId,
//       AuthParameters: {
//         USERNAME: userId,
//         PASSWORD: randomPassword,
//       },
//     };

//     let tries = 0;
//     let trying = false;
//     do {
//       identityServiceProvider.initiateAuth(authorizeUser, async (err, data) => {
//         if (data) {
//           if (!data.ChallengeName) {
//             await Auth.signIn(userId, randomPassword);
//             resolve(data.AuthenticationResult.IdToken);
//           } else {
//             trying = true;
//             console.log('fail.. challenge');
//             reject(err);
//           }
//         } else {
//           trying = true;
//           console.log('fail.. init auth');
//           reject(err);
//         }
//       });
//       tries++;
//       if (tries > 3) {
//         trying = false;
//       }
//     } while (trying);
//   }
// });
