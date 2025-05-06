import { addListener } from '@finsweet/attributes-utils';
import throttle from 'just-throttle';

import type { List } from '../components/List';
import { getAttribute } from '../utils/selectors';
import { loadPaginatedCMSItems } from './load';
import { handleElements, handlePaginationNextButtons } from './more';

/**
 * Inits the infinite mode.
 * @param list The {@link List} instance.
 *
 * @returns A callback to remove all event listeners.
 */
export const initInfiniteMode = (list: List) => {
  if (!list.listElement) return;

  const thresholdCoefficient = getInfiniteThreshold(list);

  // Add hook
  list.addHook('pagination', (items) => {
    const paginatedItems = items.slice(0, list.itemsPerPage.value);
    return paginatedItems;
  });

  // Init
  loadPaginatedCMSItems(list);

  /**
   * Handles a scroll event.
   * Recalculates the scroll ratio of the element.
   */
  const handleScroll = throttle(async () => {
    if (!list.listElement) return;

    const { innerHeight } = window;
    const { bottom } = list.listElement.getBoundingClientRect();

    const validRange = thresholdCoefficient * innerHeight;
    const shouldLoad = bottom > 0 && bottom <= validRange;

    if (shouldLoad && list.itemsPerPage.value < list.items.value.length) {
      list.itemsPerPage.value += list.initialItemsPerPage;
      list.triggerHook('pagination');
    }
  }, 10);

  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting } of entries) {
      const action = isIntersecting ? 'addEventListener' : 'removeEventListener';
      window[action]('scroll', handleScroll);
    }
  });

  // Set listeners
  observer.observe(list.listElement);

  const cleanupScroll = addListener(window, 'scroll', handleScroll);
  const cleanupPaginationNextButtons = handlePaginationNextButtons(list);
  const cleanupElements = handleElements(list);

  return () => {
    observer.disconnect();
    cleanupScroll();
    cleanupPaginationNextButtons();
    cleanupElements();
  };
};

/**
 * Collects the `Infinite` mode settings.
 * @param list The {@link List} instance.
 */
const getInfiniteThreshold = (list: List): number => {
  const threshold = getAttribute(list.listOrWrapper, 'threshold');

  const thresholdCoefficient = 1 - threshold / 100;
  return thresholdCoefficient;
};
