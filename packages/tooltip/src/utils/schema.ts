import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  content: {
    ...SETTINGS.content,
    name: 'Content',
    description: 'Message content for the Richtext tooltip',
    type: 'text',
  },
  flip: {
    ...SETTINGS.flip,
    name: 'Flip',
    description: 'Defines the flip behavior of the tooltip',
    type: 'text',
  },
  listener: {
    ...SETTINGS.listener,
    name: 'Listener',
    description: 'Event listener for the tooltip, currently supported is click or Hover. Defaults to hover.',
    type: 'text',
  },
  offset: {
    ...SETTINGS.offset,
    name: 'Offset',
    description: 'The offset value of the tooltip. Distance between the target and the tooltip.',
    type: 'text',
  },
  padding: {
    ...SETTINGS.padding,
    name: 'Padding',
    description: 'The padding value of the tooltip. Distance between the tooltip and the tooltip content.',
    type: 'text',
  },
  placement: {
    ...SETTINGS.placement,
    name: 'Placement',
    description: 'The placement value of the tooltip. Where the tooltip will be placed relative to the target.',
    type: 'text',
  },
  animation: {
    ...SETTINGS.animation,
    name: 'Animation',
    description: 'Default animation for the component. Defaults to no animations if not set.',
    type: 'select',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'arrow',
      name: 'Arrow',
      description: 'Tooltip arrow',
      allowedTypes: ['Block'],
      settings: [],
    },
    {
      key: 'tooltip',
      name: 'Tooltip',
      description: 'Tooltip popup element',
      allowedTypes: ['Block'],
      settings: [],
    },
    {
      key: 'target',
      name: 'Target',
      description: 'Target element that triggers the tooltip',
      allowedTypes: ['Block'],
      settings: [
        SCHEMA_SETTINGS.animation,
        SCHEMA_SETTINGS.listener,
        SCHEMA_SETTINGS.placement,
        SCHEMA_SETTINGS.offset,
        SCHEMA_SETTINGS.flip,
        SCHEMA_SETTINGS.padding,
      ],
    },
    {
      key: 'tooltip-template',
      name: 'Tooltip Template',
      description: 'Richtext tooltip template',
      allowedTypes: ['Block'],
      settings: [],
    },
  ],
};
