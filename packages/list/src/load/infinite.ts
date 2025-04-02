import { addListener, isElement, parseNumericAttribute } from '@finsweet/attributes-utils';
import { effect, watch, type WatchHandle } from '@vue/reactivity';
import throttle from 'just-throttle';

import type { List } from '../components/List';
import { getAttribute } from '../utils/selectors';
import { loadPaginatedCMSItems } from './load';

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

    if (shouldLoad) {
      list.itemsPerPage.value += list.initialItemsPerPage;
      list.triggerHook('pagination');
    }
  }, 100);

  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting } of entries) {
      const action = isIntersecting ? 'addEventListener' : 'removeEventListener';
      window[action]('scroll', handleScroll);
    }
  });

  // Set listeners
  observer.observe(list.listElement);

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

    list.triggerHook('pagination');
  });

  // Handle pagination next buttons display
  const paginationNextRunner = effect(() => {
    const allItemsDisplayed = list.itemsPerPage.value === list.items.value.length;

    list.allPaginationNextElements.value.forEach((element) => {
      element.style.display = allItemsDisplayed ? 'none' : '';
      element.setAttribute('aria-hidden', allItemsDisplayed ? 'true' : 'false');
      element.setAttribute('tabindex', allItemsDisplayed ? '-1' : '0');
    });
  });

  // Init
  loadPaginatedCMSItems(list);

  return () => {
    observer.disconnect();
    cleanupScroll();
    cleanupPaginationNextButtons();
    cleanupLoadRemaingWatcher?.();
    paginationNextRunner.effect.stop();
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
