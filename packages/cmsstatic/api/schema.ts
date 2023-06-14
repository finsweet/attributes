import type { AttributeSchema } from '@finsweet/attributes-utils';
import { COLLECTION_LIST, DIV_BLOCK, LINK_BLOCK } from '@finsweet/attributes-utils';

import {
  INTERACTIVE_SETTING_KEY,
  LIST_ELEMENT_KEY,
  ORDER_SETTING_KEY,
  STATIC_ITEM_ELEMENT_KEY,
} from './../src/utils/constants';

const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines a list to have a static element.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [COLLECTION_LIST],
      conditions: [],
    },
    {
      key: STATIC_ITEM_ELEMENT_KEY,
      description: 'Defines the static element.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: true,
      appliedTo: [DIV_BLOCK, LINK_BLOCK],
      conditions: [],
    },
  ],

  settings: [
    {
      key: ORDER_SETTING_KEY,
      description: 'Defines the order of static element in list.',
      appliedTo: { elements: [STATIC_ITEM_ELEMENT_KEY] },
      conditions: [{ condition: 'exists', type: 'element', element: STATIC_ITEM_ELEMENT_KEY }],
      value: {
        type: 'int',
        default: '',
      },
    },
    {
      key: INTERACTIVE_SETTING_KEY,
      description: 'Defines if element will be strict static or will interact with load, filters, order.',
      appliedTo: { elements: [STATIC_ITEM_ELEMENT_KEY] },
      conditions: [{ condition: 'exists', type: 'element', element: STATIC_ITEM_ELEMENT_KEY }],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
};

export default schema;
