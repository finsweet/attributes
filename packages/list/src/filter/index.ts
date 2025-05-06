import { watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { List } from '../components/List';
import { getAttribute, queryElement } from '../utils/selectors';
import { initDynamicFilters } from './dynamic';
import { handleFilterElements } from './elements';
import { filterItems } from './filter';
import { initStandardFilters } from './standard';
import { initTags } from './tags';
import type { Filters } from './types';

/**
 * Inits loading functionality for the list.
 * @param list
 * @param forms
 */
export const initListFiltering = (list: List, forms: HTMLFormElement[]) => {
  // Init hooks
  const filterHookCleanup = list.addHook('filter', async (items) => {
    list.currentPage.value = 1; // Reset the current page

    const filteredItems = await filterItems(list.filters.value, items, list.highlight);
    return filteredItems;
  });

  const beforeRenderHookCleanup = list.addHook('beforeRender', async (items) => {
    if (list.triggeredHook === 'filter') {
      const className = getAttribute(list.listElement, 'filteringclass');

      list.wrapperElement.classList.add(className);

      const animations = list.wrapperElement.getAnimations({ subtree: true });

      await Promise.all(animations.map((a) => a.finished));
    }

    return items;
  });

  const afterRenderHookCleanup = list.addHook('afterRender', (items) => {
    const className = getAttribute(list.listElement, 'filteringclass');
    list.wrapperElement.classList.remove(className);

    const hasItems = !!items.length;

    if (list.listElement) {
      list.listElement.style.display = hasItems ? '' : 'none';
    }

    if (list.emptyElement.value) {
      list.emptyElement.value.style.display = hasItems ? 'none' : '';
    }

    return items;
  });

  // Handle elements
  const elementsCleanup = handleFilterElements(list);

  // Init filters
  const isDynamic = !!queryElement('condition-group', { scope: forms[0] });
  const filteringCleanup = isDynamic ? initDynamicFilters(list, forms[0]) : initStandardFilters(list, forms);

  // Init Tags
  const tagsCleanup = initTags(list, isDynamic);

  // Trigger the hook when the filters change
  const filtersCleanup = watch(
    list.filters,
    debounce((filters: Filters) => {
      list.triggerHook('filter', { scrollToAnchor: list.hasInteracted.value });

      // Handle query params
      if (list.showQuery) {
        list.setSearchParam('filters', JSON.stringify(filters));
      }
    }, 0),
    { deep: true }
  );

  // Read query params
  list.getSearchParam('filters').then((rawFilters) => {
    if (!rawFilters) return;

    try {
      list.filters.value = JSON.parse(rawFilters);
    } catch {
      //
    }
  });

  return () => {
    filterHookCleanup();
    beforeRenderHookCleanup();
    afterRenderHookCleanup();
    elementsCleanup();
    tagsCleanup?.();
    filtersCleanup();
    filteringCleanup?.();
  };
};
