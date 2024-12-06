import type { List } from '../components/List';
import { loadPaginatedItems } from './load';

/**
 * Inits the `Load All` mode.
 * @param list The {@link List} instance.
 */
export const initAllMode = (list: List) => {
  const { paginationNextElement, paginationPreviousElement, paginationCountElement } = list;

  const paginationPrevious = paginationPreviousElement.get();
  const paginationNext = paginationNextElement.get();

  if (paginationNext) {
    paginationNext.style.display = 'none';
  }

  if (paginationPrevious) {
    paginationPrevious.style.display = 'none';
  }

  paginationCountElement?.remove();

  loadPaginatedItems(list).then(() => {
    list.itemsPerPage.set(list.items.get().length);
  });
};
