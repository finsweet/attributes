import {
  COLLECTION_LIST,
  COLLECTION_LIST_WRAPPER,
  HEADING,
  LINK_BLOCK,
  PARAGRAPH,
  SELECT,
  SELECT_OPTION,
  TEXT_BLOCK,
  TEXT_LINK,
  BUTTON,
  DROPDOWN,
  DIV_BLOCK,
  DROPDOWN_ITEM,
} from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import {
  LIST_ELEMENT_KEY,
  TRIGGER_ELEMENT_KEY,
  DROPDOWN_LABEL_ELEMENT_KEY,
  SCROLL_ANCHOR_ELEMENT_KEY,
  FIELD_SETTING_KEY,
  TYPE_SETTING_KEY, // EASING_SETTING_KEY,
  DURATION_SETTING_KEY,
  ASC_CLASS_SETTING_KEY,
  DESC_CLASS_SETTING_KEY,
  REVERSE_SETTING_KEY,
} from '../src/utils/constants';

const BUTTON_TRIGGER_KEY = 'button-trigger';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines a list to be combined into the target.',
      appliedTo: [COLLECTION_LIST, COLLECTION_LIST_WRAPPER],
      conditions: [],
      required: true,
      multiplesInInstance: false,
      requiresInstance: true,
    },
    {
      key: SCROLL_ANCHOR_ELEMENT_KEY,
      description: 'Defines an element where to scroll the view every time a filter is applied.',
      appliedTo: [],
      conditions: [],
      multiplesInInstance: false,
      required: false,
      requiresInstance: true,
    },
    {
      key: DROPDOWN_LABEL_ELEMENT_KEY,
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
      key: FIELD_SETTING_KEY,
      description: 'Defines a field key to sort items.',
      specializations: [
        {
          label: 'Select Trigger',
          key: 'select-trigger',
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
              parent: null,
              selectors: [SELECT],
              key: 'element',
              value: TRIGGER_ELEMENT_KEY,
              type: 'element',
            },
            {
              parent: [
                {
                  type: 'selector',
                  selector: SELECT,
                },
              ],
              selectors: [SELECT_OPTION],
              type: 'element',
              value: `$FIELD-asc`,
            },
            {
              parent: [
                {
                  type: 'selector',
                  selector: SELECT,
                },
              ],
              selectors: [SELECT_OPTION],
              type: 'element',
              value: `$FIELD-desc`,
            },
          ],
        },
        {
          label: 'Button Trigger',
          key: BUTTON_TRIGGER_KEY,
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
              parent: null,
              selectors: [BUTTON, TEXT_LINK, LINK_BLOCK],
              key: 'element',
              value: TRIGGER_ELEMENT_KEY,
              type: 'element',
            },
          ],
        },
        {
          label: 'Dropdown Trigger',
          key: 'dropdown-trigger',
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
              parent: null,
              selectors: [DROPDOWN],
              key: 'element',
              value: TRIGGER_ELEMENT_KEY,
              type: 'element',
            },
            {
              parent: [
                {
                  type: 'selector',
                  selector: DROPDOWN,
                },
              ],
              selectors: [DROPDOWN_ITEM],
              value: `$FIELD-asc`,
              type: 'element',
            },
            {
              parent: [
                {
                  type: 'selector',
                  selector: DROPDOWN,
                },
              ],
              selectors: [DROPDOWN_ITEM],
              value: `$FIELD-desc`,
              type: 'element',
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      key: TYPE_SETTING_KEY,
      description: 'Defines the type of the values to sort.',
      appliedTo: {
        fields: [FIELD_SETTING_KEY],
      },
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
      value: {
        type: 'string',
        default: 'date',
      },
    },
    // {
    //   key: EASING_SETTING_KEY,
    //   description: 'Defines the easing function of the list animation.',
    //   appliedTo: {},
    //   conditions: [],
    //   value: {
    //     type: 'string',
    //     default: '',
    //   },
    // },
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
    {
      key: ASC_CLASS_SETTING_KEY,
      description: 'Defines the CSS Class for the `asc` state.',
      appliedTo: {
        fields: [FIELD_SETTING_KEY],
        specializations: [BUTTON_TRIGGER_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: DESC_CLASS_SETTING_KEY,
      description: 'Defines the CSS Class for the `desc` state.',
      appliedTo: {
        fields: [FIELD_SETTING_KEY],
        specializations: [BUTTON_TRIGGER_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: REVERSE_SETTING_KEY,
      description: 'Defines if a button should trigger `desc` sorting on first click.',
      appliedTo: {
        specializations: [BUTTON_TRIGGER_KEY],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
};
