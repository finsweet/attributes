import type { Schema, SchemaGroups } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general],
  elements: [
    {
      key: 'list',
      name: 'List',
      description: 'Defines the list of elements.',
      allowedTypes: ['Block', 'List'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'hide',
      name: 'Hide',
      description: 'Defines the element to hide.',
      allowedTypes: ['Any'],
      group: SCHEMA_GROUPS.general.key,
    },
  ],
};
