import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'list',
      description: 'Defines the list to load more items.',
      required: true,
      appliedTo: [
        {
          label: 'Collection List',
          selectors: ['.w-dyn-items'],
        },
        {
          label: 'Collection List Wrapper',
          selectors: ['.w-dyn-list'],
        },
      ],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [],
    },
    {
      key: 'loader',
      description: 'Defines an element that will be displayed while the library is loading items in the background.',
      required: false,
      appliedTo: [
        {
          label: 'Image',
          selectors: ['img'],
        },
        {
          label: 'GIF',
          selectors: ['img'],
        },
        {
          label: 'Embed Code',
          selectors: ['div.w-embed'],
        },
        {
          label: 'Lottie Animation',
          selectors: ['[data-animation-type="lottie"]'],
        },
      ],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
    {
      key: 'items-count',
      description: 'Defines an element where to display the total items of the list.',
      required: false,
      appliedTo: [
        {
          label: 'Text Block',
          selectors: ['div'],
        },
      ],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
    {
      key: 'visible-count',
      description: 'Defines an element where to display the amount of visible items.',
      required: false,
      appliedTo: [
        {
          label: 'Text Block',
          selectors: ['div'],
        },
      ],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
      ],
    },
    {
      key: 'scroll-anchor',
      description: 'Defines an element where to scroll the view every time a page in `Pagination` mode is switched.',
      required: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
      ],
      multiplesInInstance: false,
      requiresInstance: true,
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: 'list',
        },
        {
          condition: 'settings',
          type: 'element',
          element: 'list',
          settings: [
            {
              key: 'mode',
              value: 'pagination',
            },
          ],
        },
      ],
    },
    {
      key: 'page-button',
      description: 'Defines the template element to generate all page buttons for the `Pagination` mode.',
      required: false,
      appliedTo: [
        {
          label: 'Button',
          selectors: ['a.w-button'],
        },
        {
          label: 'Link Block',
          selectors: ['a.w-inline-block'],
        },
        {
          label: 'Text Link',
          selectors: ['a'],
        },
      ],
      multiplesInInstance: false,
      requiresInstance: false,
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: 'list',
        },
        {
          condition: 'isChildOf',
          type: 'selector',
          selector: [
            {
              label: 'Pagination Wrapper',
              selectors: ['.w-pagination-wrapper'],
            },
          ],
        },
        {
          condition: 'settings',
          type: 'element',
          element: 'list',
          settings: [
            {
              key: 'mode',
              value: 'pagination',
            },
          ],
        },
      ],
    },
    {
      key: 'page-dots',
      description: 'Defines the template element to create the page dots separators.',
      required: false,
      appliedTo: [
        {
          label: 'Div Block',
          selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
        },
        {
          label: 'Text Element',
          selectors: ['p', 'span', 'div'],
        },
      ],
      multiplesInInstance: false,
      requiresInstance: false,
      conditions: [
        {
          type: 'element',
          condition: 'isChildOf',
          element: 'list',
        },
        {
          type: 'selector',
          condition: 'isChildOf',
          selector: [
            {
              label: 'Pagination Wrapper',
              selectors: ['.w-pagination-wrapper'],
            },
          ],
        },
        {
          type: 'element',
          condition: 'settings',
          element: 'list',
          settings: [
            {
              key: 'mode',
              value: 'pagination',
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      key: 'mode',
      description: 'Defines the loading mode.',
      appliedTo: {
        elements: ['list'],
      },
      value: {
        type: 'options',
        options: [
          {
            value: 'load-under',
            description: 'When clicking the Next button more items will be loaded and rendered at the end of the list.',
          },
          {
            value: 'infinite',
            description:
              'When the bottom of the list reaches a certain threshold more items will be loaded and rendered at the end of the list.',
          },
          {
            value: 'pagination',
            description: 'Users can quickly navigate through pages.',
          },
          {
            value: 'render-all',
            description:
              'All items will be loaded and rendered on the list. Not advised for lists with more than 200 items.',
          },
        ],
        default: 'load-under',
      },
      conditions: [],
    },
    {
      key: 'threshold',
      description: 'Defines when new items will load when the user scrolls',
      appliedTo: {
        elements: ['list'],
      },
      value: {
        type: 'float',
        default: '-20',
      },
      conditions: [
        {
          condition: 'settings',
          type: 'element',
          element: 'list',
          settings: [
            {
              key: 'mode',
              value: 'infinite',
            },
          ],
        },
      ],
    },
    {
      key: 'pagesiblings',
      description:
        'Defines the amount of digits to display either side of the current page. It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.',
      appliedTo: {
        elements: ['list'],
      },
      value: {
        type: 'commaSeparatedFloat',
        default: '1',
      },
      conditions: [
        {
          condition: 'settings',
          type: 'element',
          element: 'list',
          settings: [
            {
              key: 'mode',
              value: 'pagination',
            },
          ],
        },
      ],
    },
    {
      key: 'pageboundary',
      description:
        'Defines the amount of digits to display at the start and end of a page buttons list. It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.',
      appliedTo: {
        elements: ['list'],
      },
      value: {
        type: 'commaSeparatedFloat',
        default: '1',
      },
      conditions: [
        {
          condition: 'settings',
          type: 'element',
          element: 'list',
          settings: [
            {
              key: 'mode',
              value: 'pagination',
            },
          ],
        },
      ],
    },
    {
      key: 'animation',
      description: 'Defines the animation to use when appending elements to the list.',
      appliedTo: {
        elements: ['list'],
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
      key: 'easing',
      description: 'Defines the easing function of the animation.',
      appliedTo: {
        elements: ['list'],
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
      key: 'duration',
      description: 'Defines the duration of the animation in miliseconds.',
      appliedTo: {
        elements: ['list'],
      },
      value: {
        type: 'float',
        default: '100',
      },
      conditions: [],
    },
    {
      key: 'stagger',
      description: 'Defines a stagger delay for the items animation in miliseconds.',
      appliedTo: {
        elements: ['list'],
      },
      value: {
        type: 'float',
      },
      conditions: [],
    },
    {
      key: 'resetix',
      description:
        "Defines if Webflow's interactions should be restarted after rendering new items. Use it if your Collection List Items use interactions.",
      appliedTo: {
        elements: ['list'],
      },
      value: {
        type: 'boolean',
        default: 'true',
      },
      conditions: [],
    },
    {
      key: 'showquery',
      description: 'Defines if the pagination query params should be displayed on the URL.',
      appliedTo: {
        elements: ['list'],
      },
      value: {
        type: 'boolean',
        default: 'true',
      },
      conditions: [
        {
          condition: 'settings',
          type: 'element',
          element: 'list',
          settings: [
            {
              key: 'mode',
              value: 'pagination',
            },
          ],
        },
      ],
    },
  ],
} as AttributeSchema;
