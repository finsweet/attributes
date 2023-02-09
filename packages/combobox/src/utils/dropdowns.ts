import { isElement, simulateEvent } from '@finsweet/ts-utils';

import { ARIA_ACTIVEDESCENDANT_KEY, ID_KEY, TABINDEX_KEY } from '$global/constants/a11y';

import type { Settings } from './types';

/**
 * `toggleDropdown()` closes or opens a dropdown element.
 * @param settings A {@link Settings} element.
 * @param focusInputElement Defaults to `true`.
 */
export const toggleDropdown = (settings: Settings) => {
  const { dropdownToggle } = settings;

  simulateEvent(dropdownToggle, ['click', 'mouseup']);
};

/**
 * `toggleDropdownCloseIcon()` handles show/hide state of the dropdown close icon.
 * @param settings A {@link Settings} element.
 */
export const toggleDropdownCloseIcon = (settings: Settings) => {
  const { clearDropdown, inputElement, optionsStore, selectElement } = settings;

  const selectedOption = optionsStore.find(({ value }) => value === selectElement.value);

  if (selectedOption) {
    const selectedText = selectedOption.text.toLowerCase();
    const inputElValue = inputElement.value?.toLowerCase();

    if (!inputElValue) {
      clearDropdown.style.display = 'none';
      return;
    }

    if (inputElValue && inputElValue !== selectedText) {
      clearDropdown.style.display = 'none';
      return;
    }

    clearDropdown.style.display = 'block';

    return;
  }

  clearDropdown.style.display = 'none';
};

/**
 * `focusOnInput()` focuses the input element.
 * @param settings A {@link Settings} element.
 */

export const focusOnInput = (settings: Settings) => {
  const { inputElement } = settings;

  const end = inputElement.value.length;

  inputElement.setSelectionRange(end, end);
  inputElement.focus();
  inputElement.setAttribute(TABINDEX_KEY, '0');
};

/**
 * dispatches custom event `updateComboboxInputField`
 */
export const updateComboboxInputField = (settings: Settings) => {
  const event = new Event('updateComboboxInputField');

  settings.inputElement.dispatchEvent(event);
};

/**
 * This function sets the `aria-activedescendant` attribute on the input element.
 * @param inputElement input element
 * @param focusedElement element that is currently focused
 */
export const setActiveDescendant = (
  inputElement: HTMLInputElement,
  focusedElement: HTMLAnchorElement | HTMLOptionElement
) => {
  const optionId = focusedElement.getAttribute(ID_KEY);

  inputElement.setAttribute(ARIA_ACTIVEDESCENDANT_KEY, `${optionId || ''}`);
};

/**
 * Returns the {@link OptionData} of an event target.
 *
 * @param e The Event object.
 * @param settings The instance {@link Settings}.
 *
 * @returns The {@link OptionData} object, if found.
 */
export const getClickedOptionData = (e: Event, { optionsStore }: Settings) => {
  const { target } = e;

  if (!isElement(target)) return;

  const optionElement = target.closest('a');
  if (!optionElement) return;

  const optionData = optionsStore.find(({ element }) => element === optionElement);
  if (!optionData) return;

  return optionData;
};

/**
 * Function that accepts an event object and stops propagation and default behavior.
 */
export const cleanupBubble = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};
