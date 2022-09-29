import type { CMSList } from '$packages/cmscore';

import { loadPaginatedItems } from '../actions/load';
import { incrementItemsPerPage } from '../actions/pagination';

/**
 * Inits the default mode.
 * @param listInstance The `CMSList` instance.
 */
export const initDefaultMode = async (listInstance: CMSList): Promise<void> => {
  const { paginationNext, paginationPrevious, paginationCount, itemsPerPage: originalItemsPerPage } = listInstance;

  if (!paginationNext) return;

  if (paginationPrevious) paginationPrevious.style.display = 'none';

  paginationCount?.remove();

  let isLoading = true;
  let isHandling = false;

  listInstance.initPagination();

  listInstance.on('renderitems', () => {
    const { validItems, items, itemsPerPage: currentItemsPerPage } = listInstance;

    if (!isLoading && items.length === currentItemsPerPage) {
      conclude();
      return;
    }

    paginationNext.style.display = validItems.length > currentItemsPerPage ? '' : 'none';
  });

  /**
   * Handles click events on the `Pagination Next` button.
   * @param e The mouse event.
   */
  const handleClicks = async (e: MouseEvent) => {
    e.preventDefault();

    if (isHandling) return;

    isHandling = true;

    await incrementItemsPerPage(listInstance, isLoading, originalItemsPerPage, e);

    isHandling = false;
  };

  /**
   * Destroys the `Pagination Next` button..
   */
  const conclude = () => {
    paginationNext.removeEventListener('click', handleClicks);
    paginationNext.style.display = 'none';
  };

  // Init
  paginationNext.addEventListener('click', handleClicks);

  await loadPaginatedItems(listInstance);

  isLoading = false;
};
