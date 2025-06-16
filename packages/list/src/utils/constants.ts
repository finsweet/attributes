import {
  type AttributeElements,
  type AttributeSettings,
  type FormFieldType,
  LIST_ATTRIBUTE,
  type WebflowBreakpoint,
} from '@finsweet/attributes-utils';

import type { ListItemField } from '../components';
import type { FilterOperator } from '../filter/types';

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
   * A specific filter results count prediction.
   */
  'facet-count',

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
   * Defines an element that will be displayed instead of the list when there are no filters applied.
   */
  'initial',

  /**
   * Defines the tag element.
   */
  'tag',

  /**
   * Defines the element inside each tag that will display the field name.
   */
  'tag-field',

  /**
   * Defines the element inside each tag that will display the filter value.
   */
  'tag-value',

  /**
   * Defines the element inside each tag that will display the filter operator.
   * Tag operators can be overwritten by the `tag-operator-OPERATOR` attribute.
   */
  'tag-operator',
  'tag-operator-equal',
  'tag-operator-not-equal',
  'tag-operator-contain',
  'tag-operator-not-contain',
  'tag-operator-start',
  'tag-operator-not-start',
  'tag-operator-end',
  'tag-operator-not-end',
  'tag-operator-greater',
  'tag-operator-greater-equal',
  'tag-operator-less',
  'tag-operator-less-equal',
  'tag-operator-empty',
  'tag-operator-not-empty',

  /**
   * Defines the element inside each Tag that should remove it.
   */
  'tag-remove',

  /**
   * Defines the wrapper of the tags for a conditions group.
   */
  'tag-group',

  /**
   * Defines a button that will remove an entire tag group (and the correspondent filters).
   */
  'tag-group-remove',

  /**
   * Defines a Condition group wrapper that wraps all the conditions added to that group.
   */
  'condition-group',

  /**
   * Defines a matching value for the conditions groups.
   */
  'condition-group-match',
  'condition-groups-match',

  /**
   * Defines an element that when clicked will add a new condition group.
   */
  'condition-group-add',
  'condition-groups-add',

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

  /**
   * Defines an element to scroll to when any list actions are performed.
   */
  'scroll-anchor',

  /**
   * Defines an element to scroll to when filter actions are performed.
   * If defined, it overrides the `scroll-anchor` element.
   */
  'scroll-anchor-filter',

  /**
   * Defines an element to scroll to when sort actions are performed.
   * If defined, it overrides the `scroll-anchor` element.
   */
  'scroll-anchor-sort',

  /**
   * Defines an element to scroll to when pagination actions are performed.
   * If defined, it overrides the `scroll-anchor` element.
   */
  'scroll-anchor-pagination',

  /**
   * Defines the place where to put the previous item of a collection template page.
   */
  'previous-item',

  /**
   * Defines the place where to put the next item of a collection template page.
   */
  'next-item',

  /**
   * Defines an item to be displayed when the previous item is empty.
   */
  'previous-empty',

  /**
   * Defines an item to be displayed when the next item is empty.
   */
  'next-empty',
] as const satisfies AttributeElements;

