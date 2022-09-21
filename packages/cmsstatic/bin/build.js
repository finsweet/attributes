import { generateChangesetsJSON, generateExamplesJSON, generateScript, generateSchemaJSON } from '@global/build';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

generateScript('src/index.ts', 'cmsstatic');
generateExamplesJSON(__dirname);
generateSchemaJSON(__dirname);
generateChangesetsJSON(__dirname);
