import { FORM_INPUT } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { TRIGGER_ELEMENT_KEY, TARGET_ELEMENT_KEY } from './../src/constants';

export const schema: AttributeSchema = {
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
