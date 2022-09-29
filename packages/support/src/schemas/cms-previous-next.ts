import type { AttributeSchema } from '$global/types/schema';

export default {
  elements: [
    {
      key: 'list',
      description: 'Defines a list to be combined into the target.',
      conditions: [
        {
          condition: 'hasLink',
        },
      ],
      appliedTo: [
        {
          label: 'Collection List',
          selectors: ['.w-dyn-items'],
        },
        {
          label: 'Collection List Wrapper',
          selectors: ['.w-dyn-list'],
        },
      ],
      required: true,
      multiplesInInstance: false,
      requiresInstance: false,
    },
    {
      key: 'previous',
      description: 'Defines the `Previous` placeholder target.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      required: true,
      requiresInstance: false,
    },
    {
      key: 'previous-empty',
      description: 'Defines the `Previous` Empty State.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Text Element',
          selectors: ['p', 'span', 'div'],
        },
        {
          label: 'Button',
          selectors: ['a.w-button'],
        },
        {
          label: 'Link Block',
          selectors: ['a.w-inline-block'],
        },
        {
          label: 'Text Link',
          selectors: ['a'],
        },
      ],
      required: false,
      requiresInstance: false,
    },
    {
      key: 'next',
      description: 'Defines the `Next` placeholder target.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      required: true,
      requiresInstance: false,
    },
    {
      key: 'next-empty',
      description: 'Defines the `Next` Empty State.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Text Element',
          selectors: ['p', 'span', 'div'],
        },
        {
          label: 'Button',
          selectors: ['a.w-button'],
        },
        {
          label: 'Link Block',
          selectors: ['a.w-inline-block'],
        },
        {
          label: 'Text Link',
          selectors: ['a'],
        },
      ],
      multiplesInInstance: false,
      required: false,
      requiresInstance: false,
    },
  ],
  settings: [],
} as AttributeSchema;
