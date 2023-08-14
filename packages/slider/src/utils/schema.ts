import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
  pagination: {
    key: 'pagination',
    name: 'Pagination',
  },
  slidesSettings: {
    key: 'slides-settings',
    name: 'Slides Settings',
  },
};

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  direction: {
    ...SETTINGS.direction,
    name: 'Direction',
    description: "Defines the direction of the slider's movement.",
    type: 'select',
  },
  effect: {
    ...SETTINGS.effect,
    name: 'Effect',
    description: "Defines the effect of the slider's movement.",
    type: 'select',
  },
  speed: {
    ...SETTINGS.speed,
    name: 'Speed',
    description: "Defines the speed of the slider's movement.",
    type: 'int',
  },
  autoheight: {
    ...SETTINGS.autoheight,
    name: 'Auo Height',
    description:
      "Defines if the slider's height will be automatically calculated based on the height of the current slide.",
    type: 'boolean',
  },
  centeredslides: {
    ...SETTINGS.centeredslides,
    name: 'Centered Slides',
    description: "Defines if the slider's slides will be centered in the slider's container.",
    type: 'boolean',
  },
  loop: {
    ...SETTINGS.loop,
    name: 'Loop',
    description: "Defines if the slider's slides will be looped infinitely.",
    type: 'boolean',
  },
  draggable: {
    ...SETTINGS.draggable,
    name: 'Draggable',
    description: "Defines if the slider's slides will be touchable.",
    type: 'boolean',
  },
  scrollbar: {
    ...SETTINGS.scrollbar,
    name: 'Scrollbar',
    description: "Defines if the slider's scrollbar will be visible.",
    type: 'boolean',
  },
  autoplay: {
    ...SETTINGS.autoplay,
    name: 'Autoplay',
    description: "Defines if the slider's slides will be autoplayed.",
    type: 'boolean',
  },
  autoplaydelay: {
    ...SETTINGS.autoplaydelay,
    name: 'Autoplay Delay',
    description: "Defines the delay between the slider's slides.",
    type: 'int',
  },
  autoplayinteraction: {
    ...SETTINGS.autoplayinteraction,
    name: 'Autoplay Interaction',
    description: "Defines if the slider's autoplay will be paused on user interaction.",
    type: 'boolean',
  },
  pauseonhover: {
    ...SETTINGS.pauseonhover,
    name: 'Pause On Hover',
    description: "Defines if the slider's autoplay will be paused on mouse hover.",
    type: 'boolean',
  },
  bulletactive: {
    ...SETTINGS.bulletactive,
    name: 'Bullet Active',
    description: 'Defines class for active bullet.',
    type: 'boolean',
  },
  cmsactive: {
    ...SETTINGS.cmsactive,
    name: 'CMS Active',
    description: 'Defines class for active thumbnail.',
    type: 'boolean',
  },
  desktop: {
    ...SETTINGS.desktop,
    group: SCHEMA_GROUPS.slidesSettings.key,
    name: 'Desktop',
    description: 'Defines the slide settings for desktop devices.',
    type: 'tuple',
    values: [
      {
        name: 'Slides Per View',
        type: 'int',
      },
      {
        name: 'Slides Per Group',
        type: 'int',
      },
      {
        name: 'Space Between',
        type: 'text',
      },
    ],
  },
  tablet: {
    ...SETTINGS.tablet,
    group: SCHEMA_GROUPS.slidesSettings.key,
    name: 'Tablet',
    description: 'Defines the slide settings for tablet devices.',
    type: 'tuple',
    values: [
      {
        name: 'Slides Per View',
        type: 'int',
      },
      {
        name: 'Slides Per Group',
        type: 'int',
      },
      {
        name: 'Space Between',
        type: 'text',
      },
    ],
  },
  mobilelandscape: {
    ...SETTINGS.mobilelandscape,
    group: SCHEMA_GROUPS.slidesSettings.key,
    name: 'Mobile Landscape',
    description: 'Defines the slide settings for mobile landscape devices.',
    type: 'tuple',
    values: [
      {
        name: 'Slides Per View',
        type: 'int',
      },

      {
        name: 'Slides Per Group',
        type: 'int',
      },
      {
        name: 'Space Between',
        type: 'text',
      },
    ],
  },
  mobileportrait: {
    ...SETTINGS.mobileportrait,
    group: SCHEMA_GROUPS.slidesSettings.key,
    name: 'Mobile Portrait',
    description: 'Defines the slide settings for mobile portrait devices.',
    type: 'tuple',
    values: [
      {
        name: 'Slides Per View',
        type: 'int',
      },
      {
        name: 'Slides Per Group',
        type: 'int',
      },
      {
        name: 'Space Between',
        type: 'text',
      },
    ],
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general, SCHEMA_GROUPS.pagination, SCHEMA_GROUPS.slidesSettings],
  elements: [
    {
      key: 'slider',
      name: 'Slider',
      description: 'Defines the Slider element.',
      allowedTypes: ['Block', 'DynamoWrapper'],
      group: SCHEMA_GROUPS.general.key,
      required: true,
      settings: [
        SCHEMA_SETTINGS.direction,
        SCHEMA_SETTINGS.effect,
        SCHEMA_SETTINGS.speed,
        SCHEMA_SETTINGS.autoheight,
        SCHEMA_SETTINGS.centeredslides,
        SCHEMA_SETTINGS.loop,
        SCHEMA_SETTINGS.draggable,
        SCHEMA_SETTINGS.scrollbar,
        SCHEMA_SETTINGS.autoplay,
        SCHEMA_SETTINGS.autoplaydelay,
        SCHEMA_SETTINGS.autoplayinteraction,
        SCHEMA_SETTINGS.pauseonhover,
        SCHEMA_SETTINGS.desktop,
      ],
    },
    {
      key: 'next',
      name: 'Next Button',
      description: 'Defines the Next Button element.',
      allowedTypes: ['Block', 'Link'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'previous',
      name: 'Previous Button',
      description: 'Defines the Previous Button element.',
      allowedTypes: ['Block', 'Link'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'pagination-wrapper',
      name: 'Pagination Wrapper',
      description: 'Defines the Pagination Wrapper element.',
      allowedTypes: [''],
      group: SCHEMA_GROUPS.pagination.key,
    },
    {
      key: 'bullet',
      name: 'Bullet',
      description: 'Defines the Bullet element.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.pagination.key,
      conditions: [
        {
          condition: 'is-child-of',
          element: 'pagination-wrapper',
        },
      ],
    },
    {
      key: 'pagination-current',
      name: 'Count Current',
      description: 'Defines the Count Current element.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.pagination.key,
      conditions: [
        {
          condition: 'is-child-of',
          element: 'pagination-wrapper',
        },
      ],
    },
    {
      key: 'pagination-total',
      name: 'Count Total',
      description: 'Defines the Count Total element.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.pagination.key,
      conditions: [
        {
          condition: 'is-child-of',
          element: 'pagination-wrapper',
        },
      ],
    },
    {
      key: 'popup',
      name: 'Popup',
      description: 'Defines the Popup element.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.general.key,
    },
  ],
};
