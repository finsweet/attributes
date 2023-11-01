import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

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
      description: 'Defines the element wrapping the items.',
      allowedTypes: ['List', 'Block'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'dropdown',
      name: 'Dropdown',
      description: 'Defines a Webflow dropdown element which contains a list of elements.',
      allowedTypes: ['', 'Block'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'phone-input',
      name: 'Phone Input',
      description: 'Defines the phone input element.',
      allowedTypes: ['FormTextInput'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'flag',
      name: 'Flag',
      description: 'Defines country flag.',
      allowedTypes: ['Image'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'full-name',
      name: 'Full name',
      description: 'Defines country full name.',
      allowedTypes: ['RichText'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'two-letter',
      name: 'Two letter',
      description: 'Defines 2-letter (ISO alpha-2) country abbreviation.',
      allowedTypes: ['RichText'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'calling-code',
      name: 'Calling code',
      description: 'Defines calling code for phone.',
      allowedTypes: ['RichText'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'currency',
      name: 'Currency',
      description: 'Defines current symbol (ie. $ or €).',
      allowedTypes: ['RichText'],
      group: SCHEMA_GROUPS.general.key,
    },
  ],
};
