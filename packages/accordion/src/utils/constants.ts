import { ACCORDION_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${ACCORDION_ATTRIBUTE}`;

export const GROUP_ELEMENT_KEY = 'group';
export const ACCORDION_ELEMENT_KEY = 'accordion';
export const TRIGGER_ELEMENT_KEY = 'trigger';
export const CONTENT_ELEMENT_KEY = 'content';
export const ARROW_ELEMENT_KEY = 'arrow';

export const SINGLE_SETTING_KEY = 'single';
export const SINGLE_SETTING_VALUES = { true: 'true' } as const;
export const INITIAL_SETTING_KEY = 'initial';
export const INITIAL_SETTING_VALUES = { none: 'none' } as const;
export const ACTIVE_SETTING_KEY = 'active';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a group of accordion elements.
       */
      group: GROUP_ELEMENT_KEY,

      /**
       * Defines an accordion element.
       */
      accordion: ACCORDION_ELEMENT_KEY,

      /**
       * Defines a trigger element.
       */
      trigger: TRIGGER_ELEMENT_KEY,

      /**
       * Defines a content element.
       */
      content: CONTENT_ELEMENT_KEY,

      /**
       * Defines an arrow element.
       */
      arrow: ARROW_ELEMENT_KEY,
    },
  },

  /**
   * Defines if only one accordion can be open in a group at a time.
   */
  single: {
    key: `${ATTRIBUTES_PREFIX}-${SINGLE_SETTING_KEY}`,
    values: SINGLE_SETTING_VALUES,
  },

  /**
   * Defines the initially open accordions in a group.
   * Accepts both {@link INITIAL_SETTING_VALUES} or any arbitrary numbers in a comma-separated list.
   */
  initial: {
    key: `${ATTRIBUTES_PREFIX}-${INITIAL_SETTING_KEY}`,
    values: INITIAL_SETTING_VALUES,
  },

  /**
   * Defines the active CSS class to add.
   * Defaults to {@link DEFAULT_ACTIVE_CLASS} when not defined.
   */
  active: { key: `${ATTRIBUTES_PREFIX}-${ACTIVE_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement, getAttribute] = generateSelectors(ATTRIBUTES);

export const DEFAULT_ACTIVE_CLASS = `is-active-${ACCORDION_ATTRIBUTE}`;
