import { createReadStream, createWriteStream, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { CucumberHtmlStream } from '@cucumber/html-formatter';
import { NdjsonToMessageStream } from '@cucumber/message-streams';

const require = createRequire(import.meta.url);

const messagesFile = process.argv[2] ?? 'cucumber-messages.ndjson';
const reportFile = 'TestReport/cucumber_report.html';
const customCssFile = fileURLToPath(new URL('report-custom.css', import.meta.url));

const buildStylesheet = () => {
  const baseCss = readFileSync(require.resolve('@cucumber/html-formatter/dist/main.css'), 'utf-8');
  const customCss = readFileSync(customCssFile, 'utf-8');
  const stylesheetFile = join(mkdtempSync(join(tmpdir(), 'cucumber-report-')), 'report.css');

  writeFileSync(stylesheetFile, `${baseCss}\n${customCss}`);

  return stylesheetFile;
};

mkdirSync('TestReport', { recursive: true });

await pipeline(
  createReadStream(messagesFile),
  new NdjsonToMessageStream(),
  new CucumberHtmlStream(buildStylesheet(), require.resolve('@cucumber/html-formatter/dist/main.js')),
  createWriteStream(reportFile)
);

console.log(`Wrote ${reportFile} from ${messagesFile}`);
