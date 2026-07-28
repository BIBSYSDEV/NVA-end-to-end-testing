# Test Users - Usage Examples

Real-world examples showing how to use the consolidated `TestUsers` object.

## Example 1: Basic Creator Workflow

**Old way:**

```typescript
import { userUnitWithAuthor } from '../../../support/constants';

Given('the user is logged in as Creator', () => {
  cy.login(userUnitWithAuthor);
});
```

**New way:**

```typescript
import { TestUsers } from '../../../support/constants';

Given('the user is logged in as Creator', () => {
  cy.login(TestUsers.creators.basic);
});
```

---

## Example 2: Curator Workflows

**Old way:**

```typescript
import {
  userBIBSYSPublishingCurator,
  userBIBSYSSupportCurator,
  userBIBSYSDoiCurator,
  userNtnuNviCurator,
} from '../../../support/constants';

When('the {string} logs in', (curatorType: string) => {
  const users = {
    'Publishing-Curator': userBIBSYSPublishingCurator,
    'Support-Curator': userBIBSYSSupportCurator,
    'DOI-Curator': userBIBSYSDoiCurator,
    'NVI-Curator': userNtnuNviCurator,
  };
  cy.login(users[curatorType]);
});
```

**New way:**

```typescript
import { TestUsers } from '../../../support/constants';

When('the {string} logs in', (curatorType: string) => {
  const users = {
    'Publishing-Curator': TestUsers.curators.bibsys.publishing,
    'Support-Curator': TestUsers.curators.bibsys.support,
    'DOI-Curator': TestUsers.curators.bibsys.doi,
    'NVI-Curator': TestUsers.curators.ntnu.nvi,
  };
  cy.login(users[curatorType]);
});
```

---

## Example 3: Multi-user Collaboration

**Scenario:** User creates publication, curator approves it

```typescript
import { TestUsers } from '../../../support/constants';

Given('a user creates a publication', () => {
  cy.login(TestUsers.creators.basic);
  cy.createPublishedRegistration('My Article', CategoryTypes.ACADEMIC_ARTICLE);
  const publicationTitle = 'My Article';
  cy.wrap(publicationTitle).as('publicationTitle');
});

When('a curator reviews the publication', () => {
  cy.login(TestUsers.curators.bibsys.publishing);
  cy.visit('/tasks');
  cy.get('@publicationTitle').then((title) => {
    cy.searchFor(title);
  });
});

Then('the curator can approve it', () => {
  cy.getDataTestId('approve-button').click();
  cy.getSuccess();
});
```

---

## Example 4: NVI Workflow

**Scenario:** Test NVI candidate validation across institutions

```typescript
import { TestUsers, CategoryTypes } from '../../../support/constants';

// Create NVI candidate at USN
cy.login(TestUsers.nvi.usn.institution);
cy.createPublishedRegistration('NVI Candidate USN', CategoryTypes.ACADEMIC_ARTICLE);

// Validate as USN curator
cy.login(TestUsers.curators.usn.nvi);
cy.visit('/tasks');
cy.selectNVICandidate('NVI Candidate USN');
cy.getDataTestId('approve-nvi-button').click();

// Verify as NTNU curator (cross-institution)
cy.login(TestUsers.curators.ntnu.nvi);
cy.visit('/tasks');
cy.getNVIWorklistItem('NVI Candidate USN').should('exist');
```

---

## Example 5: Institution-specific Testing

**Scenario:** Test features for different institutions

```typescript
import { TestUsers } from '../../../support/constants';

const institutions = [
  { name: 'BIBSYS', user: TestUsers.curators.bibsys.curator1 },
  { name: 'NTNU', user: TestUsers.curators.ntnu.nvi },
  { name: 'SINTEF', user: TestUsers.curators.sintef.publication },
];

institutions.forEach(({ name, user }) => {
  it(`should work for ${name} institution`, () => {
    cy.login(user);
    cy.visit('/editor');
    cy.getDataTestId('institution-name').should('contain', name);
  });
});
```

---

## Example 6: Publication Type Workflows

**Old way:**

```typescript
import { userUnitSaveJournal, userUnitSaveBook, userUnitSaveThesis } from '../../../support/constants';

const publicationTypeUsers = {
  'journal': userUnitSaveJournal,
  'book': userUnitSaveBook,
  'thesis': userUnitSaveThesis,
};
```

