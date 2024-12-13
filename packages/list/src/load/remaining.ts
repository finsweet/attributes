import { addListener } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { loadPaginatedItems } from './load';

/**
 * Inits the `Load Remaining` mode.
 * @param list The {@link List} instance.
 */
export const initRemainingMode = (list: List) => {
  const { paginationNextElement, paginationPreviousElement, paginationCountElement, itemsPerPage } = list;

  const paginationPrevious = paginationPreviousElement.value;
  const paginationNext = paginationNextElement.value;

  if (!paginationNext) return;

  let loadRemainingClicked = false;

  if (paginationPrevious) {
    paginationPrevious.style.display = 'none';
  }

  paginationCountElement?.remove();

  list.addHook('paginate', (items) => {
    const paginatedItems = items.slice(0, itemsPerPage.value);
    return paginatedItems;
  });

  const cleanup = addListener(
    paginationNext,
    'click',
    async (e) => {
      e.preventDefault();

      loadRemainingClicked = true;

      itemsPerPage.value = list.items.value.length;

      paginationNext.style.display = 'none';

      list.triggerHook('paginate');
    },
    { once: true }
  );

  loadPaginatedItems(list).then(() => {
    if (loadRemainingClicked) {
      itemsPerPage.value = list.items.value.length;
    }
  });

  return cleanup;
};
