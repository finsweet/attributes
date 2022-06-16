import { generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'ATTRIBUTE_KEY';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const EXAMPLE_ELEMENT_KEY = 'example';
export const EXAMPLE_SETTING_KEY = 'example';
export const EXAMPLE_SETTING_VALUES = { value: 'value' };

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * This is an element example definition.
       */
      example: EXAMPLE_ELEMENT_KEY,
    },
  },

  /**
   * Defines a setting example definition.
   */
  example: {
    key: `${ATTRIBUTES_PREFIX}-${EXAMPLE_SETTING_KEY}`,
    values: EXAMPLE_SETTING_VALUES,
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
