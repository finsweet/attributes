import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * This defines the element to be copied on page load
   */
  'copy',
  /**
   * This element will be moved on page load
   */
  'cut',
  /**
   * This is the target element where the copied elements will be pasted
   */
  'paste',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines the instance setting
   */
  instance: {
    key: 'instance',
  },
  /**
   * Defines if Webflow should be restarted after.
   */
  resetix: { key: 'resetix', values: { true: 'true' } },
} as const satisfies AttributeSettings;
