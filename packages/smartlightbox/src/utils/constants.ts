import { SMART_LIGHTBOX_ATTRIBUTE } from '@global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

const ATTRIBUTES_PREFIX = `fs-${SMART_LIGHTBOX_ATTRIBUTE}`;

export const TRIGGER_OPEN_ELEMENT_KEY = 'trigger-open';
export const TRIGGER_CLOSE_ELEMENT_KEY = 'trigger-close';
export const TRIGGER_TOGGLE_ELEMENT_KEY = 'trigger-toggle';
export const LIGHTBOX_ELEMENT_KEY = 'lightbox';

export const WAIT_SETTING_KEY = 'wait';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines the trigger that appends the `lightbox` element as a direct child of the `<body>`.
       */
      open: TRIGGER_OPEN_ELEMENT_KEY,

      /**
       * Defines the trigger that returns the `lightbox` to its previous position.
       */
      close: TRIGGER_CLOSE_ELEMENT_KEY,

      /**
       * Defines a trigger that toggles the open/close actions.
       */
      toggle: TRIGGER_TOGGLE_ELEMENT_KEY,

      /**
       * Defines the element that has `position: fixed`.
       * If not defined, the `triggerOn` element is used {@link ATTRIBUTES.element.values.open}
       */
      lightbox: generateDynamicAttibuteValue(LIGHTBOX_ELEMENT_KEY),
    },
  },

  /**
   * Defines the timeout to wait before triggering the `close` state.
   */
  wait: { key: `${ATTRIBUTES_PREFIX}-${WAIT_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
