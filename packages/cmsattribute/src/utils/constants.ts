import { CMS_ATTRIBUTE_ATTRIBUTE } from 'global/constants/attributes';

import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${CMS_ATTRIBUTE_ATTRIBUTE}`;

export const TARGET_SETTING_KEY = 'target';
export const NAME_SETTING_KEY = 'name';
export const VALUE_SETTING_KEY = 'value';

export const ATTRIBUTES = {
  /**
   * Defines a target to construct and assign an attribute.
   */
  target: { key: `${ATTRIBUTES_PREFIX}-${TARGET_SETTING_KEY}` },

  /**
   * Defines a name to construct an attribute.
   */
  name: { key: `${ATTRIBUTES_PREFIX}-${NAME_SETTING_KEY}` },

  /**
   * Defines a value to construct an attribute.
   */
  value: { key: `${ATTRIBUTES_PREFIX}-${VALUE_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
