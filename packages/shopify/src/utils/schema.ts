import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

// TODO: add schemas and settings for all elements

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  domain: {
    ...SETTINGS.domain,
    name: 'Domain',
    description: 'Defines the domain where the Shopify store is hosted',
    type: 'text',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'id',
      name: 'ID',
      description: 'ID',
      allowedTypes: ['Block'],
      settings: [],
    },
  ],
};
