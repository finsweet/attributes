/* eslint-disable no-console */
import { ATTRIBUTES } from '@finsweet/attributes-utils';
import * as esbuild from 'esbuild';
import { mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

import { name } from '../package.json';

declare const process: {
  env: {
    NODE_ENV: 'production' | 'development';
  };
};

// Config output
const BUILD_DIRECTORY = './dist';
const PRODUCTION = process.env.NODE_ENV === 'production';

// Config entrypoint files
const ENTRY_POINTS = ['src/index.ts'];

// Config dev serving
const LIVE_RELOAD = !PRODUCTION;
const SERVE_PORT = 3000;

const SCRIPT_SRC = PRODUCTION
  ? `https://cdn.jsdelivr.net/npm/${name}@2`
  : `http://localhost:${SERVE_PORT}/dist/index.js`;

const buildOptions: esbuild.BuildOptions = {
  bundle: true,
  entryPoints: ENTRY_POINTS,
  minify: PRODUCTION,
  sourcemap: !PRODUCTION,
  target: PRODUCTION ? 'es2019' : 'esnext',
  define: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    SCRIPT_SRC: JSON.stringify(SCRIPT_SRC),
    SERVE_PORT: JSON.stringify(SERVE_PORT),
  },
};

// Create contexts
const context = await esbuild.context({
  ...buildOptions,
  outdir: BUILD_DIRECTORY,
  inject: LIVE_RELOAD ? ['./bin/live-reload.js'] : undefined,
  format: 'esm',
  splitting: true,
});

// Remove old output files
try {
  readdirSync(BUILD_DIRECTORY).map((file) => unlinkSync(join(BUILD_DIRECTORY, file)));
} catch (err) {}

// Build files in prod
if (PRODUCTION) {
  await context.rebuild();
  context.dispose();
}

// Watch and serve files in dev
else {
  await context.watch();
  await context
    .serve({
      servedir: '.',
      port: SERVE_PORT,
    })
    .then(() => console.log(`Serving files at ${SCRIPT_SRC}`));
}

// Generate schemas
const schemasDirectory = join(BUILD_DIRECTORY, 'schemas');
mkdirSync(schemasDirectory, { recursive: true });

for (const attribute of Object.values(ATTRIBUTES)) {
  try {
    const { SCHEMA } = await import(`@finsweet/attributes-${attribute}/schema`);
    if (!SCHEMA) continue;

    const schemaPath = join(schemasDirectory, `${attribute}.json`);
    const schema = JSON.stringify(SCHEMA, null, 2);

    writeFileSync(schemaPath, schema, { encoding: 'utf8' });
  } catch (err) {}
}
