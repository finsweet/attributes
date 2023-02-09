import { ANY_ELEMENT } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { NAME_SETTING_KEY, TARGET_SETTING_KEY, VALUE_SETTING_KEY } from '../src/utils/constants';

const schema: AttributeSchema = {
  elements: [],
  settings: [],
  fields: [
    {
      key: TARGET_SETTING_KEY,
      description: 'Defines a target to construct and assign an attribute.',
      specializations: [
        {
          key: 'default',
          label: 'Default',
          appliedTo: [
            {
              parent: null,
              selectors: [ANY_ELEMENT],
              type: 'default',
            },
          ],
        },
      ],
    },
    {
      key: NAME_SETTING_KEY,
      description: 'Defines a name to construct an attribute.',
      specializations: [
        {
          key: 'default',
          label: 'Default',
          appliedTo: [
            {
              parent: null,
              selectors: [ANY_ELEMENT],
              type: 'default',
            },
          ],
        },
      ],
    },
    {
      key: VALUE_SETTING_KEY,
      description: 'Defines a value to construct an attribute.',
      specializations: [
        {
          key: 'default',
          label: 'Default',
          appliedTo: [
            {
              parent: null,
              selectors: [ANY_ELEMENT],
              type: 'default',
            },
          ],
        },
      ],
    },
  ],
};

export default schema;
