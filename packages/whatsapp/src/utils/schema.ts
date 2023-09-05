import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from '.';

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  phone: {
    ...SETTINGS.phone,
    name: 'Phone',
    description: 'The phone number',
    type: 'text',
  },
  message: {
    ...SETTINGS.message,
    name: 'Message',
    description: 'The message to send',
    type: 'text',
  },
};

export const schema: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'button',
      name: 'Button',
      description: 'A button to open WhatsApp',
      allowedTypes: ['Link'],
      settings: [SCHEMA_SETTINGS.phone, SCHEMA_SETTINGS.message],
    },
    {
      key: 'phone',
      name: 'Phone',
      description: 'A phone number to open WhatsApp',
      allowedTypes: ['Block'],
    },
    {
      key: 'message',
      name: 'Message',
      description: 'A message to open WhatsApp',
      allowedTypes: ['Block'],
    },
  ],
};
