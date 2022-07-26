import { CMS_SORT_ATTRIBUTE } from '@global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

const ATTRIBUTES_PREFIX = `fs-${CMS_SORT_ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const TRIGGER_ELEMENT_KEY = 'trigger';
export const DROPDOWN_LABEL_ELEMENT_KEY = 'dropdown-label';
export const SCROLL_ANCHOR_ELEMENT_KEY = 'scroll-anchor';

export const FIELD_SETTING_KEY = 'field';
export const TYPE_SETTING_KEY = 'type';
export const EASING_SETTING_KEY = 'easing';
export const DURATION_SETTING_KEY = 'duration';
export const ASC_CLASS_SETTING_KEY = 'asc';
export const DESC_CLASS_SETTING_KEY = 'desc';
export const REVERSE_SETTING_KEY = 'reverse';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a list to be combined into the target.
       */
      list: generateDynamicAttibuteValue(LIST_ELEMENT_KEY),

      /**
       * Defines the `Previous` placeholder target.
       */
      trigger: generateDynamicAttibuteValue(TRIGGER_ELEMENT_KEY),

      /**
       * Defines a Dropdown label.
       */
      dropdownLabel: generateDynamicAttibuteValue(DROPDOWN_LABEL_ELEMENT_KEY),

      /**
       * Defines an element where to scroll the view every time a filter is applied.
       */
      scrollAnchor: generateDynamicAttibuteValue(SCROLL_ANCHOR_ELEMENT_KEY),
    },
  },

  /**
   * Defines a field key to sort items.
   */
  field: { key: `${ATTRIBUTES_PREFIX}-${FIELD_SETTING_KEY}` },

  /**
   * Defines the type of the values to sort.
   */
  type: {
    key: `${ATTRIBUTES_PREFIX}-${TYPE_SETTING_KEY}`,
    values: {
      date: 'date',
    },
  },

  /**
   * Defines the easing function of the list animation.
   * Allowed values are defined in {@link "packages/animations"}.
   */
  easing: { key: `${ATTRIBUTES_PREFIX}-${EASING_SETTING_KEY}` },

  /**
   * Defines the duration of the list animation.
   */
  duration: { key: `${ATTRIBUTES_PREFIX}-${DURATION_SETTING_KEY}` },

  /**
   * Defines the CSS Class for the `asc` state.
   * Defaults to {@link DEFAULT_ASC_CLASS}.
   */
  ascClass: { key: `${ATTRIBUTES_PREFIX}-${ASC_CLASS_SETTING_KEY}` },

  /**
   * Defines the CSS Class for the `desc` state.
   * Defaults to {@link DEFAULT_DESC_CLASS}.
   */
  descClass: { key: `${ATTRIBUTES_PREFIX}-${DESC_CLASS_SETTING_KEY}` },

  /**
   * Defines if a button should trigger `desc` sorting on first click.
   */
  reverse: { key: `${ATTRIBUTES_PREFIX}-${REVERSE_SETTING_KEY}`, values: { true: 'true' } },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const DEFAULT_ASC_CLASS = `${ATTRIBUTES_PREFIX}_asc`;
export const DEFAULT_DESC_CLASS = `${ATTRIBUTES_PREFIX}_desc`;
