import { isHTMLOptionElement } from '@finsweet/ts-utils';
import debounce from 'just-debounce';

import { ARIA_ACTIVEDESCENDANT_KEY, ARIA_EXPANDED_KEY, ID_KEY } from '$global/constants/a11y';
import { ARROW_DOWN_KEY, CLICK } from '$global/constants/keyboard';

import { focusOnInput, updateComboboxInputField } from '../utils';
import { DROPDOWN_IS_OPEN, FS_DROPDOWN_TOGGLE_KEY } from '../utils/constants';
import type { Settings } from '../utils/types';
import { populateOptions } from './populate';

/**
 * Observes when the dropdown list is opened/closed.
 * @param settings The instance {@link Settings}.
 *
 * @returns The MutationObserver.
 */
const observeDropdownList = (settings: Settings) => {
  const { dropdownList, navListElement, optionsStore, selectElement, inputElement } = settings;
  let prevDropdownState = navListElement.classList.contains(DROPDOWN_IS_OPEN);
  let currentStateIsOpen = false;

  const callback: MutationCallback = debounce((mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const selectValue = selectElement.value;
        const inputValue = inputElement.value;
        const dropdownToggleKey = inputElement.getAttribute(FS_DROPDOWN_TOGGLE_KEY);
        const firstOption = Array.from(optionsStore).find((el) => !el.hidden);

        const selectedOption = Array.from(optionsStore).find(
          (el) => el?.value.toLowerCase().trim() === selectValue?.toLowerCase().trim()
        );

        currentStateIsOpen = (mutation.target as HTMLDivElement).classList.contains(DROPDOWN_IS_OPEN);
        if (prevDropdownState !== currentStateIsOpen) {
          prevDropdownState = currentStateIsOpen;
        }

        if (!selectedOption && currentStateIsOpen) {
          navListElement.scrollTop = 0;
        }

        if (currentStateIsOpen) {
          const toFocus = selectedOption || firstOption;

          if (toFocus) toFocus.element.focus();
        }

        inputElement.setAttribute(ARIA_EXPANDED_KEY, `${currentStateIsOpen}`);

        if (selectedOption) {
          const id = selectedOption.element.getAttribute(ID_KEY);
          inputElement.setAttribute(ARIA_ACTIVEDESCENDANT_KEY, `${id}`);

          if (currentStateIsOpen && dropdownToggleKey === ARROW_DOWN_KEY) {
            selectedOption.element.focus();
            return;
          }
          if (currentStateIsOpen && dropdownToggleKey === CLICK) {
            selectedOption.element.focus();
            focusOnInput(settings);
            return;
          }

          if (!currentStateIsOpen) {
            updateComboboxInputField(settings);
            focusOnInput(settings);
          }

          return;
        }

        if (!selectedOption && inputValue && currentStateIsOpen && firstOption) {
          if (dropdownToggleKey === ARROW_DOWN_KEY) firstOption.element.focus();
          if (dropdownToggleKey === CLICK) focusOnInput(settings);

          return;
        }

        if (currentStateIsOpen && !selectedOption) {
          inputElement.setAttribute(ARIA_ACTIVEDESCENDANT_KEY, '');

          if (dropdownToggleKey === ARROW_DOWN_KEY && firstOption) {
            firstOption.element.focus();
            return;
          }

          focusOnInput(settings);
        }
        if (!currentStateIsOpen) {
          updateComboboxInputField(settings);
          focusOnInput(settings);

          if (!selectedOption) inputElement.setAttribute(ARIA_ACTIVEDESCENDANT_KEY, '');
        }
      }
    });

    const selectedOption = optionsStore.find(({ selected }) => selected);
    const firstNonHiddenOption = optionsStore.find(({ hidden }) => !hidden);

    if (!selectedOption || !firstNonHiddenOption) return;
  }, 20);

  const observer = new MutationObserver(callback);

  observer.observe(dropdownList, {
    attributes: true,
    attributeFilter: ['class', 'style'],
  });

  return observer;
};

/**
 * Observes changes in the {@link HTMLSelectElement} options.
 * @param settings The instance {@link Settings}.
 *
 * @returns The MutationObserver.
 */
const observeSelectElement = (settings: Settings) => {
  const { selectElement } = settings;

  const observer = new MutationObserver((mutations) => {
    const hasMutatedOptions = mutations.some(({ addedNodes, removedNodes }) =>
      [...addedNodes, ...removedNodes].some(isHTMLOptionElement)
    );

    if (hasMutatedOptions) populateOptions(settings);
  });

  observer.observe(selectElement, {
    childList: true,
  });

  return observer;
};

/**
 * Observes mutations on elements of the instance.
 * @param settings The instance {@link Settings}.
 *
 * @returns A callback to destroy the MutationObservers.
 */
export const observeElements = (settings: Settings) => {
  const dropdownListObserver = observeDropdownList(settings);
  const selectElementObserver = observeSelectElement(settings);

  return () => {
    dropdownListObserver.disconnect();
    selectElementObserver.disconnect();
  };
};
