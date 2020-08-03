export const createUser = (user, name, connectAuthor, feideid) => {
  console.log('Create user:');
  console.log(user, name);
  cy.deleteUser(user).then(() => {
    cy.createUser(user, name).then((idToken) => {
      cy.wrap(idToken).as('idToken');
      if (connectAuthor) {
        cy.get('@idToken').then((idToken) => {
          console.log(formatName(name));
          cy.getAuthorities(formatName(name), idToken).then((authorities) => {
            console.log(authorities);
            if (authorities?.length === 0) {
              const newAuthority = { ...splitName(name), feideid: feideid ? feideid : '' };
              console.log(newAuthority);
              cy.createAuthority(newAuthority, idToken).then((authority) => {
                cy.wrap(authority).as('authority');
              });
            } else {
              if (!feideid) {
                authorities.forEach((authority) => {
                  console.log(authority);
                  if (authority.feideids.includes(user)) {
                    cy.removeQualifierId(authority.systemControlNumber, 'feideid', user, idToken);
                  }
                });
              }
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