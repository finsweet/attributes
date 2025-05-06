import { DROPDOWN_CSS_CLASSES, type DropdownElement, isHTMLSelectElement } from '@finsweet/attributes-utils';
import { watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { List } from '../components/List';
import { getAttribute } from '../utils/selectors';
import { initButtons } from './buttons';
import { initDropdown } from './dropdown';
import { initHTMLSelect } from './select';
import { sortListItems } from './sort';
import type { Sorting } from './types';

/**
 * Inits sorting functionality for the list.
 */
export const initListSorting = (list: List, triggers: HTMLElement[]) => {
  // Init mode
  const [firstTrigger] = triggers;
  const isSelect = isHTMLSelectElement(firstTrigger);
  const isDropdown = firstTrigger.closest<DropdownElement>(`.${DROPDOWN_CSS_CLASSES.dropdown}`);

  const modeCleanup = isSelect
    ? initHTMLSelect(firstTrigger, list)
    : isDropdown
      ? initDropdown(isDropdown, list)
      : initButtons(triggers, list);

  // Set up hooks
  const sortHookCleanup = list.addHook('sort', (items) => {
    list.currentPage.value = 1; // Reset the current page

    const sortedItems = sortListItems(items, list.sorting.value);
    return sortedItems;
  });

  const beforeRenderHookCleanup = list.addHook('beforeRender', async (items) => {
    if (list.triggeredHook === 'sort') {
      const className = getAttribute(list.listElement, 'sortingclass');

      list.wrapperElement.classList.add(className);

      const animations = list.wrapperElement.getAnimations({ subtree: true });

      await Promise.all(animations.map((a) => a.finished));
    }

    return items;
  });

  const afterRenderHookCleanup = list.addHook('afterRender', (items) => {
    const className = getAttribute(list.listElement, 'sortingclass');
    list.wrapperElement.classList.remove(className);

    return items;
  });

  // Set up reactivity
  const sortingCleanup = watch(
    list.sorting,
    debounce((sorting: Sorting) => {
      list.triggerHook('sort', { scrollToAnchor: list.hasInteracted.value });

      // Handle query params
      if (list.showQuery) {
        list.setSearchParam('sorting', JSON.stringify(sorting));
      }
    }, 0),
    { deep: true, immediate: true }
  );

  // Read query params
  Promise.all([list.getSearchParam('sorting')]).then(([rawSorting]) => {
    if (!rawSorting) return;

    try {
      list.sorting.value = JSON.parse(rawSorting);
    } catch {
      //
    }
  });

  return () => {
    modeCleanup?.();
    sortHookCleanup();
    beforeRenderHookCleanup();
    afterRenderHookCleanup();
    sortingCleanup();
  };
};
