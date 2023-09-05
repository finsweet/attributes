import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  instance: {
    ...SETTINGS.instance,
    name: 'Instance',
    description: 'The instance number of the element i.e 1, 2, 7',
    type: 'int',
  },
};

export const schema: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'copy',
      name: 'Copy',
      description: 'The element to be copied on page load',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.instance],
    },
    {
      key: 'cut',
      name: 'Cut',
      description: 'The element to be cut/ moved on page load',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.instance],
    },
    {
      key: 'paste',
      name: 'Paste',
      description: 'The target element where copied elements will be appended on page load',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.instance],
    },
  ],
};
