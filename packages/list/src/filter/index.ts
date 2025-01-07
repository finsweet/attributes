import { effect, watch } from '@vue/reactivity';

import type { List } from '../components/List';
import { setReactive } from '../utils/reactivity';
import { queryElement } from '../utils/selectors';
import { getAdvancedFilters, initAdvancedFilters } from './advanced';
import { filterItems } from './filter';
import { getSimpleFilters, initSimpleFilters } from './simple';
import { initTags } from './tags';

/**
 * Inits loading functionality for the list.
 * @param list
 * @param form
 */
export const initListFiltering = (list: List, form: HTMLFormElement) => {
  // Init hook
  // TODO: Remove hook for cleanup
  list.addHook('filter', (items) => {
    const filteredItems = filterItems(list, items);
    return filteredItems;
  });

  // Handle elements
  const elementsCleanup = effect(() => {
    const hasItems = !!list.hooks.filter.result.value.length;

    if (list.listElement) {
      list.listElement.style.display = hasItems ? '' : 'none';
    }

    if (list.emptyElement.value) {
      list.emptyElement.value.style.display = hasItems ? 'none' : '';
    }
  });

  const isAdvanced = !!queryElement('condition-group', { scope: form });

  // Get filters data
  const filters = isAdvanced ? getAdvancedFilters(form) : getSimpleFilters(list, form);

  setReactive(list.filters, filters);

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

  // TODO - Init tags + cleanup
  initTags(list);

  const filteringCleanup = isAdvanced ? initAdvancedFilters(list, form) : initSimpleFilters(list, form);

  const mutationObserver = new MutationObserver(() => {
    const filters = isAdvanced ? getAdvancedFilters(form) : getSimpleFilters(list, form);
    setReactive(list.filters, filters);
  });

  mutationObserver.observe(form, {
    childList: true,
    subtree: true,
  });

  return () => {
    elementsCleanup();
    filtersCleanup();
    filteringCleanup?.();
    mutationObserver.disconnect();
  };
};
