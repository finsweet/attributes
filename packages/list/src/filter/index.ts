import type { List } from '../components/List';
import { subscribeMultiple } from '../utils/reactivity';
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
    const filters = list.filters.get();

    const filteredItems = filterItems(filters, items);
    return filteredItems;
  });

  // Handle elements
  const elementsCleanup = subscribeMultiple(
    [list.hooks.filter.result, list.emptyElement],
    ([filteredItems, emptyElement]) => {
      const hasItems = !!filteredItems?.length;

      if (list.listElement) {
        list.listElement.style.display = hasItems ? '' : 'none';
      }

      if (emptyElement) {
        emptyElement.style.display = hasItems ? 'none' : '';
      }
    }
  );

  const isAdvanced = !!queryElement('condition-group', { scope: form });

  // Get filters data
  const filters = isAdvanced ? getAdvancedFilters(form) : getSimpleFilters(list, form);
  list.filters.set(filters);

  // Trigger the hook when the filters change
  let queued = false;

  const filtersCleanup = list.filters.subscribe(() => {
    if (queued) return;

    queued = true;

    queueMicrotask(() => {
      console.log(list.filters.get());
      list.triggerHook('filter');
      queued = false;
    });
  });

  // TODO - Init tags + cleanup
  initTags(list);

  const filteringCleanup = isAdvanced ? initAdvancedFilters(list, form) : initSimpleFilters(list, form);

  const mutationObserver = new MutationObserver(() => {
    const filters = isAdvanced ? getAdvancedFilters(form) : getSimpleFilters(list, form);
    list.filters.set(filters);
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
