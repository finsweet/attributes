/* eslint-disable no-console */
import { ATTRIBUTES } from '@finsweet/attributes-utils';
import * as esbuild from 'esbuild';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';
import { mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import http from 'http';

declare const process: {
  env: {
    NODE_ENV?: 'production' | 'development';
    VERCEL_ENV?: 'production' | 'preview' | 'development';
  };
};

// Config output
const ENV = process.env.VERCEL_ENV || process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const BUILD_DIRECTORY = './';

// Config entrypoint files
const ENTRY_POINTS = ['src/attributes.ts'];

// Config dev serving
const SERVE_PORT = 3001;
const PROXY_PORT = 3000;

const buildOptions: esbuild.BuildOptions = {
  bundle: true,
  entryPoints: ENTRY_POINTS,
  minify: !DEV,
  sourcemap: DEV,
  target: 'esnext',
  define: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    SERVE_PORT: JSON.stringify(SERVE_PORT),
  },
  plugins: [inlineWorkerPlugin()],
};

// Create contexts
const context = await esbuild.context({
  ...buildOptions,
  outdir: BUILD_DIRECTORY,
  chunkNames: '/dist/[name]-[hash]',
  inject: DEV ? ['./bin/live-reload.js'] : undefined,
  format: 'esm',
  splitting: true,
});

// Remove old output files
try {
  const files = readdirSync(BUILD_DIRECTORY);
  files.forEach((file) => {
    if (file.startsWith('dist') || file.startsWith('schemas')) {
      unlinkSync(join(BUILD_DIRECTORY, file));
    }
  });
} catch (err) {}

// Watch and serve files in dev
if (DEV) {
  await context.watch();
  const { hosts, port } = await context.serve({
    servedir: '.',
    port: SERVE_PORT,
  });

  /**
   * Proxy esbuild requests to add CORS headers.
   * This is required since {@link https://github.com/evanw/esbuild/blob/main/CHANGELOG.md#0250 esbuild@0.25.0},
   * esbuild removed the built-in CORS headers for security reasons and now it's in userland to add them.
   */
  http
    .createServer((req, res) => {
      const { url, method, headers } = req;

      const proxyReq = http.request(
        {
          port,
          method,
          headers,
          path: url,
          hostname: hosts[0],
        },
        (proxyRes) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.writeHead(proxyRes.statusCode!, proxyRes.headers);

          proxyRes.pipe(res, { end: true });
        }
      );

      req.pipe(proxyReq, { end: true });
    })
    .listen(PROXY_PORT);

  console.log(`Serving:`);
  console.log(`<script async type="module" src="http://localhost:${PROXY_PORT}/attributes.js"></script>`);
}

// Build files in prod
else {
  await context.rebuild();
  context.dispose();
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
