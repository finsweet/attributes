import { DIV_BLOCK, TEXT_BLOCK, BUTTON } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { PARENT_ELEMENT_KEY } from '../src/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: PARENT_ELEMENT_KEY,
      description: 'Defines the parent element that will act as the `Link Block`.',
      required: true,
      requiresInstance: false,
      appliedTo: [DIV_BLOCK],
      multiplesInInstance: false,
      conditions: [
        {
          condition: 'isParentOf',
          type: 'selector',
          selector: [TEXT_BLOCK, BUTTON],
        },
      ],
    },
  ],
  settings: [],
};
