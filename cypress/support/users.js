
export const createUser = (user, name) => {
    cy.deleteUser(user).then(() => {
        cy.createUser(user, name).then((idToken) => {
          cy.wrap(idToken).as('idToken');
        });
      });
}

export const createUserWithAuthor = (user, name) => {
    cy.deleteUser(user).then(() => {
        cy.createUser(user, name).then((idToken) => {
          cy.wrap(idToken).as('idToken');
          cy.get('@idToken').then((idToken) => {
            cy.getAuthorities(splitName(name), idToken).then((authorities) => {
              if (authorities?.length === 0) {
                cy.createAuthority(newAuthority, idToken).then((authority) => {
                  cy.wrap(authority).as('authority');
                });
              }
            });
          });
        });
      });
}

export const createUserWithAuthorAndConnectedFeideId = (user, name, feideid) => {
    cy.deleteUser(user).then(() => {
        cy.createUser(user, name).then((idToken) => {
          cy.wrap(idToken).as('idToken');
          cy.get('@idToken').then((idToken) => {
            cy.getAuthorities({ ...splitName(name) , feideid: feideid }, idToken).then((authorities) => {
              if (authorities?.length === 0) {
                cy.createAuthority(newAuthority, idToken).then((authority) => {
                  cy.wrap(authority).as('authority');
                });
              }
            });
          });
        });
      });
}

export const formatName = (name) => {
  return `${splitName(name).lastName}, ${splitName(name).lastName}`;
}

export const splitName = (name) => {
  return {
    firstName: name.split(' ')[0], 
    lastName: name.split(' ')[1]
  }
}

export const invertName = (firstName, lastName) => {
  return `${lastName}, ${firstName}`;
}