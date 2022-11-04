import { STAR_RATING_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${STAR_RATING_ATTRIBUTE}`;

export const GROUP_ELEMENT_KEY = 'group';
export const STAR_ELEMENT_KEY = 'star';
export const ACTIVE_CLASS_SETTING_KEY = 'active';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a stars wrapper.
       */
      group: GROUP_ELEMENT_KEY,

      /**
       * Defines a star element.
       */
      star: STAR_ELEMENT_KEY,
    },
  },

  /**
   * Defines a setting example definition.
   */
  activeClass: {
    key: `${ATTRIBUTES_PREFIX}-${ACTIVE_CLASS_SETTING_KEY}`,
  },
} as const;

export const [getSelector, queryElement, getAttribute] = generateSelectors(ATTRIBUTES);

export const DEFAULT_ACTIVE_CLASS = `is-active-${STAR_RATING_ATTRIBUTE}`;
