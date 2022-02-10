import { dirname } from 'path';
import { fileURLToPath } from 'url';

import {
  generateChangesetsJSON,
  generateExamplesJSON,
  generateScript,
  generateSchemaJSON,
} from '../../../global/build.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

generateScript('src/index.ts', 'smartlightbox');
generateExamplesJSON(__dirname);
generateSchemaJSON(__dirname);
generateChangesetsJSON(__dirname);
