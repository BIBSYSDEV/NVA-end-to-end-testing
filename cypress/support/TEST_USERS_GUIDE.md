# Test Users Guide

This guide explains the consolidated test user structure and how to use it effectively.

## Overview

All test users are now organized in the `TestUsers` object, grouped by role and functionality. This provides:

- **Better discoverability** - Use IDE autocomplete to find users
- **Clearer organization** - Understand what each user is for
- **Type safety** - TypeScript types help prevent errors
- **Backward compatibility** - All original exports still work

## Quick Start

```typescript
import { TestUsers } from '../support/constants';

// Old way (still works)
import { userUnitWithAuthor } from '../support/constants';
cy.login(userUnitWithAuthor);

// New way (recommended)
cy.login(TestUsers.creators.basic);
cy.login(TestUsers.curators.bibsys.publishing);
cy.login(TestUsers.admins.app);
```

## User Categories

### 1. Content Creators (`TestUsers.creators`)

Basic content creators and authors for registration workflows.

```typescript
TestUsers.creators.basic; // Most common creator
TestUsers.creators.withAuthor; // Same as basic
TestUsers.creators.withAuthor1; // Additional creator 1
// ... withAuthor2 through withAuthor8
```

**Use for:** Creating publications, registrations, basic workflows

---

### 2. Curators (`TestUsers.curators`)

Organized by institution and specialty.

#### By Institution:

```typescript
// BIBSYS curators
TestUsers.curators.bibsys.curator1;
TestUsers.curators.bibsys.curator2;
TestUsers.curators.bibsys.publishing;
TestUsers.curators.bibsys.support;
TestUsers.curators.bibsys.doi;
TestUsers.curators.bibsys.collaboration;

// NTNU curators
TestUsers.curators.ntnu.nvi;
TestUsers.curators.ntnu.nvi2;

// NMBU curators
TestUsers.curators.nmbu.collaboration;

// USN curators
TestUsers.curators.usn.nvi;
TestUsers.curators.usn.changeNvi;
TestUsers.curators.usn.collaboration;

// SINTEF curators
TestUsers.curators.sintef.publication;
TestUsers.curators.sintef.doi;
TestUsers.curators.sintef.support;
```

#### By Specialty:

```typescript
TestUsers.curators.specialty.degree;
TestUsers.curators.specialty.resourceOwner;
TestUsers.curators.specialty.institution;
TestUsers.curators.specialty.draftDoi;
```

**Use for:** Approval workflows, publishing requests, DOI minting, support tickets

---

### 3. Editors (`TestUsers.editors`)

```typescript
TestUsers.editors.basic;
TestUsers.editors.editor1; // through editor5
TestUsers.editors.bibsys;
TestUsers.editors.sikt;
TestUsers.editors.sintef;
TestUsers.editors.specialty.delete;
```

**Use for:** Institution administration, curator management, publishing settings

---

### 4. Administrators (`TestUsers.admins`)

```typescript
TestUsers.admins.app; // Application admin
TestUsers.admins.app1; // Additional app admin
TestUsers.admins.institution; // Institution admin (UNIT)
TestUsers.admins.siktInstitution; // Institution admin (SIKT)
TestUsers.admins.rrs; // Rights Retention Strategy admin
```

**Use for:** System-wide settings, user management, customer registry

---

### 5. Users by Workflow (`TestUsers.byWorkflow`)

Organized by the type of content they work with.

#### Registration Workflows:

```typescript
TestUsers.byWorkflow.registration.save;
TestUsers.byWorkflow.registration.view;
TestUsers.byWorkflow.registration.edit;
TestUsers.byWorkflow.registration.myRegistrations;
TestUsers.byWorkflow.registration.openMyRegistrations;
TestUsers.byWorkflow.registration.published;
TestUsers.byWorkflow.registration.delete;
TestUsers.byWorkflow.registration.cancelDelete;
```

#### Journal Articles:

```typescript
TestUsers.byWorkflow.journal.save;
TestUsers.byWorkflow.journal.resourceType;
```

#### Books:

```typescript
TestUsers.byWorkflow.book.save;
TestUsers.byWorkflow.book.resourceType;
TestUsers.byWorkflow.book.partOf; // For chapters
```

#### Reports:

```typescript
TestUsers.byWorkflow.report.save;
TestUsers.byWorkflow.report.resourceType;
```

