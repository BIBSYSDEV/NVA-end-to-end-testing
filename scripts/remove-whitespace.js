const fs = require('fs');
const removeWhitespace = require('./remove-old-features').removeWhitespace;

const someFile = process.argv[2];
console.log(`Cleaning up ${someFile}`);
removeWhitespace(someFile);
