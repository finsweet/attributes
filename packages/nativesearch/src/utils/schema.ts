import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

/**
 * The settings that are available for the Search Attribute.
 */
const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  addclass: {
    ...SETTINGS.addclass,
    name: 'Add Class',
    description: 'Optionally add a class to all elements of the Search Result Wrapper',
    type: 'text',
  },
};

/**
 * The schema for the Search Attribute.
 */
export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'input',
      name: 'Input',
      description: 'The native search input the user interacts with',
      allowedTypes: ['Block'],
      settings: [],
    },
    {
      key: 'results',
      name: 'Results',
      description: 'The search results container where we append the fetched list',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.addclass],
    },
    {
      key: 'loader',
      name: 'Loader',
      description: 'The loader element which is shown when the search is loading',
      allowedTypes: ['Block'],
      settings: [],
    },
  ],
};
