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
  collectionid: {
    ...SETTINGS.collectionid,
    name: 'Collection ID',
    description: 'Defines the collection ID',
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
    {
      key: 'collectionid',
      name: 'Collection Id',
      description: 'Collection Id',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.collectionid],
    },
  ],
};
