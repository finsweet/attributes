import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'lightbox',
      description:
        "Defines the lightbox element. When it's open, the lightbox will become a direct child of the Body. This will avoid all z-index, fixed position, and transform issues.",
      required: true,
      requiresInstance: true,
      conditions: [
        {
          condition: 'isParentOf',
          type: 'element',
          element: 'trigger-open',
        },
      ],
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Webflow Lightbox Component',
          selectors: ['.w-lightbox'],
        },
      ],
      multiplesInInstance: false,
    },
    {
      key: 'trigger-open',
      description: 'Defines the trigger that appends the `lightbox` element as a direct child of the `<body>`.',
      required: true,
      requiresInstance: true,
      conditions: [],
      appliedTo: [
        {
          label: 'Button',
          selectors: ['a.w-button'],
        },
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Text Link',
          selectors: ['a'],
        },
        {
          label: 'Link Block',
          selectors: ['a.w-inline-block'],
        },
      ],
      multiplesInInstance: false,
    },
    {
      key: 'trigger-close',
      description: 'Defines the trigger that returns the `lightbox` to its previous position.',
      required: true,
      requiresInstance: true,
      conditions: [],
      appliedTo: [
        {
          label: 'Button',
          selectors: ['a.w-button'],
        },
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Text Link',
          selectors: ['a'],
        },
        {
          label: 'Link Block',
          selectors: ['a.w-inline-block'],
        },
      ],
      multiplesInInstance: false,
    },
    {
      key: 'trigger-toggle',
      description: 'Defines a trigger that toggles the open/close actions.',
      required: true,
      requiresInstance: true,
      conditions: [],
      appliedTo: [
        {
          label: 'Button',
          selectors: ['a.w-button'],
        },
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Text Link',
          selectors: ['a'],
        },
        {
          label: 'Link Block',
          selectors: ['a.w-inline-block'],
        },
      ],
      multiplesInInstance: false,
    },
  ],
  settings: [
    {
      key: 'wait',
      description: 'Defines the timeout to wait before triggering the `close` state.',
      conditions: [],
      appliedTo: {
        elements: ['lightbox'],
      },
      value: {
        type: 'int',
        default: '0',
      },
    },
  ],
} as AttributeSchema;
