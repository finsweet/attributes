import { addListener } from '@finsweet/attributes-utils';
import { ref } from '@vue/reactivity';

import type { List } from '../components/List';
import { loadPaginatedItems } from './load';

/**
 * Inits the default mode.
 * @param list The {@link List} instance.
 *
 * @returns A callback to remove event listeners.
 */
export const initMoreMode = (list: List) => {
  const { paginationNextElement, paginationPreviousElement, paginationCountElement, itemsPerPage } = list;

  const paginationPrevious = paginationPreviousElement.value;
  const paginationNext = paginationNextElement.value;

  if (!paginationNext) return;

  let isLoading = true;

  if (paginationPrevious) {
    paginationPrevious.style.display = 'none';
  }

  paginationCountElement?.remove();

  const itemsToDisplay = ref(itemsPerPage.value);

  list.addHook('paginate', (items) => {
    const paginatedItems = items.slice(0, itemsToDisplay.value);
    const allItemsDisplayed = paginatedItems.length === items.length;

    paginationNext.style.display = allItemsDisplayed ? 'none' : '';

    if (!isLoading && allItemsDisplayed) {
      cleanup();
      return;
    }

    return paginatedItems;
  });

  // Init
  const cleanup = addListener(paginationNext, 'click', async (e) => {
    e.preventDefault();

    itemsToDisplay.value = itemsToDisplay.value + itemsPerPage.value;
    list.triggerHook('paginate');
  });

  loadPaginatedItems(list).then(() => {
    isLoading = false;
  });

  // Destroy callback
  return cleanup;
};
