import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'trigger',
      description: 'Defines the element as the trigger of the event.',
      required: true,
      requiresInstance: true,
      conditions: [],
      appliedTo: [{ label: 'Form Input', selectors: ['input.w-input', 'select.w-select', 'textarea'] }],
      multiplesInInstance: false,
    },
    {
      key: 'target',
      description: 'Defines the element as the target to mirror the fired event.',
      required: true,
      requiresInstance: true,
      conditions: [{ condition: 'exists', type: 'element', element: 'trigger' }],
      appliedTo: [{ label: 'Form Input', selectors: ['input.w-input', 'select.w-select', 'textarea'] }],
      multiplesInInstance: false,
    },
  ],
  settings: [],
} as AttributeSchema;
