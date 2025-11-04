# TestUsers Migration Examples

This document shows real examples of test files that have been migrated to use the new `TestUsers` structure.

## Example 1: curator_worklist.ts

### Before Migration

```typescript
import {
  userBIBSYSPublishNoRights,
  userBIBSYSCurator2,
  userBIBSYSDoiCurator,
  userBIBSYSMessages,
  userNtnuNviCurator,
  userBIBSYSPublishingCurator,
  userBIBSYSSupportCurator,
  userNtnuVerifiedContributor,
  CategoryTypes,
} from '../../../support/constants';

const curatorUsers = {
  'Publishing-Curator': userBIBSYSPublishingCurator,
  'Support-Curator': userBIBSYSSupportCurator,
  'Doi-Curator': userBIBSYSDoiCurator,
  'Nvi-Curator': userNtnuNviCurator,
};

const createWorklistItem = (title: string, type: string) => {
  if (type === NVI) {
    cy.login(userNtnuVerifiedContributor);
  } else {
    cy.login(userBIBSYSPublishNoRights);
  }
  // ... rest of implementation
};

When('the Curator sends an answer of type "Support"', () => {
  cy.login(userBIBSYSMessages);
  // ... rest of implementation

  cy.login(userBIBSYSCurator2);
  // ... rest of implementation
});

Then('the Request status is set to "Answered"', () => {
  cy.login(userBIBSYSMessages);
  // ... rest of implementation
});
```

### After Migration

```typescript
import {
  CategoryTypes,
  TestUsers,
} from '../../../support/constants';

const curatorUsers = {
  'Publishing-Curator': TestUsers.curators.bibsys.publishing,
  'Support-Curator': TestUsers.curators.bibsys.support,
  'Doi-Curator': TestUsers.curators.bibsys.doi,
  'Nvi-Curator': TestUsers.curators.ntnu.nvi,
};

const createWorklistItem = (title: string, type: string) => {
  if (type === NVI) {
    cy.login(TestUsers.nvi.ntnu.verifiedContributor);
  } else {
    cy.login(TestUsers.publishing.noRights);
  }
  // ... rest of implementation
};

When('the Curator sends an answer of type "Support"', () => {
  cy.login(TestUsers.messaging.basic);
  // ... rest of implementation

  cy.login(TestUsers.curators.bibsys.curator2);
  // ... rest of implementation
});

Then('the Request status is set to "Answered"', () => {
  cy.login(TestUsers.messaging.basic);
  // ... rest of implementation
});
```

### Benefits

✅ **Single import** - Only need to import `TestUsers` instead of 8 individual user constants
✅ **Self-documenting** - `TestUsers.curators.bibsys.publishing` is clearer than `userBIBSYSPublishingCurator`
✅ **Autocomplete support** - IDE suggests all available users
✅ **Easier refactoring** - All users are in one namespace

---

## Example 2: contributor_tab.ts

### Before Migration

```typescript
import { Before, DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, userUnitContributors, userUnitWithAuthor } from '../../../support/constants';

Before(() => {
  cy.login(userUnitContributors);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get(`[data-testid=resource-type-chip-${CategoryTypes.BOOK_MONOGRAPH}]`).click();
});

When('the Registration has an Unverified Contributor', () => {
  cy.mockPersonSearch(userUnitWithAuthor);
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  // ... rest of implementation
});

Given('Creator opens Dialog to Verify Contributor', () => {
  cy.mockPersonSearch(userUnitWithAuthor);
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  // ... rest of implementation
});
```

### After Migration

```typescript
import { Before, DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, TestUsers } from '../../../support/constants';

Before(() => {
  cy.login(TestUsers.features.contributors);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get(`[data-testid=resource-type-chip-${CategoryTypes.BOOK_MONOGRAPH}]`).click();
});

When('the Registration has an Unverified Contributor', () => {
  cy.mockPersonSearch(TestUsers.creators.basic);
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  // ... rest of implementation
});

Given('Creator opens Dialog to Verify Contributor', () => {
  cy.mockPersonSearch(TestUsers.creators.basic);
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  // ... rest of implementation
});
```

### Benefits

