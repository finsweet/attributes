import { DIV_BLOCK, LIGHTBOX, LINK_BLOCK, TEXT_LINK, BUTTON } from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import {
  TRIGGER_OPEN_ELEMENT_KEY,
  TRIGGER_CLOSE_ELEMENT_KEY,
  TRIGGER_TOGGLE_ELEMENT_KEY,
  LIGHTBOX_ELEMENT_KEY,
  WAIT_SETTING_KEY,
} from './../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIGHTBOX_ELEMENT_KEY,
      description:
        "Defines the lightbox element. When it's open, the lightbox will become a direct child of the Body. This will avoid all z-index, fixed position, and transform issues.",
      required: true,
      requiresInstance: true,
      conditions: [
        {
          condition: 'isParentOf',
          type: 'element',
          element: TRIGGER_OPEN_ELEMENT_KEY,
        },
      ],
      appliedTo: [DIV_BLOCK, LIGHTBOX],
      multiplesInInstance: false,
    },
    {
      key: TRIGGER_OPEN_ELEMENT_KEY,
      description: 'Defines the trigger that appends the `lightbox` element as a direct child of the `<body>`.',
      required: true,
      requiresInstance: true,
      conditions: [],
      appliedTo: [BUTTON, DIV_BLOCK, TEXT_LINK, LINK_BLOCK],
      multiplesInInstance: false,
    },
    {
      key: TRIGGER_CLOSE_ELEMENT_KEY,
      description: 'Defines the trigger that returns the `lightbox` to its previous position.',
      required: true,
      requiresInstance: true,
      conditions: [],
      appliedTo: [BUTTON, DIV_BLOCK, TEXT_LINK, LINK_BLOCK],
      multiplesInInstance: false,
    },
    {
      key: TRIGGER_TOGGLE_ELEMENT_KEY,
      description: 'Defines a trigger that toggles the open/close actions.',
      required: true,
      requiresInstance: true,
      conditions: [],
      appliedTo: [BUTTON, DIV_BLOCK, TEXT_LINK, LINK_BLOCK],
      multiplesInInstance: false,
    },
  ],
  settings: [
    {
      key: WAIT_SETTING_KEY,
      description: 'Defines the timeout to wait before triggering the `close` state.',
      conditions: [],
      appliedTo: {
        elements: [LIGHTBOX_ELEMENT_KEY],
      },
      value: {
        type: 'int',
        default: '0',
      },
    },
  ],
};
