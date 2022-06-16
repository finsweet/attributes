import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'contents',
      description: 'Defines the contents to use as the table source.',
      requiresInstance: true,
      required: true,
      appliedTo: [
        { label: 'Rich Text Block', selectors: ['.w-richtext'] },
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [
        {
          type: 'selector',
          condition: 'isParentOf',
          selector: [{ label: 'Heading H2 to H6', selectors: ['h2', 'h3', 'h4', 'h5', 'h6'] }],
        },
      ],
      multiplesInInstance: false,
    },
    {
      key: 'link',
      description: 'Defines a link template element.',
      requiresInstance: true,
      required: true,
      appliedTo: [
        { label: 'Link Block', selectors: ['a.w-inline-block'] },
        { label: 'Text Block', selectors: ['div'] },
      ],
      conditions: [],
      multiplesInInstance: true,
    },
    {
      key: 'ix-trigger',
      description: 'Defines an interaction trigger.',
      requiresInstance: true,
      required: false,
      appliedTo: [{ label: 'Any element', selectors: ['*'] }],
      conditions: [],
      multiplesInInstance: false,
    },
    {
      key: 'table',
      description: 'Defines the wrapper element that will hold all the TOC links.',
      requiresInstance: true,
      required: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [],
      multiplesInInstance: false,
    },
  ],
  settings: [
    {
      key: 'offsettop',
      description: 'Defines a scroll-margin-top value for the headers.',
      appliedTo: { elements: ['contents'] },
      conditions: [{ condition: 'exists', type: 'element', element: 'contents' }],
      value: { type: 'int', default: '0' },
    },
    {
      key: 'offsetbottom',
      description: 'Defines a scroll-margin-bottom value for the headers.',
      appliedTo: { elements: ['contents'] },
      conditions: [{ condition: 'exists', type: 'element', element: 'contents' }],
      value: { type: 'int', default: '0' },
    },
    {
      key: 'hideurlhash',
      description: 'Defines if the links hash should be removed from the URL.',
      appliedTo: { elements: ['contents'] },
      conditions: [{ condition: 'exists', type: 'element', element: 'contents' }],
      value: { type: 'boolean', default: 'true' },
    },
  ],
} as AttributeSchema;
