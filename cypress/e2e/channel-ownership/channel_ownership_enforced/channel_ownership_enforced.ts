// Feature: Channel ownership enforced
//   Approved files are files of type OpenFile, InternalFile Given HiddenFile

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

BeforeAll(() => {});

//   Scenario: An unclaimed channel should not restrict access
When('a publication has an unclaimed channel as publisher', () => {});
Then('users related to the publication are allowed to update the publication', () => {});

//   Scenario Outline: Claimed channel should not restrict access when no approved files
Given('a publication', () => {});
Given('the publication has no approved files', () => {});
Given('the publication has a claimed channel as publisher', () => {});
Given('the channel claim has publishing policy "everyone"', () => {});
Given('the publication is within channel claim scope', () => {});
Given('a user is {string}', (userRole) => {});
When('the user updates the publication', () => {});
Then('they are allowed', () => {});

// Examples:
//   | UserRole                             |
//   | Related to the publication           |
//   | Curator at channel claim institution |

//   Scenario Outline: Claimed channel should allow some access when publication has approved files
// Given('a publication', () => {});
Given('the publication has approved files', () => {});
// Given('the publication has a claimed channel as publisher', () => {});
Given('the channel claim has editing policy "ownerOnly"', () => {});
// Given('the publication is within channel claim scope', () => {});
Given('the channel is claimed by a non curating institution', () => {});
When('{string} performs action {string}', (user, action) => {});
// Then('they are allowed', () => {});

// Examples:
//   | User                                  | Action         |
//   | Curator at channel owning institution | Update         |
//   | Curator at channel owning institution | Unpublish      |
//   | Curator at channel owning institution | Upload files   |
//   | Curator at channel owning institution | Approve files  |

//   | Editor at channel owning institution  | Update         |
//   | Editor at channel owning institution  | Unpublish      |

//   | Curator at curating institution       | Partial update |
//   | Curator at curating institution       | Upload files   |

//   | Editor at curating institution        | Partial update |

//   | Publication creator                   | Partial update |
//   | Publication creator                   | Upload files   |

//   | Contributor                           | Partial update |
//   | Contributor                           | Upload files   |

//   Scenario Outline: Claimed channel should restrict access when publication has approved files
// Given('a publication', () => {});
// Given('the publication has approved files', () => {});
// Given('the publication has a claimed channel as publisher', () => {});
// Given('the channel claim has editing policy "ownerOnly"', () => {});
// Given('the publication is within channel claim scope', () => {});
// Given('the channel is claimed by a non curating institution', () => {});
// When('<User> performs action <Action>', () => {});
Then('they are denied', () => {});

// Examples:
//   | User                            | Action        |
//   | Curator at curating institution | Update        |
//   | Curator at curating institution | Unpublish     |
//   | Curator at curating institution | Approve files |

//   | Editor at curating institution  | Update        |
//   | Editor at curating institution  | Unpublish     |

//   | Publication creator             | Update        |

//   | Contributor                     | Update        |

//   Scenario: Claimed channel should not restrict file owner when file is not approved
Given('a file', () => {});
Given('the file is uploaded to a publication', () => {});
Given('the publiaction has a claimed publisher', () => {});
// Given('the publication is within channel claim scope', () => {});
Given('the file is not approved', () => {});
When('the file owner inspects the file', () => {});
Then('the file owner is allowed the following actions:', () => {});
//   | Read metadata  |
//   | Download       |
//   | Write metadata |
//   | Delete         |

//   Scenario Outline: Claimed channel should restrict file curator
// Given('a file', () => {});
// Given('the file is uploaded to a publication', () => {});
// Given('the publiaction has a claimed publisher', () => {});
// Given('the publication is within channel claim scope', () => {});
When('{string} performs action:', (user) => {});
//   | Write metadata |
//   | Delete         |
Then('the outcome is {string}', (outcome) => {});

// Examples:
//   | User                                       | Outcome |
//   | File curator for file owner                | Denied  |
//   | File curator at channel owning institution | Allowed |

//   Scenario Outline: Claimed channel should restrict access for file with embargo when
//   publication is a degree
Given('a file with embargo', () => {});
// Given('the file is uploaded to a publication', () => {});
Given('the file has status {string}', (fileStatus) => {});
Given('the publication is a degree', () => {});
// Given('the publiaction has a claimed publisher', () => {});
// Given('the publication is within channel claim scope', () => {});
When('{string} performs action', () => {});
//   | Download       |
//   | Write metadata |
//   | Delete         |
// Then('the outcome is "<Outcome>"', () => {});

// Examples:
//   | User                                                       | FileStatus   | Outcome |
//   | File owner                                                 | Not approved | Allowed |
//   | File owner                                                 | Approved     | Denied  |
//   | File curator for file owner                                | Any          | Denied  |
//   | Student file curator for file owner                        | Any          | Denied  |
//   | Student embargo file curator for file owner                | Any          | Denied  |
//   | File curator at channel owning institution                 | Any          | Denied  |
//   | Student file curator at channel owning institution         | Any          | Denied  |
//   | Student embargo file curator at channel owning institution | Any          | Allowed |
