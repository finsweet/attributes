import {
  BUTTON,
  DIV_BLOCK,
  FORM_INPUT,
  HEADING,
  LINK_BLOCK,
  PARAGRAPH,
  TEXT_BLOCK,
  TEXT_LINK,
} from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import {
  DEFAULT_SUCCESS_CSS_CLASS,
  DEFAULT_SUCCESS_DURATION,
  SIBLING_ELEMENT_KEY,
  SUCCESS_MESSAGE_SETTING_KEY,
  SUCESSS_CLASS_SETTING_KEY,
  SUCESSS_DURATION_SETTING_KEY,
  TARGET_ELEMENT_KEY,
  TEXT_SETTING_KEY,
  TRIGGER_ELEMENT_KEY,
} from './../src/constants';

const schema: AttributeSchema = {
  elements: [
    {
      key: TRIGGER_ELEMENT_KEY,
      description: 'Defines an element to act as the copy trigger.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: true,
      appliedTo: [BUTTON, LINK_BLOCK, TEXT_LINK, DIV_BLOCK],
      conditions: [],
    },
    {
      key: TARGET_ELEMENT_KEY,
      description: 'Defines an element to act as the copy target.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [TEXT_BLOCK, PARAGRAPH, HEADING, FORM_INPUT],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: TRIGGER_ELEMENT_KEY,
        },
      ],
    },
    {
      key: SIBLING_ELEMENT_KEY,
      description: 'Defines a sibling element to act as the copy target.',
      required: false,
      requiresInstance: false,
      appliedTo: [TEXT_BLOCK, PARAGRAPH, HEADING, FORM_INPUT],
      multiplesInInstance: false,
      conditions: [
        {
          condition: 'isSiblingOf',
          type: 'element',
          element: TRIGGER_ELEMENT_KEY,
        },
      ],
    },
  ],
  settings: [
    {
      key: TEXT_SETTING_KEY,
      description: 'Defines the text that will be copied to the clipboard.',
      appliedTo: {
        elements: [TRIGGER_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: SUCCESS_MESSAGE_SETTING_KEY,
      description: 'Defines the message that will be displayed on success.',
      appliedTo: {
        elements: [TRIGGER_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: SUCESSS_DURATION_SETTING_KEY,
      description: 'Defines the duration of the success state.',
      appliedTo: {
        elements: [TRIGGER_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'int',
        default: DEFAULT_SUCCESS_DURATION.toString(),
      },
    },
    {
      key: SUCESSS_CLASS_SETTING_KEY,
      description: 'Defines the CSS Class added to the trigger on the success state.',
      appliedTo: {
        elements: [TRIGGER_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: DEFAULT_SUCCESS_CSS_CLASS,
      },
    },
  ],
};

export default schema;
