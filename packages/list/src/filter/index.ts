import { watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { List } from '../components/List';
import { getAttribute, queryElement } from '../utils/selectors';
import { initDynamicFilters } from './dynamic';
import { handleFilterElements } from './elements';
import { filterItems } from './filter';
import { initStandardFilters } from './standard';
import { getListFiltersQuery, setListFiltersQuery } from './standard/query';
import { initTags } from './tags';

/**
 * Inits loading functionality for the list.
 * @param list
 * @param forms
 */
export const initListFiltering = (list: List, forms: HTMLFormElement[]) => {
  const filteringClass = getAttribute(list.listElement, 'filteringclass');

  // Init hooks
  const filterHookCleanup = list.addHook('filter', async (items) => {
    const filteredItems = await filterItems(list.filters.value, items, list.highlight);
    return filteredItems;
  });

  const beforeRenderHookCleanup = list.addHook('beforeRender', async (items) => {
    if (list.triggeredHook === 'filter') {
      list.wrapperElement.classList.add(filteringClass);

      const animations = list.wrapperElement.getAnimations({ subtree: true });

      await Promise.all(animations.map((a) => a.finished));
    }

    return items;
  });

  const afterRenderHookCleanup = list.addHook('afterRender', (items) => {
    list.wrapperElement.classList.remove(filteringClass);

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
    debounce(() => {
      list.triggerHook('filter', {
        scrollToAnchor: list.hasInteracted.value,
        resetCurrentPage: list.hasInteracted.value,
      });

      // Handle query params
      if (list.showQuery) {
        setListFiltersQuery(list);
      }
    }, 0),
    { deep: true }
  );

  // Read query params
  getListFiltersQuery(list);

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
