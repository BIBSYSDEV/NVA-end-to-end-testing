
export const createUser = (user, name) => {
    cy.deleteUser(user).then(() => {
        cy.addUser(user, name).then((idToken) => {
          cy.wrap(idToken).as('idToken');
        });
      });
}

export const createUserWithAuthor = (user, name) => {
    cy.deleteUser(user).then(() => {
        cy.addUser(user, name).then((idToken) => {
          cy.wrap(idToken).as('idToken');
          cy.get('@idToken').then((idToken) => {
            cy.getAuthorities(splitName(name), idToken).then((authorities) => {
              console.log(authorities);
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
        cy.addUser(user, name).then((idToken) => {
          cy.wrap(idToken).as('idToken');
          cy.get('@idToken').then((idToken) => {
            cy.getAuthorities({ ...splitName(name) , feideid: feideid }, idToken).then((authorities) => {
              console.log(authorities);
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
  return `${name.split(' ')[1]}, ${name.split(' ')[0]}`;
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