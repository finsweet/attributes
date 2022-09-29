import { COLLECTION_LIST, COLLECTION_ITEM, DIV_BLOCK } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { LIST_ELEMENT_KEY, COLLECTION_SETTING_KEY } from '../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines a list to be combined into the target.',
      conditions: [],
      multiplesInInstance: true,
      appliedTo: [COLLECTION_LIST],
      required: true,
      requiresInstance: false,
    },
  ],
  fields: [
    {
      key: COLLECTION_SETTING_KEY,
      description: 'Defines a Collection List that will be nested inside the target list element.',
      specializations: [
        {
          label: 'Collection',
          key: 'collection',
          appliedTo: [
            {
              parent: [
                {
                  type: 'element',
                  element: 'list',
                },
                {
                  type: 'selector',
                  selector: COLLECTION_ITEM,
                },
              ],
              selectors: [DIV_BLOCK],
              type: 'link',
            },
          ],
        },
      ],
    },
  ],
  settings: [],
};
