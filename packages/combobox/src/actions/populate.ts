import { cloneNode, findTextNode } from '@finsweet/ts-utils';

import { ARIA_POSINSET_KEY, ARIA_SETSIZE_KEY, ID_KEY } from '$global/constants/a11y';

import type { OptionData, Settings } from '../utils/types';
import { setOptionAria } from './a11y';
import { updateOptionsState } from './state';

/**
 * Populates the custom options based on the `HTMLSelectElement`'s options.
 * @param settings The instance {@link Settings}.
 * @param {string} inputValue Value from input field.
 * @param {boolean} showAll if dropdown should show all or filtered options.
 * @param {boolean} isTyping user is searching.
 * @param {boolean} initialLoad if dropdown is loaded for the first time.
 */
export const populateOptions = (
  settings: Settings,
  inputValue = '',
  showAll = false,
  isTyping = false,
  initialLoad = false
) => {
  const {
    optionsStore,
    optionTemplate,
    optionsList,
    label,
    noResultsTemplate,
    selectElement: { options, value: currentValue },
  } = settings;

  // Clear existing options
  noResultsTemplate?.remove();
  for (const { element } of optionsStore.values()) {
    element.remove();
  }

  optionsStore.splice(0, optionsStore.length);

  let selectedOption: OptionData | undefined;

  const optionsConfigured = Array.from(options).filter((item) => item.value && item.textContent);
  const optionsFiltered = optionsConfigured.filter((item) =>
    item.text.trim().toLowerCase().includes(inputValue.trim().toLowerCase())
  );

  if (optionsFiltered.length === 0 && noResultsTemplate) {
    optionsList.appendChild(noResultsTemplate);

    return;
  }

  const optionsArr = (showAll ? optionsConfigured : optionsFiltered).sort((a, b) => a.value.localeCompare(b.value));

  // Create new options
  for (const { value, text } of optionsArr) {
    const element = cloneNode(optionTemplate) as HTMLAnchorElement;

    const textNode = findTextNode(element) || element;
    textNode.textContent = text;

    const elementId = element.getAttribute(ID_KEY) || '';
    const id = `fs-option-${value.toLowerCase().trim().replace(/\s/g, '-')}`;

    element.setAttribute(ID_KEY, elementId || id);
    element.setAttribute(ARIA_SETSIZE_KEY, `${optionsArr.length}`);

    const index = optionsArr.findIndex((item) => item.value === value);
    element.setAttribute(ARIA_POSINSET_KEY, `${index + 1}`);

    setOptionAria(element);

    optionsList.appendChild(element);

    const selected = value === currentValue;

    const optionData: OptionData = {
      text,
      value,
      element,
      selected,
      focused: false,
    };

    if (selected) selectedOption = optionData;

    optionsStore.push(optionData);
  }
  if (isTyping) {
    updateOptionsState(settings, selectedOption);
  }

  if (!inputValue && selectedOption && label) {
    const labelText = label.textContent || '';

    updateOptionsState(settings, { ...selectedOption, value: '', text: labelText }, initialLoad);
  }
};
