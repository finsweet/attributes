import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'list',
      description: 'Defines a list to be included into the target slider.',
      appliedTo: [{ label: 'Collection List', selectors: ['.w-dyn-items'] }],
      conditions: [],
      multiplesInInstance: false,
      required: true,
      requiresInstance: true,
    },
    {
      key: 'slider',
      description: 'Defines the target slider where all lists will be included into.',
      appliedTo: [{ label: 'Slider', selectors: ['.w-slide'] }],
      multiplesInInstance: false,
      conditions: [{ condition: 'exists', type: 'element', element: 'list' }],
      required: true,
      requiresInstance: true,
    },
  ],
  settings: [
    {
      key: 'resetix',
      description: 'Defines if Webflow should be restarted after populating the sliders.',
      appliedTo: { elements: ['slider'] },
      value: { type: 'boolean', default: 'true' },
      conditions: [],
    },
  ],
} as AttributeSchema;
