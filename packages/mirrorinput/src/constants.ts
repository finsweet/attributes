import { MIRROR_INPUT_ATTRIBUTE } from '$global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${MIRROR_INPUT_ATTRIBUTE}`;

export const TRIGGER_ELEMENT_KEY = 'trigger';
export const TARGET_ELEMENT_KEY = 'target';

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
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
