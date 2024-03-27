import { addListener } from '@finsweet/attributes-utils';
import { atom } from 'nanostores';

import type { List } from '../components/List';
import { loadPaginatedItems } from './load';

/**
 * Inits the default mode.
 * @param list The `List` instance.
 *
 * @returns A callback to remove event listeners.
 */
export const initLoadUnderMode = (list: List) => {
  const { paginationNextElement, paginationPreviousElement, paginationCountElement, itemsPerPage } = list;

  const paginationPrevious = paginationPreviousElement.get();
  const paginationNext = paginationNextElement.get();

  if (!paginationNext) return;

  let isLoading = true;

  if (paginationPrevious) {
    paginationPrevious.style.display = 'none';
  }

  paginationCountElement?.remove();

  const itemsToDisplay = atom(itemsPerPage.get());

  list.addHook('paginate', (items) => {
    const paginatedItems = items.slice(0, itemsToDisplay.get());
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

    itemsToDisplay.set(itemsToDisplay.get() + itemsPerPage.get());
    list.triggerHook('paginate');
  });

  loadPaginatedItems(list).then(() => {
    isLoading = false;
  });

  // Destroy callback
  return cleanup;
};
