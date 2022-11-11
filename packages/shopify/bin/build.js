import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { generateExamplesJSON, generateScript, generateSchemaJSON } from '../../../global/build/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

generateScript('src/index.ts', 'shopify');
generateScript('src/testExports.ts', 'tests/scripts/testExports');
generateExamplesJSON(__dirname);
generateSchemaJSON(__dirname);
