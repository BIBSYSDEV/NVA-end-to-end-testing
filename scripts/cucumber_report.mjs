import { createReadStream, createWriteStream, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pipeline } from 'node:stream/promises';
import { CucumberHtmlStream } from '@cucumber/html-formatter';
import { NdjsonToMessageStream } from '@cucumber/message-streams';

const require = createRequire(import.meta.url);

const messagesFile = process.argv[2] ?? 'cucumber-messages.ndjson';
const reportFile = 'TestReport/cucumber_report.html';

mkdirSync('TestReport', { recursive: true });

await pipeline(
  createReadStream(messagesFile),
  new NdjsonToMessageStream(),
  new CucumberHtmlStream(
    require.resolve('@cucumber/html-formatter/dist/main.css'),
    require.resolve('@cucumber/html-formatter/dist/main.js')
  ),
  createWriteStream(reportFile)
);

console.log(`Wrote ${reportFile} from ${messagesFile}`);
