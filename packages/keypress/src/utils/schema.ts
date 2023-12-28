import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  keycode: {
    ...SETTINGS.keycode,
    name: 'Key',
    description: 'Defines the keypress binding to trigger event.',
    type: 'text',
  },
  toggle: {
    ...SETTINGS.toggle,
    name: 'Key',
    description: 'Defines a valid CSS selector to target the element to keypress the event.',
    type: 'text',
  },
  event: {
    ...SETTINGS.event,
    name: 'Event',
    description: 'Defines the event to trigger. (click or hover)',
    type: 'text',
  },
  delay: {
    ...SETTINGS.delay,
    name: 'Delay',
    description: 'Defines a delay to wait until the click event is replicated on the target.',
    type: 'text',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'target',
      name: 'Target',
      description: 'Defines the element as the target to keypress the fired event.',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.delay, SCHEMA_SETTINGS.keycode, SCHEMA_SETTINGS.toggle, SCHEMA_SETTINGS.event],
    },
  ],
};
