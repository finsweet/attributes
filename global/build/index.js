/* eslint-disable no-console */

import * as esbuild from 'esbuild';
import { writeFileSync } from 'fs';
import { access } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const LIVE_RELOAD = !PRODUCTION;
const SERVE_PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../');
const directory = process.cwd();

/**
 * @type {import('esbuild').BuildOptions}
 */
const defaultBuildSettings = {
  bundle: true,
  minify: PRODUCTION,
  sourcemap: !PRODUCTION,
  target: PRODUCTION ? 'es2019' : 'esnext',
  inject: LIVE_RELOAD ? [join(__dirname, 'live-reload.js')] : undefined,
  define: {
    SERVE_PORT: JSON.stringify(SERVE_PORT),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
};

/**
 * Defines the build configuration for a single attribute.
 * @typedef {{ entryFile: string; outName: string; format?: import('esbuild').BuildOptions['format'] }} AttributeBuildConfig
 */

/**
 * Builds an Attribute.
 * In development mode, it will watch for changes and serve the files in {@link SERVE_PORT}.
 * @param {Array<AttributeBuildConfig>} files
 */
export const buildAttribute = async (files) => {
  await Promise.all([...files.map(buildFile), generateAPIJSON('examples'), generateAPIJSON('schema')]);
};

/**
 * Creates the build context for esbuild.
 * @param {AttributeBuildConfig} file
 */
export const buildFile = async ({ entryFile, outName, format }) => {
  const entryPoint = join(directory, entryFile);
  const outfile = join(directory, `${outName}.js`);

  const context = await esbuild.context({
    ...defaultBuildSettings,
    format,
    outfile,
    entryPoints: [entryPoint],
  });

  if (PRODUCTION) {
    await context.rebuild();
    return context.dispose();
  }

  if (!DEVELOPMENT) {
    return context.dispose();
  }

  await context.watch();

  try {
    await context.serve({ port: SERVE_PORT, servedir: root });
    console.log(`Serving files at http://localhost:${SERVE_PORT}`);
  } catch (err) {}
};

/**
 * Generates a JSON file from an API file.
 * @param {string} fileName
 */
export const generateAPIJSON = async (fileName) => {
  const entryPoint = `api/${fileName}.ts`;

  const entryPointExists = await checkFileExists(join(directory, entryPoint));
  if (!entryPointExists) return;

  const result = await esbuild.build({
    ...defaultBuildSettings,
    entryPoints: [entryPoint],
    format: 'esm',
    write: false,
  });

  const module = await importBuildResult(result);

  writeFileSync(join(directory, `${fileName}.json`), JSON.stringify(module.default));
};

/**
 * Generates the `changesets.json` API.
 */
export const generateChangesetsJSON = () => {
  const writeChangesets = (result) => writeFileSync(join(directory, 'changesets.json'), JSON.stringify(result));

  try {
    const changelog = readFileSync(join(directory, 'CHANGELOG.md'), 'utf-8');
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

/**
 * Imports a build result as a module.
 * @param {esbuild.BuildResult} result
 */
const importBuildResult = (result) =>
  import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].contents).toString('base64')}`);

/**
 * @returns true if the file exists, false otherwise
 * @param {string} path
 */
const checkFileExists = async (path) => {
  try {
    await access(path);
    return true;
  } catch (err) {
    return false;
  }
};
