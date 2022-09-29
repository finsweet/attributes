import type { AttributeSchema } from '$global/types/schema';

export default {
  elements: [
    {
      key: 'list',
      description: 'Defines a list to be filtered.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Collection List',
          selectors: ['.w-dyn-items', '.w-dyn-list'],
        },
      ],
      conditions: [],
    },
    {
      key: 'filters',
      description: 'Defines the `Form` that holds the filters.',
      required: true,
      requiresInstance: true,
      appliedTo: [
        {
          label: 'Form',
          selectors: ['form'],
        },
        {
          label: 'Form Block',
          selectors: ['div.w-form'],
        },
      ],
      multiplesInInstance: false,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
    {
      key: 'reset',
      description: 'Defines a button that resets all filters when clicked.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
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
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
        {
          condition: 'isChildOf',
          type: 'element',
          element: 'filters',
        },
        {
          condition: 'isChildOf',
          type: 'selector',
          selector: [
            {
              label: 'Form',
              selectors: ['form'],
            },
          ],
        },
      ],
    },
    {
      key: 'results-count',
      description: 'Defines an element that will display all existing results.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Text Block',
          selectors: ['div'],
        },
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
    {
      key: 'items-count',
      description: 'Defines an element where to display the total items of the list.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Text Block',
          selectors: ['div'],
        },
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
    {
      key: 'empty',
      description: 'Defines the Empty State element for when there are no filetered elements to show.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
    {
      key: 'initial',
      description: 'Defines the initial element to be shown when the filter is first applied.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
    {
      key: 'tag-template',
      description: 'Defines a tag template element.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
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
          label: 'Text Block',
          selectors: ['div'],
        },
        {
          label: 'Text Link',
          selectors: ['a'],
        },
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
    {
      key: 'tag-text',
      description: 'Defines the text node of a tag.',
      required: false,
      requiresInstance: false,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Text Block',
          selectors: ['div'],
        },
      ],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: 'tag-template',
        },
      ],
    },
    {
      key: 'tag-remove',
      description: 'Defines a remove trigger element of a tag.',
      required: false,
      requiresInstance: false,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Link Block',
          selectors: ['a.w-inline-block'],
        },
        {
          label: 'Text Block',
          selectors: ['div'],
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
          element: 'tag-template',
        },
      ],
    },
    {
      key: 'scroll-anchor',
      description: 'Defines an element where to scroll the view every time a filter is applied.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
  ],
  fields: [
    {
      key: 'field',
      description: 'Defines a field key to group filters.',
      specializations: [
        {
          label: 'Checkbox Label',
          key: 'checkbox',
          appliedTo: [
            {
              parent: [
                {
                  type: 'element',
                  element: 'list',
                },
              ],
              selectors: [
                {
                  label: 'Text Block',
                  selectors: ['div'],
                },
                {
                  label: 'Heading',
                  selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                },
                {
                  label: 'Paragraph',
                  selectors: ['p'],
                },
                {
                  label: 'Text Link',
                  selectors: ['a'],
                },
              ],
              type: 'default',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: 'filters',
                },
              ],
              selectors: [
                {
                  label: 'Checkbox Label',
                  selectors: ['label.w-checkbox span'],
                },
              ],
              type: 'default',
            },
          ],
        },
        {
          label: 'Radio Label',
          key: 'radio',
          appliedTo: [
            {
              parent: [
                {
                  type: 'element',
                  element: 'list',
                },
              ],
              selectors: [
                {
                  label: 'Text Block',
                  selectors: ['div'],
                },
                {
                  label: 'Heading',
                  selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                },
                {
                  label: 'Paragraph',
                  selectors: ['p'],
                },
                {
                  label: 'Text Link',
                  selectors: ['a'],
                },
              ],
              type: 'default',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: 'filters',
                },
              ],
              selectors: [
                {
                  label: 'Radio Label',
                  selectors: ['label.w-radio span'],
                },
              ],
              type: 'default',
            },
          ],
        },
        {
          label: 'Input',
          key: 'input',
          appliedTo: [
            {
              parent: [
                {
                  type: 'element',
                  element: 'list',
                },
              ],
              selectors: [
                {
                  label: 'Text Block',
                  selectors: ['div'],
                },
                {
                  label: 'Heading',
                  selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                },
                {
                  label: 'Paragraph',
                  selectors: ['p'],
                },
                {
                  label: 'Text Link',
                  selectors: ['a'],
                },
              ],
              type: 'default',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: 'filters',
                },
              ],
              selectors: [
                {
                  label: 'Input',
                  selectors: ['input'],
                },
              ],
              type: 'default',
            },
          ],
        },
        {
          label: 'Select',
          key: 'select',
          appliedTo: [
            {
              parent: [
                {
                  type: 'element',
                  element: 'list',
                },
              ],
              selectors: [
                {
                  label: 'Text Block',
                  selectors: ['div'],
                },
                {
                  label: 'Heading',
                  selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                },
                {
                  label: 'Paragraph',
                  selectors: ['p'],
                },
                {
                  label: 'Text Link',
                  selectors: ['a'],
                },
              ],
              type: 'default',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: 'filters',
                },
              ],
              selectors: [
                {
                  label: 'Select',
                  selectors: ['select.w-select'],
                },
              ],
              type: 'default',
            },
          ],
        },
        {
          label: 'Search Field',
          key: 'search-field',
          appliedTo: [
            {
              parent: [
                {
                  type: 'element',
                  element: 'filters',
                },
              ],
              selectors: [
                {
                  label: 'Text Input Field',
                  selectors: ['input.w-input'],
                },
              ],
              type: 'default',
            },
          ],
        },
        {
          label: 'Toggle',
          key: 'toggle-button',
          appliedTo: [
            {
              parent: [
                {
                  type: 'element',
                  element: 'list',
                },
              ],
              selectors: [
                {
                  label: 'Embed Code',
                  selectors: ['div.w-embed'],
                },
              ],
              type: 'default',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: 'filters',
                },
              ],
              selectors: [
                {
                  label: 'Checkbox Input',
                  selectors: ['label.w-checkbox input'],
                },
              ],
              type: 'default',
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      key: 'active',
      description: "Defines an active CSS class that will be added to checked checkboxes/radios's parent element.",
      appliedTo: {
        elements: ['list'],
        fields: ['field'],
      },
      conditions: [],
      value: {
        type: 'string',
        default: 'fs-cmsfilter_active',
      },
    },
    {
      key: 'match',
      description: 'Defines the matching mode.',
      appliedTo: {
        fields: ['field'],
      },
      conditions: [],
      value: {
        type: 'options',
        default: 'any',
        options: [
          {
            value: 'any',
            description: 'Any of the selected filters have to match in the item for the item to be filtered.',
          },
          {
            value: 'all',
            description: 'All of the selected filters have to match in the item for the item to be filtered.',
          },
        ],
      },
    },
    {
      key: 'type',
      description: 'Defines a specific field type.',
      appliedTo: {
        fields: ['field'],
      },
      conditions: [],
      value: {
        type: 'options',
        default: 'date',
        options: [
          {
            value: 'date',
            description: 'Indicates that the filter input is in date format',
          },
        ],
      },
    },
    {
      key: 'range',
      description: 'Defines a range to filter.',
      appliedTo: {
        fields: ['field'],
      },
      specializations: [
        {
          value: 'from',
        },
        {
          value: 'to',
        },
      ],
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: 'reset',
      description: 'Defines a specific field key to be resetted when clicking a Reset button.',
      appliedTo: {
        elements: ['reset'],
      },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: 'showquery',
      description: 'Defines if the filter query params should be displayed on the URL.',
      appliedTo: {
        elements: ['list'],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
    {
      key: 'tagformat',
      description: 'Defines the format of the tag.',
      appliedTo: {
        elements: ['list'],
        fields: ['field'],
      },
      conditions: [],
      value: {
        type: 'string',
        default: 'category',
      },
    },
    {
      key: 'tagcategory',
      description: 'Overrides the key display of a filter when using the `category` tag format.',
      appliedTo: {
        fields: ['field'],
      },
      conditions: [],
      value: {
        type: 'string',
        default: 'Search',
      },
    },
    {
      key: 'debounce',
      description: 'Defines the debouncing for input events.',
      appliedTo: {
        elements: ['list'],
        fields: ['field'],
      },
      conditions: [],
      value: {
        type: 'int',
        default: '50',
      },
    },
    {
      key: 'highlight',
      description: 'Defines if the filter query should highlight the matching item props.',
      appliedTo: {
        fields: ['field'],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
    {
      key: 'highlightclass',
      description: 'Defines the highlight CSS class to be used to highlight elements.',
      appliedTo: {
        elements: ['list'],
      },
      conditions: [],
      value: {
        type: 'string',
        default: 'fs-cmsfilter_highlight',
      },
    },
    {
      key: 'easing',
      description: 'Defines the easing function of the list animation.',
      appliedTo: {
        elements: ['list'],
      },
      conditions: [],
      value: {
        type: 'options',
        options: [
          {
            value: 'linear',
            description: 'The items animation curve will be linear.',
          },
          {
            value: 'ease',
            description: 'The items animation curve will be ease.',
          },
          {
            value: 'ease-in',
            description: 'The items animation curve will be ease-in.',
          },
          {
            value: 'ease-out',
            description: 'The items animation curve will be ease-out.',
          },
          {
            value: 'ease-in-out',
            description: 'The items animation curve will be ease-in-out.',
          },
        ],
        default: 'ease',
      },
    },
    {
      key: 'duration',
      description: 'Defines the duration of the list animation.',
      appliedTo: {
        elements: ['list'],
      },
      conditions: [],
      value: {
        type: 'int',
        default: '100',
      },
    },
  ],
} as AttributeSchema;
