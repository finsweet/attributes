import { generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'favcustom';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const SRC_ELEMENT_KEY = 'src';
export const SRC_SETTING_KEY = 'src';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines an `<img>` element which `src` will be set as the favicon.
       */
      src: SRC_ELEMENT_KEY,
    },
  },

  /**
   * Defines the URL source of the image to be set as the favicon.
   */
  src: { key: `${ATTRIBUTES_PREFIX}-${SRC_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
