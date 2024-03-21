import type { AttributeSchema } from '@finsweet/attributes-utils';
import { ANY_ELEMENT, BUTTON, DIV_BLOCK, LINK_BLOCK, TEXT_LINK } from '@finsweet/attributes-utils';

import { DELAY_SETTING_KEY, TARGET_ELEMENT_KEY, TRIGGER_ELEMENT_KEY } from '../src/utils/constants';

const schema: AttributeSchema = {
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

export default schema;
