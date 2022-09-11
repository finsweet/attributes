import type { AttributeSchema } from '@global/types/schema';
import {
  COLLECTION_LIST,
  FORM_INPUT,
  LINK_BLOCK,
  RICH_TEXT_BLOCK,
  TEXT_BLOCK,
  TEXT_LINK,
} from 'global/constants/webflow-selectors';

import {
  LIST_ELEMENT_KEY,
  LINK_ELEMENT_KEY,
  TITLE_ELEMENT_KEY,
  DESCRIPTION_ELEMENT_KEY,
  OFFICE_ELEMENT_KEY,
  DEPARTMENT_ELEMENT_KEY,
  APPLY_ELEMENT_KEY,
  FORM_ELEMENT_KEY,
  QUESTIONS_ELEMENT_KEY,
  QUESTIONS_HEADER_ELEMENT_KEY,
  QUESTIONS_DESCRIPTIONS_ELEMENT_KEY,
  BOARD_SETTING_KEY,
  QUERY_PARAM_SETTING_KEY,
  FILTER_SETTING_KEY,
  DISPLAY_SETTING_KEY,
  DEFAULT_QUERY_PARAM_SETTING_KEY,
} from './../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines the list to show greenhouse jobs',
      required: true,
      appliedTo: [COLLECTION_LIST],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [],
    },
    {
      key: LINK_ELEMENT_KEY,
      description: 'Defines the link that job id will be appended',
      required: false,
      appliedTo: [LINK_BLOCK, TEXT_LINK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: TITLE_ELEMENT_KEY,
      description: 'Defines an element where to display job title.',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: DESCRIPTION_ELEMENT_KEY,
      description: 'Defines an element where to display job description.',
      required: false,
      appliedTo: [RICH_TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: OFFICE_ELEMENT_KEY,
      description: 'Defines an element where to display job office.',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: DEPARTMENT_ELEMENT_KEY,
      description: 'Defines an element where to display job department.',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: APPLY_ELEMENT_KEY,
      description: 'Defines a link to set as apply button',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: FORM_ELEMENT_KEY,
      description: 'Defines an element to be the application form',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: QUESTIONS_ELEMENT_KEY,
      description: 'Defines an element to be wrapper of form elements',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: FORM_ELEMENT_KEY,
        },
      ],
    },
    {
      key: QUESTIONS_HEADER_ELEMENT_KEY,
      description: 'Defines an element as template of question header.',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: FORM_ELEMENT_KEY,
        },
      ],
    },
    {
      key: QUESTIONS_DESCRIPTIONS_ELEMENT_KEY,
      description: 'Defines an element as template of question description.',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: FORM_ELEMENT_KEY,
        },
      ],
    },
  ],
  fields: [
    {
      key: FILTER_SETTING_KEY,
      description: 'Defines an input element to filter jobs',
      specializations: [
        {
          label: 'Default',
          key: 'default',
          appliedTo: [
            {
              parent: null,
              selectors: [FORM_INPUT],
              type: 'default',
            },
          ],
        },
      ],
    },
    {
      key: DISPLAY_SETTING_KEY,
      description: 'Defines an element to display filter values.',
      specializations: [
        {
          label: 'Default',
          key: 'default',
          appliedTo: [
            {
              parent: null,
              selectors: [FORM_INPUT],
              type: 'default',
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      key: BOARD_SETTING_KEY,
      description: 'Defines board ID in script.',
      appliedTo: {},
      value: {
        type: 'string',
      },
      conditions: [],
    },
    {
      key: QUERY_PARAM_SETTING_KEY,
      description: 'Defines query param used to handle jobs details and form.',
      appliedTo: {},
      value: {
        type: 'string',
        default: DEFAULT_QUERY_PARAM_SETTING_KEY,
      },
      conditions: [],
    },
  ],
};
