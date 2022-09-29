import esbuild from 'esbuild';
import { writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import { defaultBuildSettings, generateChangesetsJSON, generateScript } from '../../../global/build/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Generates the `schema.json` API.
 * @param {string} __dirname
 */
const generateAttributesJSON = () => {
  esbuild.buildSync({
    ...defaultBuildSettings,
    entryPoints: ['api/attributes.ts'],
    outfile: `temp/attributes.js`,
    format: 'esm',
  });

  import(pathToFileURL(`${__dirname}/../temp/attributes.js`)).then(({ attributesData }) => {
    writeFileSync(`${__dirname}/../attributes.json`, JSON.stringify(attributesData));
  });
};

generateScript('src/docs/index.ts', 'docs');
generateScript('src/changelog/index.ts', 'changelog');
generateScript('src/api/index.ts', 'api');
generateScript('src/support/index.ts', 'support');
generateChangesetsJSON(__dirname);
generateAttributesJSON();
