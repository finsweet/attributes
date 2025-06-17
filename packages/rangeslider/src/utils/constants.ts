import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  type AttributeElements,
  type AttributeSettings,
} from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines a range slider instance element.
   */
  'wrapper',

  /**
   * Defines the track of the slider.
   */
  'track',

  /**
   * Defines the fill of the slider.
   */
  'fill',

  /**
   * Defines a handle of the slider.
   */
  'handle',

  /**
   * Defines an element to display a Handle's value.
   */
  'display-value',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines the minimum value of the range.
   */
  min: { key: 'min' },

  /**
   * Defines the maximum value of the range.
   */
  max: { key: 'max' },

  /**
   * Defines the start value of a handle.
   * Must be applied to a handle element {@link ATTRIBUTES.element.values.handle}.
   */
  start: { key: 'start' },

  /**
   * Defines the step of the values.
   */
  step: { key: 'step' },

  /**
   * Defines when should the <input> elements be updated.
   */
  update: {
    key: 'update',
    values: ['move', 'release'],
    defaultValue: 'move',
  },

  /**
   * Defines if the input values should be updated lazily.
   */
  lazy: {
    key: 'lazy',
    values: ['true'],
  },

  /**
   * Defines if the Handles' value display should be formatted.
   */
  formatdisplay: {
    key: 'formatdisplay',
    values: ['true'],
  },

  /**
   * Defines the format options of the Handles' values.
   */
  formatcompactdisplay: { key: 'formatcompactdisplay' },
  formatcurrency: { key: 'formatcurrency' },
  formatcurrencydisplay: { key: 'formatcurrencydisplay' },
  formatcurrencysign: { key: 'formatcurrencysign' },
  formatmaximumsignificantdigits: { key: 'formatmaximumsignificantdigits', isNumeric: true },
  formatmaximumfractiondigits: { key: 'formatmaximumfractiondigits', isNumeric: true },
  formatminimumfractiondigits: { key: 'formatminimumfractiondigits', isNumeric: true },
  formatminimumintegerdigits: { key: 'formatminimumintegerdigits', isNumeric: true },
  formatminimumsignificantdigits: { key: 'formatminimumsignificantdigits', isNumeric: true },
  formatnotation: { key: 'formatnotation' },
  formatnumberingsystem: { key: 'formatnumberingsystem' },
  formatroundingpriority: { key: 'formatroundingpriority' },
  formatroundingincrement: { key: 'formatroundingincrement', isNumeric: true },
  formatroundingmode: { key: 'formatroundingmode' },
  formatsigndisplay: { key: 'formatsigndisplay' },
  formatstyle: { key: 'formatstyle' },
  formattrailingzerodisplay: { key: 'formattrailingzerodisplay' },
  formatunit: { key: 'formatunit' },
  formatunitdisplay: { key: 'formatunitdisplay' },
  formatusegrouping: { key: 'formatusegrouping' },
} as const satisfies AttributeSettings;

export const HANDLE_INCREMENT_KEYS = [ARROW_UP_KEY, ARROW_RIGHT_KEY];
export const HANDLE_DECREMENT_KEYS = [ARROW_DOWN_KEY, ARROW_LEFT_KEY];
export const HANDLE_KEYS = [...HANDLE_INCREMENT_KEYS, ...HANDLE_DECREMENT_KEYS];
