import { DROPDOWN, LINK_BLOCK, SELECT, TEXT_BLOCK, TEXT_LINK } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import {
  DROPDOWN_ELEMENT_KEY,
  LABEL_ELEMENT_KEY,
  RESET_OPTION_KEY,
  HIDE_INITIAL_SETTING_KEY,
} from './../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: DROPDOWN_ELEMENT_KEY,
      description: 'Defines a dropdown element.',
      required: true,
      requiresInstance: true,
      appliedTo: [DROPDOWN],
      multiplesInInstance: true,
      conditions: [
        {
          condition: 'isParentOf',
          type: 'selector',
          selector: [SELECT],
        },
      ],
    },
    {
      key: LABEL_ELEMENT_KEY,
      description: 'Defines the label that displays the currently selected option.',
      required: false,
      requiresInstance: true,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: DROPDOWN_ELEMENT_KEY,
        },
      ],
    },
    {
      key: RESET_OPTION_KEY,
      description: 'Defines an option that will remove the selected value.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [LINK_BLOCK, TEXT_LINK],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: DROPDOWN_ELEMENT_KEY,
        },
      ],
    },
  ],
  settings: [
    {
      key: HIDE_INITIAL_SETTING_KEY,
      description: "Defines if the reset option should be hidden whenever there isn't an active selection.",
      appliedTo: {
        elements: [DROPDOWN_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
};
