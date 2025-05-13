import { DROPDOWN_CSS_CLASSES, type DropdownElement, isHTMLSelectElement } from '@finsweet/attributes-utils';
import { watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { List } from '../components/List';
import { getAttribute } from '../utils/selectors';
import { initButtons } from './buttons';
import { initDropdown } from './dropdown';
import { getListSortingQuery, setListSortingQuery } from './query';
import { initHTMLSelect } from './select';
import { sortListItems } from './sort';

/**
 * Inits sorting functionality for the list.
 */
export const initListSorting = (list: List, triggers: HTMLElement[]) => {
  const sortingClass = getAttribute(list.listElement, 'sortingclass');

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
    const sortedItems = sortListItems(items, list.sorting.value);
    return sortedItems;
  });

  const beforeRenderHookCleanup = list.addHook('beforeRender', async (items) => {
    if (list.triggeredHook === 'sort') {
      list.wrapperElement.classList.add(sortingClass);

      const animations = list.wrapperElement.getAnimations({ subtree: true });

      await Promise.all(animations.map((a) => a.finished));
    }

    return items;
  });

  const afterRenderHookCleanup = list.addHook('afterRender', (items) => {
    list.wrapperElement.classList.remove(sortingClass);

    return items;
  });

  // Set up reactivity
  const sortingCleanup = watch(
    list.sorting,
    debounce(() => {
      list.triggerHook('sort', {
        scrollToAnchor: list.hasInteracted.value,
        resetCurrentPage: list.hasInteracted.value,
      });

      // Handle query params
      if (list.showQuery) {
        setListSortingQuery(list);
      }
    }, 0),
    { deep: true, immediate: true }
  );

  // Read query params
  getListSortingQuery(list);

  return () => {
    modeCleanup?.();
    sortHookCleanup();
    beforeRenderHookCleanup();
    afterRenderHookCleanup();
    sortingCleanup();
  };
};
