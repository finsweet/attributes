import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'trigger',
      description: ' Defines the element as the trigger of the event.',
      appliedTo: [
        { label: 'Button', selectors: ['a.w-button'] },
        { label: 'Text Link', selectors: ['a'] },
        { label: 'Link Block', selectors: ['a.w-inline-block'] },
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [],
      requiresInstance: true,
      multiplesInInstance: false,
      required: true,
    },
    {
      key: 'target',
      description: 'Defines the element as the target to mirror the fired event.',
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        { label: 'Any element', selectors: ['*'] },
      ],
      multiplesInInstance: true,
      conditions: [{ condition: 'exists', type: 'element', element: 'trigger' }],
      requiresInstance: true,
      required: true,
    },
  ],
  settings: [
    {
      key: 'delay',
      description: 'Defines a delay to wait until the click event is replicated on the target.',
      appliedTo: { elements: ['trigger', 'target'] },
      conditions: [
        { condition: 'exists', type: 'element', element: 'trigger' },
        { condition: 'exists', type: 'element', element: 'target' },
      ],
      value: { type: 'int', default: '0' },
    },
  ],
} as AttributeSchema;
