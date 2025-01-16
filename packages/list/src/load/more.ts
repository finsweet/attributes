import { addListener, isElement, parseNumericAttribute } from '@finsweet/attributes-utils';
import { effect, watch, type WatchHandle } from '@vue/reactivity';

import type { List } from '../components/List';
import { getAttribute } from '../utils/selectors';
import { loadPaginatedCMSItems } from './load';

/**
 * Inits the default mode.
 * @param list The {@link List} instance.
 *
 * @returns A callback to remove event listeners.
 */
export const initMoreMode = (list: List) => {
  // Add hook
  list.addHook('paginate', (items) => {
    const paginatedItems = items.slice(0, list.itemsPerPage.value);
    return paginatedItems;
  });

  // Listeners
  let cleanupLoadRemaingWatcher: WatchHandle | undefined;

  const cleanupPaginationNextButtons = addListener(list.allPaginationNextElements.value, 'click', async (e) => {
    if (!e.target || !isElement(e.target)) return;

    e.preventDefault();

    const rawLoadCount = getAttribute(e.target, 'loadcount');

    if (rawLoadCount === 'all') {
      cleanupLoadRemaingWatcher ||= watch(
        list.items,
        (items) => {
          list.itemsPerPage.value = items.length;
        },
        { immediate: true }
      );
    } else {
      list.itemsPerPage.value += parseNumericAttribute(rawLoadCount, list.initialItemsPerPage);
    }

    list.triggerHook('paginate');
  });

  // Handle pagination next buttons display
  effect(() => {
    const allItemsDisplayed = list.itemsPerPage.value === list.items.value.length;

    list.allPaginationNextElements.value.forEach((element) => {
      element.style.display = allItemsDisplayed ? 'none' : '';
      element.setAttribute('aria-hidden', allItemsDisplayed ? 'true' : 'false');
      element.setAttribute('tabindex', allItemsDisplayed ? '-1' : '0');
    });
  });

  // Init
  loadPaginatedCMSItems(list);

  return () => {
    cleanupPaginationNextButtons();
    cleanupLoadRemaingWatcher?.();
  };
};
