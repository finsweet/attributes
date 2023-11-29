import { isFormField } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { getAttribute, getSettingSelector, queryAllElements } from '../utils/selectors';
import { clearFilterData } from './clear';
import { getFilterData, getFiltersData } from './data';
import { filterItems } from './filter';
import { type ResetData } from './types';

/**
 * Inits loading functionality for the list.
 * @param list
 * @param form
 */
export const initListFiltering = async (list: List, form: HTMLFormElement) => {
  // Init hook
  list.addHook('filter', (items) => {
    const filters = list.filters.get();

    return filterItems(filters, items);
  });

  const selector = getSettingSelector('field');
  const formFields = Array.from(form.querySelectorAll<HTMLInputElement>(selector)).filter((item) => isFormField(item));
  const resetButtonElements = [...queryAllElements('clear', { scope: form })];

  const resetButtonsData: Map<HTMLElement, ResetData> = new Map();

  for (const resetButton of resetButtonElements) {
    const rawFilterKey = getAttribute(resetButton, 'field');
    const inputFields = formFields.filter((item) => getAttribute(item, 'field') === rawFilterKey);
    resetButtonsData.set(resetButton, { rawFilterKey, inputFields });
  }

  // Get filters data
  const filtersData = getFiltersData(form);

  list.filters.set(filtersData);

  // Listen for changes
  form.addEventListener('input', (e) => {
    const { target } = e;
    if (!isFormField(target)) return;

    const rawFieldKey = getAttribute(target, 'field');
    if (!rawFieldKey) return;

    const filterData = getFilterData(target);

    list.filters.setKey(rawFieldKey, filterData);
  });

  // Trigger the hook when the filters change
  list.filters.subscribe(() => {
    list.triggerHook('filter');
  });

  // Reset buttons
  resetButtonsData.forEach((resetData, resetButton) => {
    resetButton.addEventListener('click', () => {
      clearFilterData(formFields, resetData);
    });
  });
};
