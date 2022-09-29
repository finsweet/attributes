import { DIV_BLOCK, BUTTON, TEXT_LINK, LINK_BLOCK, ANY_ELEMENT } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { TRIGGER_ELEMENT_KEY, TARGET_ELEMENT_KEY, DELAY_SETTING_KEY } from '../src/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: TRIGGER_ELEMENT_KEY,
      description: ' Defines the element as the trigger of the event.',
      appliedTo: [BUTTON, TEXT_LINK, LINK_BLOCK, DIV_BLOCK],
      conditions: [],
      requiresInstance: true,
      multiplesInInstance: false,
      required: true,
    },
    {
      key: TARGET_ELEMENT_KEY,
      description: 'Defines the element as the target to mirror the fired event.',
      appliedTo: [DIV_BLOCK, ANY_ELEMENT],
      multiplesInInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: TRIGGER_ELEMENT_KEY,
        },
      ],
      requiresInstance: true,
      required: true,
    },
  ],
  settings: [
    {
      key: DELAY_SETTING_KEY,
      description: 'Defines a delay to wait until the click event is replicated on the target.',
      appliedTo: {
        elements: [TRIGGER_ELEMENT_KEY, TARGET_ELEMENT_KEY],
      },
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: TRIGGER_ELEMENT_KEY,
        },
        {
          condition: 'exists',
          type: 'element',
          element: TARGET_ELEMENT_KEY,
        },
      ],
      value: {
        type: 'int',
        default: '0',
      },
    },
  ],
};
