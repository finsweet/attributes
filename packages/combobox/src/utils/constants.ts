import {
  ARROW_DOWN_KEY,
  ARROW_UP_KEY,
  type AttributeElements,
  type AttributeSettings,
  SPACE_KEY,
  TAB_KEY,
} from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines a dropdown element.
   */
  'dropdown',

  /**
   * Defines the label that displays the currently selected option.
   */
  'label',

  /**
   * Defines an option that will clear dropdown selection and input field.
   */
  'clear',

  /**
   * Defines a state where no results were found from `input` field search.
   */
  'empty',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * If no results were found from `input` field search, it prevents input field from being cleared.
   */
  preventClear: { key: 'preventclear', values: { true: 'true' } },

  /**
   * Defines if the reset option should be hidden whenever there isn't an active selection.
   */
  hideinitial: { key: 'hideinitial', values: { true: 'true' } },
} as const satisfies AttributeSettings;

export const DROPDOWN_IS_OPEN = 'w--open';

export const FS_DROPDOWN_TOGGLE_KEY = 'fs-dropdown-toggle-key';

export const CONTROL_KEYS = [SPACE_KEY, TAB_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY];
