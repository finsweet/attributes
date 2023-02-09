import { addListener } from '@finsweet/ts-utils';

import { ARIA_EXPANDED_KEY } from '$global/constants/a11y';

import { cleanupBubble, toggleDropdown } from '../utils';
import type { Settings } from '../utils/types';
import { handleBodyMouseMovements } from './body';
import { handleClearDropdown, handleClearDropdownClickEvents } from './clearDropdown';
import {
  handleDropdownListFocusEvents,
  handleDropdownListKeydownEvents,
  handleDropdownListMouseEvents,
} from './dropdownList';
import { handleDropdownToggleArrowKeyEvents } from './dropdownToggle';
import {
  handleClearInput,
  handleInputClickEvents,
  handleInputKeyDownEvents,
  handleInputKeyUpEvents,
  updateInputField,
} from './input';
import { handleSelectChangeEvents } from './selectElement';

/**
 * Listens for multiple events on the custom elements.
 * @param settings The instance {@link Settings}.
 * @returns A callback to remove all event listeners.
 */
export const listenEvents = (settings: Settings) => {
  const { dropdownToggle, dropdownList, selectElement, inputElement, clearDropdown, body } = settings;

  dropdownToggle.onmouseup = (e) => {
    // I believe webflow natively adds this event listener to the dropdown, we need to clear it out
    // so we can handle the click event ourselves.
    cleanupBubble(e);
    return;
  };

  const cleanups = [
    addListener(body, 'mousemove', (e) => handleBodyMouseMovements(e, settings)),
    addListener(dropdownToggle, 'keydown', (e) => handleDropdownToggleArrowKeyEvents(e, settings)),

    addListener(dropdownList, 'click', (e) => handleDropdownListMouseEvents(e, settings)),
    addListener(dropdownList, 'keydown', (e) => handleDropdownListKeydownEvents(e, settings)),
    addListener(dropdownList, 'focusin', (e) => handleDropdownListFocusEvents(e, true, settings)),
    addListener(dropdownList, 'focusout', (e) => handleDropdownListFocusEvents(e, false, settings)),
    addListener(dropdownList, 'mousemove', (e) => handleDropdownListMouseEvents(e, settings)),

    addListener(dropdownList, 'mouseenter', cleanupBubble),
    addListener(dropdownList, 'mouseup', cleanupBubble),

    addListener(selectElement, 'change', () => handleSelectChangeEvents(settings)),

    addListener(inputElement, 'keyup', (e) => handleInputKeyUpEvents(e, settings)),
    addListener(inputElement, 'input', (e) => {
      const dropdownIsOpen = dropdownToggle.getAttribute(ARIA_EXPANDED_KEY) === 'true';

      if (!dropdownIsOpen) {
        toggleDropdown(settings);
      }
    }),
    addListener(inputElement, 'keydown', (e) => handleInputKeyDownEvents(e, settings)),
    addListener(inputElement, 'click', (e) => handleInputClickEvents(e, settings)),
    addListener(inputElement, 'mouseup', (e) => handleInputClickEvents(e, settings)),
    addListener(inputElement, 'blur', (e) => handleClearInput(e, settings, true)),
    addListener(inputElement, 'updateComboboxInputField', (e) => updateInputField(e, settings)),

    addListener(clearDropdown, 'click', (e) => handleClearDropdownClickEvents(e, settings)),
    addListener(clearDropdown, 'mouseup', (e) => handleClearDropdown(e, settings)),
    addListener(clearDropdown, 'keydown', (e) => handleClearDropdown(e, settings)),
  ];

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
};
