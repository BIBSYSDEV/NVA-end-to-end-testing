// const removeWhitespace = require('./remove-old-features').removeWhitespace;
const fs = require('fs');

const removeWhitespace = (f) => {
  fs.readFile(f, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(/[\u{0080}-\u{FFFF}]/gu, ' ');

    fs.writeFile(f, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
};

const someFile = process.argv[2];
console.log(`Cleaning up ${someFile}`);
removeWhitespace(someFile);
