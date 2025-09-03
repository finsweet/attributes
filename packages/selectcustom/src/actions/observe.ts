import { ARIA_EXPANDED_KEY, isHTMLOptionElement } from '@finsweet/attributes-utils';
import debounce from 'just-debounce';

import type { Settings } from '../utils/types';
import { populateOptions } from './populate';
import { toggleResetVisibility } from './state';

/**
 * Observes when the dropdown list is opened/closed.
 * @param settings The instance {@link Settings}.
 *
 * @returns The MutationObserver.
 */
const observeDropdownList = (settings: Settings) => {
  const { dropdownToggle, dropdownList, optionsStore, hideInitial } = settings;

  const callback: MutationCallback = debounce(() => {
    const selectedOption = optionsStore.find(({ selected }) => selected);
    const firstNonHiddenOption = optionsStore.find(({ hidden }) => !hidden);

    if (!selectedOption || !firstNonHiddenOption) return;

    const isOpen = dropdownToggle.getAttribute(ARIA_EXPANDED_KEY) === 'true';

    if (isOpen) {
      if (selectedOption.hidden) firstNonHiddenOption.element.focus();
      else selectedOption.element.focus();

      return;
    }

    if (hideInitial) window.requestAnimationFrame(() => toggleResetVisibility(!!selectedOption.value, settings));
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

  const callback = debounce<MutationCallback>((mutations) => {
    const hasMutatedOptions = mutations.some(({ addedNodes, removedNodes, target }) =>
      [...addedNodes, ...removedNodes, target].some(isHTMLOptionElement)
    );

    if (hasMutatedOptions) populateOptions(settings);
  }, 100);

  const observer = new MutationObserver(callback);

  observer.observe(selectElement, {
    childList: true,
    subtree: true,
    attributeFilter: ['hidden', 'disabled', 'label'],
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
