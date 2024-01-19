import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
};

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  loop: {
    ...SETTINGS.loop,
    name: 'Loop',
    description: 'Defines if the text animations will be looped infinitely.',
    type: 'boolean',
  },
  effect: {
    ...SETTINGS.effect,
    name: 'Effect',
    description: "Defines the effect of the text's animation.",
    type: 'select',
  },
  speed: {
    ...SETTINGS.speed,
    name: 'Speed',
    description: "Defines the speed of the text's update.",
    type: 'int',
  },
  backspacespeed: {
    ...SETTINGS.backspacespeed,
    name: 'Backspace speed',
    description: "Defines the speed of the text's backspace update.",
    type: 'int',
  },
  fadeoutspeed: {
    ...SETTINGS.fadeoutspeed,
    name: 'Fadeout speed',
    description: "Defines the speed of the text's fadeout update.",
    type: 'int',
  },
  pausebefore: {
    ...SETTINGS.pausebefore,
    name: 'Pause before',
    description: 'Before deleting a string, this is the delay after typing and before deleting.',
    type: 'int',
  },
  pauseafter: {
    ...SETTINGS.pauseafter,
    name: 'Pause after',
    description: 'After deleting a string, this is the delay before typing the next string.',
    type: 'int',
  },
  visiblethreshold: {
    ...SETTINGS.visiblethreshold,
    name: 'Visible threshold',
    description: 'Threshold of viewport visibility when text is visible on the page.',
    type: 'int',
  },
  showcursor: {
    ...SETTINGS.showcursor,
    name: 'Show cursor',
    description: 'Show typing cursor.',
    type: 'boolean',
  },
  whenvisible: {
    ...SETTINGS.whenvisible,
    name: 'When visible',
    description: 'Starts typing effect when the text is visible on the page.',
    type: 'int',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general, SCHEMA_GROUPS.pagination, SCHEMA_GROUPS.slidesSettings],
  elements: [
    {
      key: 'text',
      name: 'text',
      description: 'Defines the text element.',
      allowedTypes: ['Text'],
      group: SCHEMA_GROUPS.general.key,
      required: true,
      settings: [
        SCHEMA_SETTINGS.backspacespeed,
        SCHEMA_SETTINGS.effect,
        SCHEMA_SETTINGS.speed,
        SCHEMA_SETTINGS.fadeoutspeed,
        SCHEMA_SETTINGS.pausebefore,
        SCHEMA_SETTINGS.loop,
        SCHEMA_SETTINGS.pauseafter,
        SCHEMA_SETTINGS.visiblethreshold,
        SCHEMA_SETTINGS.showcursor,
        SCHEMA_SETTINGS.whenvisible,
      ],
    },
    {
      key: 'content',
      name: 'Content',
      description: 'Defines the content element.',
      allowedTypes: ['Text'],
      group: SCHEMA_GROUPS.general.key,
    },
  ],
};
