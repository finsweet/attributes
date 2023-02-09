import { buildAttribute, generateAPIJSON } from '../../../global/build/index.js';

buildAttribute([
  {
    entryFile: 'src/docs/index.ts',
    outName: 'docs',
  },
  {
    entryFile: 'src/changelog/index.ts',
    outName: 'changelog',
  },
  {
    entryFile: 'src/api/index.ts',
    outName: 'api',
  },
  {
    entryFile: 'src/support/index.ts',
    outName: 'support',
  },
]);

generateAPIJSON('attributes');
