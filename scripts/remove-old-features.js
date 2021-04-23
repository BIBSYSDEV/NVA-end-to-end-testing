import glob from 'glob';
import fs from 'fs';
import { removeWhitespace } from './remove-whitespace.js';

const rawData = fs.readFileSync('scripts/testedFeatures.json');
const testedFeatures = JSON.parse(rawData);
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

getDirectories(CYPRESS_DIR, (err, res) => {
  const filesToDelete = res.filter(isFileToDelete);
  const filesToKeep = res.filter(isInTestedFeatures);
  filesToDelete.forEach(deleteFile);
  console.log(filesToKeep);
  filesToKeep.forEach((file) => removeWhitespace(file));
});
