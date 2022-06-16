import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'slider',
      description: 'Defines a slider to instantiate.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Slider',
          selectors: ['.w-slide'],
        },
      ],
      conditions: [],
    },
    {
      key: 'content',
      description: 'Defines the content to be added to the slider dot.',
      required: true,
      requiresInstance: false,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Text Block',
          selectors: ['div'],
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
          label: 'Embed Code',
          selectors: ['div.w-embed'],
        },
        {
          label: 'Image',
          selectors: ['img'],
        },
      ],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: 'slider',
        },
      ],
    },
    {
      key: 'slider-nav',
      description:
        "Defines a custom Slider Nav. If this attribute is not added, the Slider's original Nav will be used instead.",
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Slider Nav',
          selectors: ['.w-slider-nav'],
        },
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'slider',
        },
      ],
    },
  ],
  settings: [
    {
      key: 'active',
      description: 'Defines the `active` CSS class',
      appliedTo: {
        elements: ['content'],
      },
      conditions: [],
      value: {
        type: 'string',
        default: 'fs-sliderdots_active',
      },
    },
    {
      key: 'remove',
      description: 'Defines if the content should be removed or just duplicated.',
      appliedTo: {
        elements: ['content', 'slider'],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
} as AttributeSchema;
