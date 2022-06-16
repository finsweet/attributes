import { ARROW_DOWN_KEY, ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY } from '@global/constants/keyboard';
import { generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'rangeslider';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}` as const;

export const WRAPPER_ELEMENT_KEY = 'wrapper';
export const TRACK_ELEMENT_KEY = 'track';
export const FILL_ELEMENT_KEY = 'fill';
export const HANDLE_ELEMENT_KEY = 'handle';
export const DISPLAY_VALUE_ELEMENT_KEY = 'display-value';

export const MIN_SETTING_KEY = 'min';
export const MAX_SETTING_KEY = 'max';
export const START_SETTING_KEY = 'start';
export const STEP_SETTING_KEY = 'step';
export const FORMAT_DISPLAY_SETTING_KEY = 'formatdisplay';
export const FORMAT_DISPLAY_SETTING_VALUES = { true: 'true' } as const;
export const UPDATE_ACTION_SETTING_KEY = 'update';
export const UPDATE_ACTION_SETTING_VALUES = {
  move: 'move',
  release: 'release',
} as const;

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a range slider instance element.
       */
      wrapper: WRAPPER_ELEMENT_KEY,

      /**
       * Defines the track of the slider.
       */
      track: TRACK_ELEMENT_KEY,

      /**
       * Defines the fill of the slider.
       */
      fill: FILL_ELEMENT_KEY,

      /**
       * Defines a handle of the slider.
       */
      handle: HANDLE_ELEMENT_KEY,

      /**
       * Defines an element to display a Handle's value.
       */
      displayValue: DISPLAY_VALUE_ELEMENT_KEY,
    },
  },

  /**
   * Defines the minimum value of the range.
   */
  min: { key: `${ATTRIBUTES_PREFIX}-${MIN_SETTING_KEY}` },

  /**
   * Defines the maximum value of the range.
   */
  max: { key: `${ATTRIBUTES_PREFIX}-${MAX_SETTING_KEY}` },

  /**
   * Defines the start value of a handle.
   * Must be applied to a handle element {@link ATTRIBUTES.element.values.handle}.
   */
  start: { key: `${ATTRIBUTES_PREFIX}-${START_SETTING_KEY}` },

  /**
   * Defines the step of the values.
   */
  step: { key: `${ATTRIBUTES_PREFIX}-${STEP_SETTING_KEY}` },

  /**
   * Defines if the Handles' value display should be formatted.
   */
  formatDisplay: { key: `${ATTRIBUTES_PREFIX}-${FORMAT_DISPLAY_SETTING_KEY}`, values: FORMAT_DISPLAY_SETTING_VALUES },

  /**
   * Defines when should the <input> elements be updated.
   * Defaults to {@link UPDATE_ACTION_SETTING_VALUES.move}
   */
  updateAction: { key: `${ATTRIBUTES_PREFIX}-${UPDATE_ACTION_SETTING_KEY}`, values: UPDATE_ACTION_SETTING_VALUES },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const HANDLE_INCREMENT_KEYS = [ARROW_UP_KEY, ARROW_RIGHT_KEY];
export const HANDLE_DECREMENT_KEYS = [ARROW_DOWN_KEY, ARROW_LEFT_KEY];
export const HANDLE_KEYS = [...HANDLE_INCREMENT_KEYS, ...HANDLE_DECREMENT_KEYS];
