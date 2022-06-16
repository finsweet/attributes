import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'text-value',
      description: 'Defines the elements as the source to populate the target.',
      appliedTo: [{ label: 'Text Element', selectors: ['p', 'span', 'div'] }],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'selector',
          selector: [{ label: 'Collection Item', selectors: ['.w-dyn-item'] }],
        },
      ],
      multiplesInInstance: true,
      required: true,
      requiresInstance: true,
    },
    {
      key: 'select',
      description: 'Defines the element as the target to be populated.',
      appliedTo: [{ label: 'Select', selectors: ['select.w-select'] }],
      conditions: [{ condition: 'exists', type: 'element', element: 'text-value' }],
      multiplesInInstance: false,
      required: true,
      requiresInstance: true,
    },
  ],
  settings: [],
} as AttributeSchema;
