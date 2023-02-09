import {
  ANY_ELEMENT,
  BUTTON,
  DIV_BLOCK,
  LINK_BLOCK,
  NAVBAR,
  RICH_TEXT_BLOCK,
  SECTION,
  TEXT_LINK,
} from '$global/constants/webflow-selectors';
import type { AttributeSchema } from '$global/types/schema';

import {
  DISABLE_ELEMENT_KEY,
  ENABLE_ELEMENT_KEY,
  GAP_SETTING_KEY,
  MEDIA_SETTING_KEY,
  NAV_ELEMENT_KEY,
  PRESERVE_ELEMENT_KEY,
  TOGGLE_ELEMENT_KEY,
  WHEN_VISIBLE_ELEMENT_KEY,
} from './../src/constants';

const schema: AttributeSchema = {
  elements: [
    {
      key: DISABLE_ELEMENT_KEY,
      description: 'Scrolling will be disabled when this element is clicked.',
      required: true,
      requiresInstance: false,
      conditions: [],
      appliedTo: [BUTTON, TEXT_LINK, LINK_BLOCK, DIV_BLOCK],
      multiplesInInstance: false,
    },
    {
      key: ENABLE_ELEMENT_KEY,
      description: 'Scrolling will be enabled when this element is clicked.',
      required: true,
      requiresInstance: false,
      conditions: [],
      appliedTo: [BUTTON, TEXT_LINK, LINK_BLOCK, DIV_BLOCK],
      multiplesInInstance: false,
    },
    {
      key: TOGGLE_ELEMENT_KEY,
      description: 'Scrolling will be disabled/enabled when this element is clicked.',
      required: true,
      requiresInstance: false,
      conditions: [],
      appliedTo: [BUTTON, TEXT_LINK, LINK_BLOCK, DIV_BLOCK],
      multiplesInInstance: false,
    },
    {
      key: WHEN_VISIBLE_ELEMENT_KEY,
      description: 'Scrolling will be disabled/enabled when this element becomes visible/hidden.',
      required: false,
      requiresInstance: false,
      conditions: [],
      appliedTo: [DIV_BLOCK, ANY_ELEMENT],
      multiplesInInstance: true,
    },
    {
      key: NAV_ELEMENT_KEY,
      description:
        'Scrolling will be disabled/enabled when the `Nav Menu` is open/closed. Specific for `Navbar` components.',
      required: false,
      requiresInstance: false,
      conditions: [],
      appliedTo: [NAVBAR],
      multiplesInInstance: false,
    },
    {
      key: PRESERVE_ELEMENT_KEY,
      description: "Applied on elements that must preserve scrolling when the page's scrolling is disabled.",
      required: false,
      requiresInstance: false,
      conditions: [],
      appliedTo: [DIV_BLOCK, RICH_TEXT_BLOCK, SECTION],
      multiplesInInstance: false,
    },
  ],
  settings: [
    {
      key: MEDIA_SETTING_KEY,
      description: 'Used to define a media query that restricts when an element acts as a trigger.',
      conditions: [],
      appliedTo: {
        elements: [ENABLE_ELEMENT_KEY, DISABLE_ELEMENT_KEY, TOGGLE_ELEMENT_KEY, WHEN_VISIBLE_ELEMENT_KEY],
      },
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: GAP_SETTING_KEY,
      description: 'Defines if the scrollbar gap must be reserved when disabling scrolling.',
      conditions: [],
      appliedTo: {
        elements: [ENABLE_ELEMENT_KEY, DISABLE_ELEMENT_KEY, TOGGLE_ELEMENT_KEY, WHEN_VISIBLE_ELEMENT_KEY],
      },
      value: {
        type: 'boolean',
        default: 'false',
      },
    },
  ],
};

export default schema;
