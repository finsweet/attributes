import { BUTTON, DIV_BLOCK, TEXT_BLOCK } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { PARENT_ELEMENT_KEY } from '../src/constants';

const schema: AttributeSchema = {
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

export default schema;
