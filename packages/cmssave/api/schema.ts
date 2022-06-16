import type { AttributeSchema } from '@global/types/schema';

import {
  LIST_ELEMENT_KEY,
  REMOVE_ELEMENT_KEY,
  COLLECTION_SETTING_KEY,
  FIELD_SETTING_KEY,
  EMPTY_SETTING_KEY,
} from '../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: ' Defines a list to be instantiated.',
      conditions: [],
      appliedTo: [],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
    {
      key: REMOVE_ELEMENT_KEY,
      description: 'Defines an element that will remove the saved item on click.',
      conditions: [],
      appliedTo: [],
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
    },
  ],
  settings: [
    {
      key: COLLECTION_SETTING_KEY,
      description: 'Defines a Collection List key that will store saved items.',
      conditions: [],
      appliedTo: {},
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: FIELD_SETTING_KEY,
      description: 'Defines a field key.',
      conditions: [],
      appliedTo: {},
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: EMPTY_SETTING_KEY,
      description: 'Defines an `Empty State` element.',
      conditions: [],
      appliedTo: {},
      value: {
        type: 'string',
        default: '',
      },
    },
  ],
};
