import { clearFormField, isFormField, parseNumericAttribute } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { getAttribute, getElementSelector, getSettingSelector, queryElement } from '../utils/selectors';
import { filterConditions, initCondition } from './conditions';
import { getFilterData, getFiltersData } from './data';
import { filterItems } from './filter';
import { initTag } from './tag';

/**
 * Inits loading functionality for the list.
 * @param list
 * @param form
 */
export const initListFiltering = async (list: List, form: HTMLFormElement) => {
  const emptyElement = queryElement('empty');

  // Init hook
  list.addHook('filter', (items) => {
    const filters = list.filters.get();
    const match = getAttribute(form, 'match', true) || 'and';
    const filteredItems = filterItems({ filters, match }, items);
    if (list.wrapperElement) {
      if (filteredItems.length === 0) {
        list.wrapperElement.style.display = 'none';
        if (emptyElement) emptyElement.style.display = 'flex';
      } else {
        list.wrapperElement.style.display = 'block';
        if (emptyElement) emptyElement.style.display = 'none';
      }
    }
    return filteredItems;
  });

  const selector = getSettingSelector('field');
  const formFields = Array.from(form.querySelectorAll<HTMLInputElement>(selector)).filter((item) => isFormField(item));

  // Get filters data
  const filtersData = getFiltersData(form);

  initTag(list);
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
