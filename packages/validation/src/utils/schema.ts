import type { Schema, SchemaGroups, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_GROUPS: SchemaGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
};

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  required: {
    ...SETTINGS.required,
    name: 'Required',
    description: 'Declares input required for submission.',
    type: 'text',
  },
  minlength: {
    ...SETTINGS.minlength,
    name: 'Minlength',
    description: 'Minimum character count length.',
    type: 'int',
  },
  maxlength: {
    ...SETTINGS.maxlength,
    name: 'Maxlength',
    description: 'Maximum character count length.',
    type: 'int',
  },
  minvalue: {
    ...SETTINGS.minvalue,
    name: 'Minvalue',
    description: 'Minimum number value.',
    type: 'int',
  },
  maxvalue: {
    ...SETTINGS.maxvalue,
    name: 'Maxvalue',
    description: 'Maximum number value.',
    type: 'int',
  },
  errorclass: {
    ...SETTINGS.errorclass,
    name: 'Error class',
    description: 'Defines active class applied to the input when the validation has an error.',
    type: 'text',
  },
  successclass: {
    ...SETTINGS.successclass,
    name: 'Success class',
    description: 'Defines class applied to the input when the validation has success.',
    type: 'text',
  },
  reject: {
    ...SETTINGS.reject,
    name: 'Reject',
    description: 'Comma separated list of all domains to reject on type=email submissions.',
    type: 'text',
  },
  debounce: {
    ...SETTINGS.debounce,
    name: 'Debounce',
    description: 'Amount of time (in ms) until the validation check is triggered.',
    type: 'int',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [SCHEMA_GROUPS.general],
  elements: [
    {
      key: 'form',
      name: 'form',
      description: 'Defines the form wrapper.',
      allowedTypes: ['Block', 'DynamoWrapper'],
      group: SCHEMA_GROUPS.general.key,
      required: true,
    },
    {
      key: 'input',
      name: 'input',
      description: 'The form input field.',
      allowedTypes: ['Input'],
      group: SCHEMA_GROUPS.general.key,
      settings: [
        SCHEMA_SETTINGS.required,
        SCHEMA_SETTINGS.minlength,
        SCHEMA_SETTINGS.maxlength,
        SCHEMA_SETTINGS.minvalue,
        SCHEMA_SETTINGS.maxvalue,
        SCHEMA_SETTINGS.debounce,
        SCHEMA_SETTINGS.reject,
        SCHEMA_SETTINGS.errorclass,
        SCHEMA_SETTINGS.successclass,
      ],
    },
    {
      key: 'success-show',
      name: 'Success Message',
      description: 'Defines the success message element.',
      allowedTypes: ['Block', 'Text'],
      group: SCHEMA_GROUPS.general.key,
    },
    {
      key: 'error-show',
      name: 'Error Message',
      description: 'efines the error message element.',
      allowedTypes: ['Block', 'Text'],
      group: SCHEMA_GROUPS.pagination.key,
    },
    {
      key: 'submit',
      name: 'Submit Button',
      description: 'Defines the Submit Button element.',
      allowedTypes: ['Block', 'Link', 'Button'],
      group: SCHEMA_GROUPS.general.key,
    },
  ],
};
