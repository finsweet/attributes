import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
};

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  listener: {
    ...SETTINGS.listener,
    name: 'Direction',
    description: "Defines the direction of the slider's movement.",
    type: 'text',
  },
  class: {
    ...SETTINGS.class,
    name: 'Effect',
    description: "Defines the effect of the slider's movement.",
    type: 'text',
  },
  instance: {
    ...SETTINGS.instance,
    name: 'Speed',
    description: "Defines the speed of the slider's movement.",
    type: 'text',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general],
  elements: [
    {
      key: 'inheritclass',
      name: 'Inherit Class',
      description: 'Defines the inherit element.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.general.key,
      required: true,
      settings: [SCHEMA_SETTINGS.listener, SCHEMA_SETTINGS.class, SCHEMA_SETTINGS.instance],
    },
  ],
};
