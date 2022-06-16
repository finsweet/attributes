import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'code',
      description: 'Defines a `<code>` element that holds the code to be highlighted.',
      appliedTo: [
        { label: 'Code block', selectors: ['pre code'] },
        { label: 'Embed Code', selectors: ['div.w-embed'] },
        { label: 'Parent Wrapper', selectors: ['*'] },
      ],
      conditions: [
        { condition: 'exists', type: 'selector', selector: [{ label: 'Code block', selectors: ['pre code'] }] },
      ],
      requiresInstance: false,
      multiplesInInstance: false,
      required: true,
    },
  ],
  settings: [
    {
      key: 'theme',
      description: 'Defines the highlighting theme.',
      appliedTo: { elements: ['code'] },
      conditions: [],
      value: { type: 'string', default: '' },
    },
  ],
} as AttributeSchema;
