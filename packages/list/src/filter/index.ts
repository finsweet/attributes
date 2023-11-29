import { clearFormField, isFormField } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { getAttribute, getElementSelector, getSettingSelector, queryAllElements } from '../utils/selectors';
import { getFilterData, getFiltersData } from './data';
import { filterItems } from './filter';

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

  // Global click event listener on the form
  form.addEventListener('click', (e) => {
    const { target } = e;
    const clearElement = (target as Element)?.closest(getElementSelector('clear'));
    if (clearElement) {
      const rawFilterKey = getAttribute(clearElement, 'field');
      const fieldsToClear = rawFilterKey
        ? formFields.filter((item) => getAttribute(item, 'field') === rawFilterKey)
        : formFields;
      for (const element of fieldsToClear) clearFormField(element);
    }
  });
};
