import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
};

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  class: {
    ...SETTINGS.class,
    name: 'Class',
    description: 'Defines the class to be inherited.',
    type: 'text',
  },
  instance: {
    ...SETTINGS.instance,
    name: 'Instance',
    description: 'Defines the instance of the element.',
    type: 'text',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general],
  elements: [
    {
      key: 'listener',
      name: 'Listener',
      description: 'Defines the listener element.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.general.key,
      required: true,
      settings: [SCHEMA_SETTINGS.class, SCHEMA_SETTINGS.instance],
    },
  ],
};
