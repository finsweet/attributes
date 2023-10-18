import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
};

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  date: {
    ...SETTINGS.date,
    name: 'Date',
    description: 'Date to count to.',
    type: 'text',
  },
  timezone: {
    ...SETTINGS.timezone,
    name: 'Timezone',
    description: 'Establish countdown date timezone.',
    type: 'text',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general],
  elements: [
    {
      key: 'months',
      name: 'Months',
      description: 'Defines the element with the month value.',
      allowedTypes: ['Text'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'days',
      name: 'Days',
      description: 'Defines the element with the days value.',
      allowedTypes: ['Text'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'hours',
      name: 'Hours',
      description: 'Defines the element with the hours value.',
      allowedTypes: ['Text'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'minutes',
      name: 'Minutes',
      description: 'Defines the element with the minutes value.',
      allowedTypes: ['Text'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'seconds',
      name: 'Seconds',
      description: 'Defines the element with the seconds value.',
      allowedTypes: ['Text'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'complete-show',
      name: 'Complete show',
      description: 'Defines the element that will be shown at the end of the timer.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'complete-hide',
      name: 'Complete hide',
      description: 'Defines the element that will be hidden at the end of the timer.',
      allowedTypes: ['Block'],
      group: SCHEMA_GROUPS.general.key,
    },
  ],
};
