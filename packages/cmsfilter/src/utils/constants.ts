import { CMS_FILTER_ATTRIBUTE } from '$global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${CMS_FILTER_ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const FILTERS_ELEMENT_KEY = 'filters';
export const EMPTY_ELEMENT_KEY = 'empty';
export const INITIAL_ELEMENT_KEY = 'initial';
export const RESULTS_COUNT_ELEMENT_KEY = 'results-count';
export const FILTER_RESULTS_COUNT_ELEMENT_KEY = 'filter-results-count';
export const ITEMS_COUNT_ELEMENT_KEY = 'items-count';
export const TAG_TEMPLATE_ELEMENT_KEY = 'tag-template';
export const TAG_TEXT_ELEMENT_KEY = 'tag-text';
export const TAG_REMOVE_ELEMENT_KEY = 'tag-remove';
export const SCROLL_ANCHOR_ELEMENT_KEY = 'scroll-anchor';
export const RESET_ELEMENT_KEY = 'reset';
export const FIELD_SETTING_KEY = 'field';
export const RESET_SETTING_KEY = 'reset';
export const MATCH_SETTING_KEY = 'match';
export const MATCH_SETTING_VALUES = { any: 'any', all: 'all' } as const;
export const RANGE_SETTING_KEY = 'range';
export const RANGE_SETTING_VALUES = { from: 'from', to: 'to' } as const;
export const TYPE_SETTING_KEY = 'type';
export const TYPE_SETTING_VALUES = { date: 'date' } as const;
export const SHOW_QUERY_SETTING_KEY = 'showquery';
export const SHOW_QUERY_SETTING_VALUES = { true: 'true' } as const;
export const ALLOW_SUBMIT_SETTING_KEY = 'allowsubmit';
export const ALLOW_SUBMIT_SETTING_VALUES = { true: 'true' } as const;
export const HIDE_EMPTY_SETTING_KEY = 'hideempty';
export const HIDE_EMPTY_SETTING_VALUES = { true: 'true' } as const;
export const HIGHLIGHT_SETTING_KEY = 'highlight';
export const HIGHLIGHT_SETTING_VALUES = { true: 'true' } as const;
export const HIGHLIGHT_CLASS_SETTING_KEY = 'highlightclass';
export const ACTIVE_CLASS_SETTING_KEY = 'active';
export const DEBOUNCE_SETTING_KEY = 'debounce';
export const TAG_FORMAT_SETTING_KEY = 'tagformat';
export const TAG_FORMAT_SETTING_VALUES = { category: 'category' } as const;
export const TAG_CATEGORY_SETTING_KEY = 'tagcategory';
export const EASING_SETTING_KEY = 'easing';
export const DURATION_SETTING_KEY = 'duration';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a list to be filtered.
       */
      list: generateDynamicAttibuteValue(LIST_ELEMENT_KEY),

      /**
       * Defines the `Form` that holds the filters.
       */
      filters: generateDynamicAttibuteValue(FILTERS_ELEMENT_KEY),

      /**
       * Defines the Empty State element for when there are no filetered elements to show.
       */
      empty: generateDynamicAttibuteValue(EMPTY_ELEMENT_KEY),

      /**
       * Defines an optional Initial State element for when there are no applied filters.
       */
      initial: generateDynamicAttibuteValue(INITIAL_ELEMENT_KEY),

      /**
       * Defines an element that will display all existing results.
       */
      resultsCount: generateDynamicAttibuteValue(RESULTS_COUNT_ELEMENT_KEY),

      /**
       * Defines an element that will display the existing results for a specific filter.
       */
      filterResultsCount: generateDynamicAttibuteValue(FILTER_RESULTS_COUNT_ELEMENT_KEY),

      /**
       * Defines an element where to display the total items of the list.
       */
      itemsCount: generateDynamicAttibuteValue(ITEMS_COUNT_ELEMENT_KEY),

      /**
       * Defines a tag template element.
       */
      tagTemplate: generateDynamicAttibuteValue(TAG_TEMPLATE_ELEMENT_KEY),

      /**
       * Defines the text node of a tag.
       */
      tagText: generateDynamicAttibuteValue(TAG_TEXT_ELEMENT_KEY),

      /**
       * Defines a remove trigger element of a tag.
       */
      tagRemove: generateDynamicAttibuteValue(TAG_REMOVE_ELEMENT_KEY),

      /**
       * Defines an element where to scroll the view every time a filter is applied.
       */
      scrollAnchor: generateDynamicAttibuteValue(SCROLL_ANCHOR_ELEMENT_KEY),

      /**
       * Defines a button that resets all filters when clicked.
       */
      reset: RESET_ELEMENT_KEY,
    },
  },

  /**
   * Defines a field key to group filters.
   */
  field: { key: `${ATTRIBUTES_PREFIX}-${FIELD_SETTING_KEY}` },

  /**
   * Defines a specific field key to be resetted when clicking a Reset button.
   */
  reset: { key: `${ATTRIBUTES_PREFIX}-${RESET_SETTING_KEY}` },

  /**
   * Defines the matching mode.
   * Available values: {@link MATCHES}.
   * `any` by default.
   */
  match: {
    key: `${ATTRIBUTES_PREFIX}-${MATCH_SETTING_KEY}`,
    values: MATCH_SETTING_VALUES,
  },

  /**
   * Defines a range to filter.
   * Available values: {@link MODES.range}.
   */
  range: {
    key: `${ATTRIBUTES_PREFIX}-${RANGE_SETTING_KEY}`,
    values: RANGE_SETTING_VALUES,
  },

  /**
   * Defines a specific field type.
   */
  type: { key: `${ATTRIBUTES_PREFIX}-${TYPE_SETTING_KEY}`, values: TYPE_SETTING_VALUES },

  /**
   * Defines if the filter query params should be displayed on the URL.
   */
  showQuery: { key: `${ATTRIBUTES_PREFIX}-${SHOW_QUERY_SETTING_KEY}`, values: SHOW_QUERY_SETTING_VALUES },

  /**
   * Defines if the filters form should not prevent default behavior when submitting it.
   */
  allowSubmit: { key: `${ATTRIBUTES_PREFIX}-${ALLOW_SUBMIT_SETTING_KEY}`, values: ALLOW_SUBMIT_SETTING_VALUES },

  /**
   * Defines if a filter element should be hidden when there are no results for it.
   */
  hideEmpty: { key: `${ATTRIBUTES_PREFIX}-${HIDE_EMPTY_SETTING_KEY}`, values: HIDE_EMPTY_SETTING_VALUES },

  /**
   * Defines if the filter query should highlight the matching item props.
   * It's applied to the input elements.
   */
  highlight: { key: `${ATTRIBUTES_PREFIX}-${HIGHLIGHT_SETTING_KEY}`, values: HIGHLIGHT_SETTING_VALUES },

  /**
   * Defines the highlight CSS class to be used to highlight elements.
   * Defaults to {@link DEFAULT_HIGHLIGHT_CSS_CLASS}.
   */
  highlightCSS: { key: `${ATTRIBUTES_PREFIX}-${HIGHLIGHT_CLASS_SETTING_KEY}` },

  /**
   * Defines an active CSS class that will be added to checked checkboxes/radios's parent element.
   * Defaults to {@link DEFAULT_ACTIVE_CSS_CLASS}.
   */
  activeCSS: { key: `${ATTRIBUTES_PREFIX}-${ACTIVE_CLASS_SETTING_KEY}` },

  /**
   * Defines the debouncing for input events.
   * Defaults to {@link DEFAULT_DEBOUNCING}.
   */
  debouncing: { key: `${ATTRIBUTES_PREFIX}-${DEBOUNCE_SETTING_KEY}` },

  /**
   * Defines the format of the tags.
   * Available values: {@link TAG_FORMATS}.
   */
  tagFormat: { key: `${ATTRIBUTES_PREFIX}-${TAG_FORMAT_SETTING_KEY}` },

  /**
   * Overrides the key display of a filter when using the `category` tag format.
   */
  tagCategory: { key: `${ATTRIBUTES_PREFIX}-${TAG_CATEGORY_SETTING_KEY}` },

  /**
   * Defines the easing function of the list animation.
   * Allowed values are defined in {@link "packages/animations"}.
   */
  easing: { key: `${ATTRIBUTES_PREFIX}-${EASING_SETTING_KEY}` },

  /**
   * Defines the duration of the list animation.
   */
  duration: { key: `${ATTRIBUTES_PREFIX}-${DURATION_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const MATCHES = Object.values(MATCH_SETTING_VALUES);
export const MODES = {
  range: Object.values(RANGE_SETTING_VALUES),
} as const;

export const TAG_FORMATS = Object.values(TAG_FORMAT_SETTING_VALUES);

export const DEFAULT_HIGHLIGHT_CSS_CLASS = 'fs-cmsfilter_highlight';
export const DEFAULT_ACTIVE_CSS_CLASS = 'fs-cmsfilter_active';

export const DEFAULT_DEBOUNCING = '50';
