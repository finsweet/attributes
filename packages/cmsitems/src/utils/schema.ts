import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
};

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  mobileportrait: {
    ...SETTINGS.mobileportrait,
    name: 'Mobile portrait',
    description: 'Defines the number of items per screen for mobile portrait screen size.',
    type: 'int',
  },
  mobilelandscape: {
    ...SETTINGS.mobilelandscape,
    name: 'Mobile landscape',
    description: 'Defines the number of items per screen for mobile landscape screen size.',
    type: 'int',
  },
  tablet: {
    ...SETTINGS.tablet,
    name: 'tablet',
    description: 'Defines the number of items per screen for tablet screen size.',
    type: 'int',
  },
  desktop: {
    ...SETTINGS.desktop,
    name: 'desktop',
    description: 'Defines the number of items per screen for desktop screen size.',
    type: 'int',
  },
  1280: {
    ...SETTINGS['1280'],
    name: '1280',
    description: 'Defines the number of items per screen for 1280 to 1440 screen size.',
    type: 'int',
  },
  1440: {
    ...SETTINGS['1440'],
    name: '1440',
    description: 'Defines the number of items per screen for 1440 to 1920 landscape screen size.',
    type: 'int',
  },
  1920: {
    ...SETTINGS['1920'],
    name: '1920',
    description: 'Defines the number of items per screen for 1920+ screen size.',
    type: 'int',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general, SCHEMA_GROUPS.pagination, SCHEMA_GROUPS.slidesSettings],
  elements: [
    {
      key: 'cmsitems',
      name: 'cmsitems',
      description: 'Defines cms items breakpoints.',
      allowedTypes: ['Block', 'DynamoWrapper'],
      group: SCHEMA_GROUPS.general.key,
      required: true,
      settings: [
        SCHEMA_SETTINGS.mobileportrait,
        SCHEMA_SETTINGS.mobilelandscape,
        SCHEMA_SETTINGS.desktop,
        SCHEMA_SETTINGS.tablet,
        SCHEMA_SETTINGS['1280'],
        SCHEMA_SETTINGS['1440'],
        SCHEMA_SETTINGS['1920'],
      ],
    },
  ],
};
