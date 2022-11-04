import { MODAL_ATTRIBUTE } from '$global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${MODAL_ATTRIBUTE}`;

export const MODAL_ELEMENT_KEY = 'modal';
export const OPEN_ELEMENT_KEY = 'open';
export const CLOSE_ELEMENT_KEY = 'close';

export const ANIMATION_SETTING_KEY = 'animation';
export const EASING_SETTING_KEY = 'easing';
export const DURATION_SETTING_KEY = 'duration';
export const DISPLAY_SETTING_KEY = 'display';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines the modal element.
       */
      modal: generateDynamicAttibuteValue(MODAL_ELEMENT_KEY),

      /**
       * Defines an open trigger.
       */
      open: generateDynamicAttibuteValue(OPEN_ELEMENT_KEY),

      /**
       * Defines a close trigger.
       */
      close: generateDynamicAttibuteValue(CLOSE_ELEMENT_KEY),
    },
  },

  /**
   * Defines the modal animation.
   * Allowed values are defined in {@link "packages/animation"}.
   */
  animation: { key: `${ATTRIBUTES_PREFIX}-${ANIMATION_SETTING_KEY}` },

  /**
   * Defines the easing function of the animation.
   * Allowed values are defined in {@link "packages/animation"}.
   */
  easing: { key: `${ATTRIBUTES_PREFIX}-${EASING_SETTING_KEY}` },

  /**
   * Defines the duration of the animation.
   */
  duration: { key: `${ATTRIBUTES_PREFIX}-${DURATION_SETTING_KEY}` },

  /**
   * Defines the display property after animating.
   */
  display: { key: `${ATTRIBUTES_PREFIX}-${DISPLAY_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement, getAttribute] = generateSelectors(ATTRIBUTES);

export const ANCHOR_TEXT = `${ATTRIBUTES_PREFIX}-anchor`;

export const DISPLAY_PROPERTIES = [
  'block',
  'inline',
  'inline-block',
  'flex',
  'inline-flex',
  'grid',
  'inline-grid',
  'none',
  'contents',
] as const;

export const DEFAULT_DISPLAY_PROPERTY = 'flex';
