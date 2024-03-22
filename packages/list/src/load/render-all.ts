import type { List } from '../components/List';
import { loadPaginatedItems } from './load';

/**
 * Inits the `Render All` mode.
 * @param list The `CMSList` instance.
 * @param loadingText The text to display while loading.
 */
export const initRenderAllMode = (list: List) => {
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
