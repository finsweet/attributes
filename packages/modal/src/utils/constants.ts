import { type AttributeElements, type AttributeSettings, MODAL_ATTRIBUTE } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines the modal element.
   */
  'modal',

  /**
   * Defines an open trigger.
   */
  'open',

  /**
   * Defines a close trigger.
   */
  'close',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines the modal animation.
   * Allowed values are defined in {@link "packages/animation"}.
   */
  animation: {
    key: 'animation',
    values: {
      fade: 'fade',
      'slide-up': 'slide-up',
      'slide-down': 'slide-down',
      'slide-left': 'slide-left',
      'slide-right': 'slide-right',
      grow: 'grow',
      shrink: 'shrink',
      spin: 'spin',
    },
  },

  /**
   * Defines the easing function of the animation.
   * Allowed values are defined in {@link "packages/animation"}.
   */
  easing: {
    key: 'easing',
    values: {
      linear: 'linear',
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    },
  },

  /**
   * Defines the duration of the animation.
   */
  duration: { key: 'duration' },

  /**
   * Defines the display property after animating.
   */
  display: {
    key: 'display',
    values: {
      block: 'block',
      inline: 'inline',
      flex: 'flex',
      grid: 'grid',
      none: 'none',
      contents: 'contents',
      'inline-block': 'inline-block',
      'inline-flex': 'inline-flex',
      'inline-grid': 'inline-grid',
    },
  },
} as const satisfies AttributeSettings;

export const ANCHOR_TEXT = `fs-${MODAL_ATTRIBUTE}-anchor`;

export const DEFAULT_DISPLAY_PROPERTY = 'flex';
