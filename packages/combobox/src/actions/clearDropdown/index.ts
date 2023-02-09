import { ENTER_KEY, SPACE_KEY } from '$global/constants/keyboard';

import { focusOnInput, toggleDropdownCloseIcon } from '../../utils';
import type { Settings } from '../../utils/types';
import { populateOptions } from '../populate';

/**
 * Resets `combobox` selections and clears input field value
 * @param settings The instance {@link Settings}.
 */
export const handleClearDropdownClickEvents = (e: MouseEvent | KeyboardEvent, settings: Settings) => {
  const { selectElement, inputElement } = settings;
  e.stopPropagation();
  e.preventDefault();

  inputElement.value = '';
  selectElement.value = '';

  populateOptions(settings, '', true, true);

  focusOnInput(settings);

  toggleDropdownCloseIcon(settings);
};

/**
 * Handles key events on the dropdown toggle. This resets the dropdown state.
 */
export const handleClearDropdown = (e: KeyboardEvent | MouseEvent, settings: Settings) => {
  const { key } = e as KeyboardEvent;
  e.stopPropagation();

  if (key === ENTER_KEY || key === SPACE_KEY) {
    e.preventDefault();
    handleClearDropdownClickEvents(e, settings);
  }
};
