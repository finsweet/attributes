import { addListener, isElement, parseNumericAttribute } from '@finsweet/attributes-utils';
import { watch, type WatchHandle } from '@vue/reactivity';
import throttle from 'just-throttle';

import type { List } from '../components/List';
import { DEFAULT_INFINITE_THRESHOLD } from '../utils/constants';
import { getAttribute } from '../utils/selectors';
import { loadPaginatedCMSItems } from './load';

/**
 * Inits the infinite mode.
 * @param list The {@link List} instance.
 *
 * @returns A callback to remove all event listeners.
 */
export const initInfiniteMode = (list: List) => {
  const { listElement, paginationCountElement, itemsPerPage } = list;
  if (!listElement) return;

  paginationCountElement?.remove();

  list.allPaginationPreviousElements.value.forEach((element) => {
    element.style.display = 'none';
  });

  const thresholdCoefficient = getInfiniteThreshold(list);

  let isLoading = true;

  list.addHook('paginate', (items) => {
    const paginatedItems = items.slice(0, itemsPerPage.value);
    const allItemsDisplayed = paginatedItems.length === items.length;

    list.allPaginationNextElements.value.forEach((element) => {
      element.style.display = allItemsDisplayed ? 'none' : '';
    });

    if (!isLoading && allItemsDisplayed) {
      cleanup();
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
      itemsPerPage.value += list.initialItemsPerPage;
      list.triggerHook('paginate');
    }
  }, 100);

  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting } of entries) {
      const action = isIntersecting ? 'addEventListener' : 'removeEventListener';
      window[action]('scroll', handleScroll);
    }
  });

  // Set listeners
  observer.observe(listElement);

  const cleanupScroll = addListener(window, 'scroll', handleScroll);

  let cleanupLoadRemaingWatcher: WatchHandle | undefined;

  const cleanupPaginationNextButtons = addListener(list.allPaginationNextElements.value, 'click', async (e) => {
    if (!e.target || !isElement(e.target)) return;

    e.preventDefault();

    const rawLoadCount = getAttribute(e.target, 'loadcount');

    if (rawLoadCount === 'all') {
      cleanupLoadRemaingWatcher ||= watch(
        list.items,
        (items) => {
          list.itemsPerPage.value = items.length;
        },
        { immediate: true }
      );
    } else {
      list.itemsPerPage.value += parseNumericAttribute(rawLoadCount, list.initialItemsPerPage);
    }

    list.triggerHook('paginate');
  });

  // Init
  loadPaginatedCMSItems(list).then(() => {
    isLoading = false;
  });

  const cleanup = () => {
    observer.disconnect();
    cleanupScroll();
    cleanupPaginationNextButtons();
    cleanupLoadRemaingWatcher?.();
  };

  return cleanup;
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
