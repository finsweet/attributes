import { ANY_ELEMENT, RICH_TEXT_BLOCK } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import {
  RICH_TEXT_ELEMENT_KEY,
  COMPONENT_SETTING_KEY,
  SANITIZE_SETTING_KEY,
  RESET_IX_SETTING_KEY,
} from '../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: RICH_TEXT_ELEMENT_KEY,
      description: 'Defines a rich text block instance.',
      conditions: [],
      appliedTo: [RICH_TEXT_BLOCK],
      required: true,
      multiplesInInstance: true,
      requiresInstance: false,
    },
  ],
  fields: [
    {
      key: 'component',
      description: 'Defines a custom component.',
      specializations: [
        {
          label: 'Default',
          key: 'default',
          appliedTo: [
            {
              parent: null,
              selectors: [ANY_ELEMENT],
              type: 'component',
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      key: COMPONENT_SETTING_KEY,
      description: 'Defines a custom component.',
      appliedTo: {},
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: SANITIZE_SETTING_KEY,
      description: 'Defines if the HTML should be sanitized before rendering it.',
      conditions: [],
      appliedTo: {
        elements: [RICH_TEXT_ELEMENT_KEY],
      },
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
    {
      key: RESET_IX_SETTING_KEY,
      description: 'Defines if Webflow should be restarted after loading new items.',
      conditions: [],
      appliedTo: {
        elements: [RICH_TEXT_ELEMENT_KEY],
      },
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
};
