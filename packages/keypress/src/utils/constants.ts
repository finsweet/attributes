import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines the element targetted by keypress fired event.
   */
  'target',
  /**
   * Defines the checkbox element to be checked when the keypress event is fired.
   */
  'checkbox',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Animation setting
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
   * Defines a delay to wait until the click event is replicated on the target.
   */
  delay: { key: 'delay' },

  /**
   * Defines the key to trigger the event.
   */
  keycode: { key: 'keycode' },

  /**
   * Defines the event to trigger. (click or hover)
   */
  event: {
    key: 'event',

    values: {
      click: 'click',
      hover: 'hover',
    },
  },

  /**
   * Defines what will be toggled. (valid CSS selector)
   */
  toggle: { key: 'toggle' },
} as const satisfies AttributeSettings;
