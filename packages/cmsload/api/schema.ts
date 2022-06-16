import {
  COLLECTION_LIST,
  EMBED_CODE,
  TEXT_BLOCK,
  IMAGE,
  GIF,
  LOTTIE_ANIMATION,
  PAGINATION_WRAPPER,
  DIV_BLOCK,
  LINK_BLOCK,
  TEXT_LINK,
  TEXT_ELEMENT,
  BUTTON,
} from '@global/constants/webflow-selectors';
import type { AttributeSchema } from '@global/types/schema';

import {
  ANIMATION_SETTING_KEY,
  DURATION_SETTING_KEY,
  EASING_SETTING_KEY,
  ITEMS_COUNT_ELEMENT_KEY,
  LIST_ELEMENT_KEY,
  LOADER_ELEMENT_KEY,
  MODE_SETTING_KEY,
  MODE_SETTING_VALUES,
  PAGE_BOUNDARY_SETTING_KEY,
  PAGE_BUTTON_ELEMENT_KEY,
  VISIBLE_COUNT_ELEMENT_KEY,
  PAGE_DOTS_ELEMENT_KEY,
  PAGE_SIBLINGS_SETTING_KEY,
  RESET_IX_SETTING_KEY,
  SCROLL_ANCHOR_ELEMENT_KEY,
  SHOW_QUERY_SETTING_KEY,
  STAGGER_SETTING_KEY,
  THRESHOLD_SETTING_KEY,
} from '../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: LIST_ELEMENT_KEY,
      description: 'Defines the list to load more items.',
      required: true,
      appliedTo: [COLLECTION_LIST],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [],
    },
    {
      key: LOADER_ELEMENT_KEY,
      description: 'Defines an element that will be displayed while the library is loading items in the background.',
      required: false,
      appliedTo: [IMAGE, GIF, EMBED_CODE, LOTTIE_ANIMATION],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: ITEMS_COUNT_ELEMENT_KEY,
      description: 'Defines an element where to display the total items of the list.',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: VISIBLE_COUNT_ELEMENT_KEY,
      description: 'Defines an element where to display the amount of visible items.',
      required: false,
      appliedTo: [TEXT_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
      ],
    },
    {
      key: SCROLL_ANCHOR_ELEMENT_KEY,
      description: 'Defines an element where to scroll the view every time a page in `Pagination` mode is switched.',
      required: false,
      appliedTo: [DIV_BLOCK],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
        {
          condition: 'settings',
          type: 'element',
          element: LIST_ELEMENT_KEY,
          settings: [
            {
              key: MODE_SETTING_KEY,
              value: MODE_SETTING_VALUES.pagination,
            },
          ],
        },
      ],
    },
    {
      key: PAGE_BUTTON_ELEMENT_KEY,
      description: 'Defines the template element to generate all page buttons for the `Pagination` mode.',
      required: false,
      appliedTo: [BUTTON, LINK_BLOCK, TEXT_LINK],
      multiplesInInstance: false,
      requiresInstance: false,
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: LIST_ELEMENT_KEY,
        },
        {
          condition: 'isChildOf',
          type: 'selector',
          selector: [PAGINATION_WRAPPER],
        },
        {
          condition: 'settings',
          type: 'element',
          element: LIST_ELEMENT_KEY,
          settings: [
            {
              key: MODE_SETTING_KEY,
              value: MODE_SETTING_VALUES.pagination,
            },
          ],
        },
      ],
    },
    {
      key: PAGE_DOTS_ELEMENT_KEY,
      description: 'Defines the template element to create the page dots separators.',
      required: false,
      appliedTo: [DIV_BLOCK, TEXT_ELEMENT],
      multiplesInInstance: false,
      requiresInstance: false,
      conditions: [
        {
          type: 'element',
          condition: 'isChildOf',
          element: LIST_ELEMENT_KEY,
        },
        {
          type: 'selector',
          condition: 'isChildOf',
          selector: [PAGINATION_WRAPPER],
        },
        {
          type: 'element',
          condition: 'settings',
          element: LIST_ELEMENT_KEY,
          settings: [
            {
              key: MODE_SETTING_KEY,
              value: MODE_SETTING_VALUES.pagination,
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      key: MODE_SETTING_KEY,
      description: 'Defines the loading mode.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      value: {
        type: 'options',
        options: [
          {
            value: MODE_SETTING_VALUES.loadUnder,
            description: 'When clicking the Next button more items will be loaded and rendered at the end of the list.',
          },
          {
            value: MODE_SETTING_VALUES.infinite,
            description:
              'When the bottom of the list reaches a certain threshold more items will be loaded and rendered at the end of the list.',
          },
          {
            value: MODE_SETTING_VALUES.pagination,
            description: 'Users can quickly navigate through pages.',
          },
          {
            value: MODE_SETTING_VALUES.renderAll,
            description:
              'All items will be loaded and rendered on the list. Not advised for lists with more than 200 items.',
          },
        ],
        default: MODE_SETTING_VALUES.loadUnder,
      },
      conditions: [],
    },
    {
      key: THRESHOLD_SETTING_KEY,
      description: 'Defines when new items will load when the user scrolls',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      value: {
        type: 'float',
        default: '-20',
      },
      conditions: [
        {
          condition: 'settings',
          type: 'element',
          element: LIST_ELEMENT_KEY,
          settings: [
            {
              key: MODE_SETTING_KEY,
              value: MODE_SETTING_VALUES.infinite,
            },
          ],
        },
      ],
    },
    {
      key: PAGE_SIBLINGS_SETTING_KEY,
      description:
        'Defines the amount of digits to display either side of the current page. It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      value: {
        type: 'commaSeparatedFloat',
        default: '1',
      },
      conditions: [
        {
          condition: 'settings',
          type: 'element',
          element: LIST_ELEMENT_KEY,
          settings: [
            {
              key: MODE_SETTING_KEY,
              value: MODE_SETTING_VALUES.pagination,
            },
          ],
        },
      ],
    },
    {
      key: PAGE_BOUNDARY_SETTING_KEY,
      description:
        'Defines the amount of digits to display at the start and end of a page buttons list. It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      value: {
        type: 'commaSeparatedFloat',
        default: '1',
      },
      conditions: [
        {
          condition: 'settings',
          type: 'element',
          element: LIST_ELEMENT_KEY,
          settings: [
            {
              key: MODE_SETTING_KEY,
              value: MODE_SETTING_VALUES.pagination,
            },
          ],
        },
      ],
    },
    {
      key: ANIMATION_SETTING_KEY,
      description: 'Defines the animation to use when appending elements to the list.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      value: {
        type: 'options',
        options: [
          {
            value: 'fade',
            description: 'The items will fade-in.',
          },
          {
            value: 'slide-up',
            description: 'The items will slide from the bottom.',
          },
          {
            value: 'slide-down',
            description: 'The items will slide from the top.',
          },
          {
            value: 'slide-right',
            description: 'The items will slide from the left to the right.',
          },
          {
            value: 'slide-left',
            description: 'The items will slide from the right to the left.',
          },
          {
            value: 'grow',
            description: 'The items will grow-in.',
          },
          {
            value: 'shrink',
            description: 'The items will shrink-in.',
          },
          {
            value: 'spin',
            description: 'The items will spin-in.',
          },
        ],
        default: 'fade',
      },
      conditions: [],
    },
    {
      key: EASING_SETTING_KEY,
      description: 'Defines the easing function of the animation.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      value: {
        type: 'options',
        options: [
          {
            value: 'linear',
            description: 'The items animation curve will be linear.',
          },
          {
            value: 'ease',
            description: 'The items animation curve will be ease.',
          },
          {
            value: 'ease-in',
            description: 'The items animation curve will be ease-in.',
          },
          {
            value: 'ease-out',
            description: 'The items animation curve will be ease-out.',
          },
          {
            value: 'ease-in-out',
            description: 'The items animation curve will be ease-in-out.',
          },
        ],
        default: 'ease',
      },
      conditions: [],
    },
    {
      key: DURATION_SETTING_KEY,
      description: 'Defines the duration of the animation in miliseconds.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },

      value: {
        type: 'float',
        default: '100',
      },
      conditions: [],
    },
    {
      key: STAGGER_SETTING_KEY,
      description: 'Defines a stagger delay for the items animation in miliseconds.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },

      value: {
        type: 'float',
      },
      conditions: [],
    },
    {
      key: RESET_IX_SETTING_KEY,
      description:
        "Defines if Webflow's interactions should be restarted after rendering new items. Use it if your Collection List Items use interactions.",
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      value: {
        type: 'boolean',
        default: 'true',
      },
      conditions: [],
    },
    {
      key: SHOW_QUERY_SETTING_KEY,
      description: 'Defines if the pagination query params should be displayed on the URL.',
      appliedTo: {
        elements: [LIST_ELEMENT_KEY],
      },
      value: {
        type: 'boolean',
        default: 'true',
      },
      conditions: [
        {
          condition: 'settings',
          type: 'element',
          element: LIST_ELEMENT_KEY,
          settings: [
            {
              key: MODE_SETTING_KEY,
              value: MODE_SETTING_VALUES.pagination,
            },
          ],
        },
      ],
    },
  ],
};
