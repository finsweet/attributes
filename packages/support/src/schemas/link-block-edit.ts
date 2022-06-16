import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'parent',
      description: 'Defines the parent element that will act as the `Link Block`.',
      required: true,
      requiresInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      multiplesInInstance: false,
      conditions: [
        {
          condition: 'isParentOf',
          type: 'selector',
          selector: [
            { label: 'Text Block', selectors: ['div'] },
            { label: 'Button', selectors: ['a.w-button'] },
          ],
        },
      ],
    },
  ],
  settings: [],
} as AttributeSchema;
