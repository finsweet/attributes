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
   * Defines a link to an item's template page.
   */
  'item-link',

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
   * All filters results count
   */
  'results-count',

  /**
   * All filters results count
   */
  'filter-results-count',

  /**
   * Defines the template element to generate all page buttons for the `pagination` mode.
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

  /**
   * Defines the tag element.
   */
  'tag',

  /**
   * Defines the element inside each tag.
   */
  'tag-field',

  /**
   * Defines the element inside each tag.
   */
  'tag-value',

  /**
   * Defines the element inside each tag.
   * Tag operators can be overwritten by the `tag-operator-OPERATOR` attribute.
   */
  'tag-operator',
  'tag-operator-equal',
  'tag-operator-not-equal',
  'tag-operator-contains',
  'tag-operator-not-contains',
  'tag-operator-greater',
  'tag-operator-greater-equal',
  'tag-operator-less',
  'tag-operator-less-equal',
  'tag-operator-empty',
  'tag-operator-not-empty',
  'tag-operator-fuzzy',

  /**
   * Defines the element inside each Tag that should remove it.
   */
  'tag-remove',

  /**
   * Defines a Condition group wrapper that wraps all the conditions added to that group.
   */
  'condition-group',

  /**
   * Defines a matching value for the conditions groups.
   */
  'condition-group-match',

  /**
   * Defines an element that when clicked will add a new condition group.
   */
  'condition-group-add',

  /**
   * Defines an element that when clicked will remove a condition group.
   */
  'condition-group-remove',

  /**
   * Defines a Condition template element that wraps the field, operator and value elements.
   */
  'condition',

  /**
   * Defines a matching value for the condition in the group.
   */
  'condition-match',

  /**
   * Defines a Condition field input.
   */
  'condition-field',

  /**
   * Defines a Condition operator selector.
   */
  'condition-operator',

  /**
   * Defines a Condition value input.
   */
  'condition-value',

  /**
   * Defines an element that when clicked will add a new condition to the group.
   */
  'condition-add',

  /**
   * Defines an element that when clicked will remove the condition.
   */
  'condition-remove',

  /**
   * Defines a slider element.
   */
  'slider',

  /**
   * Defines a tabs element.
   */
  'tabs',

  /**
   * Defines a tab link element.
   */
  'tab-link',

  /**
   * Defines a <select> element.
   */
  'select',

  /**
   * Defines a select <option> value element.
   */
  'select-value',

  /**
   * Defines a nesting target
   */
  'nest-target',

  /**
   * Defines an element that has a comma-separated list of slugs of elements to nest into a specific target.
   */
  'nest-slugs',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines an item field.
   */
  field: {
    key: 'field',
  },

  /**
   * Defines the matching logic for an array of field values.
   */
  fieldMatch: {
    key: 'fieldmatch',
    values: { and: 'and', or: 'or', default: 'and' },
  },

  /**
   * Defines the matching logic for an array of filter values.
   */
  filterMatch: {
    key: 'filtermatch',
    values: { and: 'and', or: 'or', default: 'and' },
  },

  /**
   * Defines an item field type.
   */
  type: {
    key: 'type',
    values: { number: 'number', date: 'date' },
  },

  /**
   * Defines highlighte flag.
   */
  highlight: {
    key: 'highlight',
  },

  /**
   * Defines the CSS class added to highlighted values.
   */
  highlightclass: {
    key: 'highlightclass',
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
  load: {
    key: 'load',
    values: { more: 'more', infinite: 'infinite', pagination: 'pagination', all: 'all' },
  },

  /**
   * Defines the amount of items to load when clicking the load more button or scrolling in infinite mode.
   */
  loadcount: {
    key: 'loadcount',
    values: { all: 'all' },
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
   * Defines an easing animation for any action in the list (sorting, page navigation, filtering).
   */
  easing: { key: 'easing' },

  /**
   * Defines an animation duration for any action in the list (sorting, page navigation, filtering).
   */
  duration: { key: 'duration' },

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
      equal: 'equal',
      'not-equal': 'not-equal',
      contains: 'contains',
      'not-contains': 'not-contains',
      greater: 'greater',
      'greater-equal': 'greater-equal',
      less: 'less',
      'less-equal': 'less-equal',
      empty: 'empty',
      'not-empty': 'not-empty',
      fuzzy: 'fuzzy',
    },
  },

  /**
   * Defines a fuzzy ratio for a filter.
   */
  fuzzy: { key: 'fuzzy' },

  /**
   * Defines a filter value.
   * Only used for checkboxes and radios to work around Webflow now allowing to define CMS based values for them.
   */
  value: { key: 'value' },

  /**
   * Defines a list instance where the list should be combined with.
   */
  combine: { key: 'combine' },

  /**
   * Defines the instance of a list to be nested into a nest-target.
   */
  nest: { key: 'nest' },

  /**
   * Defines if loaded Items can be cached using IndexedDB after fetching them.
   * Defaults to `true`.
   */
  cache: { key: `cache`, values: { true: 'true' } },
} as const satisfies AttributeSettings;

export const DEFAULT_INFINITE_THRESHOLD = -20;

export const DEFAULT_PAGE_SIBLINGS = 1;
export const DEFAULT_PAGE_BOUNDARY = 1;

export const DEFAULT_FUZZY_RATIO = 0.2;

export const DEFAULT_FILTER_OPERATOR = 'contains';

export const BREAKPOINTS_INDEX: { [key in WebflowBreakpoint]: number } = {
  main: 0,
  medium: 1,
  small: 2,
  tiny: 3,
} as const;
