import { COLLECTION_LIST, SLIDER } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { LIST_ELEMENT_KEY, SLIDER_ELEMENT_KEY, RESET_IX_SETTING_KEY } from './../src/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines a list to be included into the target slider.',
      appliedTo: [COLLECTION_LIST],
      conditions: [],
      multiplesInInstance: false,
      required: true,
      requiresInstance: true,
    },
    {
      key: SLIDER_ELEMENT_KEY,
      description: 'Defines the target slider where all lists will be included into.',
      appliedTo: [SLIDER],
      multiplesInInstance: false,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
      required: true,
      requiresInstance: true,
    },
  ],
  settings: [
    {
      key: RESET_IX_SETTING_KEY,
      description: 'Defines if Webflow should be restarted after populating the sliders.',
      appliedTo: {
        elements: [SLIDER_ELEMENT_KEY],
      },
      value: {
        type: 'boolean',
        default: 'true',
      },
      conditions: [],
    },
  ],
};
