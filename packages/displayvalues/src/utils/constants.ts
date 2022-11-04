import { DISPLAY_VALUES_ATTRIBUTE } from '$global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '$global/factory';

export const SOURCE_ELEMENT_KEY = 'source';
export const TARGET_ELEMENT_KEY = 'target';
export const PLACEHOLDER_SETTING_KEY = 'placeholder';

const ATTRIBUTES_PREFIX = `fs-${DISPLAY_VALUES_ATTRIBUTE}`;

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines the element as the source of the event.
       */
      source: SOURCE_ELEMENT_KEY,

      /**
       * Defines the element as the target to display the source value.
       */
      target: generateDynamicAttibuteValue(TARGET_ELEMENT_KEY),
    },
  },

  /**
   * Defines a placeholder text to display when no value exists.
   */
  placeholder: { key: `${ATTRIBUTES_PREFIX}-${PLACEHOLDER_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
