import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'list',
      description: 'Defines the CMS list or list-wrapper.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        { label: 'Collection List', selectors: ['.w-dyn-items'] },
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
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
        { label: 'List', selectors: ['ul'] },
      ],
      conditions: [],
    },
    {
      key: 'value',
      description: 'Defines the element that will display the amount of CMS items.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        { label: 'Text Block', selectors: ['div'] },
        { label: 'Paragraph', selectors: ['p'] },
        { label: 'Heading', selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
      ],
      conditions: [{ condition: 'exists', type: 'element', element: 'list' }],
    },
  ],
  settings: [],
} as AttributeSchema;
