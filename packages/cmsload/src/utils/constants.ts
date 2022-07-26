import type { WebflowBreakpoint } from '@finsweet/ts-utils';
import { CMS_LOAD_ATTRIBUTE } from '@global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

const ATTRIBUTES_PREFIX = `fs-${CMS_LOAD_ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const LOADER_ELEMENT_KEY = 'loader';
export const ITEMS_COUNT_ELEMENT_KEY = 'items-count';
export const VISIBLE_COUNT_ELEMENT_KEY = 'visible-count';
export const SCROLL_ANCHOR_ELEMENT_KEY = 'scroll-anchor';
export const PAGE_BUTTON_ELEMENT_KEY = 'page-button';
export const PAGE_DOTS_ELEMENT_KEY = 'page-dots';
export const EMPTY_ELEMENT_KEY = 'empty';

export const MODE_SETTING_KEY = 'mode';
export const MODE_SETTING_VALUES = {
  /**
   * Renders items at the bottom of the page.
   */
  loadUnder: 'load-under',

  /**
   * All items will be rendered at once.
   */
  renderAll: 'render-all',

  /**
   * Pagination will be created.
   */
  pagination: 'pagination',

  /**
   * Items will be loaded when the user reaches the bottom of the Collection List.
   * Threshold can be defined with {@link ATTRIBUTES.threshold}.
   */
  infinite: 'infinite',
} as const;
export const THRESHOLD_SETTING_KEY = 'threshold';
export const PAGE_SIBLINGS_SETTING_KEY = 'pagesiblings';
export const PAGE_BOUNDARY_SETTING_KEY = 'pageboundary';
export const ANIMATION_SETTING_KEY = 'animation';
export const EASING_SETTING_KEY = 'easing';
export const DURATION_SETTING_KEY = 'duration';
export const STAGGER_SETTING_KEY = 'stagger';
export const RESET_IX_SETTING_KEY = 'resetix';
export const RESET_IX_SETTING_VALUES = { true: 'true' } as const;
export const SHOW_QUERY_SETTING_KEY = 'showquery';
export const SHOW_QUERY_SETTING_VALUES = { true: 'true' } as const;

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a list to be instantiated.
       */
      list: generateDynamicAttibuteValue(LIST_ELEMENT_KEY),

      /**
       * Defines a node that will be displayed when loading new items.
       */
      loader: generateDynamicAttibuteValue(LOADER_ELEMENT_KEY),

      /**
       * Defines an element where to display the total items of the list.
       */
      itemsCount: generateDynamicAttibuteValue(ITEMS_COUNT_ELEMENT_KEY),

      /**
       * Defines an element where to display the amount of visible items.
       */
      visibleCount: generateDynamicAttibuteValue(VISIBLE_COUNT_ELEMENT_KEY),

      /**
       * Defines an element where to scroll the view every time a page in `Pagination` mode is switched.
       */
      scrollAnchor: generateDynamicAttibuteValue(SCROLL_ANCHOR_ELEMENT_KEY),

      /**
       * Defines the Empty State element for when there are no elements to show.
       */
      empty: generateDynamicAttibuteValue(EMPTY_ELEMENT_KEY),

      /**
       * Defines the template element to generate all page buttons for the `paginate` mode.
       */
      pageButton: PAGE_BUTTON_ELEMENT_KEY,

      /**
       * Defines the template element to create the page dots separators.
       */
      pageDots: PAGE_DOTS_ELEMENT_KEY,
    },
  },

  /**
   * Defines the loading mode.
   */
  mode: {
    key: `${ATTRIBUTES_PREFIX}-${MODE_SETTING_KEY}`,
    values: MODE_SETTING_VALUES,
  },

  /**
   * Defines the scrolling threshold to trigger a new page load in `infinite` mode.
   * Defaults to {@link DEFAULT_INFINITE_THRESHOLD}.
   */
  threshold: { key: `${ATTRIBUTES_PREFIX}-${THRESHOLD_SETTING_KEY}` },

  /**
   * Defines the amount of digits to display either side of the current page.
   * It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.
   *
   * Defaults to {@link DEFAULT_PAGE_SIBLINGS}.
   */
  pageSiblings: { key: `${ATTRIBUTES_PREFIX}-${PAGE_SIBLINGS_SETTING_KEY}` },

  /**
   * Defines the amount of digits to display at the start and end of a page buttons list.
   * It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.
   *
   * Defaults to {@link DEFAULT_PAGE_BOUNDARY}.
   */
  pageBoundary: { key: `${ATTRIBUTES_PREFIX}-${PAGE_BOUNDARY_SETTING_KEY}` },

  /**
   * Defines the animation to use when appending elements to the list.
   * Allowed values are defined in {@link "packages/animations"}.
   */
  animation: { key: `${ATTRIBUTES_PREFIX}-${ANIMATION_SETTING_KEY}` },

  /**
   * Defines the easing function of the animation.
   * Allowed values are defined in {@link "packages/animations"}.
   */
  easing: { key: `${ATTRIBUTES_PREFIX}-${EASING_SETTING_KEY}` },

  /**
   * Defines the duration of the animation.
   */
  duration: { key: `${ATTRIBUTES_PREFIX}-${DURATION_SETTING_KEY}` },

  /**
   * Defines if animations should be staggered.
   */
  stagger: { key: `${ATTRIBUTES_PREFIX}-${STAGGER_SETTING_KEY}` },

  /**
   * Defines if Webflow should be restarted after loading new items.
   */
  resetIx: { key: `${ATTRIBUTES_PREFIX}-${RESET_IX_SETTING_KEY}`, values: RESET_IX_SETTING_VALUES },

  /**
   * Defines if the pagination query params should be displayed on the URL.
   * Only works with {@link MODE_SETTING_VALUES.pagination} mode.
   */
  showQuery: { key: `${ATTRIBUTES_PREFIX}-${SHOW_QUERY_SETTING_KEY}`, values: SHOW_QUERY_SETTING_VALUES },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const DEFAULT_INFINITE_THRESHOLD = '-20';

export const DEFAULT_PAGE_SIBLINGS = 1;
export const DEFAULT_PAGE_BOUNDARY = 1;

export const BREAKPOINTS_INDEX: { [key in WebflowBreakpoint]: number } = {
  main: 0,
  medium: 1,
  small: 2,
  tiny: 3,
} as const;
