import { setFormFieldValue } from '@finsweet/ts-utils';

import { toggleDropdownCloseIcon } from '../../utils';
import type { Settings } from '../../utils/types';
import { updateOptionsState } from '../state';

/**
 * Adds two way data binding.
 * Handles `change` events on the hidden `selectElement` and updates the dropdown.
 * @param settings The instance {@link Settings}.
 */
export const handleSelectChangeEvents = (settings: Settings) => {
  const { selectElement, optionsStore } = settings;

  const selectedOption = optionsStore.find(({ value }) => value === selectElement.value);
  if (!selectedOption) return;

  setFormFieldValue(settings.inputElement, selectedOption.text);
  settings.inputElement.dispatchEvent(new Event('change'));

  toggleDropdownCloseIcon(settings);
  updateOptionsState(settings, selectedOption);
};