✅ **Feature-specific user** - `TestUsers.features.contributors` clearly indicates this test is for contributor features
✅ **Consistent naming** - `TestUsers.creators.basic` is the standard way to refer to the basic creator
✅ **Better organization** - Easy to find all contributor-related tests

---

## Example 3: save_research_data.ts

### Before Migration

```typescript
import { CategoryTypes, userUnitSaveResearchData } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';

Given('Author begins registering a Registration', () => {
  const titleId = uuidv4();
  cy.wrap(titleId).as('titleId');
  cy.login(userUnitSaveResearchData);
});
```

### After Migration

```typescript
import { CategoryTypes, TestUsers } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';

Given('Author begins registering a Registration', () => {
  const titleId = uuidv4();
  cy.wrap(titleId).as('titleId');
  cy.login(TestUsers.byWorkflow.researchData.save);
});
```

### Benefits

✅ **Workflow-based organization** - `TestUsers.byWorkflow.researchData.save` clearly indicates this is for research data workflows
✅ **Easier to find** - All research data users are grouped together
✅ **Intention is clear** - The `.save` suffix indicates this user is for save/create operations

---

## Migration Checklist

When migrating a test file to use `TestUsers`:

- [ ] Replace individual user imports with `TestUsers` import
- [ ] Update all `cy.login()` calls to use `TestUsers.*` paths
- [ ] Update any helper functions or constants that reference old user variables
- [ ] Run the tests to ensure they still pass
- [ ] Commit the changes with a clear message

---

## Common Migration Patterns

### Pattern 1: Basic Creator

```typescript
// Before
import { userUnitWithAuthor } from '../support/constants';
cy.login(userUnitWithAuthor);

// After
import { TestUsers } from '../support/constants';
cy.login(TestUsers.creators.basic);
```

### Pattern 2: BIBSYS Curators

```typescript
// Before
import {
  userBIBSYSPublishingCurator,
  userBIBSYSSupportCurator,
  userBIBSYSDoiCurator
} from '../support/constants';

cy.login(userBIBSYSPublishingCurator);
cy.login(userBIBSYSSupportCurator);
cy.login(userBIBSYSDoiCurator);

// After
import { TestUsers } from '../support/constants';

cy.login(TestUsers.curators.bibsys.publishing);
cy.login(TestUsers.curators.bibsys.support);
cy.login(TestUsers.curators.bibsys.doi);
```

### Pattern 3: Institution-specific Users

```typescript
// Before
import { userNtnuNviCurator, userNtnuVerifiedContributor } from '../support/constants';

cy.login(userNtnuNviCurator);
cy.login(userNtnuVerifiedContributor);

// After
import { TestUsers } from '../support/constants';

cy.login(TestUsers.curators.ntnu.nvi);
cy.login(TestUsers.nvi.ntnu.verifiedContributor);
```

### Pattern 4: Messaging Users

```typescript
// Before
import { userBIBSYSMessages } from '../support/constants';
cy.login(userBIBSYSMessages);

// After
import { TestUsers } from '../support/constants';
cy.login(TestUsers.messaging.basic);
```

### Pattern 5: Publishing Rights

```typescript
// Before
import { userBIBSYSPublishNoRights } from '../support/constants';
cy.login(userBIBSYSPublishNoRights);

// After
import { TestUsers } from '../support/constants';
cy.login(TestUsers.publishing.noRights);
```

---

## Tips for Successful Migration

1. **Use your IDE's autocomplete** - Type `TestUsers.` and let your IDE show you all available options
2. **Refer to TEST_USERS_GUIDE.md** - It has comprehensive documentation of all user categories
3. **Check TEST_USERS_EXAMPLES.md** - It has 13 real-world usage examples
4. **Migrate file by file** - Don't try to migrate everything at once
5. **Run tests after each migration** - Ensure nothing breaks
6. **Keep backward compatibility in mind** - Old imports still work if you need them temporarily

---

## Need Help?

- **Finding the right user?** Check [TEST_USERS_GUIDE.md](./TEST_USERS_GUIDE.md) section "Finding the Right User"
- **Want to see more examples?** Check [TEST_USERS_EXAMPLES.md](./TEST_USERS_EXAMPLES.md)
- **Not sure which category?** Look at the hierarchical structure in `constants.ts`
