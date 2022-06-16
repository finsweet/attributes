import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'cmscombine';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const ITEMS_COUNT_ELEMENT_KEY = 'items-count';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a list to be combined into the target.
       */
      list: generateDynamicAttibuteValue(LIST_ELEMENT_KEY),

      /**
       * Defines an element where to display the total items of the list.
       */
      itemsCount: generateDynamicAttibuteValue(ITEMS_COUNT_ELEMENT_KEY),
    },
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
