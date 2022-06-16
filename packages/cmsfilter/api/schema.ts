import {
  COLLECTION_LIST,
  FORM,
  FORM_BLOCK,
  DIV_BLOCK,
  BUTTON,
  LINK_BLOCK,
  TEXT_LINK,
  TEXT_BLOCK,
  IMAGE,
  INPUT,
  HEADING,
  PARAGRAPH,
  CHECKBOX,
  CHECKBOX_LABEL,
  RADIO_LABEL,
  SELECT,
  TEXT_INPUT_FIELD,
  EMBED_CODE,
} from '@global/constants/webflow-selectors';
import type { AttributeSchema } from '@global/types/schema';

import {
  LIST_ELEMENT_KEY,
  FILTERS_ELEMENT_KEY,
  EMPTY_ELEMENT_KEY,
  INITIAL_ELEMENT_KEY,
  RESULTS_COUNT_ELEMENT_KEY,
  ITEMS_COUNT_ELEMENT_KEY,
  TAG_TEMPLATE_ELEMENT_KEY,
  TAG_TEXT_ELEMENT_KEY,
  TAG_REMOVE_ELEMENT_KEY,
  SCROLL_ANCHOR_ELEMENT_KEY,
  RESET_ELEMENT_KEY,
  FIELD_SETTING_KEY,
  RESET_SETTING_KEY,
  MATCH_SETTING_KEY,
  RANGE_SETTING_KEY,
  TYPE_SETTING_KEY,
  SHOW_QUERY_SETTING_KEY,
  HIGHLIGHT_SETTING_KEY,
  HIGHLIGHT_CLASS_SETTING_KEY,
  ACTIVE_CLASS_SETTING_KEY,
  DEBOUNCE_SETTING_KEY,
  TAG_FORMAT_SETTING_KEY,
  TAG_CATEGORY_SETTING_KEY,
  EASING_SETTING_KEY,
  DURATION_SETTING_KEY,
  DEFAULT_ACTIVE_CSS_CLASS,
  DEFAULT_HIGHLIGHT_CSS_CLASS,
  DEFAULT_DEBOUNCING,
} from '../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines a list to be filtered.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [COLLECTION_LIST],
      conditions: [],
    },
    {
      key: FILTERS_ELEMENT_KEY,
      description: 'Defines the `Form` that holds the filters.',
      required: true,
      requiresInstance: true,
      appliedTo: [FORM, FORM_BLOCK],
      multiplesInInstance: false,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: RESET_ELEMENT_KEY,
      description: 'Defines a button that resets all filters when clicked.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [BUTTON, LINK_BLOCK, TEXT_LINK],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
        {
          condition: 'isChildOf',
          type: 'element',
          element: FILTERS_ELEMENT_KEY,
        },
        {
          condition: 'isChildOf',
          type: 'selector',
          selector: [FORM],
        },
      ],
    },
    {
      key: RESULTS_COUNT_ELEMENT_KEY,
      description: 'Defines an element that will display all existing results.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [TEXT_BLOCK],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: ITEMS_COUNT_ELEMENT_KEY,
      description: 'Defines an element where to display the total items of the list.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [TEXT_BLOCK],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: EMPTY_ELEMENT_KEY,
      description: 'Defines the Empty State element for when there are no filetered elements to show.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: INITIAL_ELEMENT_KEY,
      description: 'Defines the initial element to be shown when the filter is first applied.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: TAG_TEMPLATE_ELEMENT_KEY,
      description: 'Defines a tag template element.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK, BUTTON, LINK_BLOCK, TEXT_BLOCK, TEXT_LINK],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: TAG_TEXT_ELEMENT_KEY,
      description: 'Defines the text node of a tag.',
      required: false,
      requiresInstance: false,
      multiplesInInstance: false,
      appliedTo: [TEXT_BLOCK],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: TAG_TEMPLATE_ELEMENT_KEY,
        },
      ],
    },
    {
      key: TAG_REMOVE_ELEMENT_KEY,
      description: 'Defines a remove trigger element of a tag.',
      required: false,
      requiresInstance: false,
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK, LINK_BLOCK, TEXT_BLOCK, IMAGE],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: TAG_TEMPLATE_ELEMENT_KEY,
        },
      ],
    },
    {
      key: SCROLL_ANCHOR_ELEMENT_KEY,
      description: 'Defines an element where to scroll the view every time a filter is applied.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
  ],
  fields: [
    {
      key: FIELD_SETTING_KEY,
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
                  element: LIST_ELEMENT_KEY,
                },
              ],
              selectors: [TEXT_BLOCK, HEADING, PARAGRAPH, TEXT_LINK],
              type: 'element',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: FILTERS_ELEMENT_KEY,
                },
              ],
              selectors: [CHECKBOX_LABEL],
              type: 'element',
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
                  element: LIST_ELEMENT_KEY,
                },
              ],
              selectors: [TEXT_BLOCK, HEADING, PARAGRAPH, TEXT_LINK],
              type: 'element',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: FILTERS_ELEMENT_KEY,
                },
              ],
              selectors: [RADIO_LABEL],
              type: 'element',
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
                  element: LIST_ELEMENT_KEY,
                },
              ],
              selectors: [TEXT_BLOCK, HEADING, PARAGRAPH, TEXT_LINK],
              type: 'element',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: FILTERS_ELEMENT_KEY,
                },
              ],
              selectors: [INPUT],
              type: 'element',
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
                  element: LIST_ELEMENT_KEY,
                },
              ],
              selectors: [TEXT_BLOCK, HEADING, PARAGRAPH, TEXT_LINK],
              type: 'element',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: FILTERS_ELEMENT_KEY,
                },
              ],
              selectors: [SELECT],
              type: 'element',
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
                  element: FILTERS_ELEMENT_KEY,
                },
              ],
              selectors: [TEXT_INPUT_FIELD],
              type: 'element',
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
                  element: LIST_ELEMENT_KEY,
                },
              ],
              selectors: [EMBED_CODE],
              type: 'element',
            },
            {
              parent: [
                {
                  type: 'element',
                  element: FILTERS_ELEMENT_KEY,
                },
              ],
              selectors: [CHECKBOX],
              type: 'element',
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      key: ACTIVE_CLASS_SETTING_KEY,
      description: "Defines an active CSS class that will be added to checked checkboxes/radios's parent element.",
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
        fields: [FIELD_SETTING_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: DEFAULT_ACTIVE_CSS_CLASS,
      },
    },
    {
      key: MATCH_SETTING_KEY,
      description: 'Defines the matching mode.',
      appliedTo: {
        fields: [FIELD_SETTING_KEY],
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
      key: TYPE_SETTING_KEY,
      description: 'Defines a specific field type.',
      appliedTo: {
        fields: [FIELD_SETTING_KEY],
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
      key: RANGE_SETTING_KEY,
      description: 'Defines a range to filter.',
      appliedTo: {
        fields: [FIELD_SETTING_KEY],
      },
      specializations: [{ value: 'from' }, { value: 'to' }],
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: RESET_SETTING_KEY,
      description: 'Defines a specific field key to be resetted when clicking a Reset button.',
      appliedTo: {
        elements: [RESET_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: SHOW_QUERY_SETTING_KEY,
      description: 'Defines if the filter query params should be displayed on the URL.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },

    {
      key: TAG_FORMAT_SETTING_KEY,
      description: 'Defines the format of the tag.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
        fields: [FIELD_SETTING_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: 'category',
      },
    },
    {
      key: TAG_CATEGORY_SETTING_KEY,
      description: 'Overrides the key display of a filter when using the `category` tag format.',
      appliedTo: {
        fields: [FIELD_SETTING_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: 'Search',
      },
    },
    {
      key: DEBOUNCE_SETTING_KEY,
      description: 'Defines the debouncing for input events.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
        fields: [FIELD_SETTING_KEY],
      },
      conditions: [],
      value: {
        type: 'int',
        default: DEFAULT_DEBOUNCING,
      },
    },
    {
      key: HIGHLIGHT_SETTING_KEY,
      description: 'Defines if the filter query should highlight the matching item props.',
      appliedTo: {
        fields: [FIELD_SETTING_KEY],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
    {
      key: HIGHLIGHT_CLASS_SETTING_KEY,
      description: 'Defines the highlight CSS class to be used to highlight elements.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: DEFAULT_HIGHLIGHT_CSS_CLASS,
      },
    },
    {
      key: EASING_SETTING_KEY,
      description: 'Defines the easing function of the list animation.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
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
      key: DURATION_SETTING_KEY,
      description: 'Defines the duration of the list animation.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'int',
        default: '100',
      },
    },
    // {
    //   key: HIDE_EMPTY_SETTING_KEY,
    //   description: 'Defines if a filter element should be hidden when there are no results for it.',
    //   appliedTo: {},
    //   conditions: [],
    //   value: {
    //     type: 'string',
    //     default: '',
    //   },
    // },
  ],
};
