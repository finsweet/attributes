import { ARIA_EXPANDED_KEY } from '$global/constants/a11y';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  BACKSPACE_KEY,
  CLICK,
  ENTER_KEY,
  ESCAPE_KEY,
  SPACE_KEY,
  TAB_KEY,
} from '$global/constants/keyboard';

import { focusOnInput, setActiveDescendant, toggleDropdown, toggleDropdownCloseIcon } from '../../utils';
import { FS_DROPDOWN_TOGGLE_KEY } from '../../utils/constants';
import type { Settings } from '../../utils/types';
import { populateOptions } from '../populate';

/**
 * Handles `keyup` events on the `inputElement` and updates the dropdown.
 * @param e The `keyup` event.
 * @param settings The instance {@link Settings}.
 */
export const handleInputKeyUpEvents = (e: KeyboardEvent, settings: Settings) => {
  e.stopPropagation();
  e.stopImmediatePropagation();

  const { dropdownToggle, inputElement } = settings;

  const { key } = e;
  const referenceInput = e.target as HTMLInputElement;

  const inputValue = referenceInput.value.toLowerCase().trim() ?? '';
  populateOptions(settings, inputValue, !inputValue, true);

  const dropdownIsOpen = dropdownToggle.getAttribute(ARIA_EXPANDED_KEY) === 'true';

  if (key === ARROW_DOWN_KEY) {
    if (!dropdownIsOpen) toggleDropdown(settings);

    if (inputValue.length > 0) {
      populateOptions(settings, inputValue, false, true);
    } else {
      populateOptions(settings, '', true, true);
    }

    inputElement.setAttribute(FS_DROPDOWN_TOGGLE_KEY, ARROW_DOWN_KEY);

    focusOnDropdownItem(settings);
    return;
  }
};
/**
 * Handles `keydown` events on the `inputElement` and updates the dropdown.
 * @param e The `keydown` event.
 * @param settings The instance {@link Settings}.
 */
export const handleInputKeyDownEvents = (e: KeyboardEvent, settings: Settings) => {
  e.stopPropagation();

  const { key } = e;

  const { dropdownToggle, inputElement } = settings;

  inputElement.setAttribute(FS_DROPDOWN_TOGGLE_KEY, CLICK);

  const referenceInput = e.target as HTMLInputElement;

  const inputValue = referenceInput.value.toLowerCase().trim() ?? '';

  const dropdownIsOpen = dropdownToggle.getAttribute(ARIA_EXPANDED_KEY) === 'true';

  if (key === ESCAPE_KEY) {
    handleClearInput(e, settings);

    if (dropdownIsOpen) {
      toggleDropdown(settings);
    }
    return;
  }

  if (
    key === ENTER_KEY ||
    key === ARROW_DOWN_KEY ||
    key === TAB_KEY ||
    key === SPACE_KEY ||
    key === ARROW_RIGHT_KEY ||
    key === ARROW_LEFT_KEY
  )
    return;

  if (key === ARROW_UP_KEY && dropdownIsOpen) {
    toggleDropdown(settings);
    return;
  }

  if (key === BACKSPACE_KEY && inputValue.length === 0) {
    populateOptions(settings, '', true, true);
    return;
  }

  if (key === BACKSPACE_KEY && inputValue.length > 0) {
    populateOptions(settings, inputValue, !inputValue, true);
    if (!dropdownIsOpen) toggleDropdown(settings);
    return;
  }

  if (!dropdownIsOpen && inputValue && key !== ARROW_UP_KEY) {
    toggleDropdown(settings);
  }

  toggleDropdownCloseIcon(settings);
  populateOptions(settings, inputValue, !inputValue, true);
};

/**
 * Shows the dropdown if hidden.
 * @param settings The instance {@link Settings}.
 */
export const handleInputClickEvents = (e: MouseEvent, settings: Settings) => {
  e.stopPropagation();
  e.preventDefault();

  const { dropdownToggle, inputElement } = settings;

  inputElement.setAttribute(FS_DROPDOWN_TOGGLE_KEY, CLICK);

  const toggled = dropdownToggle.getAttribute(ARIA_EXPANDED_KEY) === 'true';
  inputElement.setAttribute(ARIA_EXPANDED_KEY, `${!toggled}`);

  if (toggled) {
    return;
  }

  populateOptions(settings, '', true, true);
  toggleDropdown(settings);
};

/**
 * Listens to the `input` escape key or focusout events.
 * @param e The Event object.
 * @param settings The instance {@link Settings}.
 * @param fromInput Whether the event was triggered from the input element.
 */
export const handleClearInput = (e: KeyboardEvent | FocusEvent, settings: Settings, fromInput = false) => {
  const { inputElement, selectElement } = settings;

  if (!fromInput) {
    focusOnInput(settings);
  }

  toggleDropdownCloseIcon(settings);

  const selected = settings.optionsStore.find(({ selected }) => selected);

  if (selected) return;

  if (fromInput) {
    const relatedTarget = (e as FocusEvent).relatedTarget as HTMLElement;
    if (relatedTarget) return;

    inputElement.value = '';
    selectElement.value = '';
    return;
  }

  if (!selected) {
    inputElement.value = '';
    selectElement.value = '';
  }

  const dropdownIsOpen = settings.dropdownToggle.getAttribute(ARIA_EXPANDED_KEY) === 'true';

  if (dropdownIsOpen) {
    toggleDropdown(settings);
  }
};

/**
 * Listens to `updateComboboxInputField` custom event and updates input value and select value
 * @param settings The instance {@link Settings}.
 */
export const updateInputField = (e: Event, settings: Settings) => {
  const { optionsStore, inputElement } = settings;
  const input = e.target as HTMLInputElement;

  const selectedOption = optionsStore.find(({ selected }) => selected);
  const selectedText = selectedOption?.text ?? '';
  const selectedValue = selectedOption?.value ?? '';
  const inputValue = input.value;

  if (selectedOption && selectedValue !== inputValue) {
    inputElement.value = selectedText;

    toggleDropdownCloseIcon(settings);
    return;
  }
};

/**
 * Focuses on the dropdown list item based on the current selection.
 * @param settings The instance {@link Settings}.
 * @returns void
 */
const focusOnDropdownItem = (settings: Settings) => {
  const { optionsStore, inputElement } = settings;
  const selectedOption = optionsStore.find(({ selected }) => selected);

  if (!selectedOption && optionsStore.length > 0) {
    const [firstOption] = optionsStore.filter(({ hidden }) => !hidden);

    firstOption.element.focus();
    setActiveDescendant(inputElement, firstOption.element);

    return;
  }

  if (selectedOption) {
    selectedOption.element.focus();
    setActiveDescendant(inputElement, selectedOption.element);

    return;
  }
  return;
};
