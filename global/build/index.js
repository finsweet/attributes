import esbuild from 'esbuild';
import { writeFileSync, readFileSync } from 'fs';
import { pathToFileURL } from 'url';

const production = process.env.NODE_ENV === 'production';
const development = process.env.NODE_ENV === 'development';

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
export const defaultBuildSettings = {
  bundle: true,
  minify: production,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
  watch: development,
  define: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
};

/**
 * Generates the main script.
 * @param {string | string[]} entryPoint
 * @param {string} fileName
 * @param {esbuild.BuildOptions['format']} [format]
 */
export const generateScript = (entryPoint, fileName, format) => {
  esbuild.build({
    ...defaultBuildSettings,
    entryPoints: [entryPoint],
    outfile: `./${fileName}.js`,
    format,
  });
};

/**
 * Generates the `examples.json` API.
 * @param {string} __dirname
 */
export const generateExamplesJSON = (__dirname) => {
  if (!production) return;

  esbuild.buildSync({
    ...defaultBuildSettings,
    entryPoints: ['api/examples.ts'],
    outfile: `temp/examples.js`,
    format: 'esm',
  });

  import(pathToFileURL(`${__dirname}/../temp/examples.js`)).then(({ examples }) => {
    writeFileSync(`${__dirname}/../examples.json`, JSON.stringify(examples));
  });
};

/**
 * Generates the `schema.json` API.
 * @param {string} __dirname
 */
export const generateSchemaJSON = (__dirname) => {
  if (!production) return;

  esbuild.buildSync({
    ...defaultBuildSettings,
    entryPoints: ['api/schema.ts'],
    outfile: `temp/schema.js`,
    format: 'esm',
  });

  import(pathToFileURL(`${__dirname}/../temp/schema.js`)).then(({ schema }) => {
    writeFileSync(`${__dirname}/../schema.json`, JSON.stringify(schema));
  });
};

/**
 * Generates the `changesets.json` API.
 * @param {string} __dirname
 */
export const generateChangesetsJSON = (__dirname) => {
  const writeChangesets = (result) => writeFileSync(`${__dirname}/../changesets.json`, JSON.stringify(result));

  try {
    const changelog = readFileSync(`${__dirname}/../CHANGELOG.md`, 'utf-8');
    if (!changelog) {
      throw new Error('Changelog not found');
    }

    const result = changelog
      .split(/### Patch Changes|### Minor Changes|### Major Changes/)
      .map((match) => match.trim())
      .join('')
      .split(/\s##\s/)
      .map((match) => {
        const value = match.trim();

        const version = value.match(/\d\.\d\.\d/)?.[0];
        const markdown = value.replace(/\d\.\d\.\d/, '');
        if (!version || !markdown) return;

        return { version, markdown };
      })
      .filter(Boolean);

    writeChangesets(result);
  } catch (err) {
    console.log(err.message);
    writeChangesets({});
    return;
  }
};
