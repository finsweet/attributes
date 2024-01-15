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
   * Defines a delay to wait until the click event is replicated on the target.
   */
  delay: { key: 'delay' },

  /**
   * Defines the key to trigger the event.
   */
  keycode: { key: 'keycode' },

  /**
   * Defines what will be toggled. (valid CSS selector)
   */
  toggle: { key: 'toggle' },
} as const satisfies AttributeSettings;
