import { dirname } from 'path';
import { fileURLToPath } from 'url';

import {
  generateChangesetsJSON,
  generateExamplesJSON,
  generateScript,
  generateSchemaJSON,
} from '../../../global/build/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

generateScript('src/index.ts', 'launchdarkly');
// Used for testing. The 'tests/scripts' folder is hidden from git.
generateScript('src/testExports.ts', 'tests/scripts/testExports');
generateExamplesJSON(__dirname);
generateSchemaJSON(__dirname);
generateChangesetsJSON(__dirname);
