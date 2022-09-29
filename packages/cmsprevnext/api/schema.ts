import {
  COLLECTION_LIST,
  DIV_BLOCK,
  LINK_BLOCK,
  TEXT_ELEMENT,
  TEXT_LINK,
  BUTTON,
} from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import {
  LIST_ELEMENT_KEY,
  PREVIOUS_ELEMENT_KEY,
  PREVIOUS_EMPTY_ELEMENT_KEY,
  NEXT_ELEMENT_KEY,
  NEXT_EMPTY_ELEMENT_KEY,
} from '../src/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines a list to be combined into the target.',
      conditions: [
        {
          condition: 'hasLink',
        },
      ],
      appliedTo: [COLLECTION_LIST],
      required: true,
      multiplesInInstance: false,
      requiresInstance: false,
    },
    {
      key: PREVIOUS_ELEMENT_KEY,
      description: 'Defines the `Previous` placeholder target.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK],
      required: true,
      requiresInstance: false,
    },
    {
      key: PREVIOUS_EMPTY_ELEMENT_KEY,
      description: 'Defines the `Previous` Empty State.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK, TEXT_ELEMENT, BUTTON, LINK_BLOCK, TEXT_LINK],
      required: false,
      requiresInstance: false,
    },
    {
      key: NEXT_ELEMENT_KEY,
      description: 'Defines the `Next` placeholder target.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK],
      required: true,
      requiresInstance: false,
    },
    {
      key: NEXT_EMPTY_ELEMENT_KEY,
      description: 'Defines the `Next` Empty State.',
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
      appliedTo: [DIV_BLOCK, TEXT_ELEMENT, BUTTON, LINK_BLOCK, TEXT_LINK],
      multiplesInInstance: false,
      required: false,
      requiresInstance: false,
    },
  ],
  settings: [],
};
