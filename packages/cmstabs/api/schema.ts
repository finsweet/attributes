import { COLLECTION_LIST, DIV_BLOCK, TABS, TEXT_BLOCK } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { LIST_ELEMENT_KEY, TABS_ELEMENT_KEY, TAB_LINK_ELEMENT_KEY, RESET_IX_SETTING_KEY } from '../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines a list to be included into the target tabs.',
      appliedTo: [COLLECTION_LIST],
      conditions: [],
      multiplesInInstance: false,
      required: true,
      requiresInstance: true,
    },
    {
      key: TABS_ELEMENT_KEY,
      description: 'Defines the target tabs where all lists will be included into.',
      appliedTo: [TABS],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
      multiplesInInstance: false,
      required: true,
      requiresInstance: true,
    },
    {
      key: TAB_LINK_ELEMENT_KEY,
      description: 'Defines the content that will be placed inside the generated `Tab Link` in the `Tabs Menu`.',
      appliedTo: [DIV_BLOCK, TEXT_BLOCK],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: TABS_ELEMENT_KEY,
        },
      ],
      multiplesInInstance: true,
      required: true,
      requiresInstance: true,
    },
  ],
  settings: [
    {
      key: RESET_IX_SETTING_KEY,
      description: 'Defines if Webflow should be restarted after populating the tabs.',
      appliedTo: {
        elements: [TABS_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
};
