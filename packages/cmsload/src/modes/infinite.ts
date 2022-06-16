import type { CMSList } from '@finsweet/attributes-cmscore';
import throttle from 'just-throttle';

import { loadPaginatedItems } from '../actions/load';
import { incrementItemsPerPage } from '../actions/pagination';
import { getInfiniteThreshold } from '../actions/settings';

/**
 * Inits the infinite mode.
 * @param listInstance The `CMSList` instance.
 */
export const initInfiniteMode = async (listInstance: CMSList): Promise<void> => {
  const {
    list,
    paginationNext,
    paginationPrevious,
    paginationCount,
    itemsPerPage: originalItemsPerPage,
  } = listInstance;

  if (!list || !paginationNext) return;

  if (paginationPrevious) paginationPrevious.style.display = 'none';

  paginationCount?.remove();

  const thresholdCoefficient = getInfiniteThreshold(listInstance);

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
  };

  /**
   * Handles a scroll event.
   * Recalculates the scroll ratio of the element.
   */
  const handleScroll = throttle(async () => {
    if (isHandling) return;

    const { innerHeight } = window;
    const { bottom } = list.getBoundingClientRect();

    const validRange = thresholdCoefficient * innerHeight;
    const shouldLoad = bottom > 0 && bottom <= validRange;

    if (shouldLoad) {
      isHandling = true;

      await incrementItemsPerPage(listInstance, isLoading, originalItemsPerPage);

      isHandling = false;
    }
  }, 100);

  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting } of entries) {
      const action = isIntersecting ? 'addEventListener' : 'removeEventListener';
      window[action]('scroll', handleScroll);
    }
  });

  /**
   * Destroys the `Pagination Next` button and the `Intersection Observer`.
   */
  const conclude = () => {
    window.removeEventListener('scroll', handleScroll);
    paginationNext.removeEventListener('click', handleClicks);
    paginationNext.style.display = 'none';
    observer.disconnect();
  };

  // Init
  paginationNext.addEventListener('click', handleClicks);
  observer.observe(list);

  await loadPaginatedItems(listInstance);

  isLoading = false;
};
