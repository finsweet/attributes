import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'click',
      description: 'Defines an element to act as the copy trigger.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: true,
      appliedTo: [
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
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [],
    },
    {
      key: 'copy-this',
      description: 'Defines an element to act as the copy target.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Text Block',
          selectors: ['div'],
        },
        {
          label: 'Paragraph',
          selectors: ['p'],
        },
        {
          label: 'Heading',
          selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'click',
        },
      ],
    },
    {
      key: 'copy-sibling',
      description: 'Defines a sibling element to act as the copy target.',
      required: false,
      requiresInstance: false,
      appliedTo: [
        {
          label: 'Text Block',
          selectors: ['div'],
        },
        {
          label: 'Paragraph',
          selectors: ['p'],
        },
        {
          label: 'Heading',
          selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
      ],
      multiplesInInstance: false,
      conditions: [
        {
          condition: 'isSiblingOf',
          type: 'element',
          element: 'click',
        },
      ],
    },
  ],
  settings: [
    {
      key: 'text',
      description: 'Defines the text that will be copied to the clipboard.',
      appliedTo: {
        elements: ['click'],
      },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: 'message',
      description: 'Defines the message that will be displayed on success.',
      appliedTo: {
        elements: ['click'],
      },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: 'duration',
      description: 'Defines the duration of the success state.',
      appliedTo: {
        elements: ['click'],
      },
      conditions: [],
      value: {
        type: 'int',
        default: '1000',
      },
    },
    {
      key: 'active',
      description: 'Defines the CSS Class added to the trigger on the success state.',
      appliedTo: {
        elements: ['click'],
      },
      conditions: [],
      value: {
        type: 'string',
        default: 'fs-copyclip_active',
      },
    },
  ],
} as AttributeSchema;
