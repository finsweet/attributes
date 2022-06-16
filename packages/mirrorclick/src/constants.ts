import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'mirrorclick';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const TRIGGER_ELEMENT_KEY = 'trigger';
export const TARGET_ELEMENT_KEY = 'target';

export const DELAY_SETTING_KEY = 'delay';

export const ATTRIBUTES = {
  /**
   * Defines an element that will act as trigger or target of the event mirroring.
   */
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines the element as the trigger of the event.
       */
      trigger: TRIGGER_ELEMENT_KEY,

      /**
       * Defines the element as the target to mirror the fired event.
       */
      target: generateDynamicAttibuteValue(TARGET_ELEMENT_KEY),
    },
  },

  /**
   * Defines a delay to wait until the click event is replicated on the target.
   */
  delay: { key: `${ATTRIBUTES_PREFIX}-${DELAY_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
