import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'cmsselect';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const TEXT_VALUE_ELEMENT_KEY = 'text-value';
export const SELECT_ELEMENT_KEY = 'select';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines the elements as the source to populate the target.
       */
      textValue: generateDynamicAttibuteValue(TEXT_VALUE_ELEMENT_KEY),

      /**
       * Defines the element as the target to be populated.
       */
      select: SELECT_ELEMENT_KEY,
    },
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
