import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'list',
      description: 'Defines a list to be combined into the target.',
      conditions: [],
      multiplesInInstance: true,
      appliedTo: [
        { label: 'Collection List', selectors: ['.w-dyn-items'] },
        { label: 'Collection List Wrapper', selectors: ['.w-dyn-list'] },
      ],
      required: true,
      requiresInstance: false,
    },
  ],
  fields: [
    {
      key: 'collection',
      description: 'Defines a Collection List that will be nested inside the target list element.',
      specializations: [
        {
          label: 'Collection',
          key: 'collection',
          appliedTo: [
            {
              parent: [
                { type: 'element', element: 'list' },
                { type: 'selector', selector: { label: 'Collection Item', selectors: ['.w-dyn-item'] } },
              ],
              selectors: [
                {
                  label: 'Div Block',
                  selectors: [
                    'div',
                    'header',
                    'footer',
                    'nav',
                    'main',
                    'section',
                    'article',
                    'aside',
                    'address',
                    'figure',
                  ],
                },
              ],
              type: 'link',
            },
          ],
        },
      ],
    },
  ],
  settings: [],
} as AttributeSchema;
