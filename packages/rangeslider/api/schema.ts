import { DIV_BLOCK, HEADING, PARAGRAPH, TEXT_BLOCK } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import {
  WRAPPER_ELEMENT_KEY,
  TRACK_ELEMENT_KEY,
  FILL_ELEMENT_KEY,
  HANDLE_ELEMENT_KEY,
  DISPLAY_VALUE_ELEMENT_KEY,
  MIN_SETTING_KEY,
  MAX_SETTING_KEY,
  START_SETTING_KEY,
  STEP_SETTING_KEY,
  FORMAT_DISPLAY_SETTING_KEY,
  UPDATE_ACTION_SETTING_KEY,
} from './../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: WRAPPER_ELEMENT_KEY,
      description: 'Defines a range slider instance element.',
      appliedTo: [DIV_BLOCK],
      conditions: [],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
    {
      key: TRACK_ELEMENT_KEY,
      description: 'Defines the track of the slider.',
      appliedTo: [DIV_BLOCK],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: WRAPPER_ELEMENT_KEY,
        },
        {
          condition: 'hasStyle',
          styles: [
            {
              property: 'position',
              value: 'relative',
            },
          ],
        },
      ],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
    {
      key: FILL_ELEMENT_KEY,
      description: 'Defines the fill of the slider.',
      appliedTo: [DIV_BLOCK],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: TRACK_ELEMENT_KEY,
        },
        {
          condition: 'hasStyle',
          styles: [
            {
              property: 'position',
              value: 'absolute',
            },
          ],
        },
      ],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
    {
      key: HANDLE_ELEMENT_KEY,
      description: 'Defines a handle of the slider.',
      appliedTo: [DIV_BLOCK],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: TRACK_ELEMENT_KEY,
        },
        {
          condition: 'hasStyle',
          styles: [
            {
              property: 'position',
              value: 'absolute',
            },
          ],
        },
      ],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
    {
      key: DISPLAY_VALUE_ELEMENT_KEY,
      description: "Defines an element to display a Handle's value.",
      appliedTo: [TEXT_BLOCK, PARAGRAPH, HEADING],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: TRACK_ELEMENT_KEY,
        },
        {
          condition: 'exists',
          type: 'element',
          element: HANDLE_ELEMENT_KEY,
        },
      ],
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
    },
  ],
  settings: [
    {
      key: MIN_SETTING_KEY,
      description: 'Defines the minimum value of the range.',
      appliedTo: {
        elements: [WRAPPER_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'int',
        default: '0',
      },
    },
    {
      key: MAX_SETTING_KEY,
      description: 'Defines the maximum value of the range.',
      appliedTo: {
        elements: [WRAPPER_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'int',
        default: '0',
      },
    },
    {
      key: STEP_SETTING_KEY,
      description: 'Defines the step of the values.',
      appliedTo: {
        elements: [WRAPPER_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'int',
        default: '0',
      },
    },
    {
      key: START_SETTING_KEY,
      description: 'Defines the start value of a handle.',
      appliedTo: {
        elements: [HANDLE_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'int',
        default: '0',
      },
    },
    {
      key: FORMAT_DISPLAY_SETTING_KEY,
      description: "Defines if the Handles' value display should be formatted.",
      appliedTo: {
        elements: [WRAPPER_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
    {
      key: UPDATE_ACTION_SETTING_KEY,
      description: 'Defines when should the <input> elements be updated.',
      appliedTo: {
        elements: [WRAPPER_ELEMENT_KEY],
      },
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
};
