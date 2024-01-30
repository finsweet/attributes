import { clearFormField, isFormField, parseNumericAttribute } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { getAttribute, getElementSelector, getSettingSelector } from '../utils/selectors';
import { filterConditions, initCondition } from './conditions';
import { getFilterData, getFiltersData } from './data';
import { filterItems } from './filter';
import { handleTags, initTag } from './tag';

/**
 * Inits loading functionality for the list.
 * @param list
 * @param form
 */
export const initListFiltering = async (list: List, form: HTMLFormElement) => {
  // Init hook
  list.addHook('filter', (items) => {
    const filters = list.filters.get();
    const match: 'and' | 'or' = getAttribute(form, 'match') || 'and';
    const filteredItems = filterItems({ filters, match }, items);
    if (list.listElement?.parentElement) {
      if (filterItems.length === 0) list.listElement.parentElement.style.display = 'none';
      else list.listElement.parentElement.style.display = 'block';
    }
    return filteredItems;
  });

  const selector = getSettingSelector('field');
  const formFields = Array.from(form.querySelectorAll<HTMLInputElement>(selector)).filter((item) => isFormField(item));

  // Get filters data
  const filtersData = getFiltersData(form);

  const tagData = initTag();
  initCondition();

  list.filters.set(filtersData);

  let debouncedFiltration = 0;

  // Listen for changes
  form.addEventListener('input', (e) => {
    const { target } = e;

    if (!isFormField(target)) return;

    filterConditions(target, list);

    const rawFieldKey = getAttribute(target, 'field');
    const debounceValue = parseNumericAttribute(getAttribute(target, 'debounce'), 0);
    if (!rawFieldKey) return;

    // Avoid unnecessary calls
    if (debouncedFiltration) {
      clearTimeout(debouncedFiltration);
    }

    debouncedFiltration = setTimeout(() => {
      const filterData = getFilterData(target);
      list.filters.setKey(rawFieldKey, filterData);
    }, debounceValue);
  });

  // Trigger the hook when the filters change
  list.filters.subscribe(() => {
    list.triggerHook('filter');

    const filters = list.filters.get();

    if (tagData) handleTags(filters, tagData);
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
      for (const element of fieldsToClear) {
        clearFormField(element);
        debouncedFiltration = 0;
      }
    }
  });
};
