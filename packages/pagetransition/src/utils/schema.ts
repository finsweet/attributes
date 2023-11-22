import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
};

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  delay: {
    ...SETTINGS.delay,
    name: 'delay',
    description: 'Duration Time in miliseconds timeout until we show the next page.',
    type: 'boolean',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general, SCHEMA_GROUPS.pagination, SCHEMA_GROUPS.slidesSettings],
  elements: [
    {
      key: 'change',
      name: 'change',
      description: 'Content that will change on page change.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.general.key,
      required: true,
      settings: [SCHEMA_SETTINGS.delay],
    },
    {
      key: 'trigger',
      name: 'Trigger',
      description: '“Click” trigger to initiate Webflow Interactions.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.general.key,
    },
  ],
};
