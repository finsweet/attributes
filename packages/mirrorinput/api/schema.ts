import type { AttributeSchema } from '@finsweet/attributes-utils';
import { FORM_INPUT } from '@finsweet/attributes-utils';

import { TARGET_ELEMENT_KEY, TRIGGER_ELEMENT_KEY } from '../src/utils/constants';

const schema: AttributeSchema = {
  elements: [
    {
      key: TRIGGER_ELEMENT_KEY,
      description: 'Defines the element as the trigger of the event.',
      required: true,
      requiresInstance: true,
      conditions: [],
      appliedTo: [FORM_INPUT],
      multiplesInInstance: false,
    },
    {
      key: TARGET_ELEMENT_KEY,
      description: 'Defines the element as the target to mirror the fired event.',
      required: true,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: TRIGGER_ELEMENT_KEY,
        },
      ],
      appliedTo: [FORM_INPUT],
      multiplesInInstance: false,
    },
  ],
  settings: [],
};

export default schema;
