import { buildAttribute } from '../../../global/build/index.js';

buildAttribute([
  {
    entryFile: 'src/index.ts',
    outName: 'animation',
  },
  {
    entryFile: 'src/esm.ts',
    outName: 'animation.esm',
    format: 'esm',
  },
  {
    entryFile: 'src/functions.ts',
    outName: 'functions',
    format: 'esm',
  },
]);
