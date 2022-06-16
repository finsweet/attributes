import {
  COLLECTION_LIST,
  DIV_BLOCK,
  TEXT_BLOCK,
  SECTION,
  LIST,
  PARAGRAPH,
  HEADING,
} from '@global/constants/webflow-selectors';
import type { AttributeSchema } from '@global/types/schema';

import { LIST_ELEMENT_KEY, VALUE_ELEMENT_KEY } from './../src/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines the CMS list or list-wrapper.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [COLLECTION_LIST, DIV_BLOCK, SECTION, LIST],
      conditions: [],
    },
    {
      key: VALUE_ELEMENT_KEY,
      description: 'Defines the element that will display the amount of CMS items.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [TEXT_BLOCK, PARAGRAPH, HEADING],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
  ],
  settings: [],
};