**New way:**

```typescript
import { TestUsers } from '../../../support/constants';

const publicationTypeUsers = {
  'journal': TestUsers.byWorkflow.journal.save,
  'book': TestUsers.byWorkflow.book.save,
  'thesis': TestUsers.byWorkflow.thesis.save,
};
```

---

## Example 7: DOI Workflows

```typescript
import { TestUsers, CategoryTypes } from '../../../support/constants';

describe('DOI Minting', () => {
  it('should request draft DOI', () => {
    cy.login(TestUsers.doi.draft);
    cy.createPublishedRegistration('My Publication', CategoryTypes.ACADEMIC_ARTICLE);
    cy.getDataTestId('request-doi-button').click();
    cy.getSuccess();
  });

  it('should be processed by DOI curator', () => {
    cy.login(TestUsers.curators.bibsys.doi);
    cy.visit('/tasks');
    cy.filterMessages('DoiRequests');
    cy.getDataTestId('mint-doi-button').click();
    cy.getSuccess();
  });
});
```

---

## Example 8: Rights and Permissions

```typescript
import { TestUsers } from '../../../support/constants';

it('should prevent publishing without rights', () => {
  cy.login(TestUsers.publishing.noRights);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration('example.pdf', 'My Publication');
  cy.getDataTestId('save-button').click();

  // Should NOT see publish button
  cy.getDataTestId('publish-button').should('not.exist');
});

it('should allow publishing with rights', () => {
  cy.login(TestUsers.publishing.withRights);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration('example.pdf', 'My Publication');
  cy.getDataTestId('save-button').click();

  // Should see publish button
  cy.getDataTestId('publish-button').should('exist');
});
```

---

## Example 9: Messaging Workflows

```typescript
import { TestUsers } from '../../../support/constants';

Given('a user sends a support request', () => {
  cy.login(TestUsers.messaging.requestSupport);
  cy.visit('/my-page');
  cy.getDataTestId('support-accordion').click();
  cy.getDataTestId('message-field').type('I need help{enter}');
  cy.getSuccess();
});

When('support curator responds', () => {
  cy.login(TestUsers.curators.bibsys.support);
  cy.visit('/tasks');
  cy.filterMessages('Support Requests');
  cy.getDataTestId('message-field').type('How can I help?{enter}');
  cy.getSuccess();
});

Then('the user can see the response', () => {
  cy.login(TestUsers.messaging.requestSupport);
  cy.visit('/my-page');
  cy.getDataTestId('messages-accordion').click();
  cy.contains('How can I help?').should('be.visible');
});
```

---

## Example 10: Admin Workflows

```typescript
import { TestUsers } from '../../../support/constants';

describe('User Administration', () => {
  beforeEach(() => {
    cy.login(TestUsers.admins.app);
    cy.visit('/admin/users');
  });

  it('should assign curator role', () => {
    cy.searchForUser('test-user@example.no');
    cy.getDataTestId('assign-role-button').click();
    cy.getDataTestId('role-select').select('Curator');
    cy.getDataTestId('save-button').click();
    cy.getSuccess();
  });

  it('should manage institution admins', () => {
    cy.login(TestUsers.admins.institution);
    cy.visit('/editor');
    cy.getDataTestId('user-management-tab').click();
    // Institution-specific user management
  });
});
```

---

## Example 11: Feature-specific Testing

```typescript
import { TestUsers } from '../../../support/constants';

describe('Favorites', () => {
  it('should add publication to favorites', () => {
    cy.login(TestUsers.features.favorites.favorite1);
    cy.visit('/search');
    cy.searchFor('Test Publication');
    cy.getDataTestId('add-to-favorites').click();
    cy.getSuccess();
  });

  it('should remove publication from favorites', () => {
    cy.login(TestUsers.features.favorites.favorite1);
    cy.visit('/my-page');
    cy.getDataTestId('favorites-tab').click();
    cy.getDataTestId('remove-from-favorites').click();
    cy.getSuccess();
  });
});

describe('ORCID Management', () => {
  it('should remove ORCID from profile', () => {
    cy.login(TestUsers.features.orcid.remove);
    cy.visit('/my-profile');
    cy.getDataTestId('remove-orcid-button').click();
    cy.getDataTestId('confirm-button').click();
    cy.getSuccess();
  });
});
```

