import { type AttributeElements, type AttributeSettings, type WebflowBreakpoint } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines a list wrapper element.
   */
  'wrapper',

  /**
   * Defines a list element.
   */
  'list',

  /**
   * Defines a list item element.
   */
  'item',

  /**
   * Defines a button to clear a filter or all the filters.
   */
  'clear',

  /**
   * Defines a pagination wrapper element.
   */
  'pagination-wrapper',

  /**
   * Defines a pagination next element.
   */
  'pagination-next',

  /**
   * Defines a pagination previous element.
   */
  'pagination-previous',

  /**
   * Defines a page-count element.
   */
  'page-count',

  /**
   * Defines a empty element.
   */
  'empty',

  /**
   * Defines a sorting trigger.
   */
  'sort-trigger',

  /**
   * Defines a dropdown label.
   */
  'dropdown-label',

  /**
   * Loader
   */
  'loader',

  /**
   * Items count
   */
  'items-count',

  /**
   * Visible count
   */
  'visible-count',

  /**
   * Visible count from
   */
  'visible-count-from',

  /**
   * Visible count to
   */
  'visible-count-to',

  /**
   * Filter results count
   */
  'results-count',

  /**
   * Defines the template element to generate all page buttons for the `paginate` mode.
   */
  'page-button',

  /**
   * Defines the template element to create the page dots separators.
   */
  'page-dots',

  /**
   * Defines a filters form.
   */
  'filters',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines an item field.
   */
  field: {
    key: 'field',
  },

  /**
   * Defines an item field type.
   */
  type: {
    key: 'type',
    values: { number: 'number', date: 'date' },
  },

  /**
   * Defines if sorting should start reversed.
   */
  reverse: {
    key: 'reverse',
    values: { true: 'true' },
  },

  /**
   * Debouncing delay for filter.
   */
  debounce: {
    key: 'debounce',
  },

  /**
   * Defines the ascending CSS class.
   */
  ascclass: {
    key: 'ascclass',
    values: { default: 'is-list-asc' },
  },

  /**
   * Defines the descending CSS class.
   */
  descclass: {
    key: 'descclass',
    values: { default: 'is-list-desc' },
  },

  /**
   * Defines the descending CSS class.
   */
  loadmode: {
    key: 'loadmode',
    values: { default: 'load-under', infinite: 'infinite', pagination: 'pagination', renderAll: 'render-all' },
  },

  /**
   * Defines the scrolling threshold to trigger a new page load in `infinite` mode.
   */
  threshold: { key: 'threshold' },

  /**
   * Defines the amount of digits to display either side of the current page.
   * It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.
   *
   * Defaults to {@link DEFAULT_PAGE_SIBLINGS}.
   */
  pagesiblings: { key: 'pagesiblings' },

  /**
   * Defines the amount of digits to display at the start and end of a page buttons list.
   * It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.
   *
   * Defaults to {@link DEFAULT_PAGE_BOUNDARY}.
   */
  pageboundary: { key: 'pageboundary' },

  /**
   * Defines if the pagination query params should be displayed on the URL.
   * Only works with {@link SETTINGS.mode.values.pagination} mode.
   */
  showquery: { key: 'showquery', values: { true: 'true' } },

  /**
   * Defines a filter operator. Defaults to `includes`.
   */
  operator: {
    key: 'operator',
    values: {
      eq: 'eq',
      neq: 'neq',
      gt: 'gt',
      gte: 'gte',
      lt: 'lt',
      lte: 'lte',
      includes: 'includes',
      nincludes: 'nincludes',
      exists: 'exists',
      nexists: 'nexists',
    },
  },

  /**
   * Defines a filter value.
   * Only used for checkboxes and radios to work around Webflow now allowing to define CMS based values for them.
   */
  value: { key: 'value' },
} as const satisfies AttributeSettings;

export const DEFAULT_INFINITE_THRESHOLD = -20;

export const DEFAULT_PAGE_SIBLINGS = 1;
export const DEFAULT_PAGE_BOUNDARY = 1;

export const BREAKPOINTS_INDEX: { [key in WebflowBreakpoint]: number } = {
  main: 0,
  medium: 1,
  small: 2,
  tiny: 3,
} as const;