#### Theses:

```typescript
TestUsers.byWorkflow.thesis.save;
TestUsers.byWorkflow.thesis.resourceType;
```

#### Artistic Results:

```typescript
TestUsers.byWorkflow.artistic.basic;
TestUsers.byWorkflow.artistic.save;
TestUsers.byWorkflow.artistic.film;
TestUsers.byWorkflow.artistic.design;
TestUsers.byWorkflow.artistic.music;
TestUsers.byWorkflow.artistic.performingArts;
TestUsers.byWorkflow.artistic.literaryArts;
TestUsers.byWorkflow.artistic.visualArts;
TestUsers.byWorkflow.artistic.architecture;
```

#### Media Contributions:

```typescript
TestUsers.byWorkflow.media.save;
TestUsers.byWorkflow.media.resourceType;
```

#### Research Data:

```typescript
TestUsers.byWorkflow.researchData.save;
TestUsers.byWorkflow.researchData.dmp; // Data Management Plan
TestUsers.byWorkflow.researchData.dataset;
```

**Use for:** Testing specific publication type workflows

---

### 6. DOI Users (`TestUsers.doi`)

```typescript
TestUsers.doi.draft; // Request draft DOI
TestUsers.doi.draft2; // Second draft DOI user
TestUsers.doi.fetch; // Fetch DOI from external sources
```

**Use for:** DOI minting, draft DOI requests, DOI fetching

---

### 7. NVI Users (`TestUsers.nvi`)

Norwegian Science Index workflows by institution.

```typescript
// BIBSYS NVI
TestUsers.nvi.bibsys.institution;
TestUsers.nvi.bibsys.curator;
TestUsers.nvi.bibsys.change;

// USN NVI
TestUsers.nvi.usn.institution;
TestUsers.nvi.usn.curator;
TestUsers.nvi.usn.change;

// NMBU NVA
TestUsers.nvi.nmbu.institution;
TestUsers.nvi.nmbu.change;

// NTNU NVI
TestUsers.nvi.ntnu.verifiedContributor;
```

**Use for:** NVI candidate validation, institutional approval, author affiliation changes

---

### 8. Publishing Users (`TestUsers.publishing`)

```typescript
TestUsers.publishing.noRights; // User without publishing rights
TestUsers.publishing.withRights; // User with publishing rights
TestUsers.publishing.registrator; // Registrator role
```

**Use for:** Testing publishing permissions and workflows

---

### 9. Messaging Users (`TestUsers.messaging`)

```typescript
TestUsers.messaging.basic;
TestUsers.messaging.unread;
TestUsers.messaging.requestSupport;

// SINTEF messaging
TestUsers.messaging.sintef.support;
TestUsers.messaging.sintef.publicationCurator;
TestUsers.messaging.sintef.doiCurator;
TestUsers.messaging.sintef.supportCurator;
TestUsers.messaging.sintef.publication;
TestUsers.messaging.sintef.doi;
```

**Use for:** Support requests, messaging between curators and users

---

### 10. Collaboration Users (`TestUsers.collaboration`)

```typescript
TestUsers.collaboration.bibsys;
TestUsers.collaboration.nmbu;
TestUsers.collaboration.usn;
```

**Use for:** Cross-institutional collaboration workflows

---

### 11. Special Features (`TestUsers.features`)

Users for specific features and edge cases.

```typescript
// Contributors
TestUsers.features.contributors;

// Files and licensing
TestUsers.features.filesAndLicense;

// Favorites
TestUsers.features.favorites.favorite1;
TestUsers.features.favorites.favorite2;
TestUsers.features.favorites.favorite3;

// Institution management
TestUsers.features.institution.add;
TestUsers.features.institution.change;
TestUsers.features.institution.remove;

// ORCID
TestUsers.features.orcid.remove;

// Projects
TestUsers.features.project.manager;
TestUsers.features.project.wizard;

// Rights Retention Strategy
TestUsers.features.rrs.author;
TestUsers.features.rrs.embargo;

// Other features
TestUsers.features.resourceOwner;
TestUsers.features.menu;
TestUsers.features.logout;
```

**Use for:** Testing specific features in isolation

---

### 12. Special Cases (`TestUsers.special`)

```typescript
TestUsers.special.noRole; // User with no assigned role
TestUsers.special.nonCustomer; // User from non-customer institution
```

