import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'wrapper',
      description: 'Defines a range slider instance element.',
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
    {
      key: 'track',
      description: 'Defines the track of the slider.',
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [
        { condition: 'isChildOf', type: 'element', element: 'wrapper' },
        { condition: 'hasStyle', styles: [{ property: 'position', value: 'relative' }] },
      ],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
    {
      key: 'fill',
      description: 'Defines the fill of the slider.',
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [
        { condition: 'isChildOf', type: 'element', element: 'track' },
        { condition: 'hasStyle', styles: [{ property: 'position', value: 'absolute' }] },
      ],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
    {
      key: 'handle',
      description: 'Defines a handle of the slider.',
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [
        { condition: 'isChildOf', type: 'element', element: 'track' },
        { condition: 'hasStyle', styles: [{ property: 'position', value: 'absolute' }] },
      ],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
    {
      key: 'display-value',
      description: "Defines an element to display a Handle's value.",
      appliedTo: [
        { label: 'Text Block', selectors: ['div'] },
        { label: 'Paragraph', selectors: ['p'] },
        { label: 'Heading', selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
      ],
      conditions: [
        { condition: 'exists', type: 'element', element: 'track' },
        { condition: 'exists', type: 'element', element: 'handle' },
      ],
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
    },
  ],
  settings: [
    {
      key: 'min',
      description: 'Defines the minimum value of the range.',
      appliedTo: { elements: ['wrapper'] },
      conditions: [],
      value: { type: 'int', default: '0' },
    },
    {
      key: 'max',
      description: 'Defines the maximum value of the range.',
      appliedTo: { elements: ['wrapper'] },
      conditions: [],
      value: { type: 'int', default: '0' },
    },
    {
      key: 'step',
      description: 'Defines the step of the values.',
      appliedTo: { elements: ['wrapper'] },
      conditions: [],
      value: { type: 'int', default: '0' },
    },
    {
      key: 'start',
      description: 'Defines the start value of a handle.',
      appliedTo: { elements: ['handle'] },
      conditions: [],
      value: { type: 'int', default: '0' },
    },
    {
      key: 'formatdisplay',
      description: "Defines if the Handles' value display should be formatted.",
      appliedTo: { elements: ['wrapper'] },
      conditions: [],
      value: { type: 'boolean', default: 'true' },
    },
    {
      key: 'update',
      description: 'Defines when should the <input> elements be updated.',
      appliedTo: { elements: ['wrapper'] },
      conditions: [],
      value: {
        type: 'options',
        default: 'move',
        options: [
          {
            value: 'move',
            description:
              'The value of the range slider <input> will be updated on every single move of the handle. As the user moves the handle, the <input> constantly updates.',
          },
          {
            value: 'release',
            description:
              'The value of the range slider <input> will be updated when the user releases the mouse/finger from the handle.',
          },
        ],
      },
    },
  ],
} as AttributeSchema;
