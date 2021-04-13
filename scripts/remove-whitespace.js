var fs = require('fs');

const someFile = process.argv[2];
console.log(someFile);
fs.readFile(someFile, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/[\u{0080}-\u{FFFF}]/gu, ' ');

  fs.writeFile(someFile, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
