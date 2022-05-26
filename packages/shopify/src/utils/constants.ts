import { generateSelectors } from '$global/factory/selectors';

export const ATTRIBUTE = 'shopify';

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

  /**
   * Defines the storefrontAccessToken provided by Shopify
   */
  token: { key: `${ATTRIBUTES_PREFIX}-token` },

  /**
   * Defines the domain where the Shopify store is hosted
   */
  domain: { key: `${ATTRIBUTES_PREFIX}-domain` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
