import { A11Y_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${A11Y_ATTRIBUTE}`;

export const AUTOFOCUS_ELEMENT_KEY = 'autofocus';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines an element that should autofocus when a wrapper is displayed.
       */
      // autoFocus: AUTOFOCUS_ELEMENT_KEY,
    },
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
