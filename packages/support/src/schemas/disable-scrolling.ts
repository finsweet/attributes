import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'disable',
      description: 'Scrolling will be disabled when this element is clicked.',
      required: true,
      requiresInstance: false,
      conditions: [],
      appliedTo: [
        { label: 'Button', selectors: ['a.w-button'] },
        { label: 'Text Link', selectors: ['a'] },
        { label: 'Link Block', selectors: ['a.w-inline-block'] },
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      multiplesInInstance: false,
    },
    {
      key: 'enable',
      description: 'Scrolling will be enabled when this element is clicked.',
      required: true,
      requiresInstance: false,
      conditions: [],
      appliedTo: [
        { label: 'Button', selectors: ['a.w-button'] },
        { label: 'Text Link', selectors: ['a'] },
        { label: 'Link Block', selectors: ['a.w-inline-block'] },
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      multiplesInInstance: false,
    },
    {
      key: 'toggle',
      description: 'Scrolling will be disabled/enabled when this element is clicked.',
      required: true,
      requiresInstance: false,
      conditions: [],
      appliedTo: [
        { label: 'Button', selectors: ['a.w-button'] },
        { label: 'Text Link', selectors: ['a'] },
        { label: 'Link Block', selectors: ['a.w-inline-block'] },
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      multiplesInInstance: false,
    },
    {
      key: 'when-visible',
      description: 'Scrolling will be disabled/enabled when this element becomes visible/hidden.',
      required: false,
      requiresInstance: false,
      conditions: [],
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        { label: 'Any element', selectors: ['*'] },
      ],
      multiplesInInstance: true,
    },
    {
      key: 'smart-nav',
      description:
        'Scrolling will be disabled/enabled when the `Nav Menu` is open/closed. Specific for `Navbar` components.',
      required: false,
      requiresInstance: false,
      conditions: [],
      appliedTo: [{ label: 'Nav Bar', selectors: ['.w-nav'] }],
      multiplesInInstance: false,
    },
    {
      key: 'preserve',
      description: "Applied on elements that must preserve scrolling when the page's scrolling is disabled.",
      required: false,
      requiresInstance: false,
      conditions: [],
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        { label: 'Rich Text Block', selectors: ['.w-richtext'] },
        {
          label: 'Section',
          selectors: [
            'div.wf-section',
            'header.wf-section',
            'footer.wf-section',
            'nav.wf-section',
            'main.wf-section',
            'section.wf-section',
            'article.wf-section',
            'aside.wf-section',
            'address.wf-section',
            'figure.wf-section',
          ],
        },
      ],
      multiplesInInstance: false,
    },
  ],
  settings: [
    {
      key: 'media',
      description: 'Used to define a media query that restricts when an element acts as a trigger.',
      conditions: [],
      appliedTo: { elements: ['enable', 'disable', 'toggle', 'when-visible'] },
      value: { type: 'string', default: '' },
    },
    {
      key: 'gap',
      description: 'Defines if the scrollbar gap must be reserved when disabling scrolling.',
      conditions: [],
      appliedTo: { elements: ['enable', 'disable', 'toggle', 'when-visible'] },
      value: { type: 'boolean', default: 'false' },
    },
  ],
} as AttributeSchema;
