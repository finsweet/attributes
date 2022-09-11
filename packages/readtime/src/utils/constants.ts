import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'readtime';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const CONTENTS_ELEMENT_KEY = 'contents';
export const TIME_ELEMENT_KEY = 'time';
export const WPM_SETTING_KEY = 'wpm';
export const DECIMALS_SETTING_KEY = 'decimals';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines any wrapper that contains the content to be metered.
       */
      contents: generateDynamicAttibuteValue(CONTENTS_ELEMENT_KEY),

      /**
       * Defines the element that will display the time.
       */
      time: generateDynamicAttibuteValue(TIME_ELEMENT_KEY),
    },
  },

  /**
   * Defines the Words Per Minute ratio.
   * Defaults to {@link DEFAULT_WPM}.
   */
  wpm: {
    key: `${ATTRIBUTES_PREFIX}-${WPM_SETTING_KEY}`,
  },

  /**
   * Defines the amount of decimals displayed in the time output.
   * Defaults to {@link DEFAULT_DECIMALS}.
   */
  decimals: {
    key: `${ATTRIBUTES_PREFIX}-${DECIMALS_SETTING_KEY}`,
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const DEFAULT_WPM = 265;
export const DEFAULT_DECIMALS = 0;
