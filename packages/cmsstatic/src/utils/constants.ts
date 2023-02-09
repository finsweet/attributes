import { CMS_STATIC_ATTRIBUTE } from '$global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${CMS_STATIC_ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const STATIC_ITEM_ELEMENT_KEY = 'static-item';
export const ORDER_SETTING_KEY = 'order';
export const INTERACTIVE_SETTING_KEY = 'interactive';
export const INTERACTIVE_SETTING_VALUES = { true: 'true' } as const;

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a list to have a static element
       */
      list: generateDynamicAttibuteValue(LIST_ELEMENT_KEY),
      /**
       * Defines the static element
       */
      staticItem: generateDynamicAttibuteValue(STATIC_ITEM_ELEMENT_KEY),
    },
  },

  /**
   * Defines the order of static element in list.
   */
  order: {
    key: `${ATTRIBUTES_PREFIX}-${ORDER_SETTING_KEY}`,
  },
  /**
   * Defines if element will be strict static or will interact with load, filters, order.
   */
  interactive: {
    key: `${ATTRIBUTES_PREFIX}-${INTERACTIVE_SETTING_KEY}`,
    values: INTERACTIVE_SETTING_VALUES,
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
