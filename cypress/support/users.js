export const createUser = (user, name, connectAuthor, feideid) => {
  cy.deleteCognitoUser(user).then(() => {
    cy.createCognitoUser(user, name).then((idToken) => {
      cy.wrap(idToken).as('idToken');
      if (connectAuthor) {
        cy.get('@idToken').then((idToken) => {
          cy.getAuthorities(formatName(name), idToken).then((authorities) => {
            if (authorities?.length === 0) {
              cy.createAuthority({ ...splitName(name), feideid: feideid ? feideid : '' }, idToken).then((authority) => {
                cy.wrap(authority).as('authority');
              });
            }
          });
        });
      }
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
