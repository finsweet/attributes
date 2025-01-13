import { effect, watch } from '@vue/reactivity';

import type { List } from '../components/List';
import { queryElement } from '../utils/selectors';
import { initAdvancedFilters } from './advanced';
import { filterItems } from './filter';
import { initSimpleFilters } from './simple';
import { initTags } from './tags';

/**
 * Inits loading functionality for the list.
 * @param list
 * @param form
 */
export const initListFiltering = (list: List, form: HTMLFormElement) => {
  // Init hook
  const hookCleanup = list.addHook('filter', (items) => {
    const filteredItems = filterItems(list.filters, items, list.fuzzySearch);
    return filteredItems;
  });

  // Handle elements
  const elementsCleanup = effect(() => {
    const filteredItems = list.hooks.filter.result.value;
    const hasItems = !!filteredItems.length;

    if (list.listElement) {
      list.listElement.style.display = hasItems ? '' : 'none';
    }

    if (list.emptyElement.value) {
      list.emptyElement.value.style.display = hasItems ? 'none' : '';
    }

    if (list.resultsCountElement) {
      list.resultsCountElement.textContent = `${filteredItems.length}`;
    }
  });

  const isAdvanced = !!queryElement('condition-group', { scope: form });

  // TODO - Init tags + cleanup
  initTags(list);

  // Init filters
  const filteringCleanup = isAdvanced ? initAdvancedFilters(list, form) : initSimpleFilters(list, form);

  // Trigger the hook when the filters change
  let queued = false;

  // TODO: watcher seems to fire twice on each filter change
  const filtersCleanup = watch(
    list.filters,
    () => {
      if (queued) return;

      queued = true;

      queueMicrotask(() => {
        list.triggerHook('filter');
        queued = false;
      });
    },
    { deep: true, immediate: true }
  );

  return () => {
    hookCleanup();
    elementsCleanup();
    filtersCleanup();
    filteringCleanup?.();
  };
};
