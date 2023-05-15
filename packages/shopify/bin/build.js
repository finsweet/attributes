import { buildAttribute } from '../../../global/build/index.js';

buildAttribute([
  {
    entryFile: './src/index.ts',
    outName: 'shopify',
  },
  {
    entryFile: 'src/testExports.ts',
    outName: './tests/scripts/testExports',
  },
]);