const TEXT = 'text';
const NUMBER = 'number';
const DATE = 'date';
const SELECT_ONE = 'select-one';
const SELECT_MULTIPLE = 'select-multiple';
const OP_CONTAIN = 'contain';
const OP_NOT_CONTAIN = 'not-contain';
const OP_START = 'start';
const OP_NOT_START = 'not-start';
const OP_END = 'end';
const OP_NOT_END = 'not-end';
const OP_EQUAL = 'equal';
const OP_NOT_EQUAL = 'not-equal';
const OP_GREATER = 'greater';
const OP_GREATER_EQUAL = 'greater-equal';
const OP_LESS = 'less';
const OP_LESS_EQUAL = 'less-equal';
const OP_EMPTY = 'empty';
const OP_NOT_EMPTY = 'not-empty';

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
  fieldmatch: {
    key: 'fieldmatch',
    values: ['and', 'or'],
    defaultValue: 'or',
  },

  /**
   * Defines the matching logic for an array of filter values.
   */
  filtermatch: {
    key: 'filtermatch',
    values: ['and', 'or'],
    defaultValue: 'or',
  },

  /**
   * Defines the matching logic for multiple conditions.
   */
  conditionsmatch: {
    key: 'conditionsmatch',
    values: ['and', 'or'],
    defaultValue: 'and',
  },

  /**
   * Defines the matching logic for multiple condition groups.
   */
  groupsmatch: {
    key: 'groupsmatch',
    values: ['and', 'or'],
    defaultValue: 'and',
  },

  /**
   * Defines an item field type.
   */
  fieldtype: {
    key: 'fieldtype',
    values: ['number', 'date'],
  },

  /**
   * Defines if sorting should start reversed.
   */
  reverse: {
    key: 'reverse',
    values: ['true'],
  },

  /**
   * Debouncing delay for filter.
   */
  debounce: {
    key: 'debounce',
    isNumeric: true,
  },

  /**
   * Defines the ascending CSS class.
   */
  ascclass: {
    key: 'ascclass',
    defaultValue: `is-${LIST_ATTRIBUTE}-asc`,
  },

  /**
   * Defines the descending CSS class.
   */
  descclass: {
    key: 'descclass',
    defaultValue: `is-${LIST_ATTRIBUTE}-desc`,
  },

  /**
   * Defines the active filter CSS class.
   */
  activeclass: {
    key: 'activeclass',
    defaultValue: `is-${LIST_ATTRIBUTE}-active`,
  },

  /**
   * Defines the disabled filter CSS class.
   */
  dynamicdisabledclass: {
    key: 'dynamicdisabledclass',
    defaultValue: `is-${LIST_ATTRIBUTE}-dynamic-disabled`,
  },

  /**
   * Defines the loading configuration.
   */
  load: {
    key: 'load',
    values: ['more', 'infinite', 'pagination', 'all'],
  },

  /**
   * Defines the amount of items to load when clicking the load more button or scrolling in infinite mode.
   */
  loadcount: {
    key: 'loadcount',
    values: ['all'],
  },

  /**
   * Defines the scrolling threshold to trigger a new page load in `infinite` mode.
   */
  threshold: { key: 'threshold', defaultValue: '-20', isNumeric: true },

  /**
   * Defines the amount of digits to display either side of the current page.
   * It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.
   */
  pagesiblings: { key: 'pagesiblings', defaultValue: '1' },

  /**
   * Defines the amount of digits to display at the start and end of a page buttons list.
   * It can be a comma-separated string listing the values in a `Desktop, Tablet, Landscape, Portrait` order.
   */
  pageboundary: { key: 'pageboundary', defaultValue: '1' },

  /**
   * Defines the disabled CSS class.
   */
  paginationdisabledclass: { key: 'paginationdisabledclass', defaultValue: `is-${LIST_ATTRIBUTE}-pagination-disabled` },

  /**
   * Defines an easing animation for any action in the list (sorting, page navigation, filtering).
   */
  easing: { key: 'easing' },

  /**
   * Defines an animation duration for any action in the list (sorting, page navigation, filtering).
   */
  duration: { key: 'duration', defaultValue: '1000', isNumeric: true },

  /**
   * Defines if the pagination query params should be displayed on the URL.
   * Only works with {@link SETTINGS.load.values.pagination} mode.
   */
  showquery: { key: 'showquery', values: ['true'] },

  /**
   * Defines if the matched fields when filtering should be highlighted.
   */
  highlight: { key: 'highlight', values: ['true'] },

  /**
   * Defines the highlight CSS class.
   */
  highlightclass: { key: 'highlightclass', defaultValue: `is-${LIST_ATTRIBUTE}-highlight` },

  /**
   * Defines the behavior of filter elements when there are no results.
   */
  emptyfacet: { key: 'emptyfacet', values: ['hide', 'add-class'] },

  /**
   * Defines the empty CSS class.
   */
  emptyfacetclass: { key: 'emptyfacetclass', defaultValue: `is-${LIST_ATTRIBUTE}-emptyfacet` },

  /**
   * Defines a filter operator.
   */
  operator: {
    key: 'operator',
    values: [
      OP_EQUAL,
      OP_NOT_EQUAL,
      OP_CONTAIN,
      OP_NOT_CONTAIN,
      OP_START,
      OP_NOT_START,
      OP_END,
      OP_NOT_END,
      OP_GREATER_EQUAL,
      OP_GREATER,
      OP_LESS_EQUAL,
      OP_LESS,
      OP_EMPTY,
      OP_NOT_EMPTY,
    ],
  },

  /**
   * Defines a fuzzy ratio for a filter.
   */
  fuzzy: { key: 'fuzzy', isNumeric: true },

  /**
   * Defines when the lists should be filtered.
   */
  filteron: { key: 'filteron', values: ['input', 'change', 'submit'], defaultValue: 'input' },

  /**
   * Defines if the form's default submissions shouldn't be prevented.
   * By default, fs-list prevents the form's default submission to handle the filtering.
   */
  allowsubmit: { key: 'allowsubmit', values: ['true'] },

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
   */
  cache: { key: `cache`, values: ['true'], defaultValue: 'true' },

  /**
   * Defines a custom display value for a field in a tag.
   */
  tagfield: { key: 'tagfield' },

  /**
   * Defines if the tag for a specific filter should be displayed.
   */
  showtag: { key: 'showtag', values: ['false'] },

  /**
   * If added to a tag, numeric and date numbers will be formatted when displaying them in the tags.
   * If "true" the format will default to the user’s locale.
   * A specific locale can be forced using IETF BCP 47 language tags like "en-US".
   */
  formatdisplay: { key: 'formatdisplay', values: ['true'] },

  /**
   * Defines the position for a static list item.
   */
  position: { key: 'position', isNumeric: true, defaultValue: '1' },

  /**
   * If added to a static list item, the item will be repeated every X items.
   */
  repeat: { key: 'repeat', isNumeric: true },

  /**
   * If defined on a static item, the item will be filtered, sorted, etc…
   */
  interactive: { key: 'interactive', values: ['true'] },

  /**
   * Defines a custom amount of items to display per page.
   * By default, it will use the Webflow pagination settings.
   */
  itemsperpage: { key: 'itemsperpage', isNumeric: true },

  /**
   * Defines the CSS class to be added to the list when filtering.
   */
  filteringclass: { key: 'filteringclass', defaultValue: `is-${LIST_ATTRIBUTE}-filtering` },

  /**
   * Defines the CSS class to be added to the list when paginating.
   */
  loadingclass: { key: 'loadingclass', defaultValue: `is-${LIST_ATTRIBUTE}-loading` },

  /**
   * Defines the CSS class to be added to the list when sorting.
   */
  sortingclass: { key: 'sortingclass', defaultValue: `is-${LIST_ATTRIBUTE}-sorting` },

  /**
   * Defines the CSS class to be added to items before rendering them.
   */
  startingclass: { key: 'startingclass', defaultValue: `is-${LIST_ATTRIBUTE}-starting` },

  /**
   * Defines a stagger delay for the items when filtering.
   * If applied, the items will receive a `transition-delay` CSS property.
   */
  stagger: { key: 'stagger', isNumeric: true },

  /**
   * Defines if Webflow's ix2 should be reset when rendering the list items.
   */
  resetix: { key: 'resetix', values: ['true'] },
} as const satisfies AttributeSettings;

