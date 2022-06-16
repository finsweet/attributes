import { generateChangesetsJSON, generateScript } from '@global/build';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

generateScript('src/index.ts', 'cmscore', 'esm');
generateChangesetsJSON(__dirname);
