import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
};

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  key: {
    ...SETTINGS.key,
    name: 'Key',
    description: 'Defines the key that will be used to store and retrieve the items.',
    type: 'text',
  },
  field: {
    ...SETTINGS.field,
    name: 'Field',
    description: 'Defines the name of the field with a content to store.',
    type: 'text',
  },
  active: {
    ...SETTINGS.active,
    name: 'Active',
    description: 'Determines the class for favorite items.',
    type: 'text',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general],
  elements: [
    {
      key: 'list',
      name: 'List',
      description: 'Defines the list element.',
      allowedTypes: ['ListElement'],
      group: SCHEMA_GROUPS.general.key,
      required: true,
      settings: [SCHEMA_SETTINGS.key, SCHEMA_SETTINGS.field, SCHEMA_SETTINGS.active],
    },
    {
      key: 'list-favorite',
      name: 'List Favorite',
      description: 'Defines the list for favorite element.',
      allowedTypes: ['ListElement'],
      group: SCHEMA_GROUPS.general.key,
      required: true,
      settings: [SCHEMA_SETTINGS.key],
    },
    {
      key: 'like',
      name: 'Lemove',
      description: 'Defines the like button.',
      allowedTypes: ['Block', 'Button'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'remove',
      name: 'Remove',
      description: 'Defines the remove button.',
      allowedTypes: ['Block', 'Button'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'loader',
      name: 'Loader',
      description: 'Defines the loader.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.general.key,
    },
  ],
};
