import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'countitems';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const VALUE_ELEMENT_KEY = 'value';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines the CMS list or list-wrapper.
       */
      list: LIST_ELEMENT_KEY,

      /**
       * Defines the element that will display the amount of CMS items.
       */
      value: generateDynamicAttibuteValue(VALUE_ELEMENT_KEY),
    },
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
