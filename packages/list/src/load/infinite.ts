import { addListener, parseNumericAttribute } from '@finsweet/attributes-utils';
import throttle from 'just-throttle';
import { atom } from 'nanostores';

import type { List } from '../components/List';
import { DEFAULT_INFINITE_THRESHOLD } from '../utils/constants';
import { getAttribute } from '../utils/selectors';
import { loadPaginatedItems } from './load';

/**
 * Inits the infinite mode.
 * @param list The `List` instance.
 *
 * @returns A callback to remove all event listeners.
 */
export const initInfiniteMode = (list: List) => {
  const { listElement, paginationNextElement, paginationPreviousElement, paginationCountElement, itemsPerPage } = list;

  const paginationPrevious = paginationPreviousElement.get();
  const paginationNext = paginationNextElement.get();

  if (!listElement || !paginationNext) return;

  if (paginationPrevious) {
    paginationPrevious.style.display = 'none';
  }

  paginationCountElement?.remove();

  const thresholdCoefficient = getInfiniteThreshold(list);
  const itemsToDisplay = atom(itemsPerPage.get());

  let isLoading = true;

  list.addHook('paginate', (items) => {
    const paginatedItems = items.slice(0, itemsToDisplay.get());
    const allItemsDisplayed = paginatedItems.length === items.length;

    paginationNext.style.display = allItemsDisplayed ? 'none' : '';

    if (!isLoading && allItemsDisplayed) {
      conclude();
      return;
    }

    return paginatedItems;
  });

  /**
   * Handles a scroll event.
   * Recalculates the scroll ratio of the element.
   */
  const handleScroll = throttle(async () => {
    const { innerHeight } = window;
    const { bottom } = listElement.getBoundingClientRect();

    const validRange = thresholdCoefficient * innerHeight;
    const shouldLoad = bottom > 0 && bottom <= validRange;

    if (shouldLoad) {
      itemsToDisplay.set(itemsToDisplay.get() + itemsPerPage.get());
      list.triggerHook('paginate');
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
    observer.disconnect();
    cleanupScroll();
    cleanupClicks();
  };

  // Init
  observer.observe(listElement);

  const cleanupClicks = addListener(paginationNext, 'click', (e) => e.preventDefault());
  const cleanupScroll = addListener(window, 'scroll', handleScroll);

  loadPaginatedItems(list).then(() => {
    isLoading = false;
  });

  return conclude;
};

/**
 * Collects the `Infinite` mode settings.
 * @param list The {@link List} instance.
 */
const getInfiniteThreshold = (list: List): number => {
  const rawThreshold = getAttribute(list.listOrWrapper, 'threshold');
  const threshold = parseNumericAttribute(rawThreshold, DEFAULT_INFINITE_THRESHOLD);

  const thresholdCoefficient = 1 - threshold / 100;
  return thresholdCoefficient;
};
