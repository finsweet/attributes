import { CURRENT_CSS_CLASS, setFormFieldValue } from '@finsweet/ts-utils';

import { ARIA_SELECTED_KEY, TABINDEX_KEY } from '$global/constants/a11y';

import type { OptionData, Settings } from '../utils/types';

/**
 * Sets the selected state to an option and removes it from a previous one, if existing.
 * @param settings The instance {@link Settings}.
 * @param selectedOption The selected {@link OptionData}, if existing.
 */
export const updateOptionsState = (settings: Settings, selectedOption?: OptionData) => {
  const { selectElement, optionsStore, label } = settings;

  if (selectedOption) setFormFieldValue(selectElement, selectedOption.value);

  for (const optionData of optionsStore) {
    const { element } = optionData;

    const selected = element === selectedOption?.element;

    optionData.selected = selected;

    element.classList[selected ? 'add' : 'remove'](CURRENT_CSS_CLASS);
    element.setAttribute(ARIA_SELECTED_KEY, `${selected}`);
    element.setAttribute(TABINDEX_KEY, selected ? '0' : '-1');
  }

  if (selectedOption) label.textContent = selectedOption.text;
};

/**
 * Toggles the visibility of the reset option.
 * @param show `true` to show, `false` to hide.
 * @param settings The instance {@link Settings}.
 */
export const toggleResetVisibility = (show: boolean, { optionsStore }: Settings) => {
  const resetOption = optionsStore.find(({ value }) => !value);
  if (!resetOption) return;

  resetOption.hidden = !show;
  resetOption.element.style.display = show ? '' : 'none';
};
