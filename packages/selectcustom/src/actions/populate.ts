import { cloneNode, findTextNode } from '@finsweet/ts-utils';

import type { OptionData, Settings } from '../utils/types';
import { setOptionAria } from './a11y';
import { toggleResetVisibility, updateOptionsState } from './state';

/**
 * Populates the custom options based on the `HTMLSelectElement`'s options.
 * @param settings The instance {@link Settings}.
 */
export const populateOptions = (settings: Settings) => {
  const {
    optionsStore,
    optionTemplate,
    optionsList,
    emptyOption,
    hideInitial,
    selectElement: { options, value: currentValue },
  } = settings;

  // Clear existing options
  for (const { element } of optionsStore.values()) {
    element.remove();
  }

  optionsStore.splice(0, optionsStore.length);

  let selectedOption: OptionData | undefined;

  // Create new options
  for (const { value, text } of options) {
    let element: HTMLAnchorElement | undefined;

    if (!value && emptyOption) {
      element = cloneNode(emptyOption);
    } else {
      element = cloneNode(optionTemplate);

      const textNode = findTextNode(element) || element;
      textNode.textContent = text;
    }

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

  updateOptionsState(settings, selectedOption);

  if (hideInitial) {
    toggleResetVisibility(!!selectedOption?.value, settings);
  }
};
