import { ALL_INPUTS, HEADING, PARAGRAPH, SELECT, TEXT_BLOCK } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { NAME_SETTING_KEY, REMOVE_QUERY_SETTING_KEY } from '../src/utils/constants';

const schema: AttributeSchema = {
  elements: [],
  fields: [
    {
      key: NAME_SETTING_KEY,
      description: 'Defines the query param keys.',
      specializations: [
        {
          label: 'Default',
          key: 'default',
          appliedTo: [
            {
              parent: null,
              selectors: [TEXT_BLOCK, HEADING, PARAGRAPH, SELECT, ALL_INPUTS],
              type: 'default',
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      key: REMOVE_QUERY_SETTING_KEY,
      description: 'Defines if query param should be removed after loading the page.',
      appliedTo: {
        fields: [NAME_SETTING_KEY],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
};

export default schema;