export const BREAKPOINTS_INDEX: { [key in WebflowBreakpoint]: number } = {
  main: 0,
  medium: 1,
  small: 2,
  tiny: 3,
} as const;

export const ALLOWED_DYNAMIC_FIELD_TYPES: Record<
  ListItemField['type'],
  Record<'single' | 'multiple', Partial<Record<FilterOperator, FormFieldType[]>>>
> = {
  text: {
    single: {
      [OP_CONTAIN]: [TEXT],
      [OP_NOT_CONTAIN]: [TEXT],
      [OP_START]: [TEXT],
      [OP_NOT_START]: [TEXT],
      [OP_END]: [TEXT],
      [OP_NOT_END]: [TEXT],
      [OP_EQUAL]: [SELECT_MULTIPLE, SELECT_ONE, TEXT],
      [OP_NOT_EQUAL]: [SELECT_MULTIPLE, SELECT_ONE, TEXT],
      [OP_EMPTY]: [],
      [OP_NOT_EMPTY]: [],
    },
    multiple: {
      [OP_CONTAIN]: [TEXT],
      [OP_NOT_CONTAIN]: [TEXT],
      [OP_START]: [TEXT],
      [OP_NOT_START]: [TEXT],
      [OP_END]: [TEXT],
      [OP_NOT_END]: [TEXT],
      [OP_EQUAL]: [SELECT_MULTIPLE, SELECT_ONE, TEXT],
      [OP_NOT_EQUAL]: [SELECT_MULTIPLE, SELECT_ONE, TEXT],
      [OP_EMPTY]: [],
      [OP_NOT_EMPTY]: [],
    },
  },
  number: {
    single: {
      [OP_EQUAL]: [NUMBER, TEXT],
      [OP_NOT_EQUAL]: [NUMBER, TEXT],
      [OP_LESS]: [NUMBER, TEXT],
      [OP_LESS_EQUAL]: [NUMBER, TEXT],
      [OP_GREATER]: [NUMBER, TEXT],
      [OP_GREATER_EQUAL]: [NUMBER, TEXT],
      [OP_EMPTY]: [],
      [OP_NOT_EMPTY]: [],
    },
    multiple: {
      [OP_EQUAL]: [NUMBER, TEXT],
      [OP_NOT_EQUAL]: [NUMBER, TEXT],
      [OP_LESS]: [NUMBER, TEXT],
      [OP_LESS_EQUAL]: [NUMBER, TEXT],
      [OP_GREATER]: [NUMBER, TEXT],
      [OP_GREATER_EQUAL]: [NUMBER, TEXT],
      [OP_EMPTY]: [],
      [OP_NOT_EMPTY]: [],
    },
  },
  date: {
    single: {
      [OP_EQUAL]: [DATE, TEXT],
      [OP_NOT_EQUAL]: [DATE, TEXT],
      [OP_LESS]: [DATE, TEXT],
      [OP_LESS_EQUAL]: [DATE, TEXT],
      [OP_GREATER]: [DATE, TEXT],
      [OP_GREATER_EQUAL]: [DATE, TEXT],
      [OP_EMPTY]: [],
      [OP_NOT_EMPTY]: [],
    },
    multiple: {
      [OP_EQUAL]: [DATE, TEXT],
      [OP_NOT_EQUAL]: [DATE, TEXT],
      [OP_LESS]: [DATE, TEXT],
      [OP_LESS_EQUAL]: [DATE, TEXT],
      [OP_GREATER]: [DATE, TEXT],
      [OP_GREATER_EQUAL]: [DATE, TEXT],
      [OP_EMPTY]: [],
      [OP_NOT_EMPTY]: [],
    },
  },
};

export const RENDER_INDEX_CSS_VARIABLE = `--fs-${LIST_ATTRIBUTE}-renderindex`;

window.CSS.registerProperty({
  name: RENDER_INDEX_CSS_VARIABLE,
  syntax: '<number>',
  inherits: false,
  initialValue: '0',
});
