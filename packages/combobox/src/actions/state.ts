import { CURRENT_CSS_CLASS, setFormFieldValue } from '@finsweet/ts-utils';

import { ARIA_SELECTED_KEY, TABINDEX_KEY } from '$global/constants/a11y';

import { toggleDropdown } from '../utils';
import type { OptionData, Settings } from '../utils/types';

/**
 * Sets the selected state to an option and removes it from a previous one, if existing.
 * This also determines whether the close icon should show or hide
 * @param settings The instance {@link Settings}.
 * @param selectedOption The selected {@link OptionData}, if existing.
 * @param {boolean} close if dropdown should be closed or opened
 */
export const updateOptionsState = (settings: Settings, selectedOption?: OptionData, close = false) => {
  const { selectElement, optionsStore } = settings;

  if (selectedOption && selectedOption.value) {
    setFormFieldValue(selectElement, selectedOption.value);
  }

  for (const optionData of optionsStore) {
    const { element } = optionData;

    const selected = element === selectedOption?.element;

    optionData.selected = selected;
    optionData.focused = selected;

    element.classList[selected ? 'add' : 'remove'](CURRENT_CSS_CLASS);
    element.setAttribute(ARIA_SELECTED_KEY, `${selected}`);
    element.setAttribute(TABINDEX_KEY, '-1');
  }

  if (close) toggleDropdown(settings);
};
