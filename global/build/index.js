import esbuild from 'esbuild';
import { writeFileSync, readFileSync } from 'fs';
import { pathToFileURL } from 'url';

const production = process.env.NODE_ENV === 'production';

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
export const defaultBuildSettings = {
  bundle: true,
  minify: production,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
  watch: !production,
  define: {
    CMS_CORE_SOURCE: JSON.stringify(
      production
        ? 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmscore@1/cmscore.js'
        : 'http://localhost:3000/packages/cmscore/cmscore.js'
    ),
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
  if (!production) return;

  esbuild.buildSync({
    ...defaultBuildSettings,
    entryPoints: ['api/changesets.ts'],
    outfile: `temp/changesets.js`,
    format: 'esm',
  });

  import(pathToFileURL(`${__dirname}/../temp/changesets.js`)).then(({ changesets }) => {
    const fullChangesets = changesets.map((changeset) => {
      const { version } = changeset;

      const markdown = readFileSync(`${__dirname}/../.changesets/${version}.md`, 'utf-8');
      if (!markdown) throw new Error(`File ${version}.md doesn't exist.`);

      return {
        ...changeset,
        markdown,
      };
    });

    writeFileSync(`${__dirname}/../changesets.json`, JSON.stringify(fullChangesets));
  });
};
