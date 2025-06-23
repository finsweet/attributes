import * as esbuild from 'esbuild';

// Create contexts
const context = await esbuild.context({
  bundle: true,
  entryPoints: ['src/index.ts'],
  outdir: './dist',
});

await context.rebuild();
context.dispose();
