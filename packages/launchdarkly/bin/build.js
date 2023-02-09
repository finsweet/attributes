import { buildAttribute } from '../../../global/build/index.js';

buildAttribute([
  {
    entryFile: 'src/index.ts',
    outName: 'launchdarkly',
  },
  {
    entryFile: 'src/testExports.ts',
    outName: 'testExports',
    outDir: 'tests/scripts',
  },
]);