**Use for:** Testing error cases and edge conditions

---

## Common Usage Patterns

### Pattern 1: Role-based Testing

```typescript
// Test curator workflow
cy.login(TestUsers.curators.bibsys.publishing);
cy.visit('/tasks');
cy.getDataTestId('publishing-request').click();
```

### Pattern 2: Institution-specific Testing

```typescript
// Test NVI workflow for NTNU
cy.login(TestUsers.nvi.ntnu.verifiedContributor);
cy.createPublishedRegistration('NVI Test', CategoryTypes.ACADEMIC_ARTICLE);
```

### Pattern 3: Multi-user Workflows

```typescript
// Creator submits, curator approves
cy.login(TestUsers.creators.basic);
cy.createPublishedRegistration('My Publication');

cy.login(TestUsers.curators.bibsys.publishing);
cy.approvePublishingRequest();
```

### Pattern 4: Publication Type Testing

```typescript
// Test journal article workflow
cy.login(TestUsers.byWorkflow.journal.save);
cy.startWizardWithEmptyRegistration();
cy.selectResourceType(CategoryTypes.ACADEMIC_ARTICLE);
```

---

## Migration Guide

### Updating Existing Tests

The old imports still work, but you can gradually migrate:

```typescript
// Before
import { userBIBSYSPublishingCurator, userUnitWithAuthor, userNtnuNviCurator } from '../support/constants';

cy.login(userBIBSYSPublishingCurator);
cy.login(userUnitWithAuthor);
cy.login(userNtnuNviCurator);

// After
import { TestUsers } from '../support/constants';

cy.login(TestUsers.curators.bibsys.publishing);
cy.login(TestUsers.creators.basic);
cy.login(TestUsers.curators.ntnu.nvi);
```

### Benefits of Migration

1. **Autocomplete Support** - Your IDE will show all available users
2. **Type Safety** - Catch typos at compile time
3. **Self-Documenting** - The structure explains what each user does
4. **Easier Maintenance** - Find and update users more easily

---

## Finding the Right User

### By Role

- Need a basic creator? → `TestUsers.creators.basic`
- Need a curator? → `TestUsers.curators.*`
- Need an admin? → `TestUsers.admins.*`

### By Institution

- BIBSYS users? → `TestUsers.curators.bibsys.*` or `TestUsers.nvi.bibsys.*`
- NTNU users? → `TestUsers.curators.ntnu.*` or `TestUsers.nvi.ntnu.*`
- SINTEF users? → `TestUsers.curators.sintef.*` or `TestUsers.messaging.sintef.*`

### By Workflow

- Testing journal articles? → `TestUsers.byWorkflow.journal.*`
- Testing artistic results? → `TestUsers.byWorkflow.artistic.*`
- Testing research data? → `TestUsers.byWorkflow.researchData.*`

### By Feature

- Testing DOI? → `TestUsers.doi.*`
- Testing NVI? → `TestUsers.nvi.*`
- Testing messaging? → `TestUsers.messaging.*`

---

## IDE Support

The `TestUsers` object is defined with `as const`, which means TypeScript knows all possible paths. This enables:

- **Autocomplete** - Type `TestUsers.` and see all categories
- **Go to Definition** - Jump to the actual email address
- **Refactoring** - Rename safely across all usages
- **Documentation** - Hover to see JSDoc comments

---

## Best Practices

1. **Use the most specific user** - Prefer `TestUsers.curators.bibsys.publishing` over `TestUsers.curators.basic`
2. **Don't mix concerns** - Don't use a DOI user for NVI testing
3. **Document your choice** - Add a comment if the user choice isn't obvious
4. **Test with multiple users** - Ensure workflows work for different institutions

```typescript
// Good - Clear and specific
cy.login(TestUsers.curators.bibsys.publishing);

// Bad - Too generic, could be any curator
cy.login(TestUsers.curators.basic);

// Good - Documented reason
// Using NTNU curator because they have NVI permissions
cy.login(TestUsers.curators.ntnu.nvi);
```

---

## Summary

The `TestUsers` object provides:

- ✅ 100+ organized test users
- ✅ Grouped by role, institution, and workflow
- ✅ Full TypeScript support with autocomplete
- ✅ Backward compatible with all existing code
- ✅ Self-documenting structure
- ✅ Easy to find the right user for any test

Start using it today to make your tests more maintainable and easier to understand!
