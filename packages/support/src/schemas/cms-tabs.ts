import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'list',
      description: 'Defines a list to be included into the target tabs.',
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
      conditions: [],
      multiplesInInstance: false,
      required: true,
      requiresInstance: true,
    },
    {
      key: 'tabs',
      description: 'Defines the target tabs where all lists will be included into.',
      appliedTo: [
        {
          label: 'Tabs',
          selectors: ['.w-tabs'],
        },
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
      multiplesInInstance: false,
      required: true,
      requiresInstance: true,
    },
    {
      key: 'tab-link',
      description: 'Defines the content that will be placed inside the generated `Tab Link` in the `Tabs Menu`.',
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Text Block',
          selectors: ['div'],
        },
      ],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: 'tabs',
        },
      ],
      multiplesInInstance: true,
      required: true,
      requiresInstance: true,
    },
  ],
  settings: [
    {
      key: 'resetix',
      description: 'Defines if Webflow should be restarted after populating the tabs.',
      appliedTo: {
        elements: ['tabs'],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
} as AttributeSchema;
