import {
  ANY_ELEMENT,
  DIV_BLOCK,
  HEADING_H2_H6,
  LINK_BLOCK,
  RICH_TEXT_BLOCK,
  TEXT_BLOCK,
} from '@global/constants/webflow-selectors';
import type { AttributeSchema } from '@global/types/schema';

import {
  CONTENTS_ELEMENT_KEY,
  TABLE_ELEMENT_KEY,
  LINK_ELEMENT_KEY,
  IX_TRIGGER_ELEMENT_KEY,
  OFFSET_BOTTOM_SETTING_KEY,
  OFFSET_TOP_SETTING_KEY,
  HIDE_URL_HASH_SETTING_KEY,
} from './../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: CONTENTS_ELEMENT_KEY,
      description: 'Defines the contents to use as the table source.',
      requiresInstance: true,
      required: true,
      appliedTo: [RICH_TEXT_BLOCK, DIV_BLOCK],
      conditions: [
        {
          type: 'selector',
          condition: 'isParentOf',
          selector: [HEADING_H2_H6],
        },
      ],
      multiplesInInstance: false,
    },
    {
      key: LINK_ELEMENT_KEY,
      description: 'Defines a link template element.',
      requiresInstance: true,
      required: true,
      appliedTo: [LINK_BLOCK, TEXT_BLOCK],
      conditions: [],
      multiplesInInstance: true,
    },
    {
      key: IX_TRIGGER_ELEMENT_KEY,
      description: 'Defines an interaction trigger.',
      requiresInstance: true,
      required: false,
      appliedTo: [ANY_ELEMENT],
      conditions: [],
      multiplesInInstance: false,
    },
    {
      key: TABLE_ELEMENT_KEY,
      description: 'Defines the wrapper element that will hold all the TOC links.',
      requiresInstance: true,
      required: false,
      appliedTo: [DIV_BLOCK],
      conditions: [],
      multiplesInInstance: false,
    },
  ],
  settings: [
    {
      key: OFFSET_TOP_SETTING_KEY,
      description: 'Defines a scroll-margin-top value for the headers.',
      appliedTo: {
        elements: [CONTENTS_ELEMENT_KEY],
      },
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: CONTENTS_ELEMENT_KEY,
        },
      ],
      value: {
        type: 'int',
        default: '0',
      },
    },
    {
      key: OFFSET_BOTTOM_SETTING_KEY,
      description: 'Defines a scroll-margin-bottom value for the headers.',
      appliedTo: {
        elements: [CONTENTS_ELEMENT_KEY],
      },
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: CONTENTS_ELEMENT_KEY,
        },
      ],
      value: {
        type: 'int',
        default: '0',
      },
    },
    {
      key: HIDE_URL_HASH_SETTING_KEY,
      description: 'Defines if the links hash should be removed from the URL.',
      appliedTo: {
        elements: [CONTENTS_ELEMENT_KEY],
      },
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: CONTENTS_ELEMENT_KEY,
        },
      ],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
};
