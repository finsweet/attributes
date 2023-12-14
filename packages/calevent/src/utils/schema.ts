import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  localize: {
    ...SETTINGS.localize,
    name: 'Locale',
    description: 'Defines the locale for the calendar event',
    type: 'select',
  },
  element: {
    ...SETTINGS.element,
    name: 'Element',
    description: 'Defines the element to be used for the calendar event',
    type: 'select',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'event',
      name: 'Event',
      description: 'Defines an event',
      allowedTypes: ['Block'],
      required: true,
      settings: [SCHEMA_SETTINGS.localize],
    },
    {
      key: 'title',
      name: 'Title',
      description: 'Defines an event title',
      allowedTypes: ['Block'],
      required: true,
      settings: [SCHEMA_SETTINGS.localize],
    },
    {
      key: 'start',
      name: 'Start',
      description: 'Defines an event start date',
      allowedTypes: ['Block'],
      required: true,
      settings: [SCHEMA_SETTINGS.localize],
    },
    {
      key: 'end',
      name: 'End',
      description: 'Defines an event end date',
      allowedTypes: ['Block'],
      required: true,
      settings: [SCHEMA_SETTINGS.localize],
    },
    {
      key: 'timezone',
      name: 'Timezone',
      description: 'Defines an event timezone',
      allowedTypes: ['Block'],
      required: true,
      settings: [SCHEMA_SETTINGS.localize],
    },
    {
      key: 'location',
      name: 'Location',
      description: 'Defines an event location',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.localize],
    },
    {
      key: 'description',
      name: 'Description',
      description: 'Defines an event description',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.localize],
    },
    {
      key: 'google',
      name: 'Google',
      description: 'Defines a google event platform',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.localize],
    },
    {
      key: 'outlook',
      name: 'Outlook',
      description: 'Defines an outlook event platform',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.localize],
    },
    {
      key: 'apple',
      name: 'Apple',
      description: 'Defines an apple event platform',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.localize],
    },
  ],
};
