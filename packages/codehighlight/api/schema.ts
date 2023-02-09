import { EMBED_CODE, PARENT_WRAPPER, PRE_CODE } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import { CODE_ELEMENT_KEY, THEME_SETTING_KEY } from './../src/utils/constants';

const schema: AttributeSchema = {
  elements: [
    {
      key: CODE_ELEMENT_KEY,
      description: 'Defines a `<code>` element that holds the code to be highlighted.',
      appliedTo: [PRE_CODE, EMBED_CODE, PARENT_WRAPPER],
      conditions: [
        {
          condition: 'exists',
          type: 'selector',
          selector: [PRE_CODE],
        },
      ],
      requiresInstance: false,
      multiplesInInstance: false,
      required: true,
    },
  ],
  settings: [
    {
      key: THEME_SETTING_KEY,
      description: 'Defines the highlighting theme.',
      appliedTo: {
        elements: [CODE_ELEMENT_KEY],
      },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
  ],
};

export default schema;
