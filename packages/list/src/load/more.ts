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
  list.addHook('pagination', (items) => {
    const paginatedItems = items.slice(0, list.itemsPerPage.value);
    return paginatedItems;
  });

  // Init
  loadPaginatedCMSItems(list);

  // Listeners
  const cleanupPaginationNextButtons = handlePaginationNextButtons(list);
  const cleanupElements = handleElements(list);

  return () => {
    cleanupPaginationNextButtons();
    cleanupElements();
  };
};

/**
 * Handles the pagination next buttons.
 * @param list
 * @returns A cleanup function.
 */
export const handlePaginationNextButtons = (list: List) => {
  let cleanupLoadRemaining: WatchHandle | undefined;

  const cleanupClick = addListener(list.allPaginationNextElements.value, 'click', async (e) => {
    if (!e.target || !isElement(e.target)) return;

    e.preventDefault();

    const rawLoadCount = getAttribute(e.target, 'loadcount') || getAttribute(list.listOrWrapper, 'loadcount');

    if (rawLoadCount === 'all') {
      cleanupLoadRemaining ||= watch(
        list.items,
        (items) => {
          list.itemsPerPage.value = items.length;
        },
        { immediate: true }
      );
    } else {
      list.itemsPerPage.value += parseNumericAttribute(rawLoadCount, list.initialItemsPerPage);
    }

    list.triggerHook('pagination');
  });

  return () => {
    cleanupClick();
    cleanupLoadRemaining?.();
  };
};

/**
 * Handles the display of elements.
 * @param list
 * @returns A cleanup function.
 */
export const handleElements = (list: List) => {
  const runner = effect(() => {
    const allItemsDisplayed = list.itemsPerPage.value === list.items.value.length;

    list.allPaginationNextElements.value.forEach((element) => {
      element.style.display = allItemsDisplayed ? 'none' : '';
      element.setAttribute('aria-hidden', allItemsDisplayed ? 'true' : 'false');
      element.setAttribute('tabindex', allItemsDisplayed ? '-1' : '0');
    });

    if (list.paginationCountElement) {
      const totalPages = Math.ceil(list.items.value.length / list.initialItemsPerPage);
      const currentPage = Math.ceil(list.itemsPerPage.value / list.initialItemsPerPage);

      list.paginationCountElement.innerText = `${currentPage} / ${totalPages}`;
      list.paginationCountElement.setAttribute('aria-label', `Page ${currentPage} of ${totalPages}`);
    }
  });

  return () => {
    runner.effect.stop();
  };
};
