import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  instance: {
    ...SETTINGS.instance,
    name: 'Instance',
    key: 'instance',
    description: 'The instance number',
    type: 'text',
  },
  mode: {
    ...SETTINGS.mode,
    name: 'Mode',
    key: 'mode',
    description: 'The mode of the before and after slider component.',
    type: 'select',
    values: {
      drag: 'drag',
      hover: 'hover',
    },
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'wrapper',
      name: 'Wrapper',
      description: 'The target for the before and after slider component.',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.mode, SCHEMA_SETTINGS.instance],
    },
    {
      key: 'before',
      name: 'Before',
      description: 'The before image for the before and after slider component.',
      allowedTypes: ['Image'],
      settings: [],
    },
    {
      key: 'after',
      name: 'After',
      description: 'The after image for the before and after slider component.',
      allowedTypes: ['Image'],
      settings: [],
    },
    {
      key: 'handle',
      name: 'Handle',
      description: 'The handle for the before and after slider component.',
      allowedTypes: ['Block'],
      settings: [],
    },
  ],
};
