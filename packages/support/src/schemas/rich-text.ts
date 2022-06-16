import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'rich-text',
      description: 'Defines a rich text block instance.',
      conditions: [],
      appliedTo: [{ label: 'Rich Text Block', selectors: ['.w-richtext'] }],
      required: true,
      multiplesInInstance: true,
      requiresInstance: false,
    },
  ],
  fields: [
    {
      key: 'component',
      description: 'Defines a custom component.',
      specializations: [
        {
          label: 'Default',
          key: 'default',
          appliedTo: [{ parent: null, selectors: [{ label: 'Any element', selectors: ['*'] }], type: 'component' }],
        },
      ],
    },
  ],
  settings: [
    {
      key: 'component',
      description: 'Defines a custom component.',
      appliedTo: {},
      conditions: [],
      value: { type: 'string', default: '' },
    },
    {
      key: 'sanitize',
      description: 'Defines if the HTML should be sanitized before rendering it.',
      conditions: [],
      appliedTo: { elements: ['rich-text'] },
      value: { type: 'boolean', default: 'true' },
    },
    {
      key: 'resetix',
      description: 'Defines if Webflow should be restarted after loading new items.',
      conditions: [],
      appliedTo: { elements: ['rich-text'] },
      value: { type: 'boolean', default: 'true' },
    },
  ],
} as AttributeSchema;
