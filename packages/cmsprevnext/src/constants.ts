import { generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'cmsprevnext';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const PREVIOUS_ELEMENT_KEY = 'previous';
export const PREVIOUS_EMPTY_ELEMENT_KEY = 'previous-empty';
export const NEXT_ELEMENT_KEY = 'next';
export const NEXT_EMPTY_ELEMENT_KEY = 'next-empty';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a list to be combined into the target.
       */
      list: LIST_ELEMENT_KEY,

      /**
       * Defines the `Previous` placeholder target.
       */
      previous: PREVIOUS_ELEMENT_KEY,

      /**
       * Defines the `Previous` Empty State.
       */
      previousEmpty: PREVIOUS_EMPTY_ELEMENT_KEY,

      /**
       * Defines the `Next` placeholder target.
       */
      next: NEXT_ELEMENT_KEY,

      /**
       * Defines the `Next` Empty State.
       */
      nextEmpty: NEXT_EMPTY_ELEMENT_KEY,
    },
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
