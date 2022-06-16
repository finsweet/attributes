import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'list',
      description: 'Defines a list to be combined into the target.',
      conditions: [],
      appliedTo: [
        {
          label: 'Collection List',
          selectors: ['.w-dyn-items'],
        },
      ],
      multiplesInInstance: true,
      required: true,
      requiresInstance: true,
    },
    {
      key: 'items-count',
      description: 'Defines an element where to display the total items of the list.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
      appliedTo: [
        {
          label: 'Text Element',
          selectors: ['p', 'span', 'div'],
        },
      ],
      multiplesInInstance: false,
      required: false,
      requiresInstance: true,
    },
  ],
  settings: [],
} as AttributeSchema;
