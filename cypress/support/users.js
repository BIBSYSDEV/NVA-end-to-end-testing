import {
  removeQualifierIdFromAuthority,
  addQualifierIdForAuthority,
  getAuthorities,
  createAuthority,
} from './authorityApi';

const UNIT = '20202.0.0.0';

export const createUser = (user, name) => {
  return new Cypress.Promise((resolve, reject) => {
    cy.deleteUser(user).then(() => {
      cy.createUser(user, name).then((idToken) => {
        cy.wrap(idToken).as('idToken');
        cy.get('@idToken').then(async (idToken) => {
          const authorities = await getAuthorities(formatName(name), '', idToken);
          let authority = authorities[0];
          if (authorities?.length === 0) {
            authority = await createAuthority(splitName(name), idToken);
          }
          resolve(authority);
        });
      });
    });
  });
};

// export const addQualifierToAuthority = (systemControlNumber, type, value, idToken) => {
//   return new Cypress.Promise(async (resolve, reject) => {
//     const removeResponse = await removeQualifierIdFromAuthority(systemControlNumber, type, value, idToken);
//     const response = await addQualifierIdForAuthority(systemControlNumber, type, value, idToken);

//     resolve(response);
//   });
// };

export const formatName = (name) => {
  return `${splitName(name).lastName}, ${splitName(name).firstName}`;
};

export const splitName = (name) => {
  return {
    firstName: name.split(' ')[0],
    lastName: name.split(' ')[1],
  };
};

export const invertName = (firstName, lastName) => {
  return `${lastName}, ${firstName}`;
};
