import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines an element with a number to be animated.
   */
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
  'complete-show',
  'complete-hide',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Date to count to
   * Placed on parent of the display elements.
   */
  date: { key: 'date' },

  /**
   * Establish countdown date timezone
   * Placed on parent of the display elements.
   */
  timezone: { key: 'timezone' },
} as const satisfies AttributeSettings;