---

## Example 12: Edge Cases

```typescript
import { TestUsers } from '../../../support/constants';

it('should handle user with no role', () => {
  cy.login(TestUsers.special.noRole);
  cy.visit('/');

  // Should see limited functionality
  cy.getDataTestId('new-registration-button').should('not.exist');
  cy.getDataTestId('editor-link').should('not.exist');
});

it('should handle non-customer institution', () => {
  cy.login(TestUsers.special.nonCustomer);
  cy.visit('/');

  // Should see appropriate message
  cy.contains('Your institution is not a customer').should('be.visible');
});
```

---

## Example 13: Complex Multi-step Workflow

**Scenario:** Full publication lifecycle with multiple roles

```typescript
import { TestUsers, CategoryTypes } from '../../../support/constants';
import { v4 as uuid } from 'uuid';

describe('Publication Lifecycle', () => {
  const publicationTitle = `Integration Test ${uuid()}`;

  it('should complete full lifecycle', () => {
    // 1. Creator creates draft
    cy.login(TestUsers.creators.basic);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration('example.pdf', publicationTitle);
    cy.getDataTestId('save-button').click();
    cy.getSuccess();

    // 2. Creator requests publishing
    cy.getDataTestId('publish-button').click();
    cy.getSuccess();

    // 3. Publishing curator approves
    cy.login(TestUsers.curators.bibsys.publishing);
    cy.visit('/tasks');
    cy.searchFor(publicationTitle);
    cy.getDataTestId('approve-button').click();
    cy.getSuccess();

    // 4. Creator requests DOI
    cy.login(TestUsers.creators.basic);
    cy.visit('/my-registrations');
    cy.searchFor(publicationTitle);
    cy.getDataTestId('request-doi-button').click();
    cy.getSuccess();

    // 5. DOI curator mints DOI
    cy.login(TestUsers.curators.bibsys.doi);
    cy.visit('/tasks');
    cy.searchFor(publicationTitle);
    cy.getDataTestId('mint-doi-button').click();
    cy.getSuccess();

    // 6. Verify publication is now public with DOI
    cy.clearAllCookies();
    cy.visit('/search');
    cy.searchFor(publicationTitle);
    cy.contains(publicationTitle).click();
    cy.getDataTestId('doi-badge').should('be.visible');
  });
});
```

---

## Tips for Writing Better Tests

### 1. Use Descriptive Aliases

```typescript
// Good
cy.login(TestUsers.curators.bibsys.publishing);

// Bad
cy.login(TestUsers.curators.basic); // Which curator?
```

### 2. Group Related Tests

```typescript
describe('NVI Workflows', () => {
  context('As USN Curator', () => {
    beforeEach(() => {
      cy.login(TestUsers.curators.usn.nvi);
    });
    // Tests here
  });

  context('As NTNU Curator', () => {
    beforeEach(() => {
      cy.login(TestUsers.curators.ntnu.nvi);
    });
    // Tests here
  });
});
```

### 3. Document Complex User Choices

```typescript
// Using SINTEF publication curator because they have specific
// permissions for cross-institutional publication management
cy.login(TestUsers.curators.sintef.publication);
```

### 4. Use TypeScript for Better Safety

```typescript
// TypeScript will catch this error at compile time
cy.login(TestUsers.curators.bibsys.publishng); // ❌ Typo!
cy.login(TestUsers.curators.bibsys.publishing); // ✅ Correct
```

---

## Migration Checklist

When updating existing tests:

- [ ] Import `TestUsers` instead of individual user constants
- [ ] Replace user constants with `TestUsers.*` paths
- [ ] Update comments to reference new paths
- [ ] Use more specific users when available
- [ ] Add JSDoc comments for complex user choices
- [ ] Test that migrations work correctly

---

## Summary

The `TestUsers` object makes tests:

- ✅ **More readable** - Clear what each user represents
- ✅ **Easier to write** - Autocomplete shows all options
- ✅ **Safer** - TypeScript catches errors
- ✅ **Self-documenting** - Structure explains purpose
- ✅ **Maintainable** - Easy to find and update users

Start using it in your tests today!
