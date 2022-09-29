import type { AttributeSchema } from '$global/types/schema';

export default {
  elements: [
    {
      key: 'list',
      description: 'Defines a list to be combined into the target.',
      appliedTo: [
        { label: 'Collection List', selectors: ['.w-dyn-items'] },
        { label: 'Collection List Wrapper', selectors: ['.w-dyn-list'] },
      ],
      conditions: [],
      required: true,
      multiplesInInstance: false,
      requiresInstance: true,
    },
    {
      key: 'scroll-anchor',
      description: 'Defines an element where to scroll the view every time a filter is applied.',
      appliedTo: [],
      conditions: [],
      multiplesInInstance: false,
      required: false,
      requiresInstance: true,
    },
    {
      key: 'dropdown-label',
      description: 'Defines a Dropdown label.',
      appliedTo: [],
      conditions: [],
      multiplesInInstance: false,
      required: false,
      requiresInstance: true,
    },
  ],
  fields: [
    {
      key: 'field',
      description: 'Defines a field key to sort items.',
      specializations: [
        {
          label: 'Select Trigger',
          key: 'select-trigger',
          appliedTo: [
            {
              parent: [{ type: 'element', element: 'list' }],
              selectors: [
                { label: 'Text Block', selectors: ['div'] },
                { label: 'Heading', selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
                { label: 'Paragraph', selectors: ['p'] },
                { label: 'Text Link', selectors: ['a'] },
              ],
              type: 'default',
            },
            {
              parent: null,
              selectors: [{ label: 'Select', selectors: ['select.w-select'] }],
              key: 'element',
              value: 'trigger',
              type: 'default',
            },
            {
              parent: [{ type: 'selector', selector: { label: 'Select', selectors: ['select.w-select'] } }],
              selectors: [{ label: 'Select Option', selectors: ['select.w-select option'] }],
              type: 'default',
              value: '$FIELD-asc',
            },
            {
              parent: [{ type: 'selector', selector: { label: 'Select', selectors: ['select.w-select'] } }],
              selectors: [{ label: 'Select Option', selectors: ['select.w-select option'] }],
              type: 'default',
              value: '$FIELD-desc',
            },
          ],
        },
        {
          label: 'Button Trigger',
          key: 'button-trigger',
          appliedTo: [
            {
              parent: [{ type: 'element', element: 'list' }],
              selectors: [
                { label: 'Text Block', selectors: ['div'] },
                { label: 'Heading', selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
                { label: 'Paragraph', selectors: ['p'] },
                { label: 'Text Link', selectors: ['a'] },
              ],
              type: 'default',
            },
            {
              parent: null,
              selectors: [
                { label: 'Button', selectors: ['a.w-button'] },
                { label: 'Text Link', selectors: ['a'] },
                { label: 'Link Block', selectors: ['a.w-inline-block'] },
              ],
              key: 'element',
              value: 'trigger',
              type: 'default',
            },
          ],
        },
        {
          label: 'Dropdown Trigger',
          key: 'dropdown-trigger',
          appliedTo: [
            {
              parent: [{ type: 'element', element: 'list' }],
              selectors: [
                { label: 'Text Block', selectors: ['div'] },
                { label: 'Heading', selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
                { label: 'Paragraph', selectors: ['p'] },
                { label: 'Text Link', selectors: ['a'] },
              ],
              type: 'default',
            },
            {
              parent: null,
              selectors: [{ label: 'Dropdown', selectors: ['.w-dropdown'] }],
              key: 'element',
              value: 'trigger',
              type: 'default',
            },
            {
              parent: [{ type: 'selector', selector: { label: 'Dropdown', selectors: ['.w-dropdown'] } }],
              selectors: [{ label: 'Dropdown Item', selectors: ['.w-dropdown a'] }],
              value: '$FIELD-asc',
              type: 'default',
            },
            {
              parent: [{ type: 'selector', selector: { label: 'Dropdown', selectors: ['.w-dropdown'] } }],
              selectors: [{ label: 'Dropdown Item', selectors: ['.w-dropdown a'] }],
              value: '$FIELD-desc',
              type: 'default',
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      key: 'type',
      description: 'Defines the type of the values to sort.',
      appliedTo: { fields: ['field'] },
      conditions: [{ condition: 'exists', type: 'element', element: 'list' }],
      value: { type: 'string', default: 'date' },
    },
    {
      key: 'duration',
      description: 'Defines the duration of the list animation.',
      appliedTo: { elements: ['list'] },
      conditions: [],
      value: { type: 'int', default: '100' },
    },
    {
      key: 'asc',
      description: 'Defines the CSS Class for the `asc` state.',
      appliedTo: { fields: ['field'], specializations: ['button-trigger'] },
      conditions: [],
      value: { type: 'string', default: '' },
    },
    {
      key: 'desc',
      description: 'Defines the CSS Class for the `desc` state.',
      appliedTo: { fields: ['field'], specializations: ['button-trigger'] },
      conditions: [],
      value: { type: 'string', default: '' },
    },
    {
      key: 'reverse',
      description: 'Defines if a button should trigger `desc` sorting on first click.',
      appliedTo: { specializations: ['button-trigger'] },
      conditions: [],
      value: { type: 'boolean', default: 'true' },
    },
  ],
} as AttributeSchema;
