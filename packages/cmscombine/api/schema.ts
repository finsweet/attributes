import { COLLECTION_LIST, TEXT_ELEMENT } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { LIST_ELEMENT_KEY, ITEMS_COUNT_ELEMENT_KEY } from '../src/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines a list to be combined into the target.',
      conditions: [],
      appliedTo: [COLLECTION_LIST],
      multiplesInInstance: true,
      required: true,
      requiresInstance: true,
    },
    {
      key: ITEMS_COUNT_ELEMENT_KEY,
      description: 'Defines an element where to display the total items of the list.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
      appliedTo: [TEXT_ELEMENT],
      multiplesInInstance: false,
      required: false,
      requiresInstance: true,
    },
  ],
  settings: [],
};
