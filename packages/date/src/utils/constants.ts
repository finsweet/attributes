import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines a date element.
   */
  'date',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * The locale used to format.
   */
  locale: {
    key: 'locale',
  },

  /**
   * The representation of the year.
   */
  year: {
    key: 'year',
    values: { numeric: 'numeric', '2-digit': '2-digit' },
  },

  /**
   * The representation of the weekday.
   */
  weekday: {
    key: 'weekday',
    values: { long: 'long', short: 'short', narrow: 'narrow' },
  },

  /**
   * The representation of the month.
   */
  month: {
    key: 'month',
    values: { numeric: 'numeric', '2-digit': '2-digit', long: 'long', short: 'short', narrow: 'narrow' },
  },

  /**
   * The representation of the day.
   */
  day: {
    key: 'day',
    values: { numeric: 'numeric', '2-digit': '2-digit' },
  },
} as const satisfies AttributeSettings;
