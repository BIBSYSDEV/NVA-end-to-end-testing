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
      cy.createUser(user, name).then(async (idToken) => {
        cy.wrap(idToken).as('idToken');
        const authorities = await getAuthorities(formatName(name), '', idToken);
        const authority = authorities.length > 0 ? authorities[0] : await createAuthority(splitName(name), idToken);
        resolve(authority);
      });
    });
  });
};

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
