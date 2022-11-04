import { INPUT_ACTIVE_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${INPUT_ACTIVE_ATTRIBUTE}`;

export const CLASS_SETTING_KEY = 'class';
export const CLASS_SETTING_VALUES = { value: 'value' };

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {},
  },

  /**
   * Defines a custom active class.
   */
  class: {
    key: `${ATTRIBUTES_PREFIX}-${CLASS_SETTING_KEY}`,
    values: CLASS_SETTING_VALUES,
  },
} as const;

export const [getSelector, queryElement, getAttribute] = generateSelectors(ATTRIBUTES);

export const DEFAULT_ACTIVE_CLASS = `is-active-${INPUT_ACTIVE_ATTRIBUTE}`;
