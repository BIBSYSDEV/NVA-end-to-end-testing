const glob = require('glob');
const fs = require('fs');
const testedFeatures = require('./testedFeatures_deploy_test.json');

const CYPRESS_DIR = 'cypress/integration';
const GHERKIN_DIR = 'features';

const getDirectories = (src, callback) => {
  glob(`${src}/**/*.feature`, callback);
};

const isInTestedFeatures = (filePath) => {
  let isInTested = false;
  testedFeatures.forEach((feature) => {
    if (filePath.includes(feature)) {
      return (isInTested = true);
    }
  });
  return isInTested;
};

const isFileToDelete = (f) => {
  const filename = f.replace(CYPRESS_DIR, '');
  const gherkinFile = `${GHERKIN_DIR}${filename}`;
  const exists = fs.existsSync(gherkinFile) && isInTestedFeatures(gherkinFile);
  return !exists;
};

const deleteFile = (f) => {
  fs.unlinkSync(f);
};

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

getDirectories(CYPRESS_DIR, (err, res) => {
  const filesToDelete = res.filter(isFileToDelete);
  const filesToKeep = res.filter(isInTestedFeatures);
  filesToDelete.forEach(deleteFile);
  filesToKeep.forEach(removeWhitespace);
});
