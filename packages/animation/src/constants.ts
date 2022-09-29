import { generateSelectors } from '$global/factory';

export const ATTRIBUTE = 'animation';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const ATTRIBUTES = {
  /**
   * This is an example attribute.
   */
  example: {
    key: `${ATTRIBUTES_PREFIX}-example`,
    values: {
      /**
       * This is an example value.
       */
      value1: 'value1',

      /**
       * This is another example value.
       */
      value2: 'value2',
    },
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
