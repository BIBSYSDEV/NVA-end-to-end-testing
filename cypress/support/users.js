
export const createUser = (user, name, connectAuthor, feideid) => {
    cy.deleteUser(user).then(() => {
        cy.createUser(user, name).then((idToken) => {
          cy.wrap(idToken).as('idToken');
          if( connectAuthor ) {
            cy.get('@idToken').then((idToken) => {
              feideid = feideid ? feideid : '';
              cy.getAuthorities({ ...splitName(name) , feideid: feideid }, idToken).then((authorities) => {
                if (authorities?.length === 0) {
                  cy.createAuthority(newAuthority, idToken).then((authority) => {
                    cy.wrap(authority).as('authority');
                  });
                }
              });
            });
          }
        });
      });
}

export const removeQualifier = (user, qualifier, type) => {

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